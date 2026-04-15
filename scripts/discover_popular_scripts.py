"""
discover_popular_scripts.py
────────────────────────────
通过 GitHub Search API 和 GitHub Topics 搜索流行的 Tampermonkey 脚本，
调用 AI 筛选最值得推荐的脚本，下载脚本并生成 docs/discovered/*.md 文档页面。

输出：
  userscripts/discovered/<slug>.user.js
  userscripts/discovered/<slug>.meta.json
  /tmp/userscripts/discovered_changed.json
"""

from __future__ import annotations

import hashlib
import json
import os
import re
import sys
import time
import urllib.request
import urllib.parse
from datetime import datetime, timedelta, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / ".github" / "scripts"))

from ai_models import create_models_client, request_from_prompt  # noqa: E402

PROMPT_FILE = REPO_ROOT / ".github" / "prompts" / "discover-userscripts.prompt.yml"
SUMMARIZE_PROMPT = REPO_ROOT / ".github" / "prompts" / "summarize-userscript.prompt.yml"
DISCOVERED_DIR = REPO_ROOT / "userscripts" / "discovered"
DOCS_DISCOVERED = REPO_ROOT / "docs" / "discovered"
TMP_DIR = Path("/tmp/userscripts")
MODEL = "openai/gpt-4.1-mini"
MAX_SCRIPTS = int(os.environ.get("MAX_DISCOVERED", "10"))

DISCOVERED_DIR.mkdir(parents=True, exist_ok=True)
DOCS_DISCOVERED.mkdir(parents=True, exist_ok=True)
TMP_DIR.mkdir(parents=True, exist_ok=True)

# 读取已托管脚本 slug 用于去重
CONFIG_FILE = REPO_ROOT / "target-repos.json"


def get_managed_urls() -> set[str]:
    try:
        cfg = json.loads(CONFIG_FILE.read_text(encoding="utf-8"))
        return set(cfg.get("userscripts", []))
    except Exception:
        return set()


def github_api(path: str, token: str) -> dict | list:
    url = f"https://api.github.com{path}"
    req = urllib.request.Request(
        url,
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "SafeScripts/1.0",
        },
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())


def search_userscript_files(token: str) -> list[dict]:
    """通过 GitHub Code Search 查找 .user.js 文件。"""
    since = (datetime.now(timezone.utc) - timedelta(days=7)).strftime("%Y-%m-%d")
    # 搜索近期活跃的含 tampermonkey/userscript 字样的 .user.js 文件
    query = urllib.parse.quote('extension:user.js "==UserScript==" pushed:>' + since)
    try:
        data = github_api(f"/search/code?q={query}&sort=indexed&per_page=50", token)
        items = data.get("items", [])
        print(f"  Code search: {len(items)} results", flush=True)
        return items
    except Exception as exc:
        print(f"  Code search failed: {exc}", flush=True)
        return []


def search_userscript_repos(token: str) -> list[dict]:
    """通过 Topic 搜索热门 userscript 仓库，提取其中的 .user.js 文件。"""
    candidates = []
    for topic in ("tampermonkey", "userscript", "greasemonkey"):
        try:
            data = github_api(
                f"/search/repositories?q=topic:{topic}&sort=stars&per_page=10",
                token,
            )
            for repo in data.get("items", []):
                if repo.get("stargazers_count", 0) < 50:
                    continue
                # 搜索仓库中的 .user.js 文件
                try:
                    files = github_api(
                        f"/search/code?q=extension:user.js+repo:{repo['full_name']}+\"==UserScript==\"&per_page=5",
                        token,
                    )
                    for f in files.get("items", []):
                        f["repo_stars"] = repo.get("stargazers_count", 0)
                        f["repo_pushed_at"] = repo.get("pushed_at", "")
                        candidates.append(f)
                    time.sleep(0.5)
                except Exception:
                    pass
        except Exception as exc:
            print(f"  Topic search ({topic}) failed: {exc}", flush=True)
        time.sleep(1)
    print(f"  Repo topic search: {len(candidates)} file candidates", flush=True)
    return candidates


