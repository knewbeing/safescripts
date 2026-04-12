"""Use Python + GitHub Models to classify installed tools and generate Chinese annotations."""

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


def _write_result(payload: dict) -> None:
    path = TMP_DIR / "annotations.json"
    compact = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    path.write_text(compact, encoding="utf-8")
    _write_output("response_file", str(path))


def main() -> None:
    installed_path = TMP_DIR / "installed_tools.json"
    if not installed_path.exists():
        logger.warning("installed_tools.json 不存在，跳过注释生成")
        return

    summary = json.loads(installed_path.read_text(encoding="utf-8"))
    all_tools = summary.get("all_tools", [])
    if not all_tools:
        logger.info("没有已安装工具，跳过注释生成")
        return

    # Trim preview to reduce token usage
    for tool in all_tools:
        preview = tool.get("preview", "")
        if len(preview) > 400:
            tool["preview"] = preview[:400]

    try:
        client, token_source = create_models_client()
        logger.info("Generating Chinese annotations with GitHub Models (%s, model=%s)", token_source, MODEL)
    except Exception as exc:
        log_models_error("Annotation generation setup", exc)
        return

    # Batch tools to stay under token limits
    BATCH_SIZE = 15
    batches = [all_tools[i:i + BATCH_SIZE] for i in range(0, len(all_tools), BATCH_SIZE)]
    if len(batches) > 1:
        logger.info("Splitting %d tools into %d batches", len(all_tools), len(batches))

    all_annotated: list[dict] = []
    all_categories: list[str] = []

    for batch_idx, batch in enumerate(batches):
        try:
            raw = request_from_prompt(
                client=client,
                model=MODEL,
                prompt_path=PROMPTS_DIR / "annotate-tools.prompt.yml",
                variables={
                    "installed_tools_json": json.dumps(batch, ensure_ascii=False),
                },
            )
            result = json.loads(raw)
        except Exception as exc:
            log_models_error(f"Annotation generation (batch {batch_idx + 1}/{len(batches)})", exc)
            continue

        for item in result.get("tools", []):
            all_annotated.append(item)
        for cat in result.get("category_order", []):
            if str(cat).strip() and str(cat) not in all_categories:
                all_categories.append(str(cat))

    valid_paths = {str(tool.get("path", "")).replace("\\", "/") for tool in all_tools}
    filtered_tools: list[dict] = []
    seen_paths: set[str] = set()
    for item in all_annotated:
        path = str(item.get("path", "")).replace("\\", "/")
        if path not in valid_paths or path in seen_paths:
            continue
        seen_paths.add(path)
        filtered_tools.append(
            {
                "path": path,
                "category": str(item.get("category") or "通用助手"),
                "zh_name": str(item.get("zh_name") or Path(path).stem)[:10],
                "zh_description": str(item.get("zh_description") or "用于辅助开发工作的 Copilot 工具。"),
                "zh_usage": str(item.get("zh_usage") or "在 VS Code 或 GitHub Copilot 中按对应方式调用。"),
                "zh_tags": [str(tag) for tag in (item.get("zh_tags") or []) if str(tag).strip()][:5],
            }
        )

    payload = {
        "tools": filtered_tools,
        "category_order": all_categories if all_categories else ["通用助手"],
    }
    _write_result(payload)
    logger.info("Generated annotations for %d tool(s)", len(filtered_tools))


if __name__ == "__main__":
    main()
