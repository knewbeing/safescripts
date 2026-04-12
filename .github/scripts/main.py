"""每日 Copilot 工具发现工作流的主编排脚本。

调用链路：
  workflow setup job (pick_repo.py)
      → 读取 repos.json，构建全部目标仓库 matrix，推导 token secret 名
      → 通过 GITHUB_OUTPUT 传递给 run job

  workflow run job (main.py，即本文件)
      → 从环境变量读取 TARGET_REPO / RESOLVED_ORG_TOKEN / TARGET_REPO_TOKEN
      → 抓取 GitHub Trending → 扫描 Copilot 工具 → AI 判断相关性
      → 安装工具 → 生成 README → commit → push → 创建 PR
"""

from __future__ import annotations

import datetime
import logging
import os
import subprocess
import sys
import tempfile
from pathlib import Path

# 把同级目录加入模块搜索路径，使 import 不依赖工作目录
sys.path.insert(0, str(Path(__file__).parent))

from analyze_tools import analyze_tool_relevance
from default_tools import get_default_tools
from fetch_trending import fetch_repo_copilot_tools, fetch_trending_repos
from github_api import GitHubAPI
from install_tools import install_tools
from organize_readme import organize_and_generate_readme

logging.basicConfig(level=logging.INFO, format="%(levelname)s  %(message)s")
logger = logging.getLogger(__name__)

# git commit 时使用 bot 身份，避免污染贡献者列表
_BOT_EMAIL = "github-actions[bot]@users.noreply.github.com"
_BOT_NAME = "github-actions[bot]"


# ------------------------------------------------------------------ #
# Helpers                                                              #
# ------------------------------------------------------------------ #


def _run(cmd: list[str], cwd: str | None = None) -> None:
    """执行任意 shell 命令，失败时抛出异常。"""
    subprocess.run(cmd, check=True, capture_output=True, cwd=cwd)


def _git(args: list[str], cwd: str) -> subprocess.CompletedProcess:
    """在指定目录执行 git 命令。"""
    return subprocess.run(["git", "-C", cwd, *args], check=True, capture_output=True)


def _setup_git(tmpdir: str) -> None:
    """配置 git 提交者身份为 github-actions bot。"""
    _git(["config", "user.email", _BOT_EMAIL], tmpdir)
    _git(["config", "user.name", _BOT_NAME], tmpdir)


def _has_staged_changes(tmpdir: str) -> bool:
    """返回 True 表示暂存区有待提交的变更。"""
    result = subprocess.run(
        ["git", "-C", tmpdir, "diff", "--cached", "--quiet"], capture_output=True
    )
    return result.returncode != 0  # 非零退出码 → 有变更


def _branch_repo_slug(repo_full_name: str) -> str:
    """从 owner/repo 提取 repo 名并转换为安全分支片段。"""
    repo_name = repo_full_name.split("/", 1)[-1].strip().lower()
    slug = "".join(ch if (ch.isalnum() or ch in "._-") else "-" for ch in repo_name)
    slug = slug.strip(".-")
    return slug or "target-repo"


def _remote_branch_exists(tmpdir: str, branch_name: str) -> bool:
    """检查远端 origin 上是否已存在指定分支。"""
    result = subprocess.run(
        ["git", "-C", tmpdir, "ls-remote", "--heads", "origin", branch_name],
        check=True,
        capture_output=True,
        text=True,
    )
    return bool(result.stdout.strip())


