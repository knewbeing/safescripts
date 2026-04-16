"""
generate_docs_index.py
──────────────────────
扫描 userscripts/managed/ 和 userscripts/discovered/ 中的 .meta.json 文件，
生成 docs/managed/index.md 和 docs/discovered/index.md 总览页面。
"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
MANAGED_DIR = REPO_ROOT / "userscripts" / "managed"
DISCOVERED_DIR = REPO_ROOT / "userscripts" / "discovered"
DOCS_MANAGED = REPO_ROOT / "docs" / "managed"
DOCS_DISCOVERED = REPO_ROOT / "docs" / "discovered"
DATA_DIR = REPO_ROOT / "docs" / ".vitepress" / "data"

DOCS_MANAGED.mkdir(parents=True, exist_ok=True)
DOCS_DISCOVERED.mkdir(parents=True, exist_ok=True)
DATA_DIR.mkdir(parents=True, exist_ok=True)

RISK_ORDER_SAFE_FIRST = ["SAFE", "LOW", "MEDIUM", "HIGH", "CRITICAL", "UNKNOWN"]

RISK_BADGE = {
    "SAFE": "🟢",
    "LOW": "🟡",
    "MEDIUM": "🟠",
    "HIGH": "🔴",
    "CRITICAL": "⛔",
    "UNKNOWN": "⬜",
}


def load_scripts(scripts_dir: Path) -> list[dict]:
    entries = []
    for meta_file in sorted(scripts_dir.glob("*.meta.json")):
        try:
            data = json.loads(meta_file.read_text(encoding="utf-8"))
            slug = data.get("slug", meta_file.stem)
            security_file = scripts_dir / f"{slug}.security.json"
            if security_file.exists():
                try:
                    sec = json.loads(security_file.read_text(encoding="utf-8"))
                    data["risk_level"] = sec.get("risk_level", "UNKNOWN")
                    data["security_summary"] = sec.get("summary", "")
                    data["security_issues"] = sec.get("issues", [])
                    data["data_transmission"] = sec.get("data_transmission", {})
                    data["privacy_collection"] = sec.get("privacy_collection", {})
                except Exception:
                    data["risk_level"] = "UNKNOWN"
                    data["security_issues"] = []
            else:
                data["risk_level"] = "UNKNOWN"
                data["security_issues"] = []
            entries.append(data)
        except Exception as exc:
            print(f"  ✗ Failed to load {meta_file}: {exc}")
    return entries


def _risk_issues_md(entry: dict) -> str:
    """为每个脚本生成内联风险说明（安全时显示摘要，有风险时显示详细问题）。"""
    risk = entry.get("risk_level", "UNKNOWN")
    issues = entry.get("security_issues", [])
    summary = entry.get("security_summary", "") or ""

    if risk in ("SAFE", "UNKNOWN"):
        return summary[:120] + "…" if len(summary) > 120 else (summary or "无已知风险")

    if risk == "LOW":
        return summary[:120] + "…" if len(summary) > 120 else (summary or "低风险")

    # MEDIUM / HIGH / CRITICAL — 显示具体问题
    sev_order = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3}
    sev_icon = {"CRITICAL": "⛔", "HIGH": "🔴", "MEDIUM": "🟠", "LOW": "🟡"}

    top = sorted(
        [i for i in issues if isinstance(i, dict)],
        key=lambda x: sev_order.get(x.get("severity", "LOW"), 9),
    )[:5]

    if top:
        parts = []
        for issue in top:
            icon = sev_icon.get(issue.get("severity", ""), "⚠️")
            itype = issue.get("type", "")
            desc = (issue.get("description", "") or "")[:80]
            if len(issue.get("description", "")) > 80:
                desc += "…"
            parts.append(f"{icon}**{itype}**: {desc}")
        return "<br>".join(parts)

    return summary[:120] + "…" if len(summary) > 120 else (summary or "存在风险")


def _sort_entries_safe_first(entries: list[dict]) -> list[dict]:
    """将脚本按安全等级从安全到危险排序。"""
    order = {r: i for i, r in enumerate(RISK_ORDER_SAFE_FIRST)}
    return sorted(entries, key=lambda e: order.get(e.get("risk_level", "UNKNOWN"), 99))


def _risk_issues_text(entry: dict) -> str:
    """为前端分页表格生成纯文本风险说明。"""
    risk = entry.get("risk_level", "UNKNOWN")
    issues = entry.get("security_issues", [])
    summary = entry.get("security_summary", "") or ""

    if risk in ("SAFE", "UNKNOWN"):
        return summary or "无已知风险"
    if risk == "LOW":
        return summary or "低风险"

    sev_order = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3}
    top = sorted(
        [i for i in issues if isinstance(i, dict)],
        key=lambda x: sev_order.get(x.get("severity", "LOW"), 9),
    )[:5]
    if top:
        parts = []
        for issue in top:
            sev = issue.get("severity", "LOW")
            itype = issue.get("type", "风险项")
            desc = (issue.get("description", "") or "").strip()
            parts.append(f"[{sev}] {itype}: {desc}")
        return "\n".join(parts)
    return summary or "存在风险"


def build_managed_table_data(entries: list[dict]) -> list[dict]:
    rows = []
    for e in _sort_entries_safe_first(entries):
        slug = e.get("slug", "")
        summary = e.get("summary", {})
        name = summary.get("zh_name") or e.get("name", slug)
        version = e.get("version", "?")
        sites = summary.get("applicable_sites", [])
        sites_str = "、".join(sites[:2]) + ("…" if len(sites) > 2 else "") if sites else "通用"
        risk = e.get("risk_level", "UNKNOWN")
        badge = RISK_BADGE.get(risk, "⬜")
        rows.append(
            {
                "risk": f"{badge}{risk}",
                "name": name,
                "link": f"./{slug}",
                "version": version,
                "sites": sites_str,
                "risk_details": _risk_issues_text(e),
            }
        )
    return rows


def build_discovered_table_data(entries: list[dict]) -> list[dict]:
    platform_labels = {
        "github": "GH",
        "greasyfork": "GF",
        "gitee": "Gitee",
        "gitlab": "GL",
        "openuserjs": "OUJS",
    }
    platform_urls_tpl = {
        "github": "https://github.com/{repo}",
        "gitee": "https://gitee.com/{repo}",
        "gitlab": "https://gitlab.com/{repo}",
    }

    rows = []
    for e in _sort_entries_safe_first(entries):
        slug = e.get("slug", "")
        summary = e.get("summary", {})
        name = summary.get("zh_name") or e.get("name", slug)
        repo = e.get("source_repo", "") or e.get("repo", "")
        platform = e.get("platform", "github")
        plabel = platform_labels.get(platform, platform or "GH")
        if platform in platform_urls_tpl:
            purl = platform_urls_tpl[platform].format(repo=repo)
        else:
            purl = e.get("source_url", "")
        repo_short = repo.split("/")[-1] if "/" in repo else (repo or "")

        install = e.get("install_count")
        ic_suffix = ""
        if install and install > 1000:
            ic_suffix = f" {install//1000}k↓" if install < 1_000_000 else f" {install//1_000_000}M↓"

        repo_name = f"{repo_short}{ic_suffix}" if repo_short else "—"
        risk = e.get("risk_level", "UNKNOWN")
        badge = RISK_BADGE.get(risk, "⬜")
        rows.append(
            {
                "risk": f"{badge}{risk}",
                "name": name,
                "link": f"./{slug}",
                "source_name": repo_name,
                "source_link": purl or "",
                "platform": plabel,
                "risk_details": _risk_issues_text(e),
            }
        )
    return rows


def render_managed_index(entries: list[dict]) -> str:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines = [
        "---",
        "aside: false",
        "outline: false",
        "---",
        "",
        "# 托管脚本",
        "",
        f"> 共 **{len(entries)}** 个脚本　·　{now}　·　由 `target-repos.json` 配置，每天自动同步安全分析",
        "",
    ]

    if not entries:
        lines += ["> 暂无托管脚本，请在 `target-repos.json` 的 `userscripts` 数组中添加脚本地址。", ""]
        return "\n".join(lines)

    lines += [
        "<script setup>",
        "import managedItems from '../.vitepress/data/managed.json'",
        "</script>",
        "",
        "<PaginatedScriptsTable kind=\"managed\" :items=\"managedItems\" />",
        "",
    ]
    return "\n".join(lines)


def render_discovered_index(entries: list[dict]) -> str:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines = [
        "---",
        "aside: false",
        "outline: false",
        "---",
        "",
        "# 发现的热门脚本",
        "",
        f"> 共 **{len(entries)}** 个脚本　·　{now}",
        "",
        "每天从 GitHub、GreasyFork、Gitee、GitLab 自动发现。重点收录对**PM/PdM/Dev/Arch**有提效价值的脚本。",
        "",
    ]

    if not entries:
        lines += ["> 暂无发现的脚本，等待下次自动运行。", ""]
        return "\n".join(lines)

    lines += [
        "<script setup>",
        "import discoveredItems from '../.vitepress/data/discovered.json'",
        "</script>",
        "",
        "<PaginatedScriptsTable kind=\"discovered\" :items=\"discoveredItems\" />",
        "",
    ]
    return "\n".join(lines)


def main() -> None:
    print("Generating docs index pages...", flush=True)

    managed = load_scripts(MANAGED_DIR)
    discovered = load_scripts(DISCOVERED_DIR)

    managed_data = build_managed_table_data(managed)
    discovered_data = build_discovered_table_data(discovered)
    (DATA_DIR / "managed.json").write_text(
        json.dumps(managed_data, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (DATA_DIR / "discovered.json").write_text(
        json.dumps(discovered_data, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    managed_index = DOCS_MANAGED / "index.md"
    managed_index.write_text(render_managed_index(managed), encoding="utf-8")
    print(f"  ✓ docs/managed/index.md ({len(managed)} scripts)", flush=True)

    discovered_index = DOCS_DISCOVERED / "index.md"
    discovered_index.write_text(render_discovered_index(discovered), encoding="utf-8")
    print(f"  ✓ docs/discovered/index.md ({len(discovered)} scripts)", flush=True)

    print("\n✅ Index generation complete.", flush=True)


if __name__ == "__main__":
    main()
