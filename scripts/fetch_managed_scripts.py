"""
fetch_managed_scripts.py
────────────────────────
读取 target-repos.json 中的 userscripts[] 列表，
下载每个脚本并保存到 userscripts/managed/，
提取 UserScript 元数据，输出变更摘要供后续步骤使用。

输出文件：
  userscripts/managed/<slug>.user.js      — 脚本本体
  userscripts/managed/<slug>.meta.json    — 元数据 + hash
  /tmp/userscripts/changed.json           — 本次有变化的脚本列表
"""

from __future__ import annotations

import hashlib
import json
import os
import re
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

# ── 路径常量 ─────────────────────────────────────────────────────────────────
REPO_ROOT = Path(__file__).resolve().parents[1]
CONFIG_FILE = REPO_ROOT / "target-repos.json"
MANAGED_DIR = REPO_ROOT / "userscripts" / "managed"
TMP_DIR = Path("/tmp/userscripts")

MANAGED_DIR.mkdir(parents=True, exist_ok=True)
TMP_DIR.mkdir(parents=True, exist_ok=True)


# ── URL 规范化 ────────────────────────────────────────────────────────────────

def normalize_url(url: str) -> str:
    """将各平台的 blob/页面 URL 转换为可直接下载的 raw URL。"""
    # GitHub blob → raw
    m = re.match(r"https://github\.com/([^/]+)/([^/]+)/blob/([^/]+)/(.+)", url)
    if m:
        owner, repo, branch, path = m.groups()
        return f"https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{path}"

    # Gitee blob → raw
    m = re.match(r"https://gitee\.com/([^/]+)/([^/]+)/blob/([^/]+)/(.+)", url)
    if m:
        owner, repo, branch, path = m.groups()
        return f"https://gitee.com/{owner}/{repo}/raw/{branch}/{path}"

    # GitLab blob → raw
    m = re.match(r"https://gitlab\.com/(.+)/-/blob/([^/]+)/(.+)", url)
    if m:
        namespace, branch, path = m.groups()
        return f"https://gitlab.com/{namespace}/-/raw/{branch}/{path}"

    # GreasyFork code URL (直接 code URL，可下载) — 保留原样
    if re.match(r"https://greasyfork\.org/scripts/\d+/code/.+\.user\.js$", url):
        return url

    # GreasyFork 脚本页面 → code URL（从 /scripts/431 → /scripts/431/code/...）
    m = re.match(r"https://greasyfork\.org/(?:[a-z-]+/)?scripts/(\d+)/?$", url)
    if m:
        # 无法直接转换，保留原样，下载时会失败并提示用户使用 code_url
        pass

    return url


def url_to_slug(url: str) -> str:
    """从 URL 中提取脚本的安全文件名（slug）。"""
    name = url.rstrip("/").split("/")[-1]
    # 去掉 .user.js 后缀再加回来，保证格式统一
    name = re.sub(r"\.user\.js$", "", name, flags=re.I)
    name = re.sub(r"[^\w\-]", "_", name)
    return name[:80]


# ── UserScript 元数据解析 ─────────────────────────────────────────────────────

META_BLOCK_RE = re.compile(r"//\s*==UserScript==(.+?)//\s*==/UserScript==", re.S)
META_LINE_RE = re.compile(r"//\s*@(\w[\w:-]*)\s+(.*)")


def parse_metadata(code: str) -> dict[str, list[str]]:
    """解析 UserScript 元数据块，返回 {key: [value, ...]} 字典。"""
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


def get_first(meta: dict[str, list[str]], key: str, default: str = "") -> str:
    return meta.get(key, [default])[0]


# ── 下载 ─────────────────────────────────────────────────────────────────────

def download(url: str, retries: int = 3) -> bytes:
    """带重试逻辑的下载函数。"""
    import time
    last_exc: Exception | None = None
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "SafeScripts/1.0"})
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.read()
        except Exception as exc:
            last_exc = exc
            if attempt < retries - 1:
                wait = 2 ** attempt
                print(f"  ⚠ Download attempt {attempt+1} failed ({exc}), retrying in {wait}s...", flush=True)
                time.sleep(wait)
    raise last_exc  # type: ignore


# ── 主流程 ────────────────────────────────────────────────────────────────────

def main() -> None:
    config = json.loads(CONFIG_FILE.read_text(encoding="utf-8"))
    urls: list[str] = config.get("userscripts", [])

    if not urls:
        print("No userscripts configured in target-repos.json", flush=True)
        _write_output([])
        return

    changed: list[dict] = []

    for raw_url in urls:
        url = normalize_url(raw_url.strip())
        slug = url_to_slug(url)
        script_file = MANAGED_DIR / f"{slug}.user.js"
        meta_file = MANAGED_DIR / f"{slug}.meta.json"

        print(f"→ Fetching {url}", flush=True)
        try:
            content = download(url)
        except Exception as exc:
            print(f"  ✗ Failed: {exc}", flush=True)
            continue

        new_hash = hashlib.sha256(content).hexdigest()

        # 读取旧 hash
        old_hash = ""
        if meta_file.exists():
            try:
                old_hash = json.loads(meta_file.read_text())["sha256"]
            except Exception:
                pass

        if old_hash == new_hash:
            print(f"  ✓ No change (hash match)", flush=True)
            continue

        # 保存脚本
        script_file.write_bytes(content)

        # 解析元数据
        code = content.decode("utf-8", errors="replace")
        meta = parse_metadata(code)

        entry = {
            "slug": slug,
            "source_url": raw_url,
            "raw_url": url,
            "filename": f"{slug}.user.js",
            "name": get_first(meta, "name", slug),
            "version": get_first(meta, "version", "unknown"),
            "description": get_first(meta, "description", ""),
            "match": meta.get("match", []) + meta.get("include", []),
            "grant": meta.get("grant", []),
            "require": meta.get("require", []),
            "metadata_raw": "\n".join(
                f"// @{k}  {v}" for k, vs in meta.items() for v in vs
            ),
            "sha256": new_hash,
            "updated_at": datetime.now(timezone.utc).isoformat(),
            "is_new": not script_file.exists() or old_hash == "",
        }

        meta_file.write_text(json.dumps(entry, ensure_ascii=False, indent=2), encoding="utf-8")
        changed.append(entry)
        print(f"  ✓ Saved {slug} (v{entry['version']})", flush=True)

    print(f"\n✅ {len(changed)} script(s) updated.", flush=True)
    _write_output(changed)

    # GitHub Actions output
    _set_output("changed_count", str(len(changed)))
    _set_output("has_changes", "true" if changed else "false")


def _write_output(changed: list[dict]) -> None:
    out = TMP_DIR / "changed.json"
    out.write_text(json.dumps(changed, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Output written to {out}", flush=True)


def _set_output(key: str, value: str) -> None:
    gh_output = os.environ.get("GITHUB_OUTPUT")
    if gh_output:
        with open(gh_output, "a", encoding="utf-8") as f:
            f.write(f"{key}={value}\n")


if __name__ == "__main__":
    main()
