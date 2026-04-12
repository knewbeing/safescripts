"""下载并写入 Copilot 工具文件到目标仓库。

支持两种来源：
  1. 网络下载（trending 仓库工具）：工具条目含 download_url，从 GitHub Raw 下载内容。
  2. 内置内容（默认推荐工具）：工具条目含 content 字段，直接写入，无需网络。

安全约束：
  - 拒绝路径穿越（目标路径必须位于 repo_dir 内）。

安装策略：
  - 文件不存在 → 新建（记录为 "new"）
  - 文件已存在 → 覆盖更新（记录为 "updated"）
  - 两种情况都计入返回列表，确保 COPILOT_TOOLS.md 重新生成时包含最新内容。
"""

from __future__ import annotations

import logging
from pathlib import Path

import requests

logger = logging.getLogger(__name__)

# 工具类型 → 默认子目录映射（当工具未显式提供目标路径时使用）
_TOOL_DIRS: dict[str, str] = {
    "instruction": ".github/instructions",
    "agent": ".github/agents",
    "skill": ".github/prompts",
}

# 工具类型 → 默认文件扩展名（当原始路径无扩展名时使用）
_DEFAULT_SUFFIX: dict[str, str] = {
    "instruction": ".instructions.md",
    "agent": ".md",
    "skill": ".prompt.md",
}


def _is_under_repo(repo_dir: Path, candidate: Path) -> bool:
    """检查 candidate 是否位于 repo_dir 下（防止路径穿越）。"""
    resolved = candidate.resolve(strict=False)
    return resolved == repo_dir.resolve(strict=False) or repo_dir.resolve(strict=False) in resolved.parents


def _safe_relative_path(raw_path: str) -> Path | None:
    """规范化相对路径，拒绝绝对路径、盘符路径与路径穿越。"""
    normalized = str(raw_path).strip().replace("\\", "/")
    if not normalized or normalized.startswith("/"):
        return None

    parts: list[str] = []
    for part in Path(normalized).parts:
        if part in {"", "."}:
            continue
        if part == ".." or part.endswith(":"):
            return None
        parts.append(part)

    if not parts:
        return None
    return Path(*parts)


def _safe_tool_name(name: str) -> str:
    """清洗工具名，避免生成危险或非法路径片段。"""
    cleaned = "".join(ch if (ch.isalnum() or ch in "-_.") else "-" for ch in name.strip())
    while ".." in cleaned:
        cleaned = cleaned.replace("..", "-")
    return cleaned.strip(".-")


def install_tools(repo_dir: Path, tools: list[dict]) -> list[dict]:
    """安装/更新 *tools* 到 *repo_dir*。

    返回实际写入（新增或更新）的工具列表，每个条目附加 ``_action`` 字段
    （值为 ``"new"`` 或 ``"updated"``），便于 PR 描述区分变更类型。
    """
    installed: list[dict] = []
    for tool in tools:
        try:
            action = _install_one(repo_dir, tool)
            if action:
                installed.append({**tool, "_action": action})
        except Exception as exc:
            logger.error("安装 '%s' 失败: %s", tool.get("name"), exc)
    return installed


def _install_one(repo_dir: Path, tool: dict) -> str | None:
    """写入单个工具文件。

    Returns:
        ``"new"``     — 文件新建
        ``"updated"`` — 文件已存在，内容已更新
        ``None``      — 跳过（无内容来源）
    """
    tool_type = str(tool.get("type", "")).strip()
    raw_name = str(tool.get("name", "")).strip()
    download_url = tool.get("download_url")
    inline_content = tool.get("content")       # 内置工具直接提供内容
    source_repo = tool.get("source_repo", "unknown")

    if tool_type not in {"instruction", "agent", "skill"}:
        logger.info("跳过未知工具类型: %s", tool_type)
        return None
    if not raw_name:
        logger.info("跳过空工具名条目")
        return None

    safe_name = _safe_tool_name(raw_name)
    if not safe_name:
        logger.info("跳过无效工具名: %s", raw_name)
        return None

    # 至少需要一种内容来源
    if not download_url and inline_content is None:
        return None

    # ── 确定写入路径 ────────────────────────────────────────────────
    explicit_path = tool.get("target_path") or tool.get("path")
    if explicit_path:
        safe_rel_path = _safe_relative_path(str(explicit_path))
        if not safe_rel_path:
            logger.warning("拒绝非法目标路径: %s", explicit_path)
            return None
        target = repo_dir / safe_rel_path
    # 特殊情况：根级 copilot-instructions.md
    elif raw_name == "copilot-instructions" and tool_type == "instruction":
        target = repo_dir / ".github" / "copilot-instructions.md"
    else:
        # target_dir 字段由内置工具显式提供；其余工具走类型默认目录
        target_dir_rel = str(tool.get("target_dir") or _TOOL_DIRS.get(tool_type, ".github/instructions"))
        target_dir = repo_dir / target_dir_rel
        suffix = tool.get("suffix") or _resolve_suffix(tool)
        target = target_dir / f"{safe_name}{suffix}"

    # 防止路径穿越：目标必须在 repo_dir 内
    if not _is_under_repo(repo_dir, target):
        logger.warning("拒绝写入仓库目录外文件: %s", target)
        return None

    already_exists = target.exists()

    # ── 获取文件内容 ────────────────────────────────────────────────
    if inline_content is not None:
        # 内置工具：直接使用嵌入内容
        content = str(inline_content)
    else:
        # Trending 工具：从 GitHub Raw 下载
        resp = requests.get(download_url, timeout=30)
        resp.raise_for_status()
        content = resp.text
        # 追加来源注释（仅下载内容，内置工具自身已有说明）
        attribution = f"<!-- Source: https://github.com/{source_repo} -->\n\n"
        if not content.lstrip().startswith("<!--"):
            content = attribution + content

    # ── 写入文件（覆盖已有内容，实现更新语义）──────────────────────
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content, encoding="utf-8")

    action = "updated" if already_exists else "new"
    verb = "更新" if already_exists else "安装"
    logger.info("%s %s '%s' → %s", verb, tool_type, safe_name, target.relative_to(repo_dir))
    return action


def _resolve_suffix(tool: dict) -> str:
    """从工具的原始文件路径推导扩展名，找不到时使用类型默认值。"""
    original = tool.get("path", "").split("/")[-1]
    if "." in original:
        # 保留完整扩展名，如 ".instructions.md"、".prompt.md"
        _, ext = original.split(".", 1)
        return f".{ext}"
    return _DEFAULT_SUFFIX.get(tool["type"], ".md")
