"""
summarize_userscript.py
───────────────────────
读取 /tmp/userscripts/changed.json，对每个有变化的脚本调用 GitHub Models API
生成中文摘要，并在 docs/managed/<slug>.md 中生成或更新文档页面。

依赖：
  .github/scripts/ai_models.py
  .github/prompts/summarize-userscript.prompt.yml
"""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path
from datetime import datetime, timezone

# 将 .github/scripts 加入模块搜索路径
REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / ".github" / "scripts"))

from ai_models import create_models_client, request_from_prompt  # noqa: E402

PROMPT_FILE = REPO_ROOT / ".github" / "prompts" / "summarize-userscript.prompt.yml"
MANAGED_DIR = REPO_ROOT / "userscripts" / "managed"
DOCS_MANAGED = REPO_ROOT / "docs" / "managed"
TMP_DIR = Path("/tmp/userscripts")
MODEL = "openai/gpt-4.1-mini"

DOCS_MANAGED.mkdir(parents=True, exist_ok=True)

# GitHub 仓库信息（用于生成安装按钮 URL）
GITHUB_REPO = os.environ.get("GITHUB_REPOSITORY", "owner/safescripts")
GITHUB_BRANCH = os.environ.get("GITHUB_DEFAULT_BRANCH", "main")


def raw_install_url(slug: str) -> str:
    return f"https://raw.githubusercontent.com/{GITHUB_REPO}/{GITHUB_BRANCH}/userscripts/managed/{slug}.user.js"


RISK_BADGE = {
    "SAFE": "🟢 SAFE",
    "LOW": "🟡 LOW",
    "MEDIUM": "🟠 MEDIUM",
    "HIGH": "🔴 HIGH",
    "CRITICAL": "⛔ CRITICAL",
}


def render_doc(slug: str, meta: dict, summary: dict) -> str:
    """根据元数据和 AI 摘要渲染 Markdown 文档。"""
    install_url = raw_install_url(slug)
    name = summary.get("zh_name") or meta.get("name", slug)
    description = summary.get("description", "")
    sites = summary.get("applicable_sites", [])
    usage = summary.get("usage", [])
    permissions = summary.get("permissions", [])
    tags = summary.get("tags", [])

    tags_str = "  ".join(f"`{t}`" for t in tags) if tags else ""

    sites_md = "\n".join(f"- {s}" for s in sites) if sites else "- 通用"
    usage_md = "\n".join(f"{i + 1}. {step}" for i, step in enumerate(usage)) if usage else "- 请参阅脚本说明"
    perms_md = (
        "\n".join(f"| `{p['grant']}` | {p['explanation']} |" for p in permissions)
        if permissions
        else "| — | 无特殊权限 |"
    )

    updated = meta.get("updated_at", "")[:10]
    version = meta.get("version", "unknown")

    return f"""---
title: {name}
---

# {name}

{tags_str}

<a href="{install_url}" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**{version}**　　最后更新：**{updated}**

## 功能介绍

{description}

## 适用网站

{sites_md}

## 使用方法

{usage_md}

## 权限说明

| 权限 | 用途说明 |
|------|----------|
{perms_md}

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*文档由 SafeScripts 自动生成 · [查看原始脚本]({meta.get("raw_url", install_url)})*
"""


def main() -> None:
    changed_file = TMP_DIR / "changed.json"
    if not changed_file.exists():
        print("No changed.json found, nothing to summarize.", flush=True)
        return

    changed: list[dict] = json.loads(changed_file.read_text(encoding="utf-8"))
    if not changed:
        print("No scripts changed, skipping summarization.", flush=True)
        return

    client, token_source = create_models_client()
    print(f"Using token from: {token_source}", flush=True)

    for entry in changed:
        slug = entry["slug"]
        script_file = MANAGED_DIR / f"{slug}.user.js"
        meta_file = MANAGED_DIR / f"{slug}.meta.json"

        if not script_file.exists():
            print(f"  ✗ Script file not found: {slug}", flush=True)
            continue

        code = script_file.read_text(encoding="utf-8", errors="replace")
        code_preview = code[:3000]

        print(f"→ Summarizing {slug}...", flush=True)
        try:
            raw = request_from_prompt(
                client=client,
                model=MODEL,
                prompt_path=PROMPT_FILE,
                variables={
                    "metadata": entry.get("metadata_raw", ""),
                    "code_preview": code_preview,
                },
                max_tokens=2000,
            )
            summary = json.loads(raw)
        except Exception as exc:
            print(f"  ✗ AI call failed: {exc}", flush=True)
            summary = {}

        # 更新 meta.json 中的摘要字段
        meta = json.loads(meta_file.read_text(encoding="utf-8"))
        meta["summary"] = summary
        meta_file.write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")

        # 生成文档页
        doc_file = DOCS_MANAGED / f"{slug}.md"
        doc_content = render_doc(slug, meta, summary)
        doc_file.write_text(doc_content, encoding="utf-8")
        print(f"  ✓ Generated docs/managed/{slug}.md", flush=True)

    print(f"\n✅ Summarization complete for {len(changed)} script(s).", flush=True)


if __name__ == "__main__":
    main()
