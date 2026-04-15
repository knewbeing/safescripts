"""写入本次 pipeline 运行记录到 run-history.json，并生成 docs/status/index.md。

成功判断标准：
1. GitHub Actions 全部 job 无错误（由 workflow 保证，本脚本被调用即代表到达此步骤）
2. 至少有 1 个托管脚本且有安全检查结果（risk_level 字段存在）
3. 发现脚本数量 > 0 且至少一半有安全检查结果
4. GitHub Pages URL 可访问（HTTP 200）
"""
from __future__ import annotations

import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

import requests

REPO_ROOT = Path(__file__).resolve().parents[1]
HISTORY_FILE = REPO_ROOT / "run-history.json"
STATUS_DIR = REPO_ROOT / "docs" / "status"
PAGES_URL = "https://knewbeing.github.io/safescripts/"


def count_scripts(directory: Path) -> dict:
    metas = list(directory.glob("*.meta.json"))
    securities = list(directory.glob("*.security.json"))
    risk_counts: dict[str, int] = {}
    for sf in securities:
        try:
            data = json.loads(sf.read_text(encoding="utf-8"))
            rl = data.get("risk_level", "UNKNOWN")
            risk_counts[rl] = risk_counts.get(rl, 0) + 1
        except Exception:
            pass
    return {
        "total": len(metas),
        "with_security": len(securities),
        "risk": risk_counts,
    }


def check_pages(url: str) -> dict:
    try:
        r = requests.get(url, timeout=15)
        return {"status": r.status_code, "ok": r.status_code == 200}
    except Exception as e:
        return {"status": 0, "ok": False, "error": str(e)}


def evaluate_success(managed: dict, discovered: dict, pages: dict) -> tuple[bool, list[str]]:
    issues = []
    # 1. 托管脚本检查
    if managed["total"] == 0:
        issues.append("❌ 无托管脚本")
    elif managed["with_security"] == 0:
        issues.append("⚠️ 托管脚本无安全检查结果")
    # 2. 发现脚本检查
    if discovered["total"] == 0:
        issues.append("❌ 未发现任何脚本")
    elif discovered["with_security"] == 0:
        issues.append("⚠️ 发现脚本无安全检查结果")
    elif discovered["with_security"] < discovered["total"] // 2:
        issues.append(f"⚠️ 仅 {discovered['with_security']}/{discovered['total']} 个发现脚本有安全检查")
    # 3. Pages 检查
    if not pages["ok"]:
        issues.append(f"❌ GitHub Pages 不可访问 (HTTP {pages['status']})")
    success = len([i for i in issues if i.startswith("❌")]) == 0
    return success, issues


def load_history() -> list:
    if HISTORY_FILE.exists():
        try:
            return json.loads(HISTORY_FILE.read_text(encoding="utf-8"))
        except Exception:
            return []
    return []


