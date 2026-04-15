"""
discover_popular_scripts.py
────────────────────────────
从多个平台搜索流行 Tampermonkey 脚本：
  - GitHub（Search API + Topics + 专业工具话题）
  - GreasyFork（安装量 + 评分 + 分类搜索）
  - Gitee（星标多的 userscript 仓库 + 中文生产力关键词）
  - GitLab（星标多的 userscript 仓库）
  - OpenUserJS（热门脚本）

重点搜集对以下角色有价值的脚本：
  - 项目经理（PM）：Jira/Confluence/Trello/Linear 增强
  - 产品经理（PdM）：Figma/Notion/ProductBoard 增强
  - 程序员（Dev）：GitHub/GitLab/StackOverflow/VSCode Web 增强
  - 架构师（Arch）：draw.io/Miro/GitHub 代码分析增强

调用 AI 筛选最值得推荐的脚本，下载并生成 docs/discovered/*.md 文档页面。
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

CONFIG_FILE = REPO_ROOT / "target-repos.json"


def get_managed_urls() -> set[str]:
    try:
        cfg = json.loads(CONFIG_FILE.read_text(encoding="utf-8"))
        return set(cfg.get("userscripts", []))
    except Exception:
        return set()


def _get_json(url: str, headers: dict | None = None, timeout: int = 15) -> dict | list | None:
    """发起 GET 请求并解析 JSON，失败返回 None。"""
    h = {"User-Agent": "SafeScripts/1.0", "Accept": "application/json"}
    if headers:
        h.update(headers)
    try:
        req = urllib.request.Request(url, headers=h)
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return json.loads(r.read())
    except Exception as exc:
        print(f"    HTTP error ({url[:80]}): {exc}", flush=True)
        return None


def _fetch_preview(url: str, size: int = 800) -> str:
    """下载脚本前 N 字节作为元数据预览。"""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "SafeScripts/1.0"})
        with urllib.request.urlopen(req, timeout=10) as r:
            return r.read(size).decode("utf-8", errors="replace")
    except Exception:
        return ""


# ── GitHub ────────────────────────────────────────────────────────────────────

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
    since = (datetime.now(timezone.utc) - timedelta(days=7)).strftime("%Y-%m-%d")
    query = urllib.parse.quote('extension:user.js "==UserScript==" pushed:>' + since)
    try:
        data = github_api(f"/search/code?q={query}&sort=indexed&per_page=50", token)
        items = data.get("items", [])
        print(f"  GitHub code search: {len(items)} results", flush=True)
        return items
    except Exception as exc:
        print(f"  GitHub code search failed: {exc}", flush=True)
        return []


def search_userscript_repos(token: str) -> list[dict]:
    candidates = []
    # 基础 userscript 话题
    base_topics = ("tampermonkey", "userscript", "greasemonkey")
    # 专业工具话题 — 对 PM/Dev/Arch 高价值
    pro_topics = ("github-enhancement", "github-userscript", "productivity-tools")
    all_topics = base_topics + pro_topics

    for topic in all_topics:
        try:
            data = github_api(
                f"/search/repositories?q=topic:{topic}&sort=stars&per_page=10",
                token,
            )
            for repo in data.get("items", []):
                if repo.get("stargazers_count", 0) < 50:
                    continue
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
            print(f"  GitHub topic search ({topic}) failed: {exc}", flush=True)
        time.sleep(1)

    # 专业工具关键词搜索 — 可能被 GitHub 限速，失败时跳过
    pro_keywords = [
        '"==UserScript==" github enhancement',
        '"==UserScript==" jira productivity',
        '"==UserScript==" confluence userscript',
    ]
    for kw in pro_keywords:
        try:
            q = urllib.parse.quote(f'extension:user.js {kw}')
            data = github_api(f"/search/code?q={q}&sort=indexed&per_page=10", token)
            for f in data.get("items", []):
                f["repo_stars"] = f.get("repository", {}).get("stargazers_count", 0)
                candidates.append(f)
            time.sleep(2)  # 更长的间隔避免限速
        except Exception as exc:
            if "403" in str(exc) or "rate" in str(exc).lower():
                print(f"  GitHub kw search rate-limited, skipping: {kw[:30]}", flush=True)
            else:
                print(f"  GitHub kw search failed: {exc}", flush=True)
            time.sleep(3)

    print(f"  GitHub repo topic search: {len(candidates)} file candidates", flush=True)
    return candidates


def _build_github_candidates(items: list[dict]) -> list[dict]:
    """将 GitHub API 结果转换为统一候选格式。"""
    seen_urls: set[str] = set()
    managed_urls = get_managed_urls()
    result = []
    for item in items:
        raw_url = item.get("download_url") or ""
        if not raw_url and item.get("html_url"):
            html = item["html_url"]
            m = re.match(r"https://github\.com/([^/]+)/([^/]+)/blob/([^/]+)/(.+)", html)
            if m:
                o, r, b, p = m.groups()
                raw_url = f"https://raw.githubusercontent.com/{o}/{r}/{b}/{p}"

        if not raw_url or raw_url in seen_urls or raw_url in managed_urls:
            continue
        seen_urls.add(raw_url)

        repo_info = item.get("repository", {})
        result.append({
            "platform": "github",
            "file_name": item.get("name", ""),
            "repo": repo_info.get("full_name", ""),
            "stars": item.get("repo_stars", repo_info.get("stargazers_count", 0)),
            "pushed_at": item.get("repo_pushed_at", repo_info.get("pushed_at", "")),
            "download_url": raw_url,
            "source_url": raw_url,
            "metadata_preview": _fetch_preview(raw_url),
        })
    return result


# ── GreasyFork ─────────────────────────────────────────────────────────────────

def search_greasyfork(max_per_sort: int = 25) -> list[dict]:
    """从 GreasyFork 获取安装量和评分最高的脚本，并按专业分类额外搜索。"""
    candidates: list[dict] = []
    seen_ids: set[int] = set()

    for sort_by in ("total_installs", "rating"):
        url = (
            f"https://greasyfork.org/scripts.json"
            f"?sort={sort_by}&page=1&per_page={max_per_sort}"
        )
        scripts = _get_json(url)
        if not isinstance(scripts, list):
            print(f"  GreasyFork ({sort_by}): no data", flush=True)
            time.sleep(2)
            continue

        for s in scripts:
            sid = s.get("id")
            if sid in seen_ids:
                continue
            seen_ids.add(sid)

            code_url = s.get("code_url", "")
            if not code_url:
                continue

            candidates.append({
                "platform": "greasyfork",
                "file_name": code_url.rstrip("/").split("/")[-1],
                "repo": str(sid),
                "source_repo": str(sid),
                "stars": s.get("total_installs", 0),   # 用安装量代替 stars
                "install_count": s.get("total_installs", 0),
                "good_ratings": s.get("good_ratings", 0),
                "bad_ratings": s.get("bad_ratings", 0),
                "pushed_at": s.get("updated_at", ""),
                "download_url": code_url,
                "source_url": s.get("url", f"https://greasyfork.org/scripts/{sid}"),
                "script_name": s.get("name", ""),
                "description": s.get("description") or "",
                "metadata_preview": _fetch_preview(code_url),
            })
            time.sleep(0.3)

        print(f"  GreasyFork ({sort_by}): collected {len(candidates)} so far", flush=True)
        time.sleep(2)

    # 专业工具分类搜索（按关键词）
    pro_queries = [
        ("github", "GitHub 增强脚本"),
        ("jira", "Jira 效率工具"),
        ("notion", "Notion 增强"),
        ("confluence", "Confluence 工具"),
        ("productivity", "生产力工具"),
        ("gitlab", "GitLab 增强"),
        ("code review", "代码审查工具"),
        ("devops", "DevOps 工具"),
        ("project management", "项目管理工具"),
        ("api", "API 开发工具"),
    ]
    for q, label in pro_queries:
        url = f"https://greasyfork.org/scripts.json?q={urllib.parse.quote(q)}&sort=total_installs&per_page=15"
        scripts = _get_json(url)
        if not isinstance(scripts, list):
            time.sleep(1)
            continue
        for s in scripts:
            sid = s.get("id")
            if sid in seen_ids:
                continue
            seen_ids.add(sid)
            code_url = s.get("code_url", "")
            if not code_url:
                continue
            candidates.append({
                "platform": "greasyfork",
                "file_name": code_url.rstrip("/").split("/")[-1],
                "repo": str(sid),
                "source_repo": str(sid),
                "stars": s.get("total_installs", 0),
                "install_count": s.get("total_installs", 0),
                "good_ratings": s.get("good_ratings", 0),
                "bad_ratings": s.get("bad_ratings", 0),
                "pushed_at": s.get("updated_at", ""),
                "download_url": code_url,
                "source_url": s.get("url", f"https://greasyfork.org/scripts/{sid}"),
                "script_name": s.get("name", ""),
                "description": s.get("description") or "",
                "category_hint": label,
                "metadata_preview": _fetch_preview(code_url),
            })
            time.sleep(0.3)
        print(f"  GreasyFork [{label}]: {len(scripts)} results", flush=True)
        time.sleep(1)

    print(f"  GreasyFork total: {len(candidates)} candidates", flush=True)
    return candidates


def search_openuserjs() -> list[dict]:
    """从 OpenUserJS 获取热门脚本（通过 GitHub API 搜索 openuserjs.org）。"""
    candidates: list[dict] = []
    # OpenUserJS 实际上在 GitHub 上维护脚本；通过 GreasyFork 替代搜索已覆盖大部分
    # 这里抓取 OpenUserJS 的 RSS/JSON 端点
    url = "https://openuserjs.org/api/scripts?order=installs&limit=20"
    data = _get_json(url)
    if not isinstance(data, list):
        # 尝试备用端点
        url2 = "https://openuserjs.org/api/scripts?order=rating&limit=20"
        data = _get_json(url2)
    if not isinstance(data, list):
        print("  OpenUserJS: no data from API", flush=True)
        return candidates

    for s in data:
        script_url = s.get("script", {}).get("url") or s.get("url", "")
        name = s.get("script", {}).get("name") or s.get("name", "")
        if not script_url:
            continue
        # 构造 raw URL
        raw_url = script_url.replace("https://openuserjs.org/scripts/", "")
        if not raw_url.endswith(".user.js"):
            user, script_name = raw_url.split("/", 1) if "/" in raw_url else ("", raw_url)
            raw_url = f"https://openuserjs.org/install/{user}/{script_name}.user.js" if user else ""
        if not raw_url:
            continue
        candidates.append({
            "platform": "openuserjs",
            "file_name": raw_url.split("/")[-1],
            "repo": s.get("author", {}).get("name", "") + "/" + name if s.get("author") else name,
            "stars": s.get("installs", 0),
            "install_count": s.get("installs", 0),
            "pushed_at": s.get("updatedAt", ""),
            "download_url": raw_url,
            "source_url": f"https://openuserjs.org/scripts/{raw_url.split('/install/')[-1]}",
            "script_name": name,
            "metadata_preview": _fetch_preview(raw_url),
        })
        time.sleep(0.2)
    print(f"  OpenUserJS: {len(candidates)} candidates", flush=True)
    return candidates


# ── Gitee ──────────────────────────────────────────────────────────────────────

def search_gitee(max_repos: int = 5) -> list[dict]:
    """从 Gitee 搜索热门 userscript 仓库，含中文生产力工具关键词。"""
    candidates: list[dict] = []
    seen_urls: set[str] = set()

    # 基础 + 中文生产力工具关键词
    keywords = ("tampermonkey", "userscript", "油猴脚本", "效率工具")
    for keyword in keywords:
        url = (
            f"https://gitee.com/api/v5/search/repositories"
            f"?q={urllib.parse.quote(keyword)}&type=Public"
            f"&sort=stars_count&order=desc&per_page={max_repos}&page=1"
        )
        repos = _get_json(url)
        if not isinstance(repos, list):
            print(f"  Gitee ({keyword}): no data", flush=True)
            time.sleep(2)
            continue

        for repo in repos:
            stars = repo.get("stargazers_count", 0)
            if stars < 20:
                continue
            full_name = repo.get("full_name", "")
            default_branch = repo.get("default_branch", "master")

            contents = _get_json(f"https://gitee.com/api/v5/repos/{full_name}/contents/")
            if not isinstance(contents, list):
                time.sleep(0.5)
                continue

            for f in contents:
                if not isinstance(f, dict):
                    continue
                fname = f.get("name", "")
                if not fname.endswith(".user.js"):
                    continue
                file_path = f.get("path", fname)
                raw_url = f"https://gitee.com/{full_name}/raw/{default_branch}/{file_path}"
                if raw_url in seen_urls:
                    continue
                seen_urls.add(raw_url)

                candidates.append({
                    "platform": "gitee",
                    "file_name": fname,
                    "repo": full_name,
                    "stars": stars,
                    "pushed_at": repo.get("pushed_at", ""),
                    "download_url": raw_url,
                    "source_url": f"https://gitee.com/{full_name}/blob/{default_branch}/{file_path}",
                    "metadata_preview": _fetch_preview(raw_url),
                })
            time.sleep(0.5)
        time.sleep(1)

    print(f"  Gitee total: {len(candidates)} candidates", flush=True)
    return candidates


# ── GitLab ─────────────────────────────────────────────────────────────────────

def search_gitlab(max_repos: int = 5) -> list[dict]:
    """从 GitLab.com 搜索热门 userscript 仓库，提取 .user.js 文件。"""
    candidates: list[dict] = []
    seen_urls: set[str] = set()

    for keyword in ("tampermonkey userscript", "greasemonkey"):
        url = (
            f"https://gitlab.com/api/v4/projects"
            f"?search={urllib.parse.quote(keyword)}"
            f"&order_by=star_count&sort=desc&per_page={max_repos}"
        )
        projects = _get_json(url)
        if not isinstance(projects, list):
            print(f"  GitLab ({keyword}): no data", flush=True)
            time.sleep(2)
            continue

        for proj in projects:
            stars = proj.get("star_count", 0)
            if stars < 5:
                continue
            proj_id = proj["id"]
            namespace = proj.get("path_with_namespace", "")
            default_branch = proj.get("default_branch", "main") or "main"

            # 用 blob 搜索查找 .user.js 文件
            blobs = _get_json(
                f"https://gitlab.com/api/v4/projects/{proj_id}/search"
                f"?scope=blobs&search=user.js"
            )
            if not isinstance(blobs, list):
                time.sleep(0.5)
                continue

            for blob in blobs[:3]:
                file_path = blob.get("path") or blob.get("filename") or ""
                if not file_path.endswith(".user.js"):
                    continue
                raw_url = f"https://gitlab.com/{namespace}/-/raw/{default_branch}/{file_path}"
                if raw_url in seen_urls:
                    continue
                seen_urls.add(raw_url)

                candidates.append({
                    "platform": "gitlab",
                    "file_name": file_path.split("/")[-1],
                    "repo": namespace,
                    "stars": stars,
                    "pushed_at": proj.get("last_activity_at", ""),
                    "download_url": raw_url,
                    "source_url": f"https://gitlab.com/{namespace}/-/blob/{default_branch}/{file_path}",
                    "metadata_preview": _fetch_preview(raw_url),
                })
            time.sleep(0.5)
        time.sleep(1)

    print(f"  GitLab total: {len(candidates)} candidates", flush=True)
    return candidates


# ── 候选聚合 ───────────────────────────────────────────────────────────────────

def build_candidate_list(
    github_items: list[dict],
    greasyfork: list[dict],
    gitee: list[dict],
    gitlab: list[dict],
    openuserjs: list[dict] | None = None,
) -> list[dict]:
    """合并所有来源候选，去重，限制总数。"""
    managed_urls = get_managed_urls()
    seen_urls: set[str] = set()
    result: list[dict] = []

    # GitHub 候选
    for item in _build_github_candidates(github_items):
        dl = item["download_url"]
        if dl not in seen_urls and dl not in managed_urls:
            seen_urls.add(dl)
            result.append(item)

    # GreasyFork、Gitee、GitLab、OpenUserJS（直接格式化好的）
    extra = greasyfork + gitee + gitlab + (openuserjs or [])
    for item in extra:
        dl = item.get("download_url", "")
        if not dl or dl in seen_urls or dl in managed_urls:
            continue
        seen_urls.add(dl)
        result.append(item)

    print(f"  Total unique candidates: {len(result)}", flush=True)
    return result[:200]  # 最多给 AI 200 个候选


# ── 元数据解析 ─────────────────────────────────────────────────────────────────

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


def url_to_slug(url: str, platform: str = "github") -> str:
    """从 URL 派生出安全的文件名 slug。"""
    # GreasyFork URL 示例：https://greasyfork.org/scripts/431/code/Script%20Name.user.js
    name = urllib.parse.unquote(url.rstrip("/").split("/")[-1])
    name = re.sub(r"\.user\.js$", "", name, flags=re.I)
    name = re.sub(r"[^\w\-]", "_", name)
    name = re.sub(r"_+", "_", name).strip("_")
    return name[:80] or f"script_{abs(hash(url)) % 100000}"


# ── 文档渲染 ───────────────────────────────────────────────────────────────────

GITHUB_REPO = os.environ.get("GITHUB_REPOSITORY", "owner/safescripts")
GITHUB_BRANCH = os.environ.get("GITHUB_DEFAULT_BRANCH", "main")

PLATFORM_LABELS = {
    "github": "GitHub",
    "greasyfork": "GreasyFork",
    "gitee": "Gitee",
    "gitlab": "GitLab",
}


def _make_source_link(entry: dict) -> str:
    platform = entry.get("platform", "github")
    repo = entry.get("source_repo", "")
    source_url = entry.get("source_url", "")
    if platform == "github" and repo:
        return f"[{repo}](https://github.com/{repo})"
    if platform == "gitee" and repo:
        return f"[{repo}](https://gitee.com/{repo})"
    if platform == "gitlab" and repo:
        return f"[{repo}](https://gitlab.com/{repo})"
    if platform == "greasyfork":
        label = PLATFORM_LABELS["greasyfork"]
        return f"[{label}]({source_url})" if source_url else label
    return f"[{source_url}]({source_url})" if source_url else repo


def render_doc(slug: str, meta_entry: dict, summary: dict) -> str:
    name = summary.get("zh_name") or meta_entry.get("name", slug)
    description = summary.get("description", "")
    sites = summary.get("applicable_sites", [])
    usage = summary.get("usage", [])
    permissions = summary.get("permissions", [])
    tags = summary.get("tags", [])
    version = meta_entry.get("version", "unknown")
    updated = meta_entry.get("discovered_at", "")[:10]
    platform = meta_entry.get("platform", "github")
    platform_label = PLATFORM_LABELS.get(platform, platform)
    source_link = _make_source_link(meta_entry)
    source_url = meta_entry.get("source_url", "")

    raw_url = (
        f"https://raw.githubusercontent.com/{GITHUB_REPO}/{GITHUB_BRANCH}"
        f"/userscripts/discovered/{slug}.user.js"
    )
    tags_str = "  ".join(f"`{t}`" for t in tags)
    sites_md = "\n".join(f"- {s}" for s in sites) or "- 通用"
    usage_md = "\n".join(f"{i+1}. {step}" for i, step in enumerate(usage)) or "- 请参阅脚本说明"
    perms_md = (
        "\n".join(f"| `{p['grant']}` | {p['explanation']} |" for p in permissions)
        or "| — | 无特殊权限 |"
    )

    # GreasyFork 脚本显示额外统计
    stats_extra = ""
    if platform == "greasyfork":
        installs = meta_entry.get("install_count", 0)
        good = meta_entry.get("good_ratings", 0)
        bad = meta_entry.get("bad_ratings", 0)
        stats_extra = f"　　安装量：**{installs:,}**　　评分：👍{good} / 👎{bad}"

    return f"""---
