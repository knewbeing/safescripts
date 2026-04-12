"""Scan installed Copilot tools and generate .github/COPILOT_TOOLS.md using AI."""

from __future__ import annotations

import json
import logging
from pathlib import Path

from openai import OpenAI

logger = logging.getLogger(__name__)

_MODEL = "gpt-4o"
_MODELS_ENDPOINT = "https://models.inference.ai.azure.com"
_README_PATH = ".github/COPILOT_TOOLS.md"

_SCAN_MAP: dict[str, str] = {
    "instructions": "instruction",
    "agents": "agent",
    "prompts": "skill",
}


def organize_and_generate_readme(repo_dir: Path, github_token: str) -> None:
    """Scan tools in *repo_dir* and write/update COPILOT_TOOLS.md."""
    tools = _scan_tools(repo_dir)
    if not tools:
        logger.info("No tools found; skipping README generation")
        return

    client = OpenAI(base_url=_MODELS_ENDPOINT, api_key=github_token)
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
                "preview": root.read_text(encoding="utf-8")[:400],
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
                    "preview": f.read_text(encoding="utf-8")[:400],
                }
            )

    return tools


def _generate_with_ai(client: OpenAI, tools: list[dict]) -> str:
    tools_json = json.dumps(
        [{"name": t["name"], "type": t["type"], "path": t["path"], "preview": t["preview"]} for t in tools],
        ensure_ascii=False,
        indent=2,
    )

    prompt = f"""You are a technical writer creating documentation for GitHub Copilot tools.

Here are all Copilot tools found in the repository:

{tools_json}

Write a clear, professional COPILOT_TOOLS.md (Markdown) that:
1. Starts with a short overview (2-3 sentences)
2. Has a "Quick Start" section explaining how to activate each tool type in VS Code / GitHub Copilot
3. Groups tools by type with H2 headings: "## 📋 Instructions", "## 🤖 Agents", "## ⚡ Skills & Prompts"
4. For each tool: name (as H3), the file path in a code span, and a short description inferred from the preview
5. Ends with a note that these tools were auto-discovered from GitHub trending repositories

Write in English. Do not include the JSON input in the output."""

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
            max_tokens=3000,
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
