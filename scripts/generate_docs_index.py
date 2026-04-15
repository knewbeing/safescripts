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
            # 读取安全分析结果
            slug = data.get("slug", meta_file.stem)
            security_file = scripts_dir / f"{slug}.security.json"
            if security_file.exists():
                try:
                    sec = json.loads(security_file.read_text(encoding="utf-8"))
                    data["risk_level"] = sec.get("risk_level", "UNKNOWN")
                    data["security_summary"] = sec.get("summary", "")
                except Exception:
                    data["risk_level"] = "UNKNOWN"
            else:
                data["risk_level"] = "UNKNOWN"
            entries.append(data)
        except Exception as exc:
            print(f"  ✗ Failed to load {meta_file}: {exc}")
    return entries


def render_managed_index(entries: list[dict]) -> str:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines = [
        "# 托管脚本列表",
        "",
        f"共 **{len(entries)}** 个脚本　　最后更新：{now}",
        "",
        "以下脚本由用户在 `target-repos.json` 中配置，每天自动同步最新版本并分析安全性。",
        "",
    ]

    if not entries:
        lines += [
            "> 暂无托管脚本。请在 `target-repos.json` 的 `userscripts` 数组中添加脚本地址。",
            "",
        ]
        return "\n".join(lines)

    # 按风险等级分组
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
        lines += ["| 脚本 | 版本 | 适用网站 | 安全摘要 |", "|------|------|----------|----------|"]
        for e in group:
            slug = e.get("slug", "")
            summary = e.get("summary", {})
            name = summary.get("zh_name") or e.get("name", slug)
            version = e.get("version", "?")
            sites = summary.get("applicable_sites", [])
            sites_str = "、".join(sites[:3]) + ("…" if len(sites) > 3 else "") if sites else "通用"
            sec_summary = e.get("security_summary", "待分析")[:40]
            lines.append(f"| [{name}](./{slug}) | {version} | {sites_str} | {sec_summary} |")
        lines.append("")

    return "\n".join(lines)


def render_discovered_index(entries: list[dict]) -> str:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines = [
        "# 发现的热门脚本",
        "",
        f"共 **{len(entries)}** 个脚本　　最后发现：{now}",
        "",
        "以下脚本由 SafeScripts 自动从 GitHub、GreasyFork、Gitee、GitLab 发现，经 AI 筛选并安全分析。",
        "如需持续跟踪某个脚本，可将其地址添加到 `target-repos.json` 的 `userscripts` 数组中。",
        "",
    ]

    if not entries:
        lines += ["> 暂无发现的脚本，等待下次自动运行。", ""]
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
        lines += ["| 脚本 | 来源仓库 | 平台 | 适用网站 | 发现时间 |", "|------|----------|------|----------|----------|"]
        for e in group:
            slug = e.get("slug", "")
            summary = e.get("summary", {})
            name = summary.get("zh_name") or e.get("name", slug)
            repo = e.get("source_repo", "")
            platform = e.get("platform", "github")
            sites = summary.get("applicable_sites", []) if isinstance(summary, dict) else []
            sites_str = "、".join(sites[:2]) + ("…" if len(sites) > 2 else "") if sites else "通用"
            discovered = e.get("discovered_at", "")[:10]
            platform_labels = {
                "github": "GitHub", "greasyfork": "GreasyFork",
                "gitee": "Gitee", "gitlab": "GitLab",
            }
            plabel = platform_labels.get(platform, platform)
            platform_urls = {
                "github": f"https://github.com/{repo}",
                "gitee": f"https://gitee.com/{repo}",
                "gitlab": f"https://gitlab.com/{repo}",
                "greasyfork": e.get("source_url", ""),
            }
            purl = platform_urls.get(platform, "")
            repo_link = f"[{repo}]({purl})" if repo and purl else (repo or "—")
            lines.append(f"| [{name}](./{slug}) | {repo_link} | {plabel} | {sites_str} | {discovered} |")
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
