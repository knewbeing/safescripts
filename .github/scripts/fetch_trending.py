"""Fetch GitHub repositories and scan them for Copilot tools.

Discovery strategy:
  1. Prefer GitHub Trending filtered by the target repository language.
  2. Supplement candidates with GitHub Search queries built from target language/topics.
  3. De-duplicate and rank candidates before scanning their repository tool files.
"""

from __future__ import annotations

import datetime
import logging
from collections.abc import Iterable

import requests
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)

_HEADERS_HTML = {
    "User-Agent": "Mozilla/5.0 (compatible; CopilotToolsBot/1.0)",
    "Accept": "text/html,application/xhtml+xml",
}


def fetch_trending_repos(
    github_token: str,
    limit: int = 10,
    target_language: str = "",
    target_topics: Iterable[str] | None = None,
) -> list[dict]:
    """Return up to *limit* candidate repos biased to the target repo language/topics."""
    topics = _normalize_topics(target_topics)
    scored: dict[str, dict] = {}

    if target_language:
        try:
            repos = _scrape_trending(target_language)
            if repos:
                logger.info(
                    "Scraped %d language-targeted trending repos for %s",
                    len(repos),
                    target_language,
                )
                _merge_repo_candidates(
                    scored,
                    repos,
                    source="language-trending",
                    target_language=target_language,
                    target_topics=topics,
                )
        except Exception as exc:
            logger.warning("Language-filtered trending scrape failed (%s)", exc)

    try:
        repos = _scrape_trending()
        if repos:
            logger.info("Scraped %d global trending repos from github.com/trending", len(repos))
            _merge_repo_candidates(
                scored,
                repos,
                source="global-trending",
                target_language=target_language,
                target_topics=topics,
            )
    except Exception as exc:
        logger.warning("Global trending scrape failed (%s)", exc)

    targeted = _search_api_targeted_repos(
        github_token,
        limit=max(limit * 2, 10),
        target_language=target_language,
        target_topics=topics,
    )
    if targeted:
        logger.info("Found %d targeted search candidates", len(targeted))
        _merge_repo_candidates(
            scored,
            targeted,
            source="targeted-search",
            target_language=target_language,
            target_topics=topics,
        )

    if not scored:
        logger.warning("Targeted discovery returned no candidates; falling back to generic search")
        return _search_api_trending(github_token, limit)

    ordered = sorted(
        scored.values(),
        key=lambda item: (-item["_score"], item["_order"], item["full_name"].lower()),
    )
    return [_strip_meta(item) for item in ordered[:limit]]


