"""GitHub REST API helper."""

from __future__ import annotations

import logging
from typing import Any

import requests

logger = logging.getLogger(__name__)

BASE_URL = "https://api.github.com"


class GitHubAPI:
    def __init__(self, token: str) -> None:
        self._headers = {
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        }

    def _get(self, path: str, **kwargs: Any) -> requests.Response:
        return requests.get(f"{BASE_URL}{path}", headers=self._headers, timeout=20, **kwargs)

    def _post(self, path: str, **kwargs: Any) -> requests.Response:
        return requests.post(f"{BASE_URL}{path}", headers=self._headers, timeout=20, **kwargs)

    # ------------------------------------------------------------------ #
    # Repository info                                                      #
    # ------------------------------------------------------------------ #

    def get_repo_info(self, full_name: str) -> dict:
        resp = self._get(f"/repos/{full_name}")
        resp.raise_for_status()
        return resp.json()

    def get_default_branch(self, full_name: str) -> str:
        return self.get_repo_info(full_name).get("default_branch", "main")

    # ------------------------------------------------------------------ #
    # Pull requests                                                        #
    # ------------------------------------------------------------------ #

    def pr_exists(self, repo: str, head_branch: str, base_branch: str) -> bool:
        resp = self._get(
            f"/repos/{repo}/pulls",
            params={"head": head_branch, "base": base_branch, "state": "open"},
        )
        if resp.status_code == 404:
            return False
        resp.raise_for_status()
        return len(resp.json()) > 0

    def create_pr(
        self, repo: str, title: str, body: str, head: str, base: str
    ) -> dict:
        resp = self._post(
            f"/repos/{repo}/pulls",
            json={"title": title, "body": body, "head": head, "base": base},
        )
        resp.raise_for_status()
        pr = resp.json()
        logger.info("PR created: %s", pr["html_url"])
        return pr
