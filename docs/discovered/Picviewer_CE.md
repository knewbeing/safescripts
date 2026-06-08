---
title: "Picviewer CE+"
---

# Picviewer CE+



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Picviewer_CE.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2026.2.6.1**　　发现时间：**2026-05-04**　　来源：[GreasyFork](https://greasyfork.org/scripts/24204-picviewer-ce) <Badge type="tip" text="GreasyFork" />　　安装量：**304,098**　　评分：👍1370 / 👎1

## 功能介绍



## 适用网站

- 通用

## 使用方法

- 请参阅脚本说明

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：52/100　　**分析时间**：2026-06-08

> Picviewer CE+ requests broad network access (@connect *) and high-privilege grants, which pose significant security risks if the script or its supply chain is compromised. No direct evidence of privacy-invasive behavior or obfuscation is found in the provided code, but the supply chain risk and permission overuse lower the overall security. Restrict network permissions, minimize grants, and pin third-party dependencies to improve security.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：www.google.com, www.google.com.hk, www.google.co.jp） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script requests broad network access via @connect *, allowing GM_xmlhttpRequest to any domain. This is a critical risk for data exfiltration if the script is compromised.  
> 位置：Metadata block (@connect *)  
> 建议：Restrict @connect to only necessary domains. Remove or avoid using wildcard.

**🟠 MEDIUM** — Permission Overuse  
> The script requests high-privilege grants such as GM_download, GM_openInTab, unsafeWindow, and GM_setClipboard, but not all are clearly used in the provided code. Over-privileged grants increase attack surface.  
> 位置：Metadata block (@grant ...)  
> 建议：Only request permissions that are strictly necessary for script functionality.

**🟠 MEDIUM** — Supply Chain Risk  
> The script uses @require to load external scripts from update.greasyfork.org, but does not pin to a specific version hash. This introduces supply chain risk if the remote script is updated or compromised.  
> 位置：Metadata block (@require ...)  
> 建议：Pin @require URLs to specific, immutable versions or hashes. Regularly audit third-party code.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/24204-picviewer-ce)*
