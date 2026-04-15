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

DOCS_MANAGED.mkdir(parents=True, exist_ok=True)
DOCS_DISCOVERED.mkdir(parents=True, exist_ok=True)

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
        return summary[:80] + "…" if len(summary) > 80 else (summary or "无已知风险")

    if risk == "LOW":
        return summary[:80] + "…" if len(summary) > 80 else (summary or "低风险")

    # MEDIUM / HIGH / CRITICAL — 显示具体问题
    sev_order = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3}
    sev_icon = {"CRITICAL": "⛔", "HIGH": "🔴", "MEDIUM": "🟠", "LOW": "🟡"}

    top = sorted(
        [i for i in issues if isinstance(i, dict)],
        key=lambda x: sev_order.get(x.get("severity", "LOW"), 9),
    )[:4]

    if top:
        parts = []
        for issue in top:
            icon = sev_icon.get(issue.get("severity", ""), "⚠️")
            itype = issue.get("type", "")
            desc = (issue.get("description", "") or "")[:60]
            if desc and not desc.endswith("…"):
                desc = desc + "…" if len(issue.get("description", "")) > 60 else desc
            parts.append(f"{icon}**{itype}**: {desc}")
        return "<br>".join(parts)

    return summary[:80] + "…" if len(summary) > 80 else (summary or "存在风险")


def _sort_entries_safe_first(entries: list[dict]) -> list[dict]:
    """将脚本按安全等级从安全到危险排序。"""
    order = {r: i for i, r in enumerate(RISK_ORDER_SAFE_FIRST)}
    return sorted(entries, key=lambda e: order.get(e.get("risk_level", "UNKNOWN"), 99))


def render_managed_index(entries: list[dict]) -> str:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines = [
        "# 托管脚本",
        "",
        f"> 共 **{len(entries)}** 个脚本　·　{now}　·　由 `target-repos.json` 配置，每天自动同步安全分析",
        "",
    ]

    if not entries:
        lines += ["> 暂无托管脚本，请在 `target-repos.json` 的 `userscripts` 数组中添加脚本地址。", ""]
        return "\n".join(lines)

    lines += ["| 风险 | 脚本 | 版本 | 适用网站 | 风险说明 |",
              "|:----:|:-----|:----:|:---------|:---------|"]

    for e in _sort_entries_safe_first(entries):
        slug = e.get("slug", "")
        summary = e.get("summary", {})
        name = summary.get("zh_name") or e.get("name", slug)
        version = e.get("version", "?")
        sites = summary.get("applicable_sites", [])
        sites_str = "、".join(sites[:2]) + ("…" if len(sites) > 2 else "") if sites else "通用"
        risk = e.get("risk_level", "UNKNOWN")
        badge = RISK_BADGE.get(risk, "⬜")
        risk_md = _risk_issues_md(e)
        lines.append(f"| {badge}{risk} | [{name}](./{slug}) | {version} | {sites_str} | {risk_md} |")

    lines.append("")
    return "\n".join(lines)


def render_discovered_index(entries: list[dict]) -> str:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines = [
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

    platform_labels = {
        "github": "GH", "greasyfork": "GF",
        "gitee": "Gitee", "gitlab": "GL", "openuserjs": "OUJS",
    }
    platform_urls_tpl = {
        "github": "https://github.com/{repo}",
        "gitee": "https://gitee.com/{repo}",
        "gitlab": "https://gitlab.com/{repo}",
    }

    lines += ["| 风险 | 脚本 | 来源 | 平台 | 风险说明 |",
              "|:----:|:-----|:-----|:----:|:---------|"]

    for e in _sort_entries_safe_first(entries):
        slug = e.get("slug", "")
        summary = e.get("summary", {})
        name = summary.get("zh_name") or e.get("name", slug)
        repo = e.get("source_repo", "") or e.get("repo", "")
        platform = e.get("platform", "github")
        plabel = platform_labels.get(platform, platform or "GH")

        # 构建来源链接
        if platform in platform_urls_tpl:
            purl = platform_urls_tpl[platform].format(repo=repo)
        else:
            purl = e.get("source_url", "")
        repo_short = repo.split("/")[-1] if "/" in repo else (repo or "")

        # 安装量（GreasyFork）
        install = e.get("install_count")
        ic_suffix = ""
        if install and install > 1000:
            ic_suffix = f" {install//1000}k↓" if install < 1_000_000 else f" {install//1_000_000}M↓"

        repo_link = f"[{repo_short}{ic_suffix}]({purl})" if repo_short and purl else (repo_short or "—")

        risk = e.get("risk_level", "UNKNOWN")
        badge = RISK_BADGE.get(risk, "⬜")
        risk_md = _risk_issues_md(e)
        lines.append(f"| {badge}{risk} | [{name}](./{slug}) | {repo_link} | {plabel} | {risk_md} |")

    lines.append("")
    return "\n".join(lines)


def main() -> None:
    print("Generating docs index pages...", flush=True)

    managed = load_scripts(MANAGED_DIR)
    discovered = load_scripts(DISCOVERED_DIR)

    managed_index = DOCS_MANAGED / "index.md"
    managed_index.write_text(render_managed_index(managed), encoding="utf-8")
    print(f"  ✓ docs/managed/index.md ({len(managed)} scripts)", flush=True)

    discovered_index = DOCS_DISCOVERED / "index.md"
    discovered_index.write_text(render_discovered_index(discovered), encoding="utf-8")
    print(f"  ✓ docs/discovered/index.md ({len(discovered)} scripts)", flush=True)

    print("\n✅ Index generation complete.", flush=True)


if __name__ == "__main__":
    main()
