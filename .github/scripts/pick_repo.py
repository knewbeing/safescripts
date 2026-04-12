"""Setup step: pick today's target repo and derive its token secret name.

Writes two outputs to GITHUB_OUTPUT (or stdout for local testing):
  target_repo     — e.g. "another-org/my-repo"
  token_env_name  — e.g. "ANOTHER_ORG_GITHUB_TOKEN"
"""

from __future__ import annotations

import datetime
import json
import os
import sys
from pathlib import Path

_REPOS_FILE = Path(__file__).parent.parent.parent / "repos.json"


def org_token_env_name(repo_full_name: str) -> str:
    """Derive <OWNER>_GITHUB_TOKEN from the repo's owner.

    Examples:
      "another-org/repo"  → ANOTHER_ORG_GITHUB_TOKEN
      "some-user/repo"    → SOME_USER_GITHUB_TOKEN
    """
    owner = repo_full_name.split("/")[0]
    return owner.upper().replace("-", "_") + "_GITHUB_TOKEN"


def main() -> None:
    with open(_REPOS_FILE) as fh:
        config = json.load(fh)

    repo_override = os.environ.get("REPO_OVERRIDE", "").strip()
    if repo_override:
        target_repo = repo_override
    else:
        entries: list = config.get("repositories", [])
        if not entries:
            sys.exit("❌  No repositories in repos.json. Add at least one entry.")
        idx = (datetime.date.today().timetuple().tm_yday - 1) % len(entries)
        target_repo = entries[idx]

    token_env_name = org_token_env_name(target_repo)

    # Write to GITHUB_OUTPUT when running inside GitHub Actions
    github_output = os.environ.get("GITHUB_OUTPUT")
    if github_output:
        with open(github_output, "a") as fh:
            fh.write(f"target_repo={target_repo}\n")
            fh.write(f"token_env_name={token_env_name}\n")
    else:
        # Local testing fallback
        print(f"target_repo={target_repo}")
        print(f"token_env_name={token_env_name}")


if __name__ == "__main__":
    main()
