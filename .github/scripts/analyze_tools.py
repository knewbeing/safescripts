"""使用 GitHub Models API 判断工具与目标仓库的相关性。

鉴权方式：
  GitHub Models Inference API 与 OpenAI SDK 完全兼容。
  端点：https://models.github.ai/inference
  Token：优先使用 MODELS_TOKEN（可选 PAT），否则使用 GITHUB_TOKEN。
  说明：token 需具备 models:read（fine-grained PAT / GitHub App token）。
"""

from __future__ import annotations

import json
import logging

from openai import OpenAI

logger = logging.getLogger(__name__)

# GitHub Models Inference API 端点（OpenAI 兼容）
_MODELS_ENDPOINT = "https://models.github.ai/inference"
# REST API 版本头（GitHub Models 推荐）
_API_VERSION = "2022-11-28"
# 使用轻量模型做相关性判断，降低延迟和 token 消耗
_MODEL = "openai/gpt-4.1-mini"


def analyze_tool_relevance(
    target_repo: str,
    target_repo_info: dict,
    source_repo: dict,
    tools: list[dict],
    models_token: str,
) -> list[dict]:
    """判断 tools 中哪些与 target_repo 相关。

    通过 GitHub Models API（models_token 鉴权）调用 GPT-4.1-mini 做相关性判断。
    出现任何 API 错误时返回空列表（不中断主流程）。
    """
    if not tools:
        return []

    # 使用 GitHub Models（OpenAI 兼容）端点
    client = OpenAI(
        base_url=_MODELS_ENDPOINT,
        api_key=models_token,
        default_headers={
            "X-GitHub-Api-Version": _API_VERSION,
            "Accept": "application/vnd.github+json",
        },
    )

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