def build_candidate_list(items: list[dict]) -> list[dict]:
    """将 GitHub API 结果转换为 AI 筛选所需格式。"""
    seen_urls = set()
    managed_urls = get_managed_urls()
    result = []

    for item in items:
        raw_url = item.get("download_url") or ""
        # 转换 blob → raw
        if not raw_url and item.get("html_url"):
            html = item["html_url"]
            m = re.match(r"https://github\.com/([^/]+)/([^/]+)/blob/([^/]+)/(.+)", html)
            if m:
                o, r, b, p = m.groups()
                raw_url = f"https://raw.githubusercontent.com/{o}/{r}/{b}/{p}"

        if not raw_url or raw_url in seen_urls or raw_url in managed_urls:
            continue
        seen_urls.add(raw_url)

        # 尝试获取文件前 500 字符作为元数据预览
        meta_preview = ""
        try:
            req = urllib.request.Request(raw_url, headers={"User-Agent": "SafeScripts/1.0"})
            with urllib.request.urlopen(req, timeout=10) as r:
                meta_preview = r.read(800).decode("utf-8", errors="replace")
        except Exception:
            pass

        repo_info = item.get("repository", {})
        result.append({
            "file_name": item.get("name", ""),
            "repo": repo_info.get("full_name", ""),
            "stars": item.get("repo_stars", repo_info.get("stargazers_count", 0)),
            "pushed_at": item.get("repo_pushed_at", repo_info.get("pushed_at", "")),
            "download_url": raw_url,
            "metadata_preview": meta_preview[:500],
        })

    return result[:80]  # 最多给 AI 80 个候选


META_BLOCK_RE = re.compile(r"//\s*==UserScript==(.+?)//\s*==/UserScript==", re.S)
META_LINE_RE = re.compile(r"//\s*@(\w[\w:-]*)\s+(.*)")


def parse_metadata(code: str) -> dict[str, list[str]]:
    meta: dict[str, list[str]] = {}
    m = META_BLOCK_RE.search(code)
    if not m:
        return meta
    for line in m.group(1).splitlines():
        lm = META_LINE_RE.match(line.strip())
        if lm:
            key, val = lm.group(1), lm.group(2).strip()
            meta.setdefault(key, []).append(val)
    return meta


def url_to_slug(url: str) -> str:
    name = url.rstrip("/").split("/")[-1]
    name = re.sub(r"\.user\.js$", "", name, flags=re.I)
    name = re.sub(r"[^\w\-]", "_", name)
    return name[:80]


GITHUB_REPO = os.environ.get("GITHUB_REPOSITORY", "owner/safescripts")
GITHUB_BRANCH = os.environ.get("GITHUB_DEFAULT_BRANCH", "main")


def render_doc(slug: str, meta_entry: dict, summary: dict) -> str:
    """渲染发现脚本的文档页面。"""
    name = summary.get("zh_name") or meta_entry.get("name", slug)
    description = summary.get("description", "")
    sites = summary.get("applicable_sites", [])
    usage = summary.get("usage", [])
    permissions = summary.get("permissions", [])
    tags = summary.get("tags", [])
    source_repo = meta_entry.get("source_repo", "")
    source_url = meta_entry.get("source_url", "")
    version = meta_entry.get("version", "unknown")
    updated = meta_entry.get("discovered_at", "")[:10]

    raw_url = f"https://raw.githubusercontent.com/{GITHUB_REPO}/{GITHUB_BRANCH}/userscripts/discovered/{slug}.user.js"
    tags_str = "  ".join(f"`{t}`" for t in tags)
    sites_md = "\n".join(f"- {s}" for s in sites) or "- 通用"
    usage_md = "\n".join(f"{i+1}. {step}" for i, step in enumerate(usage)) or "- 请参阅脚本说明"
    perms_md = (
        "\n".join(f"| `{p['grant']}` | {p['explanation']} |" for p in permissions)
        or "| — | 无特殊权限 |"
    )

    source_link = f"[{source_repo}](https://github.com/{source_repo})" if source_repo else source_url

    return f"""---
title: {name}
---

# {name}

{tags_str}

<a href="{raw_url}" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**{version}**　　发现时间：**{updated}**　　来源：{source_link}

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

*由 SafeScripts 自动发现 · [查看原始来源]({source_url})*
"""


