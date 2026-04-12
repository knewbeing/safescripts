"""Step 4 of 7: 将 AI 生成的中文注释写入各工具文件，并生成分类索引 TOOLS_INDEX.md。

上游输入：
  /tmp/ai_tools/installed_tools.json  — install_selected.py 输出的工具摘要
  AI_ANNOTATIONS env                  — actions/ai-inference annotate 步骤输出的 JSON

本脚本操作：
  1. 解析 AI_ANNOTATIONS JSON，获取每个工具的中文元数据
  2. 读取 /tmp/target-repo-clone/ 中对应工具文件，插入中文注释头
  3. 写回文件（frontmatter 之后、正文之前插入）
  4. 生成 .github/TOOLS_INDEX.md（按分类汇总所有工具）
  5. 更新 /tmp/ai_tools/installed_tools.json 的 preview（供 readme 生成步骤使用）
"""

from __future__ import annotations

import json
import logging
import os
import sys
from pathlib import Path

logging.basicConfig(level=logging.INFO, format="%(levelname)s  %(message)s")
logger = logging.getLogger(__name__)

TMP_DIR = Path("/tmp/ai_tools")
CLONE_DIR = Path("/tmp/target-repo-clone")

# 分类图标映射
_CATEGORY_ICONS: dict[str, str] = {
    "编码规范": "📋",
    "代码审查": "🔍",
    "代码重构": "♻️",
    "测试辅助": "🧪",
    "文档生成": "📝",
    "安全审计": "🔒",
    "架构设计": "🏗️",
    "任务规划": "📌",
    "通用助手": "🤖",
}

# 工具类型中文名
_TYPE_ZH: dict[str, str] = {
    "instruction": "指令",
    "agent": "Agent",
    "skill": "提示词",
}


def _build_comment_block(a: dict) -> str:
    """构建 Markdown HTML 注释块（对 Copilot 不可见，对开发者可见）。"""
    tags = "、".join(a.get("zh_tags") or [])
    icon = _CATEGORY_ICONS.get(a.get("category", ""), "🔧")
    lines = [
        "<!--",
        f"{icon} 【中文注释】",
        f"  工具名称: {a.get('zh_name', '')}",
        f"  功能分类: {a.get('category', '')}",
        f"  功能说明: {a.get('zh_description', '')}",
        f"  使用方式: {a.get('zh_usage', '')}",
    ]
    if tags:
        lines.append(f"  关键标签: {tags}")
    lines.append("-->")
    return "\n".join(lines)


def _insert_annotation(content: str, comment: str) -> str:
    """将注释块插入文件内容。

    规则：
    - 若文件以 YAML frontmatter（---）开头，则插入到结束 --- 之后
    - 否则直接前置
    - 若已含有注释块（以 <!-- 开头），则替换而非重复插入
    """
    # 去掉已有的旧注释块
    if content.startswith("<!--"):
        end = content.find("-->")
        if end != -1:
            content = content[end + 3:].lstrip("\n")

    # 检测 YAML frontmatter
    if content.startswith("---\n") or content.startswith("---\r\n"):
        # 找到第二个 ---
        second = content.find("\n---", 3)
        if second != -1:
            end_of_fm = content.find("\n", second + 1) + 1  # 包含换行符
            return content[:end_of_fm] + "\n" + comment + "\n" + content[end_of_fm:]

    return comment + "\n\n" + content


def _generate_tools_index(annotations: list[dict], category_order: list[str]) -> str:
    """生成 .github/TOOLS_INDEX.md 分类索引文件。"""
    by_category: dict[str, list[dict]] = {}
    for a in annotations:
        cat = a.get("category", "通用助手")
        by_category.setdefault(cat, []).append(a)

    # 确保 category_order 包含所有已出现的分类
    seen = set(category_order)
    for cat in by_category:
        if cat not in seen:
            category_order.append(cat)
            seen.add(cat)

    lines = [
        "# 🛠️ Copilot 工具索引",
        "",
        "> 由 AI 自动整理分类，包含本仓库所有已安装的 GitHub Copilot 工具。",
        "> 使用 GitHub Copilot Chat 或 VS Code 中的 Copilot 功能调用这些工具。",
        "",
        "---",
        "",
    ]

    for cat in category_order:
        tools = by_category.get(cat, [])
        if not tools:
            continue
        icon = _CATEGORY_ICONS.get(cat, "🔧")
        lines.append(f"## {icon} {cat}")
        lines.append("")
        lines.append("| 工具 | 类型 | 说明 | 使用方式 |")
        lines.append("|------|------|------|----------|")
        for a in tools:
            path = a.get("path", "")
            zh_name = a.get("zh_name", path.split("/")[-1])
            tool_type = _TYPE_ZH.get(a.get("type", ""), "工具")
            zh_desc = a.get("zh_description", "")
            zh_usage = a.get("zh_usage", "").replace("\n", " ")
            lines.append(f"| [`{zh_name}`]({path}) | {tool_type} | {zh_desc} | {zh_usage} |")
        lines.append("")

    lines += [
        "---",
        "",
        "*此文件由 [repos-ai-tools-maintain](https://github.com/knewbeing/repos-ai-tools-maintain) "
        "workflow 自动生成。*",
        "",
    ]
    return "\n".join(lines)


