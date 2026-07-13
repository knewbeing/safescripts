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

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-07-13

> This script is HIGH RISK. It references and likely communicates with third-party servers (duolingopro.net, api.duolingopro.net), reads cookies, and contains UI for feedback and server-side actions. These behaviors present critical privacy and data exfiltration risks. The script is not obfuscated and does not request dangerous permissions, but the use of non-official domains for updates and icons increases supply chain risk. Do NOT use this script unless you fully trust the author and infrastructure. The security score is 50 due to multiple CRITICAL and MEDIUM issues. Full code review is recommended to identify further risks.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://www.duolingopro.net, https://api.duolingopro.net） |
| 隐私采集 | ❌ 检测到（Reads document.cookie for 'lang' value） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration / Third-party Communication  
> The script defines server endpoints (https://www.duolingopro.net, https://api.duolingopro.net) and contains UI text referencing feedback submission, XP/gem redemption, and server-side processing. This strongly indicates network requests and user data transmission to third-party servers, even though the code is incomplete and the actual request logic is not shown in the snippet.  
> 位置：Global scope, variables 'serverURL', 'apiURL', UI text, and feedback logic  
> 建议：Do not use scripts that transmit user data or interact with third-party APIs unless you fully trust the source. Review the full code for explicit network request functions (fetch, GM_xmlhttpRequest, etc.) and block or remove them if privacy is a concern.

**⛔ CRITICAL** — Privacy Collection  
> The script reads document.cookie to extract the 'lang' value, which may include session or authentication information depending on the site's implementation.  
> 位置：let systemLanguage = document.cookie.split('; ').find(row => row.startsWith('lang=')).split('=')[1];  
> 建议：Avoid reading cookies unless absolutely necessary. Ensure no sensitive information is read or transmitted. Review for further cookie or storage access in the full code.

**🔴 HIGH** — Remote Code Execution Risk  
> The script is not minified or obfuscated, but the code is incomplete. No eval, Function constructor, or dynamic script loading is visible in the provided snippet.  
> 位置：N/A (based on provided code)  
> 建议：Review the full code for any use of eval, new Function, setTimeout(string), or dynamic script injection. Avoid such patterns.

**🟠 MEDIUM** — Permission Usage  
> The script requests only GM_log permission, which is not dangerous. No excessive or unused permissions are declared.  
> 位置：@grant GM_log  
> 建议：Keep permissions minimal. No action needed unless further permissions are added in the full code.

**🟠 MEDIUM** — Supply Chain Risk  
> The script references external resources (icon, download/update URLs) from duolingopro.net, which is not an official Duolingo domain. This presents a supply chain risk if the domain is compromised or malicious.  
> 位置：@icon, @downloadURL, @updateURL  
> 建议：Only use scripts and resources from trusted and official sources. Avoid third-party script loaders unless you can verify their integrity.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/473310-duolingo-pro)*