def fetch_repo_copilot_tools(full_name: str, github_token: str) -> list[dict]:
    """Return Copilot tool files found anywhere in *full_name*'s repository tree."""
    headers = {
        "Authorization": f"Bearer {github_token}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    tools: list[dict] = []
    seen: set[str] = set()

    for path in _scan_repository_tree(full_name, headers):
        tool_type = _classify_tool_path(path)
        if not tool_type or path in seen:
            continue
        seen.add(path)
        name = path.split("/")[-1].split(".")[0]
        tools.append(
            {
                "name": name,
                "type": tool_type,
                "path": path,
                "download_url": f"https://raw.githubusercontent.com/{full_name}/HEAD/{path}",
                "source_repo": full_name,
            }
        )

    return tools


# ------------------------------------------------------------------ #
# Private helpers                                                      #
# ------------------------------------------------------------------ #


def _scrape_trending(language: str = "") -> list[dict]:
    params = {"since": "daily"}
    if language:
        params["language"] = language
    resp = requests.get(
        "https://github.com/trending",
        headers=_HEADERS_HTML,
        params=params,
        timeout=30,
    )
    resp.raise_for_status()

    soup = BeautifulSoup(resp.text, "html.parser")
    repos: list[dict] = []

    for article in soup.select("article.Box-row"):
        h2_a = article.select_one("h2 a")
        if not h2_a:
            continue
        full_name = h2_a.get("href", "").strip("/")
        if not full_name or "/" not in full_name:
            continue

        desc_p = article.select_one("p")
        description = desc_p.get_text(strip=True) if desc_p else ""

        lang_span = article.select_one("[itemprop='programmingLanguage']")
        language = lang_span.get_text(strip=True) if lang_span else ""

        repos.append(
            {
                "full_name": full_name,
                "description": description,
                "language": language,
                "url": f"https://github.com/{full_name}",
            }
        )

    return repos


def _search_api_trending(github_token: str, limit: int) -> list[dict]:
    since = (datetime.date.today() - datetime.timedelta(days=7)).isoformat()
    headers = {
        "Authorization": f"Bearer {github_token}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    resp = requests.get(
        "https://api.github.com/search/repositories",
        headers=headers,
        params={
            "q": f"pushed:>{since} stars:>50",
            "sort": "stars",
            "order": "desc",
            "per_page": limit,
        },
        timeout=30,
    )
    resp.raise_for_status()
    items = resp.json().get("items", [])
    return [
        {
            "full_name": it["full_name"],
            "description": it.get("description") or "",
            "language": it.get("language") or "",
            "url": it["html_url"],
        }
        for it in items
    ]


def _search_api_targeted_repos(
    github_token: str,
    limit: int,
    target_language: str = "",
    target_topics: list[str] | None = None,
) -> list[dict]:
    """Search repos using target language/topics to bias discovery toward relevant tool sources."""
    topics = _normalize_topics(target_topics)
    if not target_language and not topics:
        return []

    since = (datetime.date.today() - datetime.timedelta(days=21)).isoformat()
    headers = {
        "Authorization": f"Bearer {github_token}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }

    base_query = f"archived:false pushed:>{since} stars:>20"
    queries: list[str] = []
    if target_language:
        queries.append(f'{base_query} language:"{target_language}"')
    for topic in topics[:3]:
        topic_query = f'{base_query} topic:"{topic}"'
        if target_language:
            topic_query += f' language:"{target_language}"'
        queries.append(topic_query)

    repos: list[dict] = []
    seen: set[str] = set()
    for query in queries:
        resp = requests.get(
            "https://api.github.com/search/repositories",
            headers=headers,
            params={
                "q": query,
                "sort": "stars",
                "order": "desc",
                "per_page": min(limit, 10),
            },
            timeout=30,
        )
        resp.raise_for_status()
        for item in resp.json().get("items", []):
            full_name = item["full_name"]
            if full_name in seen:
                continue
            seen.add(full_name)
            repos.append(
                {
                    "full_name": full_name,
                    "description": item.get("description") or "",
                    "language": item.get("language") or "",
                    "url": item["html_url"],
                }
            )
            if len(repos) >= limit:
                return repos
    return repos


def _normalize_topics(topics: Iterable[str] | None) -> list[str]:
    normalized: list[str] = []
    for topic in topics or []:
        cleaned = str(topic).strip().lower()
        if cleaned and cleaned not in normalized:
            normalized.append(cleaned)
    return normalized


def _merge_repo_candidates(
    bucket: dict[str, dict],
    repos: list[dict],
    source: str,
    target_language: str,
    target_topics: list[str],
) -> None:
    for order, repo in enumerate(repos):
        full_name = repo["full_name"]
        current = bucket.setdefault(
            full_name,
            {
                **repo,
                "_score": 0,
                "_order": len(bucket) + order,
                "_sources": [],
            },
        )

        repo_language = str(repo.get("language") or "").strip().lower()
        score = 0
        if source == "language-trending":
            score += 5
        elif source == "targeted-search":
            score += 3
        elif source == "global-trending":
            score += 1

        if target_language and repo_language == target_language.strip().lower():
            score += 4

        haystack = " ".join(
            [
                full_name.lower(),
                str(repo.get("description") or "").lower(),
            ]
        )
        topic_hits = sum(1 for topic in target_topics if topic in haystack)
        score += topic_hits * 2

        current["_score"] += score
        current["_sources"] = sorted(set(current["_sources"] + [source]))
        if not current.get("description") and repo.get("description"):
            current["description"] = repo["description"]
        if not current.get("language") and repo.get("language"):
            current["language"] = repo["language"]


def _strip_meta(repo: dict) -> dict:
    return {k: v for k, v in repo.items() if not k.startswith("_")}


def _scan_repository_tree(full_name: str, headers: dict) -> list[str]:
    """Return all file paths in the repository using the recursive git tree API."""
    url = f"https://api.github.com/repos/{full_name}/git/trees/HEAD"
    try:
        resp = requests.get(url, headers=headers, params={"recursive": "1"}, timeout=30)
        resp.raise_for_status()
        tree = resp.json().get("tree", [])
        return [item["path"] for item in tree if item.get("type") == "blob" and item.get("path")]
    except Exception as exc:
        logger.debug("Repository tree scan failed for %s: %s", full_name, exc)
        return []


def _classify_tool_path(path: str) -> str | None:
    lowered = path.lower()
    parts = [part for part in lowered.split("/") if part]
    filename = parts[-1] if parts else ""

    if filename == "copilot-instructions.md" or ".instructions." in filename:
        return "instruction"
    if ".prompt." in filename:
        return "skill"

    if any(part in {"instructions", "instruction"} for part in parts):
        return "instruction"
    if any(part in {"agents", "agent"} for part in parts):
        return "agent"
    if any(part in {"prompts", "prompt", "skills", "skill"} for part in parts):
        return "skill"

    return None