def _build_pr_body(installed: list[dict], target_repo: str, today: str, from_defaults: bool = False) -> str:
    # GITHUB_REPOSITORY 是本维护仓库自身的名称（owner/repo 格式），
    # GitHub Actions 会自动注入此变量，用于在 PR 描述中生成"来源"链接。
    maintenance_repo = os.environ.get("GITHUB_REPOSITORY", "knewbeing/repos-ai-tools-maintain")

    # 统计新增和更新的工具数量
    new_count = sum(1 for t in installed if t.get("_action") == "new")
    updated_count = sum(1 for t in installed if t.get("_action") == "updated")

    rows = "\n".join(
        "| {emoji} `{name}` | {type} | {action} | [{src}](https://github.com/{src}) |".format(
            emoji={"instruction": "📋", "agent": "🤖", "skill": "⚡"}.get(t["type"], "📄"),
            name=t["name"],
            type=t["type"],
            action="🆕 新增" if t.get("_action") == "new" else "🔄 更新",
            src=t.get("source_repo", ""),
        )
        for t in installed
    )

    if from_defaults:
        # 兜底安装：Trending 未命中，使用内置通用工具集
        discovery_text = (
            "Today's GitHub Trending scan found no tools relevant to this repository.\n"
            "Installed a curated set of recommended Copilot tools instead."
        )
        discovery_steps = (
            "1. Fetched the top 10 trending repositories on GitHub\n"
            "2. Scanned each for Copilot tools (instructions, agents, prompts)\n"
            "3. Used AI (GPT-4.1-mini via GitHub Models API) to judge relevance — no matches found\n"
            f"4. Fell back to **built-in recommended tools** ({len(installed)} tools installed)\n"
            "5. Reorganised and generated usage documentation in `.github/COPILOT_TOOLS.md`"
        )
        source_note = "built-in recommended Copilot tools"
    else:
        discovery_text = f"Installed {new_count} new and {updated_count} updated tool(s) from today's GitHub Trending."
        discovery_steps = (
            "1. Fetched the top 10 trending repositories on GitHub\n"
            "2. Scanned each for Copilot tools (instructions, agents, prompts)\n"
            "3. Used AI (GPT-4.1-mini via GitHub Models API) to judge relevance for `{target_repo}`\n"
            f"4. Installed/updated {len(installed)} compatible tool(s) into `.github/`\n"
            "5. Reorganised and generated usage documentation in `.github/COPILOT_TOOLS.md`"
        ).format(target_repo=target_repo)
        source_note = "GitHub trending repositories"

    return f"""## 🤖 Automated Copilot Tools Update — {today}

This PR was automatically generated by the [daily Copilot tools maintenance workflow](https://github.com/{maintenance_repo}).

> {discovery_text}

### 📦 Tools ({len(installed)} total: {new_count} new, {updated_count} updated)

| Tool | Type | Action | Source |
|------|------|--------|--------|
{rows}

### 🔍 Discovery process

{discovery_steps}

### 📁 Changed directories

| Directory | Purpose |
|-----------|---------|
| `.github/instructions/` | Language & framework-specific Copilot instructions |
| `.github/agents/` | Custom Copilot agent definitions |
| `.github/prompts/` | Reusable prompt templates (skills) |
| `.github/COPILOT_TOOLS.md` | Auto-generated tool overview with usage instructions |

### ✅ Review checklist

- [ ] Inspect each new/updated file for accuracy and relevance
- [ ] Read `.github/COPILOT_TOOLS.md` for the categorised overview and usage instructions
- [ ] Test tools with GitHub Copilot in VS Code
- [ ] Remove any tools that do not fit your workflow

---
*🤖 Generated by [repos-ai-tools-maintain](https://github.com/{maintenance_repo}) from {source_note}*
"""


# ------------------------------------------------------------------ #
# Main                                                                 #
# ------------------------------------------------------------------ #


