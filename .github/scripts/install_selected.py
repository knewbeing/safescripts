"""Step 5 of 9: 读取 AI 分析结果，安装工具到目标仓库 clone，扫描已安装工具输出文档数据。

上游输入：
  /tmp/ai_tools/candidates.json        — scan_ai_candidates.py 输出的候选列表
  /tmp/ai_tools/target_repo_info.json  — 目标仓库元数据
  AI_ANALYSIS env                      — actions/ai-inference analyze 步骤输出的 JSON

输出文件：
  /tmp/target-repo-clone/              — 带有工具文件的克隆目录（持续到 commit_pr.py）
  /tmp/ai_tools/installed_tools.json   — 安装摘要 + 工具预览（供 readme 生成步骤使用）

GITHUB_OUTPUT：
  has_installed  — 'true' 表示至少有工具被写入
  from_defaults  — 'true' 表示使用了兜底工具集
  branch_name    — 创建的分支名
  new_count      — 新增文件数
  updated_count  — 更新文件数
"""

from __future__ import annotations

import datetime
import json
import logging
import os
import shutil
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from default_tools import get_default_tools
from install_tools import install_tools

logging.basicConfig(level=logging.INFO, format="%(levelname)s  %(message)s")
logger = logging.getLogger(__name__)

TMP_DIR = Path("/tmp/ai_tools")
CLONE_DIR = Path("/tmp/target-repo-clone")
BOT_EMAIL = "github-actions[bot]@users.noreply.github.com"
BOT_NAME = "github-actions[bot]"

def _git(args: list[str], cwd: str = str(CLONE_DIR)) -> subprocess.CompletedProcess:
    return subprocess.run(["git", "-C", cwd, *args], check=True, capture_output=True)


def _write_output(key: str, value: str) -> None:
    github_output = os.environ.get("GITHUB_OUTPUT")
    if github_output:
        with open(github_output, "a") as fh:
            fh.write(f"{key}={value}\n")
    else:
        print(f"[OUTPUT] {key}={value}")


def _build_branch_name(target_repo: str) -> str:
    """唯一分支名：<repo>/update-ai-tools/<UTC时间>-run-<run_id>-a<attempt>"""
    repo_name = target_repo.split("/", 1)[-1].strip().lower()
    slug = "".join(c if (c.isalnum() or c in "._-") else "-" for c in repo_name)
    slug = slug.strip(".-") or "target-repo"
    ts = datetime.datetime.utcnow().strftime("%Y%m%d-%H%M%S")
    run_id = os.environ.get("GITHUB_RUN_ID", "local").strip() or "local"
    attempt = os.environ.get("GITHUB_RUN_ATTEMPT", "1").strip() or "1"
    return f"{slug}/update-ai-tools/{ts}-run-{run_id}-a{attempt}"


def _classify_tool_path(path: str) -> str | None:
    lowered = path.lower().replace("\\", "/")
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


def _scan_installed(clone_dir: Path) -> list[dict]:
    """扫描仓库内所有已安装工具文件。"""
    tools: list[dict] = []

    for f in sorted(clone_dir.rglob("*")):
        if not f.is_file() or ".git" in f.parts:
            continue
        rel_path = str(f.relative_to(clone_dir)).replace("\\", "/")
        tool_type = _classify_tool_path(rel_path)
        if not tool_type:
            continue
        tools.append({
            "name": f.name.split(".")[0],
            "type": tool_type,
            "path": rel_path,
            "preview": f.read_text(encoding="utf-8")[:800],
        })
    return tools


