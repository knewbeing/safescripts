---
title: "多邻国PRO增强版"
---

# 多邻国PRO增强版

`多邻国`  `学习辅助`  `自动化`  `经验值`  `刷宝石`  `高级功能`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Duolingo_PRO.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.1BETA.04.5**　　发现时间：**2026-05-18**　　来源：[GreasyFork](https://greasyfork.org/scripts/473310-duolingo-pro) <Badge type="tip" text="GreasyFork" />　　安装量：**49,671**　　评分：👍150 / 👎34

## 功能介绍

本脚本可帮助用户在多邻国网站上快速刷取经验值（XP），免费获取宝石和高级功能（如Duolingo Max）。适用于多邻国国际站和中国站。安装后可自动提升学习进度，节省大量时间。

## 适用网站

- 多邻国国际站
- 多邻国中国站

## 使用方法

1. 1. 安装脚本后，打开多邻国官网或中国站。
2. 2. 登录你的多邻国账号。
3. 3. 脚本会自动运行，无需手动操作，即可体验加速刷经验和免费宝石等功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_log` | 用于在控制台输出调试信息，方便开发者排查问题。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-05-18

> This script defines external server endpoints and references features that likely transmit user data to third-party servers, which is a critical risk. It also reads cookies, which may contain sensitive information. The script is not obfuscated and requests minimal permissions, but the incomplete code prevents a full review. There are also supply chain risks due to remote update URLs. Use of this script is NOT recommended without further review and mitigation of data exfiltration and privacy risks.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://www.duolingopro.net, https://api.duolingopro.net） |
| 隐私采集 | ❌ 检测到（Reads document.cookie for 'lang' value） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script defines external server endpoints (https://www.duolingopro.net, https://api.duolingopro.net) and references feedback/reporting features that likely transmit user data or usage information to these third-party servers. The script also references automatic update and feedback mechanisms that may involve data transmission.  
> 位置：Global scope, variables serverURL and apiURL, and text strings for feedback/reporting  
> 建议：Explicitly review all network requests (fetch, XMLHttpRequest, GM_xmlhttpRequest, etc.) to ensure no sensitive user data, cookies, or page content is transmitted. If possible, restrict or remove third-party data transmission.

**⛔ CRITICAL** — Privacy Collection  
> Script reads document.cookie to extract the 'lang' value, which may include session or authentication information if not properly scoped. This is a privacy risk if combined with network transmission.  
> 位置：let systemLanguage = document.cookie.split('; ').find(row => row.startsWith('lang=')).split('=')[1];  
> 建议：Avoid reading cookies unless strictly necessary. Never transmit cookie values to third-party servers.

**🔴 HIGH** — Incomplete Review  
> Script is not minified or obfuscated, but the code is incomplete and may contain further risks in the omitted sections (e.g., network requests, eval usage, dynamic script loading).  
> 位置：N/A (code incomplete)  
> 建议：Review the complete script for additional risks, especially in network and code execution areas.

**🟠 MEDIUM** — Supply Chain Risk  
> Script references automatic update URLs and feedback/reporting features, which may introduce supply chain risks if the remote server is compromised or serves malicious code in future updates.  
> 位置：// @downloadURL, // @updateURL, feedback/reporting text  
> 建议：Pin update URLs to trusted sources and verify integrity of updates. Avoid auto-updating from untrusted domains.

**🟡 LOW** — Permission Usage  
> @grant only requests GM_log, which is low risk, but the script may still use native APIs for network or storage access. No unnecessary high-privilege grants detected in metadata.  
> 位置：// @grant GM_log  
> 建议：Limit permissions to only those required. Monitor for any future changes in grant usage.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/473310-duolingo-pro)*
