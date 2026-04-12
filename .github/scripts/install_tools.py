"""Download and write Copilot tools into the target repo working directory."""

from __future__ import annotations

import logging
from pathlib import Path

import requests

logger = logging.getLogger(__name__)

# Maps tool type → target sub-directory within .github/
_TOOL_DIRS: dict[str, str] = {
    "instruction": ".github/instructions",
    "agent": ".github/agents",
    "skill": ".github/prompts",
}

# Maps tool type → filename suffix when the original lacks one
_DEFAULT_SUFFIX: dict[str, str] = {
    "instruction": ".instructions.md",
    "agent": ".md",
    "skill": ".prompt.md",
}


def install_tools(repo_dir: Path, tools: list[dict]) -> list[dict]:
    """Install *tools* into *repo_dir*. Returns the list of actually-installed tools."""
    installed: list[dict] = []
    for tool in tools:
        try:
            if _install_one(repo_dir, tool):
                installed.append(tool)
        except Exception as exc:
            logger.error("Failed to install '%s': %s", tool.get("name"), exc)
    return installed


def _install_one(repo_dir: Path, tool: dict) -> bool:
    """Download and write a single tool file. Returns True when written."""
    tool_type = tool["type"]
    name = tool["name"]
    download_url = tool.get("download_url")
    source_repo = tool.get("source_repo", "unknown")

    if not download_url:
        return False

    # Special-case: repo-level copilot-instructions.md
    if name == "copilot-instructions" and tool_type == "instruction":
        target = repo_dir / ".github" / "copilot-instructions.md"
    else:
        target_dir = repo_dir / _TOOL_DIRS.get(tool_type, ".github/instructions")
        target_dir.mkdir(parents=True, exist_ok=True)
        suffix = _resolve_suffix(tool)
        target = target_dir / f"{name}{suffix}"

    if target.exists():
        logger.info("Skip '%s': already present at %s", name, target)
        return False

    resp = requests.get(download_url, timeout=30)
    resp.raise_for_status()
    content = resp.text

    # Prepend attribution comment
    attribution = f"<!-- Source: https://github.com/{source_repo} -->\n\n"
    if not content.lstrip().startswith("<!--"):
        content = attribution + content

    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content, encoding="utf-8")
    logger.info("Installed %s '%s' → %s", tool_type, name, target.relative_to(repo_dir))
    return True


def _resolve_suffix(tool: dict) -> str:
    original = tool.get("path", "").split("/")[-1]
    if "." in original:
        # Preserve the full extension (e.g. ".instructions.md", ".prompt.md")
        _, ext = original.split(".", 1)
        return f".{ext}"
    return _DEFAULT_SUFFIX.get(tool["type"], ".md")