def main() -> None:
    target_repo = os.environ.get("TARGET_REPO", "").strip()
    if not target_repo:
        raise SystemExit("❌  TARGET_REPO missing")

    target_token = (
        os.environ.get("RESOLVED_ORG_TOKEN", "").strip()
        or os.environ.get("TARGET_REPO_TOKEN", "").strip()
    )
    if not target_token:
        raise SystemExit("❌  No PAT available for target repo git ops")

    # ── 读取目标仓库元数据 ──────────────────────────────────────────────
    info_path = TMP_DIR / "target_repo_info.json"
    default_branch = "main"
    if info_path.exists():
        info = json.loads(info_path.read_text(encoding="utf-8"))
        default_branch = info.get("default_branch", "main")

    # ── 解析 AI 相关性分析结果 ──────────────────────────────────────────
    # AI_ANALYSIS 是 actions/ai-inference 的 response 输出（JSON 文本）
    ai_raw = os.environ.get("AI_ANALYSIS", "").strip()
    selected_ids: set[str] = set()
    if ai_raw:
        try:
            parsed = json.loads(ai_raw)
            selected_ids = set(parsed.get("selected_ids", []))
            logger.info(
                "AI 选出 %d 个工具：%s",
                len(selected_ids),
                parsed.get("reason", ""),
            )
        except Exception as exc:
            logger.warning("AI 分析结果解析失败（将使用兜底工具集）: %s", exc)

    # ── 从候选列表过滤 AI 选出的工具 ────────────────────────────────────
    candidates_path = TMP_DIR / "candidates.json"
    candidates: list[dict] = []
    if candidates_path.exists():
        candidates = json.loads(candidates_path.read_text(encoding="utf-8"))

    matched: list[dict] = []
    if selected_ids:
        for item in candidates:
            for tool in item["tools"]:
                if tool.get("id") in selected_ids:
                    matched.append(tool)

    from_defaults = not bool(matched)
    tools_to_install = get_default_tools() if from_defaults else matched

    if from_defaults:
        logger.info("未找到 AI 匹配工具（或分析跳过），使用内置通用工具集兜底")
    else:
        logger.info("将安装 %d 个 AI 选出的工具", len(matched))

    # ── Clone 目标仓库 ──────────────────────────────────────────────────
    branch_name = _build_branch_name(target_repo)
    clone_url = f"https://x-access-token:{target_token}@github.com/{target_repo}.git"
    logger.info("正在 clone %s …", target_repo)
    if CLONE_DIR.exists():
        shutil.rmtree(CLONE_DIR)
    subprocess.run(
        ["git", "clone", "--depth=1", clone_url, str(CLONE_DIR)],
        check=True,
        capture_output=True,
    )
    _git(["config", "user.email", BOT_EMAIL])
    _git(["config", "user.name", BOT_NAME])
    _git(["checkout", "-b", branch_name])

    # ── 安装工具（安全约束由 install_tools.py 强制：仅允许仓库内相对路径）──
    installed = install_tools(CLONE_DIR, tools_to_install)
    new_count = sum(1 for t in installed if t.get("_action") == "new")
    updated_count = sum(1 for t in installed if t.get("_action") == "updated")
    logger.info("工具写入完毕：%d 新增，%d 更新", new_count, updated_count)

    # ── 扫描全部已安装工具（含安装前已存在的），提供预览给 readme 生成步骤 ──
    all_installed_tools = _scan_installed(CLONE_DIR)

    summary = {
        "target_repo": target_repo,
        "branch_name": branch_name,
        "default_branch": default_branch,
        "new_count": new_count,
        "updated_count": updated_count,
        "from_defaults": from_defaults,
        "installed_this_run": [
            {
                "name": t["name"],
                "type": t["type"],
                "path": t.get("path", ""),
                "_action": t.get("_action"),
            }
            for t in installed
        ],
        "all_tools": all_installed_tools,  # 供 readme 生成步骤使用（含文件预览）
    }
    TMP_DIR.mkdir(parents=True, exist_ok=True)
    (TMP_DIR / "installed_tools.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    has_installed = bool(installed) or bool(all_installed_tools)
    _write_output("has_installed", "true" if has_installed else "false")
    _write_output("from_defaults", "true" if from_defaults else "false")
    _write_output("branch_name", branch_name)
    _write_output("new_count", str(new_count))
    _write_output("updated_count", str(updated_count))


if __name__ == "__main__":
    main()
