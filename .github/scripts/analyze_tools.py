"""Use GitHub Models (GPT-4o-mini) to decide which tools are relevant to the target repo."""

from __future__ import annotations

import json
import logging

from openai import OpenAI

logger = logging.getLogger(__name__)

_MODEL = "gpt-4o-mini"
_MODELS_ENDPOINT = "https://models.inference.ai.azure.com"


def analyze_tool_relevance(
    target_repo: str,
    target_repo_info: dict,
    source_repo: dict,
    tools: list[dict],
    github_token: str,
) -> list[dict]:
    """Return the subset of *tools* that are relevant to *target_repo*.

    Uses GPT-4o-mini via the GitHub Models API for the judgement.
    Falls back to an empty list on any API error.
    """
    if not tools:
        return []

    client = OpenAI(base_url=_MODELS_ENDPOINT, api_key=github_token)

    target_desc = target_repo_info.get("description") or ""
    target_lang = target_repo_info.get("language") or ""
    target_topics = ", ".join(target_repo_info.get("topics") or [])

    src_name = source_repo.get("full_name", "")
    src_desc = source_repo.get("description") or ""
    src_lang = source_repo.get("language") or ""

    tools_list = "\n".join(
        f"  - [{t['type']}] name={t['name']}  path={t['path']}" for t in tools
    )

    prompt = f"""You are a senior GitHub Copilot tools curator.

TARGET REPOSITORY: {target_repo}
  description : {target_desc}
  language    : {target_lang}
  topics      : {target_topics}

SOURCE REPOSITORY: {src_name}
  description : {src_desc}
  language    : {src_lang}

AVAILABLE COPILOT TOOLS (from source repo):
{tools_list}

Tool types:
  • instruction — language/framework-specific coding guidance for Copilot
  • agent       — custom Copilot agent persona/workflow
  • skill       — reusable prompt template (invoked with /skill-name)

Task: Select only tools that would provide GENUINE value to developers working on the
TARGET repository. Consider language match, framework/domain overlap, and general utility.
Be selective — prefer quality over quantity.

Respond with a JSON object (no markdown fences):
{{
  "relevant_tools": ["name1", "name2"],
  "reason": "one-sentence explanation"
}}

If nothing is relevant return {{"relevant_tools": [], "reason": "..."}}
"""

    try:
        resp = client.chat.completions.create(
            model=_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a GitHub Copilot tools curator. "
                        "Respond ONLY with valid JSON, no markdown."
                    ),
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.1,
            max_tokens=400,
            response_format={"type": "json_object"},
        )
        result = json.loads(resp.choices[0].message.content)
        relevant_names = set(result.get("relevant_tools", []))
        reason = result.get("reason", "")

        logger.info(
            "AI verdict for %s → %d relevant tool(s). %s",
            src_name,
            len(relevant_names),
            reason,
        )
        return [
            {**t, "relevance_reason": reason}
            for t in tools
            if t["name"] in relevant_names
        ]

    except Exception as exc:
        logger.error("AI analysis failed for %s: %s", src_name, exc)
        return []
