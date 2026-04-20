"""
analyze_userscript_security.py
───────────────────────────────
对 userscripts/managed/ 和 userscripts/discovered/ 下的所有脚本进行安全分析，
将分析结果保存到对应的 .security.json 文件，并更新 docs/ 中对应文档的安全分析区块。

用法：
  MODE=managed  python scripts/analyze_userscript_security.py   # 分析托管脚本
  MODE=discovered python scripts/analyze_userscript_security.py # 分析发现脚本
"""

from __future__ import annotations

import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO_ROOT / ".github" / "scripts"))

from ai_models import create_models_client, request_from_prompt  # noqa: E402

PROMPT_FILE = REPO_ROOT / ".github" / "prompts" / "analyze-userscript-security.prompt.yml"
MODEL = "openai/gpt-4.1"

RISK_BADGE = {
    "SAFE": "🟢 SAFE",
    "LOW": "🟡 LOW",
    "MEDIUM": "🟠 MEDIUM",
    "HIGH": "🔴 HIGH",
    "CRITICAL": "⛔ CRITICAL",
}

SEVERITY_ORDER = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3}


def build_security_block(result: dict) -> str:
    """渲染安全分析 Markdown 区块（用于替换文档中的对应区块）。"""
    risk = result.get("risk_level", "UNKNOWN")
    badge = RISK_BADGE.get(risk, risk)
    summary = result.get("summary", "")
    analyzed_at = result.get("analyzed_at", "")[:10]
    score = result.get("security_score")
    issues = sorted(result.get("issues", []), key=lambda x: SEVERITY_ORDER.get(x.get("severity", "LOW"), 99))
    data_tx = result.get("data_transmission", {})
    privacy = result.get("privacy_collection", {})

    score_str = f"　　**安全评分**：{int(score)}/100" if score is not None else ""
    lines = [
        "## 安全分析",
        "",
        f"**风险等级**：{badge}{score_str}　　**分析时间**：{analyzed_at}",
        "",
        f"> {summary}",
        "",
    ]

    # 全面检查结果速览
    dt_icon = "✅ 未检测到" if not data_tx.get("detected") else f"❌ 检测到（目标：{', '.join(data_tx.get('destinations', [])[:3])}）"
    pv_icon = "✅ 未检测到" if not privacy.get("detected") else f"❌ 检测到（{', '.join(privacy.get('details', [])[:3])}）"
    ob_icon = "❌ 检测到" if result.get("obfuscation_detected") else "✅ 未检测到"
    ws_icon = "⚠️ 使用" if result.get("websocket_usage") else "✅ 未使用"
    xss_icon = "❌ 存在风险" if result.get("dom_xss_risk") else "✅ 未检测到"
    sc_icon = "⚠️ 存在风险" if result.get("supply_chain_risk") else "✅ 可信"
    lines += [
        "| 检查项 | 结果 |",
        "|--------|------|",
        f"| 数据外传 | {dt_icon} |",
        f"| 隐私采集 | {pv_icon} |",
        f"| 代码混淆 | {ob_icon} |",
        f"| WebSocket/SSE | {ws_icon} |",
        f"| DOM XSS 风险 | {xss_icon} |",
        f"| 供应链风险 | {sc_icon} |",
        "",
    ]

    if issues:
        lines.append("### 发现的问题")
        lines.append("")
        for issue in issues:
            sev = issue.get("severity", "")
            badge_icon = {"CRITICAL": "⛔", "HIGH": "🔴", "MEDIUM": "🟠", "LOW": "🟡"}.get(sev, "ℹ️")
            lines.append(f"**{badge_icon} {sev}** — {issue.get('type', '')}  ")
            lines.append(f"> {issue.get('description', '')}  ")
            loc = issue.get("location", "")
            if loc:
                lines.append(f"> 位置：{loc}  ")
            rec = issue.get("recommendation", "")
            if rec:
                lines.append(f"> 建议：{rec}")
            lines.append("")
    else:
        lines += ["### 未发现安全问题 ✅", ""]

    return "\n".join(lines)


SECURITY_BLOCK_RE = re.compile(r"## 安全分析\n.+?(?=\n## |\n---|\Z)", re.S)


def update_doc_security(doc_file: Path, security_block: str) -> None:
    """将安全分析区块插入/替换到文档中。"""
    if not doc_file.exists():
        return
    content = doc_file.read_text(encoding="utf-8")
    if SECURITY_BLOCK_RE.search(content):
        content = SECURITY_BLOCK_RE.sub(security_block, content, count=1)
    else:
        # 在文档末尾追加
        content = content.rstrip() + "\n\n" + security_block + "\n"
    doc_file.write_text(content, encoding="utf-8")


def analyze_script(client, slug: str, script_file: Path, meta_file: Path, doc_file: Path) -> None:
    code = script_file.read_text(encoding="utf-8", errors="replace")
    meta = {}
    if meta_file.exists():
        meta = json.loads(meta_file.read_text(encoding="utf-8"))

    metadata_raw = meta.get("metadata_raw", code[:500])
    script_name = meta.get("name", slug)

    print(f"  → Analyzing {slug}...", flush=True)
    try:
        raw = request_from_prompt(
            client=client,
            model=MODEL,
            prompt_path=PROMPT_FILE,
            variables={
                "script_name": script_name,
                "metadata": metadata_raw,
                "full_code": code[:10000],  # 增加到 10k 以分析更完整
            },
            max_tokens=4000,
        )
        result = json.loads(raw)
    except Exception as exc:
        print(f"    ✗ AI call failed: {exc}", flush=True)
        return

    # 为新字段设置默认值（兼容旧格式）
    result.setdefault("security_score", None)
    result.setdefault("obfuscation_detected", False)
    result.setdefault("websocket_usage", False)
    result.setdefault("dom_xss_risk", False)
    result.setdefault("supply_chain_risk", False)

    result["analyzed_at"] = datetime.now(timezone.utc).isoformat()
    result["slug"] = slug

    # 保存安全报告
    security_file = script_file.parent / f"{slug}.security.json"
    security_file.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")

    # 更新文档
    security_block = build_security_block(result)
    update_doc_security(doc_file, security_block)

    risk = result.get("risk_level", "?")
    print(f"    ✓ Risk: {risk} → saved to {security_file.name}", flush=True)


def main() -> None:
    mode = os.environ.get("MODE", "managed")  # managed | discovered

    scripts_dir = REPO_ROOT / "userscripts" / mode
    docs_dir = REPO_ROOT / "docs" / mode

    if not scripts_dir.exists():
        print(f"Scripts dir not found: {scripts_dir}", flush=True)
        return

    script_files = list(scripts_dir.glob("*.user.js"))
    if not script_files:
        print(f"No .user.js files found in {scripts_dir}", flush=True)
        return

    client, token_source = create_models_client()
    print(f"Mode: {mode} | Token: {token_source} | Scripts: {len(script_files)}", flush=True)

    for script_file in sorted(script_files):
        slug = script_file.stem.replace(".user", "")
        meta_file = scripts_dir / f"{slug}.meta.json"
        doc_file = docs_dir / f"{slug}.md"
        analyze_script(client, slug, script_file, meta_file, doc_file)

    print(f"\n✅ Security analysis complete for {len(script_files)} script(s).", flush=True)


if __name__ == "__main__":
    main()