def main() -> None:
    # ── 环境变量说明 ────────────────────────────────────────────────────
    # GITHUB_TOKEN        : GitHub Actions 自动注入的临时安装令牌。
    #                       作用域仅限本维护仓库自身，无法访问任何其他仓库。
    #                       用途1：GitHub API 只读调用（Trending 抓取兜底）。
    #                       用途2：GitHub Models API 默认鉴权（需 workflow 申请 models:read）。
    #
    # COPILOT_TOKEN       : （可选，推荐）GitHub Models API 的 PAT 兜底。
    # MODELS_TOKEN        : （可选，兼容旧配置）与 COPILOT_TOKEN 等价。
    #                       当 COPILOT_TOKEN / MODELS_TOKEN 均为空时自动回退使用 GITHUB_TOKEN。
    #                       若提供 PAT，需具备 models:read（fine-grained）或等效权限。
    #
    # TARGET_REPO         : 由 matrix 注入，格式 "owner/repo"，本次处理的目标仓库。
    #
    # RESOLVED_ORG_TOKEN  : 由 workflow 通过 secrets[matrix.token_env_name] 动态查找。
    #                       token_env_name 由 pick_repo.py 推导（如 ANOTHER_ORG_GITHUB_TOKEN）。
    #                       用于 clone/push/PR 目标仓库（需 repo 权限的 PAT）。
    #                       若该 secret 未注册则为空字符串。
    #
    # TARGET_REPO_TOKEN   : 通用兜底 PAT，RESOLVED_ORG_TOKEN 为空时使用。
    #
    # GITHUB_REPOSITORY   : 本维护仓库名（owner/repo），用于在 PR 描述中生成来源链接。
    #
    # 注意：GITHUB_TOKEN 的作用域仅限本仓库。
    #       即使目标仓库与本仓库属于同一 org/user，也无法用 GITHUB_TOKEN 访问。
    #       所有目标仓库的 git 操作（clone/push/PR）都必须使用 PAT。
    # ───────────────────────────────────────────────────────────────────

    github_token = os.environ.get("GITHUB_TOKEN")
    if not github_token:
        raise SystemExit("❌  GITHUB_TOKEN 环境变量缺失（GitHub Actions 应自动注入）")
    models_token = (
        os.environ.get("COPILOT_TOKEN", "").strip()
        or os.environ.get("MODELS_TOKEN", "").strip()
        or github_token
    )

    # TARGET_REPO 由 setup job 通过 GITHUB_OUTPUT 传递，再由 workflow env: 注入
    target_repo = os.environ.get("TARGET_REPO", "").strip()
    if not target_repo:
        raise SystemExit("❌  TARGET_REPO 环境变量缺失（应由 setup job 传入）")

    # ── Token 解析（两级优先级）────────────────────────────────────────
    #
    # GITHUB_TOKEN 的作用域仅限本仓库，任何外部目标仓库都必须使用 PAT。
    #
    # 1. RESOLVED_ORG_TOKEN：
    #    由 workflow 通过 secrets[matrix.token_env_name] 动态查找。
    #    token_env_name 约定为 <OWNER>_GITHUB_TOKEN（大写，连字符→下划线）。
    #    在本仓库 Settings → Secrets 中注册后自动生效，无需修改 workflow YAML。
    #
    # 2. TARGET_REPO_TOKEN：
    #    静态兜底 PAT，RESOLVED_ORG_TOKEN 未注册时使用。
    # ───────────────────────────────────────────────────────────────────
    target_owner = target_repo.split("/")[0].upper().replace("-", "_")
    target_token = (
        os.environ.get("RESOLVED_ORG_TOKEN", "").strip()    # 优先：<ORG>_GITHUB_TOKEN
        or os.environ.get("TARGET_REPO_TOKEN", "").strip()   # 兜底：TARGET_REPO_TOKEN
    )
    if not target_token:
        raise SystemExit(
            f"❌  找不到 '{target_repo}' 的访问 token。\n"
            f"    请在本仓库 Settings → Secrets 中添加 '{target_owner}_GITHUB_TOKEN'\n"
            f"    （PAT 需要 repo 权限），然后重新运行 workflow。"
        )

    logger.info("目标仓库: %s", target_repo)

    api = GitHubAPI(target_token)

    try:
        repo_info = api.get_repo_info(target_repo)
    except Exception as exc:
        raise SystemExit(f"❌  无法访问仓库 '{target_repo}': {exc}")

    default_branch = repo_info.get("default_branch", "main")

    # ── 步骤 1：抓取 GitHub Trending 前 10 仓库 ────────────────────────
    # 使用 GITHUB_TOKEN（只读）抓取，不需要写权限
    logger.info("正在抓取 GitHub Trending 仓库…")
    trending = fetch_trending_repos(github_token)
    if not trending:
        logger.warning("未获取到 Trending 仓库，退出。")
        return
    logger.info("获取到 %d 个 Trending 仓库", len(trending))

    # ── 步骤 2：扫描每个 Trending 仓库中的 Copilot 工具文件 ────────────
    # 扫描 .github/instructions/ .github/agents/ .github/prompts/ 等目录
    candidates: list[dict] = []
    for repo in trending[:10]:
        full_name = repo["full_name"]
        logger.info("扫描 %s …", full_name)
        tools = fetch_repo_copilot_tools(full_name, github_token)
        if tools:
            logger.info("  └─ 发现 %d 个工具文件", len(tools))
            candidates.append({"repo": repo, "tools": tools})

    if not candidates:
        logger.info("Trending 仓库中未发现 Copilot 工具，将使用内置通用工具集兜底。")
        # 不提前退出，让 matched 保持空列表，触发后续的兜底安装逻辑

    # ── 步骤 3：AI 相关性分析 ──────────────────────────────────────────
    # 调用 GitHub Models API (GPT-4.1-mini) 判断工具是否适合目标仓库
    # 优先使用 COPILOT_TOKEN，再回退 MODELS_TOKEN，最后使用 GITHUB_TOKEN
    matched: list[dict] = []
    if candidates:
        logger.info("正在进行 AI 相关性分析…")
        for item in candidates:
            relevant = analyze_tool_relevance(
                target_repo=target_repo,
                target_repo_info=repo_info,
                source_repo=item["repo"],
                tools=item["tools"],
                models_token=models_token,
            )
            matched.extend(relevant)

    if not matched:
        logger.info("Trending 分析未找到适合 %s 的工具，将使用内置通用工具集兜底。", target_repo)
    else:
        logger.info("共选出 %d 个相关工具准备安装", len(matched))

    # ── 步骤 4：clone → 安装工具 → 整理 README → commit → push → PR ──
    # 无论 Trending 是否命中，都执行后续步骤（未命中时使用内置工具）
    from_defaults = not bool(matched)
    today = datetime.date.today().isoformat()
    # 分支命名策略：使用“当前目标仓库名 + update-ai-tools”（不带日期）
    # 示例：org-memory/update-ai-tools
    repo_slug = _branch_repo_slug(target_repo)
    branch_name = f"{repo_slug}/update-ai-tools"

    with tempfile.TemporaryDirectory() as tmpdir:
        # 使用 PAT 拼接认证 URL，实现无交互 clone
        clone_url = f"https://x-access-token:{target_token}@github.com/{target_repo}.git"
        logger.info("正在 clone %s …", target_repo)
        _run(["git", "clone", "--depth=1", clone_url, tmpdir])
        _setup_git(tmpdir)

        # 分支推送策略：
        # 1) 远端不存在该分支：创建新分支并首次推送
        # 2) 远端已存在该分支：基于远端分支检出并在其上继续更新
        remote_branch_exists = _remote_branch_exists(tmpdir, branch_name)
        if remote_branch_exists:
            logger.info("远端分支已存在，基于该分支继续更新: %s", branch_name)
            _git(["fetch", "origin", branch_name], tmpdir)
            _git(["checkout", "-B", branch_name, f"origin/{branch_name}"], tmpdir)
        else:
            logger.info("远端分支不存在，创建新分支: %s", branch_name)
            _git(["checkout", "-b", branch_name], tmpdir)

        repo_path = Path(tmpdir)

        # ── 步骤 5：安装或更新工具 ────────────────────────────────────
        # 策略：
        #   - 已找到 Trending 匹配工具 → 安装/更新这些工具（覆盖已有文件）
        #   - 未找到任何匹配工具      → 兜底安装内置通用推荐工具集
        # 两种情况均支持「更新已有文件」语义，确保工具内容始终是最新版本。
        if from_defaults:
            logger.info("安装内置通用推荐工具集…")
            tools_to_install = get_default_tools()
        else:
            tools_to_install = matched

        installed = install_tools(repo_path, tools_to_install)

        new_count = sum(1 for t in installed if t.get("_action") == "new")
        updated_count = sum(1 for t in installed if t.get("_action") == "updated")
        logger.info("工具写入完毕：%d 新增，%d 更新", new_count, updated_count)

        # ── 步骤 6：始终重新整理并生成 COPILOT_TOOLS.md ──────────────
        # 扫描目标仓库 .github/ 下所有已有工具（含本次安装前已存在的），
        # 使用 AI（GPT-4.1）重新分类并生成包含使用说明的文档。
        # 即使本次无新工具写入，README 内容也可能因 AI 重新生成而更新。
        logger.info("正在重新整理所有工具并生成 COPILOT_TOOLS.md…")
        organize_and_generate_readme(repo_path, models_token)

        _git(["add", ".github/"], tmpdir)

        if not _has_staged_changes(tmpdir):
            logger.info("暂存区无变更（工具与文档均已是最新），退出。")
            return

        tool_summary = f"{new_count} 新增, {updated_count} 更新" if installed else "仅更新文档"
        commit_msg = (
            f"chore: update ai tools [{today}] ({tool_summary})\n\n"
            f"{'Installed from built-in recommended tools' if from_defaults else 'Installed from GitHub trending'}\n\n"
            f"Co-authored-by: github-actions[bot] <{_BOT_EMAIL}>"
        )
        _git(["commit", "-m", commit_msg], tmpdir)

        logger.info("正在推送分支 '%s'…", branch_name)
        if remote_branch_exists:
            _git(["push", "origin", branch_name], tmpdir)
        else:
            _git(["push", "--set-upstream", "origin", branch_name], tmpdir)

        # 检查是否已有同名分支的 PR，避免重复创建
        if api.pr_exists(target_repo, branch_name, default_branch):
            logger.info("分支 '%s' 已存在 PR，跳过创建。", branch_name)
            return

        # 使用 target_token 在目标仓库创建 PR
        pr = api.create_pr(
            repo=target_repo,
            title=f"🤖 Update AI tools [{today}]{'  (recommended defaults)' if from_defaults else ''}",
            body=_build_pr_body(installed, target_repo, today, from_defaults=from_defaults),
            head=branch_name,
            base=default_branch,
        )
        logger.info("✅  PR 已创建: %s", pr["html_url"])


if __name__ == "__main__":
    main()