def render_status_page(history: list) -> str:
    lines = [
        "# Pipeline 运行历史",
        "",
        "记录每次 GitHub Actions 自动运行的结果，作为仓库记忆（Repository Memory）。",
        "",
        "**成功标准**：① Actions 全部 job 无错误 &nbsp; ② 脚本有安全检查结果 &nbsp; ③ GitHub Pages 可访问",
        "",
    ]
    if not history:
        lines += ["> 暂无运行记录。", ""]
        return "\n".join(lines)

    # 趋势统计
    recent = history[-10:]
    success_rate = sum(1 for r in recent if r.get("success")) / len(recent) * 100
    total_scripts = history[-1].get("discovered", {}).get("total", 0) + history[-1].get("managed", {}).get("total", 0)
    lines += [
        f"> 最近 {len(recent)} 次运行成功率：**{success_rate:.0f}%** &nbsp;｜&nbsp; "
        f"当前脚本总数：**{total_scripts}** 个",
        "",
    ]

    lines += ["| # | 时间 | 结果 | 托管 | 发现 | Pages | 问题 |",
              "|:-:|:-----|:----:|:----:|:----:|:-----:|:-----|"]
    for rec in reversed(history[-30:]):
        num = rec.get("run_number", "?")
        ts = rec.get("timestamp", "")[:16].replace("T", " ")
        success = rec.get("success", False)
        result = "✅ 成功" if success else "❌ 失败"
        m = rec.get("managed", {})
        d = rec.get("discovered", {})
        pages_ok = "✅" if rec.get("pages", {}).get("ok") else "❌"
        m_str = f"{m.get('total',0)}脚本/{m.get('with_security',0)}安全"
        d_str = f"{d.get('total',0)}脚本/{d.get('with_security',0)}安全"
        issues_str = "; ".join(rec.get("issues", [])) or "—"
        lines.append(f"| {num} | {ts} | {result} | {m_str} | {d_str} | {pages_ok} | {issues_str} |")
    lines.append("")

    # 最新一条详情
    latest = history[-1]
    lines += [
        "## 最新运行详情",
        "",
        f"- **运行编号**：#{latest.get('run_number', '?')}",
        f"- **运行 ID**：`{latest.get('run_id', '?')}`",
        f"- **时间**：{latest.get('timestamp', '?')}",
        f"- **结果**：{'✅ 成功' if latest.get('success') else '❌ 失败'}",
        f"- **Pages**：[{PAGES_URL}]({PAGES_URL}) — HTTP {latest.get('pages', {}).get('status', '?')}",
        "",
        "### 脚本数量趋势",
        "",
    ]
    # 展示最近5次的脚本数量变化
    for rec in history[-5:]:
        d_total = rec.get("discovered", {}).get("total", 0)
        m_total = rec.get("managed", {}).get("total", 0)
        ts_short = rec.get("timestamp", "")[:10]
        lines.append(f"- `{ts_short}` 运行 #{rec.get('run_number','?')}：托管 {m_total} + 发现 {d_total} = **{m_total+d_total}** 个")
    lines.append("")

    lines += ["### 风险分布（发现脚本）", ""]
    risk = latest.get("discovered", {}).get("risk", {})
    for level in ["CRITICAL", "HIGH", "MEDIUM", "LOW", "SAFE", "UNKNOWN"]:
        cnt = risk.get(level, 0)
        if cnt:
            icons = {"CRITICAL": "⛔", "HIGH": "🔴", "MEDIUM": "🟠", "LOW": "🟡", "SAFE": "✅", "UNKNOWN": "⬜"}
            lines.append(f"- {icons.get(level, '')} **{level}**：{cnt} 个")
    lines.append("")
    return "\n".join(lines)


def main():
    run_id = os.environ.get("GITHUB_RUN_ID", "local")
    run_number = os.environ.get("GITHUB_RUN_NUMBER", "0")

    print("📊 统计脚本数量...")
    managed = count_scripts(REPO_ROOT / "userscripts" / "managed")
    discovered = count_scripts(REPO_ROOT / "userscripts" / "discovered")

    print(f"  托管: {managed['total']} 脚本, {managed['with_security']} 安全结果")
    print(f"  发现: {discovered['total']} 脚本, {discovered['with_security']} 安全结果")

    print(f"🌐 检查 GitHub Pages: {PAGES_URL}")
    pages = check_pages(PAGES_URL)
    print(f"  HTTP {pages['status']} — {'✅ 可访问' if pages['ok'] else '❌ 不可访问'}")

    success, issues = evaluate_success(managed, discovered, pages)
    print(f"\n{'✅ 本次运行：成功' if success else '❌ 本次运行：失败'}")
    for issue in issues:
        print(f"  {issue}")

    record = {
        "run_id": run_id,
        "run_number": int(run_number),
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "success": success,
        "managed": managed,
        "discovered": discovered,
        "pages": pages,
        "issues": issues,
    }

    history = load_history()
    history.append(record)
    HISTORY_FILE.write_text(json.dumps(history, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n💾 历史记录已更新：{HISTORY_FILE} (共 {len(history)} 条)")

    STATUS_DIR.mkdir(parents=True, exist_ok=True)
    status_page = STATUS_DIR / "index.md"
    status_page.write_text(render_status_page(history), encoding="utf-8")
    print(f"📄 状态页已生成：{status_page}")

    if not success:
        sys.exit(1)


if __name__ == "__main__":
    main()
