"""Step 1 of 3: 抓取 GitHub Trending 并扫描 Copilot 工具。

工作流调用链：
  workflow run job
      → scan_trending.py        (本脚本：抓 Trending + 扫工具文件)
      → actions/ai-inference    (workflow 原生：相关性分析)
      → install_selected.py     (安装 AI 选出的工具)
      → actions/ai-inference    (workflow 原生：生成 COPILOT_TOOLS.md)
      → commit_pr.py            (commit → push → PR → auto-merge)

输出文件（供后续步骤消费）：
  /tmp/ai_tools/candidates.json        — 带 tool 列表的候选仓库
  /tmp/ai_tools/target_repo_info.json  — 目标仓库 GitHub 元数据

GITHUB_OUTPUT：
  has_candidates  — 'true' 表示至少找到一个带工具的趋势仓库
"""

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
    """写入 GITHUB_OUTPUT；本地测试时直接打印。"""
    github_output = os.environ.get("GITHUB_OUTPUT")
    if github_output:
        with open(github_output, "a") as fh:
            fh.write(f"{key}={value}\n")
    else:
        print(f"[OUTPUT] {key}={value}")


def main() -> None:
    github_token = os.environ.get("GITHUB_TOKEN", "").strip()
    if not github_token:
        raise SystemExit("❌  GITHUB_TOKEN missing")

    target_repo = os.environ.get("TARGET_REPO", "").strip()
    if not target_repo:
        raise SystemExit("❌  TARGET_REPO missing")

    target_token = (
        os.environ.get("RESOLVED_ORG_TOKEN", "").strip()
        or os.environ.get("TARGET_REPO_TOKEN", "").strip()
    )
    if not target_token:
        owner = target_repo.split("/")[0].upper().replace("-", "_")
        raise SystemExit(
            f"❌  No PAT for '{target_repo}'. "
            f"Add '{owner}_GITHUB_TOKEN' to repo secrets."
        )

    # ── 获取目标仓库元数据 ──────────────────────────────────────────────
    api = GitHubAPI(target_token)
    try:
        repo_info = api.get_repo_info(target_repo)
    except Exception as exc:
        raise SystemExit(f"❌  Cannot access '{target_repo}': {exc}")

    TMP_DIR.mkdir(parents=True, exist_ok=True)

    # 只保存 AI 分析所需的字段，避免传输大量无关数据
    (TMP_DIR / "target_repo_info.json").write_text(
        json.dumps(
            {
                "full_name": target_repo,
                "description": repo_info.get("description") or "",
                "language": repo_info.get("language") or "",
                "topics": repo_info.get("topics") or [],
                "default_branch": repo_info.get("default_branch", "main"),
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )

    # ── 抓取 GitHub Trending ────────────────────────────────────────────
    logger.info("正在抓取 GitHub Trending 仓库…")
    trending = fetch_trending_repos(github_token)
    if not trending:
        logger.warning("未获取到 Trending 仓库")
        (TMP_DIR / "candidates.json").write_text("[]", encoding="utf-8")
        _write_output("has_candidates", "false")
        return
    logger.info("获取到 %d 个 Trending 仓库", len(trending))

    # ── 扫描每个仓库的 Copilot 工具文件（仅 .md）────────────────────────
    candidates: list[dict] = []
    for repo in trending[:10]:
        full_name = repo["full_name"]
        logger.info("扫描 %s …", full_name)
        tools = fetch_repo_copilot_tools(full_name, github_token)
        if tools:
            logger.info("  └─ 发现 %d 个工具文件", len(tools))
            # 为每个工具分配全局唯一 ID（用于 AI 响应匹配）
            for tool in tools:
                tool["id"] = f"{full_name}::{tool['path']}"
            candidates.append({"repo": repo, "tools": tools})

    (TMP_DIR / "candidates.json").write_text(
        json.dumps(candidates, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    has_candidates = bool(candidates)
    total_tools = sum(len(c["tools"]) for c in candidates)
    logger.info(
        "候选来源: %d 个仓库，共 %d 个工具文件",
        len(candidates),
        total_tools,
    )
    _write_output("has_candidates", "true" if has_candidates else "false")


if __name__ == "__main__":
    main()