title: {name}
---

# {name}

{tags_str}

<a href="{raw_url}" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**{version}**　　发现时间：**{updated}**　　来源：{source_link} <Badge type="tip" text="{platform_label}" />{stats_extra}

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


# ── 主流程 ─────────────────────────────────────────────────────────────────────

def main() -> None:
    token = os.environ.get("GITHUB_TOKEN", "")
    if not token:
        print("GITHUB_TOKEN not set, cannot search GitHub.", flush=True)
        sys.exit(1)

    print("🔍 Searching for popular userscripts from multiple platforms...", flush=True)

    # 并行搜索各平台（顺序执行，各平台内部已有 sleep）
    print("\n[GitHub]", flush=True)
    file_items = search_userscript_files(token)
    repo_items = search_userscript_repos(token)

    print("\n[GreasyFork]", flush=True)
    gf_items = search_greasyfork(max_per_sort=50)

    print("\n[Gitee]", flush=True)
    gitee_items = search_gitee(max_repos=10)

    print("\n[GitLab]", flush=True)
    gitlab_items = search_gitlab(max_repos=10)

    print("\n[OpenUserJS]", flush=True)
    openuserjs_items = search_openuserjs()

    candidates = build_candidate_list(
        file_items + repo_items, gf_items, gitee_items, gitlab_items, openuserjs_items
    )

    if not candidates:
        print("No candidates found.", flush=True)
        _write_output([])
        return

    # AI 筛选
    client, token_source = create_models_client()
    print(f"\n🤖 AI filtering {len(candidates)} candidates (token: {token_source})...", flush=True)

    # 为 AI 精简候选信息（避免超出 token 限制）
    ai_candidates = [
        {
            "file_name": c.get("file_name", ""),
            "repo": c.get("repo", ""),
            "platform": c.get("platform", "github"),
            "stars": c.get("stars", 0),
            "install_count": c.get("install_count"),
            "good_ratings": c.get("good_ratings"),
            "pushed_at": c.get("pushed_at", ""),
            "download_url": c.get("download_url", ""),
            "category_hint": c.get("category_hint") or "",
            "script_name": c.get("script_name") or "",
            "description": (c.get("description") or "")[:100],
            "metadata_preview": (c.get("metadata_preview") or "")[:400],
        }
        for c in candidates[:100]
    ]

    try:
        raw = request_from_prompt(
            client=client,
            model=MODEL,
            prompt_path=PROMPT_FILE,
            variables={
                "candidates_json": json.dumps(ai_candidates, ensure_ascii=False),
                "max_count": str(MAX_SCRIPTS),
            },
            max_tokens=2000,
        )
        selected_slim = json.loads(raw).get("selected", [])
    except Exception as exc:
        print(f"  AI filtering failed: {exc}", flush=True)
        selected_slim = ai_candidates[:MAX_SCRIPTS]

    # 用 download_url 把 AI 结果与原始候选合并（补回完整字段）
    url_to_candidate = {c["download_url"]: c for c in candidates}
    selected = []
    for s in selected_slim:
        dl = s.get("download_url", "")
        full = url_to_candidate.get(dl, {})
        merged = {**full, **s}   # AI 补充 score/reason，原始数据补充 source_url/platform 等
        selected.append(merged)

    print(f"  AI selected {len(selected)} scripts.", flush=True)
    changed = []

    for item in selected:
        dl_url = item.get("download_url", "")
        if not dl_url:
            continue
        platform = item.get("platform", "github")
        slug = url_to_slug(dl_url, platform)
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
            "platform": platform,
            "source_url": item.get("source_url", dl_url),
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
            "target_roles": item.get("target_roles", ""),
            "is_new": old_hash == "",
            # GreasyFork/OpenUserJS 额外字段
            "install_count": item.get("install_count"),
            "good_ratings": item.get("good_ratings"),
            "bad_ratings": item.get("bad_ratings"),
        }

        meta_file.write_text(json.dumps(entry, ensure_ascii=False, indent=2), encoding="utf-8")

        # AI 摘要
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

        doc_file = DOCS_DISCOVERED / f"{slug}.md"
        doc_file.write_text(render_doc(slug, entry, summary), encoding="utf-8")
        print(f"  ✓ [{platform}] {slug} → docs/discovered/{slug}.md", flush=True)
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
