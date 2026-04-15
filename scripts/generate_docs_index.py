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


def _risk_issues_md(entry: dict, max_issues: int = 3) -> str:
    """为有风险的脚本生成简短的关键风险列表（用于索引表格）。"""
    risk = entry.get("risk_level", "UNKNOWN")
    if risk in ("SAFE", "LOW", "UNKNOWN"):
        return entry.get("security_summary", "待分析")[:50] or "待分析"

    issues = entry.get("security_issues", [])
    sev_order = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3}
    top = sorted(
        [i for i in issues if i.get("severity") in ("CRITICAL", "HIGH", "MEDIUM")],
        key=lambda x: sev_order.get(x.get("severity", "LOW"), 9),
    )[:max_issues]

    if not top:
        summary = entry.get("security_summary", "")
        return summary[:60] + "…" if len(summary) > 60 else summary or "待分析"

    sev_icon = {"CRITICAL": "⛔", "HIGH": "🔴", "MEDIUM": "🟠"}
    parts = []
    for issue in top:
        icon = sev_icon.get(issue.get("severity", ""), "⚠️")
        itype = issue.get("type", "")
        desc = issue.get("description", "")[:40]
        parts.append(f"{icon}**{itype}**：{desc}…")
    return "<br>".join(parts)


def render_managed_index(entries: list[dict]) -> str:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines = [
        "# 托管脚本",
        "",
        f"> 共 **{len(entries)}** 个脚本　·　最后更新：{now}",
        "",
        "以下脚本由 `target-repos.json` 配置，每天自动同步并分析安全性。",
        "",
    ]

    if not entries:
        lines += ["> 暂无托管脚本，请在 `target-repos.json` 的 `userscripts` 数组中添加脚本地址。", ""]
        return "\n".join(lines)

    risk_order = ["CRITICAL", "HIGH", "MEDIUM", "LOW", "SAFE", "UNKNOWN"]
    grouped: dict[str, list[dict]] = {r: [] for r in risk_order}
    for e in entries:
        grouped.setdefault(e.get("risk_level", "UNKNOWN"), []).append(e)

    for risk in risk_order:
        group = grouped.get(risk, [])
        if not group:
            continue
        badge = RISK_BADGE.get(risk, "⬜")
        lines += [f"## {badge} {risk}", ""]
        lines += ["| 脚本 | 版本 | 适用网站 | 安全说明 |", "|:-----|:----:|:---------|:---------|"]
        for e in group:
            slug = e.get("slug", "")
            summary = e.get("summary", {})
            name = summary.get("zh_name") or e.get("name", slug)
            version = e.get("version", "?")
            sites = summary.get("applicable_sites", [])
            sites_str = "、".join(sites[:2]) + ("…" if len(sites) > 2 else "") if sites else "通用"
            risk_md = _risk_issues_md(e)
            lines.append(f"| [{name}](./{slug}) | {version} | {sites_str} | {risk_md} |")
        lines.append("")

    return "\n".join(lines)


def render_discovered_index(entries: list[dict]) -> str:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines = [
        "# 发现的热门脚本",
        "",
        f"> 共 **{len(entries)}** 个脚本　·　最后发现：{now}",
        "",
        "SafeScripts 每天从 GitHub、GreasyFork、Gitee、GitLab、OpenUserJS 自动发现并分析。",
        "重点收录对**项目经理、产品经理、程序员、架构师**有提效价值的脚本。",
        "可将脚本地址加入 `target-repos.json` 持续跟踪。",
        "",
    ]

    if not entries:
        lines += ["> 暂无发现的脚本，等待下次自动运行。", ""]
        return "\n".join(lines)

    risk_order = ["CRITICAL", "HIGH", "MEDIUM", "LOW", "SAFE", "UNKNOWN"]
    grouped: dict[str, list[dict]] = {r: [] for r in risk_order}
    for e in entries:
        grouped.setdefault(e.get("risk_level", "UNKNOWN"), []).append(e)

    platform_labels = {
        "github": "GitHub", "greasyfork": "GreasyFork",
        "gitee": "Gitee", "gitlab": "GitLab", "openuserjs": "OpenUserJS",
    }

    for risk in risk_order:
        group = grouped.get(risk, [])
        if not group:
            continue
        badge = RISK_BADGE.get(risk, "⬜")
        lines += [f"## {badge} {risk}", ""]
        lines += ["| 脚本 | 来源 | 平台 | 适用角色 | 安全说明 |",
                  "|:-----|:-----|:----:|:--------:|:---------|"]
        for e in group:
            slug = e.get("slug", "")
            summary = e.get("summary", {})
            name = summary.get("zh_name") or e.get("name", slug)
            repo = e.get("source_repo", "")
            platform = e.get("platform", "github")
            plabel = platform_labels.get(platform, platform or "GitHub")
            platform_urls = {
                "github": f"https://github.com/{repo}",
                "gitee": f"https://gitee.com/{repo}",
                "gitlab": f"https://gitlab.com/{repo}",
                "greasyfork": e.get("source_url", ""),
                "openuserjs": e.get("source_url", ""),
            }
            purl = platform_urls.get(platform, "")
            repo_short = repo.split("/")[-1] if "/" in repo else repo
            repo_link = f"[{repo_short}]({purl})" if repo_short and purl else (repo_short or "—")

            # 安装量（GreasyFork/OpenUserJS）
            install = e.get("install_count")
            if install and install > 1000:
                ic = f" {install//1000}k↓" if install < 1_000_000 else f" {install//1000000}M↓"
                repo_link = repo_link + ic

            # 适用角色
            target_roles = e.get("target_roles", "") or ""
            roles_short = target_roles[:15] + "…" if len(target_roles) > 15 else target_roles
            if not roles_short:
                # 从 AI reason 或类别提示推断
                category_hint = e.get("category_hint", "")
                if category_hint:
                    roles_short = category_hint[:15]
                else:
                    roles_short = "通用"

            risk_md = _risk_issues_md(e)
            lines.append(f"| [{name}](./{slug}) | {repo_link} | {plabel} | {roles_short} | {risk_md} |")
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