def main() -> None:
    token = os.environ.get("GITHUB_TOKEN", "")
    if not token:
        print("GITHUB_TOKEN not set, cannot search GitHub.", flush=True)
        sys.exit(1)

    print("🔍 Searching for popular userscripts...", flush=True)
    file_items = search_userscript_files(token)
    repo_items = search_userscript_repos(token)
    all_items = file_items + repo_items

    candidates = build_candidate_list(all_items)
    print(f"  Total unique candidates: {len(candidates)}", flush=True)

    if not candidates:
        print("No candidates found.", flush=True)
        _write_output([])
        return

    # AI 筛选
    client, token_source = create_models_client()
    print(f"  AI filtering (token: {token_source})...", flush=True)

    try:
        raw = request_from_prompt(
            client=client,
            model=MODEL,
            prompt_path=PROMPT_FILE,
            variables={
                "candidates_json": json.dumps(candidates[:50], ensure_ascii=False),
                "max_count": str(MAX_SCRIPTS),
            },
            max_tokens=2000,
        )
        selected = json.loads(raw).get("selected", [])
    except Exception as exc:
        print(f"  AI filtering failed: {exc}", flush=True)
        selected = candidates[:MAX_SCRIPTS]

    print(f"  AI selected {len(selected)} scripts.", flush=True)
    changed = []

    for item in selected:
        dl_url = item.get("download_url", "")
        if not dl_url:
            continue
        slug = url_to_slug(dl_url)
        script_file = DISCOVERED_DIR / f"{slug}.user.js"
        meta_file = DISCOVERED_DIR / f"{slug}.meta.json"

        # 下载脚本
        try:
            req = urllib.request.Request(dl_url, headers={"User-Agent": "SafeScripts/1.0"})
            with urllib.request.urlopen(req, timeout=30) as r:
                content = r.read()
        except Exception as exc:
            print(f"  ✗ Download failed ({slug}): {exc}", flush=True)
            continue

        new_hash = hashlib.sha256(content).hexdigest()
        old_hash = ""
        if meta_file.exists():
            try:
                old_hash = json.loads(meta_file.read_text())["sha256"]
            except Exception:
                pass

        script_file.write_bytes(content)
        code = content.decode("utf-8", errors="replace")
        meta = parse_metadata(code)

        entry = {
            "slug": slug,
            "source_url": dl_url,
            "source_repo": item.get("repo", ""),
            "raw_url": dl_url,
            "filename": f"{slug}.user.js",
            "name": (meta.get("name", [slug]) or [slug])[0],
            "version": (meta.get("version", ["unknown"]) or ["unknown"])[0],
            "description": (meta.get("description", [""]) or [""])[0],
            "match": meta.get("match", []) + meta.get("include", []),
            "grant": meta.get("grant", []),
            "require": meta.get("require", []),
            "metadata_raw": "\n".join(
                f"// @{k}  {v}" for k, vs in meta.items() for v in vs
            ),
            "sha256": new_hash,
            "discovered_at": datetime.now(timezone.utc).isoformat(),
            "ai_reason": item.get("reason", ""),
            "is_new": old_hash == "",
        }

        meta_file.write_text(json.dumps(entry, ensure_ascii=False, indent=2), encoding="utf-8")

        # 生成 AI 摘要
        try:
            raw_summary = request_from_prompt(
                client=client,
                model=MODEL,
                prompt_path=SUMMARIZE_PROMPT,
                variables={
                    "metadata": entry["metadata_raw"],
                    "code_preview": code[:3000],
                },
                max_tokens=2000,
            )
            summary = json.loads(raw_summary)
        except Exception as exc:
            print(f"    ✗ Summarize failed: {exc}", flush=True)
            summary = {}

        entry["summary"] = summary
        meta_file.write_text(json.dumps(entry, ensure_ascii=False, indent=2), encoding="utf-8")

        # 生成文档
        doc_file = DOCS_DISCOVERED / f"{slug}.md"
        doc_file.write_text(render_doc(slug, entry, summary), encoding="utf-8")
        print(f"  ✓ {slug} → docs/discovered/{slug}.md", flush=True)
        changed.append(entry)

    _write_output(changed)
    _set_output("has_changes", "true" if changed else "false")
    print(f"\n✅ Discovered {len(changed)} scripts.", flush=True)


def _write_output(changed: list) -> None:
    out = TMP_DIR / "discovered_changed.json"
    out.write_text(json.dumps(changed, ensure_ascii=False, indent=2), encoding="utf-8")


def _set_output(key: str, value: str) -> None:
    gh_output = os.environ.get("GITHUB_OUTPUT")
    if gh_output:
        with open(gh_output, "a", encoding="utf-8") as f:
            f.write(f"{key}={value}\n")


if __name__ == "__main__":
    main()
