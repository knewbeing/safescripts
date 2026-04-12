"""Shared GitHub Models client helpers for Python-based AI steps."""

from __future__ import annotations

import json
import logging
import os
from pathlib import Path
from typing import Any

import yaml

from openai import OpenAI

logger = logging.getLogger(__name__)

MODELS_ENDPOINT = "https://models.github.ai/inference"
API_VERSION = "2022-11-28"
PROMPTS_DIR = Path(__file__).resolve().parent.parent / "prompts"


def resolve_models_token() -> tuple[str, str]:
    """Resolve the token used for GitHub Models API calls."""
    for env_name in ("COPILOT_TOKEN", "MODELS_TOKEN", "GITHUB_TOKEN"):
        token = os.environ.get(env_name, "").strip()
        if token:
            return token, env_name
    raise RuntimeError("No GitHub Models token available (COPILOT_TOKEN / MODELS_TOKEN / GITHUB_TOKEN)")


def create_models_client() -> tuple[OpenAI, str]:
    token, source = resolve_models_token()
    client = OpenAI(
        base_url=MODELS_ENDPOINT,
        api_key=token,
        default_headers={
            "X-GitHub-Api-Version": API_VERSION,
            "Accept": "application/vnd.github+json",
        },
    )
    return client, source


def request_json(
    *,
    client: OpenAI,
    model: str,
    system_prompt: str,
    user_prompt: str,
    temperature: float = 0.1,
    max_tokens: int = 1000,
) -> dict[str, Any]:
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        temperature=temperature,
        max_tokens=max_tokens,
        response_format={"type": "json_object"},
    )
    content = response.choices[0].message.content or "{}"
    return json.loads(content)


def request_text(
    *,
    client: OpenAI,
    model: str,
    system_prompt: str,
    user_prompt: str,
    temperature: float = 0.3,
    max_tokens: int = 4000,
) -> str:
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        temperature=temperature,
        max_tokens=max_tokens,
    )
    return (response.choices[0].message.content or "").strip()


def log_models_error(context: str, exc: Exception) -> None:
    status_code = getattr(exc, "status_code", None)
    response = getattr(exc, "response", None)
    if status_code is None and response is not None:
        status_code = getattr(response, "status_code", None)

    if status_code is not None:
        logger.error("%s failed with HTTP %s: %s", context, status_code, exc)
    else:
        logger.error("%s failed: %s", context, exc)


# ---------------------------------------------------------------------------
# Prompt YAML loader
# ---------------------------------------------------------------------------

def load_prompt(
    prompt_path: str | Path,
    variables: dict[str, str] | None = None,
) -> dict[str, Any]:
    """Load a ``.prompt.yml`` file and return structured prompt data.

    Returns a dict with keys:
      * ``messages``        – list[dict] ready for OpenAI chat completions
      * ``temperature``     – float
      * ``max_tokens``      – int
      * ``response_format`` – dict | None  (OpenAI-compatible)
    """
    path = Path(prompt_path)
    data = yaml.safe_load(path.read_text(encoding="utf-8"))

    messages: list[dict[str, str]] = []
    for msg in data.get("messages", []):
        content = msg.get("content", "")
        if variables:
            for key, value in variables.items():
                content = content.replace(f"{{{{{key}}}}}", str(value))
        messages.append({"role": msg["role"], "content": content})

    params = data.get("modelParameters", {})
    temperature = float(params.get("temperature", 0.1))
    max_tokens = int(params.get("maxCompletionTokens", 1000))

    response_format: dict[str, Any] | None = None
    resp_fmt = data.get("responseFormat")
    json_schema_str = data.get("jsonSchema")

    if resp_fmt == "json_schema" and json_schema_str:
        response_format = {
            "type": "json_schema",
            "json_schema": json.loads(json_schema_str),
        }
    elif resp_fmt in ("json_object", "json"):
        response_format = {"type": "json_object"}

    return {
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens,
        "response_format": response_format,
    }


def request_from_prompt(
    *,
    client: OpenAI,
    model: str,
    prompt_path: str | Path,
    variables: dict[str, str] | None = None,
    temperature: float | None = None,
    max_tokens: int | None = None,
) -> str:
    """Load a ``.prompt.yml``, call GitHub Models, and return the raw content."""
    prompt = load_prompt(prompt_path, variables)
    kwargs: dict[str, Any] = {
        "model": model,
        "messages": prompt["messages"],
        "temperature": temperature if temperature is not None else prompt["temperature"],
        "max_tokens": max_tokens if max_tokens is not None else prompt["max_tokens"],
    }
    if prompt["response_format"]:
        kwargs["response_format"] = prompt["response_format"]

    response = client.chat.completions.create(**kwargs)
    return (response.choices[0].message.content or "").strip()
