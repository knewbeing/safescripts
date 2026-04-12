"""Use Python + GitHub Models to generate COPILOT_TOOLS.md content."""

from __future__ import annotations

import json
import logging
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from ai_models import create_models_client, log_models_error, request_from_prompt, PROMPTS_DIR

logging.basicConfig(level=logging.INFO, format="%(levelname)s  %(message)s")
logger = logging.getLogger(__name__)

TMP_DIR = Path("/tmp/ai_tools")
MODEL = "openai/gpt-4.1"


def _write_output(key: str, value: str) -> None:
    github_output = os.environ.get("GITHUB_OUTPUT")
    if github_output:
        with open(github_output, "a", encoding="utf-8") as fh:
            fh.write(f"{key}={value}\n")


def main() -> None:
    installed_path = TMP_DIR / "installed_tools.json"
    if not installed_path.exists():
        logger.warning("installed_tools.json 不存在，跳过 README 生成")
        return

    summary = json.loads(installed_path.read_text(encoding="utf-8"))
    all_tools = summary.get("all_tools", [])
    if not all_tools:
        logger.info("没有已安装工具，跳过 README 生成")
        return

    # Trim preview to reduce token usage
    for tool in all_tools:
        preview = tool.get("preview", "")
        if len(preview) > 400:
            tool["preview"] = preview[:400]

    try:
        client, token_source = create_models_client()
        logger.info("Generating README with GitHub Models (%s, model=%s)", token_source, MODEL)
        content = request_from_prompt(
            client=client,
            model=MODEL,
            prompt_path=PROMPTS_DIR / "generate-tools-readme.prompt.yml",
            variables={
                "installed_tools_json": json.dumps(all_tools, ensure_ascii=False),
            },
        )
    except Exception as exc:
        log_models_error("README generation", exc)
        return

    output_path = TMP_DIR / "readme_content.md"
    output_path.write_text(content, encoding="utf-8")
    _write_output("response_file", str(output_path))
    logger.info("Generated README content (%d bytes)", len(content))


if __name__ == "__main__":
    main()
