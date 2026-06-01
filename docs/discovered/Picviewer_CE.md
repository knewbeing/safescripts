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

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-06-01

> Picviewer CE+ requests broad network access (@connect *) and several high-privilege grants, which increases the risk of data exfiltration and abuse if the script or its dependencies are compromised. No direct privacy collection or DOM XSS risks were found in the provided code. The script is not obfuscated. Supply chain risk exists due to external dependencies not being pinned with integrity hashes. Restrict network permissions, minimize grants, and pin dependencies to improve security.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：*, www.google.com, www.google.com.hk） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script requests broad network access via @connect *, allowing GM_xmlhttpRequest to any domain. This can be abused for data exfiltration.  
> 位置：Metadata block (@connect *)  
> 建议：Restrict @connect to only necessary domains. Remove wildcard if not strictly needed.

**🟠 MEDIUM** — Permission Overuse  
> The script requests high-privilege grants such as GM_download, GM_openInTab, GM_setClipboard, and unsafeWindow, which can be abused if the script is compromised.  
> 位置：Metadata block (@grant ...)  
> 建议：Only request the minimum necessary permissions. Remove unused or high-risk grants.

**🟠 MEDIUM** — Supply Chain Risk  
> The script loads external dependencies via @require from update.greasyfork.org, which is generally trusted but not version-pinned with integrity hashes.  
> 位置：Metadata block (@require ...)  
> 建议：Pin dependencies to specific versions and verify their integrity. Consider using official CDNs with SRI hashes if possible.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/24204-picviewer-ce)*
