"""Fetch GitHub trending repositories and scan them for Copilot tools."""

from __future__ import annotations

import datetime
import logging
from typing import Any

import requests
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)

# Directories within a repo that may contain Copilot tools
_TOOL_DIRS: dict[str, str] = {
    ".github/instructions": "instruction",
    ".github/agents": "agent",
    ".github/prompts": "skill",
}

_HEADERS_HTML = {
    "User-Agent": "Mozilla/5.0 (compatible; CopilotToolsBot/1.0)",
    "Accept": "text/html,application/xhtml+xml",
}


def fetch_trending_repos(github_token: str, limit: int = 10) -> list[dict]:
    """Return up to *limit* trending repos (scrape with Search-API fallback)."""
    try:
        repos = _scrape_trending()
        if repos:
            logger.info("Scraped %d trending repos from github.com/trending", len(repos))
            return repos[:limit]
    except Exception as exc:
        logger.warning("Trending scrape failed (%s); falling back to Search API", exc)

    return _search_api_trending(github_token, limit)


def fetch_repo_copilot_tools(full_name: str, github_token: str) -> list[dict]:
    """Return all Copilot tool files found in *full_name*'s .github/ tree."""
    headers = {
        "Authorization": f"Bearer {github_token}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    tools: list[dict] = []

    # Root copilot-instructions.md
    _check_root_instructions(full_name, headers, tools)

    # Sub-directories: instructions / agents / prompts
    for path, tool_type in _TOOL_DIRS.items():
        _scan_directory(full_name, path, tool_type, headers, tools)

    return tools


# ------------------------------------------------------------------ #
# Private helpers                                                      #
# ------------------------------------------------------------------ #


def _scrape_trending() -> list[dict]:
    resp = requests.get(
        "https://github.com/trending",
        headers=_HEADERS_HTML,
        params={"since": "daily"},
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


def _check_root_instructions(
    full_name: str, headers: dict, tools: list[dict]
) -> None:
    url = f"https://api.github.com/repos/{full_name}/contents/.github/copilot-instructions.md"
    try:
        resp = requests.get(url, headers=headers, timeout=15)
        if resp.status_code == 200:
            data = resp.json()
            tools.append(
                {
                    "name": "copilot-instructions",
                    "type": "instruction",
                    "path": ".github/copilot-instructions.md",
                    "download_url": data["download_url"],
                    "source_repo": full_name,
                }
            )
    except Exception as exc:
        logger.debug("Root instructions check failed for %s: %s", full_name, exc)


def _scan_directory(
    full_name: str, path: str, tool_type: str, headers: dict, tools: list[dict]
) -> None:
    url = f"https://api.github.com/repos/{full_name}/contents/{path}"
    try:
        resp = requests.get(url, headers=headers, timeout=15)
        if resp.status_code == 404:
            return
        resp.raise_for_status()
        contents = resp.json()
        if not isinstance(contents, list):
            return
        for item in contents:
            if item["type"] != "file":
                continue
            name = item["name"]
            # 仅采集 Markdown 工具文件，避免引入 YAML/其他类型文件
            if not name.lower().endswith(".md"):
                continue
            stem = name.split(".")[0]
            tools.append(
                {
                    "name": stem,
                    "type": tool_type,
                    "path": f"{path}/{name}",
                    "download_url": item["download_url"],
                    "source_repo": full_name,
                }
            )
    except Exception as exc:
        logger.debug("Directory scan failed for %s/%s: %s", full_name, path, exc)
