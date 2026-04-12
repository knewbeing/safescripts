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

    def _graphql(self, query: str, variables: dict[str, Any]) -> dict[str, Any]:
        """调用 GitHub GraphQL API。"""
        resp = requests.post(
            f"{BASE_URL}/graphql",
            headers=self._headers,
            json={"query": query, "variables": variables},
            timeout=20,
        )
        resp.raise_for_status()
        payload = resp.json()
        errors = payload.get("errors") or []
        if errors:
            msg = "; ".join(err.get("message", "unknown GraphQL error") for err in errors)
            raise RuntimeError(msg)
        return payload.get("data") or {}

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

    def get_open_pr(self, repo: str, head_branch: str, base_branch: str) -> dict | None:
        resp = self._get(
            f"/repos/{repo}/pulls",
            params={"head": head_branch, "base": base_branch, "state": "open"},
        )
        if resp.status_code == 404:
            return None
        resp.raise_for_status()
        prs = resp.json()
        return prs[0] if prs else None

    def pr_exists(self, repo: str, head_branch: str, base_branch: str) -> bool:
        return self.get_open_pr(repo, head_branch, base_branch) is not None

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

    def enable_pr_auto_merge(self, pr_node_id: str, merge_method: str = "SQUASH") -> bool:
        """为 PR 启用自动合并（仓库需开启 Auto-merge）。"""
        mutation = """
mutation EnableAutoMerge($pullRequestId: ID!, $mergeMethod: PullRequestMergeMethod!) {
  enablePullRequestAutoMerge(
    input: { pullRequestId: $pullRequestId, mergeMethod: $mergeMethod }
  ) {
    pullRequest { number }
  }
}
"""
        try:
            self._graphql(
                query=mutation,
                variables={"pullRequestId": pr_node_id, "mergeMethod": merge_method},
            )
            return True
        except Exception:
            return False
