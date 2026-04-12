"""扫描已安装的 Copilot 工具并使用 GitHub Models API 生成 .github/COPILOT_TOOLS.md。

鉴权方式：
  GitHub Models Inference API 与 OpenAI SDK 完全兼容。
  端点：https://models.github.ai/inference
  Token：使用 models_token（来自 COPILOT_TOKEN / MODELS_TOKEN / GITHUB_TOKEN）。
"""

from __future__ import annotations

import json
import logging
from pathlib import Path

from openai import OpenAI

logger = logging.getLogger(__name__)

# GitHub Models Inference API 端点（OpenAI 兼容）
_MODELS_ENDPOINT = "https://models.github.ai/inference"
_API_VERSION = "2022-11-28"
# 使用旗舰模型生成高质量的分类文档
_MODEL = "openai/gpt-4.1"
_README_PATH = ".github/COPILOT_TOOLS.md"

_SCAN_MAP: dict[str, str] = {
    "instructions": "instruction",
    "agents": "agent",
    "prompts": "skill",
}


def organize_and_generate_readme(repo_dir: Path, models_token: str) -> None:
    """扫描 repo_dir 中已安装的工具并写入 COPILOT_TOOLS.md。

    使用 GitHub Models API（models_token 鉴权）调用 GPT-4.1 生成分类文档。
    """
    tools = _scan_tools(repo_dir)
    if not tools:
        logger.info("未发现工具文件，跳过 README 生成")
        return

    client = OpenAI(
        base_url=_MODELS_ENDPOINT,
        api_key=models_token,
        default_headers={
            "X-GitHub-Api-Version": _API_VERSION,
            "Accept": "application/vnd.github+json",
        },
    )
    content = _generate_with_ai(client, tools)

    readme = repo_dir / _README_PATH
    readme.parent.mkdir(parents=True, exist_ok=True)
    readme.write_text(content, encoding="utf-8")
    logger.info("COPILOT_TOOLS.md written (%d tools documented)", len(tools))


# ------------------------------------------------------------------ #
# Private helpers                                                      #
# ------------------------------------------------------------------ #


def _scan_tools(repo_dir: Path) -> list[dict]:
    github_dir = repo_dir / ".github"
    tools: list[dict] = []

    # Root copilot-instructions.md
    root = github_dir / "copilot-instructions.md"
    if root.exists():
        tools.append(
            {
                "name": "copilot-instructions",
                "type": "instruction",
                "path": ".github/copilot-instructions.md",
                "preview": root.read_text(encoding="utf-8")[:800],  # 增大预览窗口
            }
        )

    for subdir, tool_type in _SCAN_MAP.items():
        subdir_path = github_dir / subdir
        if not subdir_path.exists():
            continue
        for f in sorted(subdir_path.glob("*.md")):
            tools.append(
                {
                    "name": f.name.split(".")[0],
                    "type": tool_type,
                    "path": str(f.relative_to(repo_dir)).replace("\\", "/"),
                    "preview": f.read_text(encoding="utf-8")[:800],  # 增大预览窗口以获取更丰富上下文
                }
            )

    return tools


def _generate_with_ai(client: OpenAI, tools: list[dict]) -> str:
    tools_json = json.dumps(
        [{"name": t["name"], "type": t["type"], "path": t["path"], "preview": t["preview"]} for t in tools],
        ensure_ascii=False,
        indent=2,
    )

    prompt = f"""You are a technical writer creating documentation for GitHub Copilot tools installed in a repository.

Here are all Copilot tools found in the repository (with file previews):

{tools_json}

Write a professional, developer-friendly COPILOT_TOOLS.md (Markdown) with the following structure:

## Overview
A short paragraph (2-3 sentences) summarising what tools are installed and their collective purpose.

## 🚀 Quick Start
A brief guide explaining how to use each tool type in GitHub Copilot:

### Instructions (auto-applied)
Explain that `.instructions.md` files in `.github/instructions/` are automatically picked up by
GitHub Copilot based on their `applyTo` glob pattern. No user action needed — they apply contextually.

### Agents (invoke in chat)
Explain that agent files in `.github/agents/` can be invoked in Copilot Chat by typing `@agent-name`
or selecting them from the agent picker in VS Code. Include an example like `@architect Design the auth module`.

### Skills / Prompts (run from prompt files)
Explain that `.prompt.md` files in `.github/prompts/` appear in the Copilot prompt picker (Ctrl+I or
the chat slash menu). Include an example like selecting "explain" after highlighting code.

## 📋 Instructions
For each instruction tool: H3 heading with the tool name, file path in a code span, a short description
inferred from the preview, and a note on which files it applies to (from the applyTo frontmatter if visible).

## 🤖 Agents
For each agent: H3 heading with the agent name, file path in a code span, a description of what the agent
does, and a concrete **Usage example** showing how to invoke it in Copilot Chat (e.g. `@architect ...`).

## ⚡ Skills & Prompts
For each skill: H3 heading with the skill name, file path in a code span, a description of what it does,
and a concrete **How to use** section with:
  - Step-by-step invocation (select code → open Copilot → choose prompt)
  - An example prompt or expected output

## 📖 Tool Index
A summary table with columns: Tool | Type | File | Description

---
Footer note: "Auto-generated by repos-ai-tools-maintain. Tools were discovered from GitHub trending repositories or installed from the built-in recommended set."

Rules:
- Write in English
- Be concise but complete — each tool should have enough detail for a developer to use it immediately
- Do NOT include the JSON input in the output
- max_tokens budget is generous — use it to write thorough usage instructions"""

    try:
        resp = client.chat.completions.create(
            model=_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": "You are a technical writer. Generate clean, professional Markdown documentation.",
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.3,
            max_tokens=6000,
        )
        return resp.choices[0].message.content
    except Exception as exc:
        logger.error("AI README generation failed: %s", exc)
        return _simple_readme(tools)


def _simple_readme(tools: list[dict]) -> str:
    """Minimal fallback README without AI."""
    lines = [
        "# GitHub Copilot Tools\n\n",
        "Auto-generated overview of Copilot tools installed in this repository.\n\n",
    ]
    type_headers = {
        "instruction": "## 📋 Instructions",
        "agent": "## 🤖 Agents",
        "skill": "## ⚡ Skills & Prompts",
    }
    by_type: dict[str, list[dict]] = {}
    for t in tools:
        by_type.setdefault(t["type"], []).append(t)

    for tool_type, header in type_headers.items():
        if tool_type not in by_type:
            continue
        lines.append(f"{header}\n\n")
        for t in by_type[tool_type]:
            lines.append(f"### {t['name']}\n`{t['path']}`\n\n")
        lines.append("\n")

    return "".join(lines)
