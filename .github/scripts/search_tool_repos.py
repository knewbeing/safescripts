"""Use Python + GitHub Models to rank candidate source repositories."""

from __future__ import annotations

import json
import logging
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))

from ai_models import create_models_client, log_models_error, request_from_prompt, PROMPTS_DIR
from fetch_trending import fetch_trending_repos

logging.basicConfig(level=logging.INFO, format="%(levelname)s  %(message)s")
logger = logging.getLogger(__name__)

TMP_DIR = Path("/tmp/ai_tools")
MODEL = "openai/gpt-4.1"


def _write_output(key: str, value: str) -> None:
    github_output = os.environ.get("GITHUB_OUTPUT")
    if github_output:
        with open(github_output, "a", encoding="utf-8") as fh:
            fh.write(f"{key}={value}\n")


def _load_target_repo_info() -> dict:
    path = TMP_DIR / "target_repo_info.json"
    if not path.exists():
        raise SystemExit("❌  target_repo_info.json not found — run prepare_target_repo.py first")
    return json.loads(path.read_text(encoding="utf-8"))


def _fallback_response(reason: str) -> dict:
    payload = {"repos": [], "strategy_summary": reason}
    compact = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    (TMP_DIR / "repo_search.json").write_text(compact, encoding="utf-8")
    _write_output("response", compact)
    return payload


def main() -> None:
    github_token = os.environ.get("GITHUB_TOKEN", "").strip()
    if not github_token:
        raise SystemExit("❌  GITHUB_TOKEN missing")

    target_info = _load_target_repo_info()
    rule_candidates = fetch_trending_repos(
        github_token,
        limit=20,
        target_language=target_info.get("language", ""),
        target_topics=target_info.get("topics") or [],
    )
    if not rule_candidates:
        _fallback_response("No repositories found from rule-based GitHub discovery.")
        return

    repo_candidates = [
        {
            "full_name": repo["full_name"],
            "description": repo.get("description") or "",
            "language": repo.get("language") or "",
            "url": repo.get("url") or f"https://github.com/{repo['full_name']}",
        }
        for repo in rule_candidates[:20]
    ]

    try:
        client, token_source = create_models_client()
        logger.info("Running repo search with GitHub Models (%s, model=%s)", token_source, MODEL)
        raw = request_from_prompt(
            client=client,
            model=MODEL,
            prompt_path=PROMPTS_DIR / "search-tool-repos.prompt.yml",
            variables={
                "target_repo_info": json.dumps(target_info, ensure_ascii=False),
                "repo_candidates": json.dumps(repo_candidates, ensure_ascii=False),
            },
        )
        result = json.loads(raw)
    except Exception as exc:
        log_models_error("Repo search", exc)
        _fallback_response("GitHub Models repo search failed; scan_ai_candidates.py will use rule-based discovery.")
        return

    allowed = {repo["full_name"] for repo in repo_candidates}
    selected: list[dict] = []
    for item in result.get("repos", []):
        full_name = str(item.get("full_name") or "").strip()
        reason = str(item.get("reason") or "").strip()
        if full_name in allowed and full_name not in {repo["full_name"] for repo in selected}:
            selected.append({"full_name": full_name, "reason": reason or "Selected by GitHub Models relevance ranking."})
        if len(selected) >= 10:
            break

    payload = {
        "repos": selected,
        "strategy_summary": str(result.get("strategy_summary") or "Ranked rule-discovered repositories with GitHub Models."),
    }
    compact = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    (TMP_DIR / "repo_search.json").write_text(compact, encoding="utf-8")
    _write_output("response", compact)
    logger.info("AI repo search selected %d candidate repositories", len(selected))


if __name__ == "__main__":
    main()
