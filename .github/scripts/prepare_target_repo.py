"""Prepare target repository context for downstream AI search steps."""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from github_api import GitHubAPI

TMP_DIR = Path("/tmp/ai_tools")


def main() -> None:
    target_repo = os.environ.get("TARGET_REPO", "").strip()
    if not target_repo:
        raise SystemExit("❌  TARGET_REPO missing")

    target_token = (
        os.environ.get("RESOLVED_ORG_TOKEN", "").strip()
        or os.environ.get("TARGET_REPO_TOKEN", "").strip()
    )
    if not target_token:
        raise SystemExit("❌  No PAT available for target repo context lookup")

    api = GitHubAPI(target_token)
    repo_info = api.get_repo_info(target_repo)

    TMP_DIR.mkdir(parents=True, exist_ok=True)
    payload = {
        "full_name": target_repo,
        "name": repo_info.get("name") or target_repo.split("/")[-1],
        "description": repo_info.get("description") or "",
        "homepage": repo_info.get("homepage") or "",
        "language": repo_info.get("language") or "",
        "topics": repo_info.get("topics") or [],
        "default_branch": repo_info.get("default_branch", "main"),
    }
    (TMP_DIR / "target_repo_info.json").write_text(
        json.dumps(payload, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
