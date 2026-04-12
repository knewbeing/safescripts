"""Read AI-selected repository candidates, then scan them for Copilot tools."""

from __future__ import annotations

import json
import logging
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from fetch_trending import fetch_repo_copilot_tools, fetch_trending_repos
from github_api import GitHubAPI

logging.basicConfig(level=logging.INFO, format="%(levelname)s  %(message)s")
logger = logging.getLogger(__name__)

TMP_DIR = Path("/tmp/ai_tools")


def _write_output(key: str, value: str) -> None:
    github_output = os.environ.get("GITHUB_OUTPUT")
    if github_output:
        with open(github_output, "a", encoding="utf-8") as fh:
            fh.write(f"{key}={value}\n")


def _load_target_repo_info() -> dict:
    path = TMP_DIR / "target_repo_info.json"
    if not path.exists():
        raise SystemExit("❌  target_repo_info.json not found — run prepare_target_repo.py first")
    return json.loads(path.read_text(encoding="utf-8"))


def _parse_ai_repo_search(ai_raw: str) -> list[str]:
    if not ai_raw:
        return []
    try:
        payload = json.loads(ai_raw)
    except Exception as exc:
        logger.warning("AI_REPO_SEARCH is invalid JSON: %s", exc)
        return []

    repos: list[str] = []
    for item in payload.get("repos", []):
        full_name = str(item.get("full_name") or "").strip()
        if full_name and "/" in full_name and full_name not in repos:
            repos.append(full_name)
    return repos


def _fetch_repo_metadata(full_name: str, github_token: str) -> dict | None:
    try:
        info = GitHubAPI(github_token).get_repo_info(full_name)
    except Exception as exc:
        logger.warning("Skip candidate %s: %s", full_name, exc)
        return None
    return {
        "full_name": full_name,
        "description": info.get("description") or "",
        "language": info.get("language") or "",
        "url": info.get("html_url") or f"https://github.com/{full_name}",
        "topics": info.get("topics") or [],
    }


def main() -> None:
    github_token = os.environ.get("GITHUB_TOKEN", "").strip()
    if not github_token:
        raise SystemExit("❌  GITHUB_TOKEN missing")

    target_info = _load_target_repo_info()
    ai_repos = _parse_ai_repo_search(os.environ.get("AI_REPO_SEARCH", "").strip())

    if ai_repos:
        logger.info("AI selected %d candidate repositories", len(ai_repos))
        repo_candidates = []
        for full_name in ai_repos[:10]:
            repo = _fetch_repo_metadata(full_name, github_token)
            if repo:
                repo_candidates.append(repo)
    else:
        logger.warning("AI repo search returned no usable repositories; falling back to rule-based discovery")
        repo_candidates = fetch_trending_repos(
            github_token,
            limit=10,
            target_language=target_info.get("language", ""),
            target_topics=target_info.get("topics") or [],
        )

    if not repo_candidates:
        logger.warning("No candidate repositories available")
        (TMP_DIR / "candidates.json").write_text("[]", encoding="utf-8")
        _write_output("has_candidates", "false")
        return

    candidates: list[dict] = []
    for repo in repo_candidates[:10]:
        full_name = repo["full_name"]
        logger.info("Scanning %s …", full_name)
        tools = fetch_repo_copilot_tools(full_name, github_token)
        if not tools:
            continue
        logger.info("  └─ Found %d tool file(s)", len(tools))
        for tool in tools:
            tool["id"] = f"{full_name}::{tool['path']}"
        candidates.append({"repo": repo, "tools": tools})

    (TMP_DIR / "candidates.json").write_text(
        json.dumps(candidates, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    _write_output("has_candidates", "true" if candidates else "false")


if __name__ == "__main__":
    main()