def _refresh_preview(tool: dict, clone_dir: Path) -> dict:
    """重新读取文件前 800 字符更新 preview 字段。"""
    file_path = clone_dir / tool["path"]
    if file_path.exists():
        tool = dict(tool)
        tool["preview"] = file_path.read_text(encoding="utf-8")[:800]
    return tool


def main() -> None:
    # ── 读取安装摘要 ────────────────────────────────────────────────────
    installed_path = TMP_DIR / "installed_tools.json"
    if not installed_path.exists():
        logger.warning("installed_tools.json 不存在，跳过注释步骤")
        return

    summary = json.loads(installed_path.read_text(encoding="utf-8"))
    all_tools: list[dict] = summary.get("all_tools", [])
    if not all_tools:
        logger.info("没有工具需要注释，跳过")
        return

    # ── 解析 AI 注释结果 ────────────────────────────────────────────────
    ai_raw = os.environ.get("AI_ANNOTATIONS", "").strip()
    if not ai_raw:
        logger.warning("AI_ANNOTATIONS 为空（步骤已跳过或 AI 调用失败），跳过注释写入")
        return

    try:
        parsed = json.loads(ai_raw)
        annotations: list[dict] = parsed.get("tools", [])
        category_order: list[str] = parsed.get("category_order", [])
    except Exception as exc:
        logger.error("AI_ANNOTATIONS 解析失败: %s", exc)
        return

    if not annotations:
        logger.warning("AI 未返回任何注释条目，跳过")
        return

    # 构建 path → annotation 映射（注意大小写和斜杠兼容）
    path_to_annotation: dict[str, dict] = {
        a["path"].replace("\\", "/"): a for a in annotations
    }
    # 补充 tool_type 字段（从 all_tools 反查）
    path_to_type = {t["path"].replace("\\", "/"): t.get("type", "") for t in all_tools}
    for a in annotations:
        a["type"] = path_to_type.get(a["path"].replace("\\", "/"), "")

    # ── 写入中文注释到各工具文件 ────────────────────────────────────────
    written = 0
    for tool in all_tools:
        rel_path = tool["path"].replace("\\", "/")
        annotation = path_to_annotation.get(rel_path)
        if not annotation:
            logger.debug("工具 '%s' 未收到 AI 注释，跳过", rel_path)
            continue

        target = CLONE_DIR / rel_path
        if not target.exists():
            logger.warning("文件不存在，跳过: %s", target)
            continue

        original = target.read_text(encoding="utf-8")
        comment = _build_comment_block(annotation)
        updated = _insert_annotation(original, comment)

        if updated != original:
            target.write_text(updated, encoding="utf-8")
            logger.info("✅  已写入中文注释: %s", rel_path)
            written += 1
        else:
            logger.debug("注释无变化，跳过: %s", rel_path)

    logger.info("中文注释写入完毕：%d 个文件已更新", written)

    # ── 生成 TOOLS_INDEX.md ─────────────────────────────────────────────
    index_content = _generate_tools_index(list(annotations), list(category_order))
    index_path = CLONE_DIR / ".github" / "TOOLS_INDEX.md"
    index_path.parent.mkdir(parents=True, exist_ok=True)
    index_path.write_text(index_content, encoding="utf-8")
    logger.info("✅  已生成分类索引: .github/TOOLS_INDEX.md")

    # ── 刷新 installed_tools.json 的 preview（供后续 readme 步骤使用）──
    refreshed_tools = [_refresh_preview(t, CLONE_DIR) for t in all_tools]
    summary["all_tools"] = refreshed_tools
    installed_path.write_text(
        json.dumps(summary, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    logger.info("✅  已更新 installed_tools.json（刷新注释后预览）")


if __name__ == "__main__":
    main()
