"""Use Python + GitHub Models to judge tool relevance for the target repository."""

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
MODEL = "openai/gpt-4.1-mini"


def _write_output(key: str, value: str) -> None:
    github_output = os.environ.get("GITHUB_OUTPUT")
    if github_output:
        with open(github_output, "a", encoding="utf-8") as fh:
            fh.write(f"{key}={value}\n")


def _write_result(payload: dict) -> None:
    compact = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    (TMP_DIR / "ai_analysis.json").write_text(compact, encoding="utf-8")
    _write_output("response", compact)


def _load_json(path_name: str) -> dict | list:
    path = TMP_DIR / path_name
    if not path.exists():
        raise SystemExit(f"❌  {path_name} not found")
    return json.loads(path.read_text(encoding="utf-8"))


def main() -> None:
    target_info = _load_json("target_repo_info.json")
    candidates = _load_json("candidates.json")

    if not isinstance(candidates, list) or not candidates:
        _write_result({"selected_ids": [], "reason": "No candidate repositories were available for AI relevance analysis."})
        return

    try:
        client, token_source = create_models_client()
        logger.info("Running tool relevance analysis with GitHub Models (%s, model=%s)", token_source, MODEL)
    except Exception as exc:
        log_models_error("Relevance analysis setup", exc)
        _write_result({"selected_ids": [], "reason": "GitHub Models authentication unavailable; falling back to default tools."})
        return

    selected_ids: list[str] = []
    reasons: list[str] = []

    # Max tools per request to stay under gpt-4.1-mini 8k token limit
    BATCH_SIZE = 30

    for item in candidates:
        repo = item.get("repo") or {}
        tools = item.get("tools") or []
        if not tools:
            continue

        all_tool_choices = [
            {
                "id": tool["id"],
                "type": tool.get("type", ""),
                "name": tool.get("name", ""),
                "path": tool.get("path", ""),
            }
            for tool in tools
        ]

        # Split into batches to avoid 413 Payload Too Large
        batches = [all_tool_choices[i:i + BATCH_SIZE] for i in range(0, len(all_tool_choices), BATCH_SIZE)]
        if len(batches) > 1:
            logger.info("Splitting %d tools from %s into %d batches", len(all_tool_choices), repo.get("full_name", "?"), len(batches))

        for batch in batches:
            try:
                raw = request_from_prompt(
                    client=client,
                    model=MODEL,
                    prompt_path=PROMPTS_DIR / "analyze-relevance.prompt.yml",
                    variables={
                        "target_repo_info": json.dumps(target_info, ensure_ascii=False),
                        "source_repo": json.dumps(repo, ensure_ascii=False),
                        "tool_choices": json.dumps(batch, ensure_ascii=False),
                    },
                )
                result = json.loads(raw)
            except Exception as exc:
                log_models_error(f"Relevance analysis for {repo.get('full_name', 'unknown')} (batch of {len(batch)})", exc)
                continue

            valid_ids = {tool["id"] for tool in batch}
            repo_selected = [
                tool_id for tool_id in result.get("selected_ids", [])
                if isinstance(tool_id, str) and tool_id in valid_ids and tool_id not in selected_ids
            ]
            selected_ids.extend(repo_selected)

            reason = str(result.get("reason") or "").strip()
            if repo_selected and reason:
                reasons.append(f"{repo.get('full_name', 'unknown')}: {reason}")

    payload = {
        "selected_ids": selected_ids[:10],
        "reason": " | ".join(reasons[:5]) if reasons else "No sufficiently relevant tools were selected by GitHub Models.",
    }
    _write_result(payload)
    logger.info("AI relevance analysis selected %d tool(s)", len(payload["selected_ids"]))


if __name__ == "__main__":
    main()
