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

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-06-22

> This script presents critical security and privacy risks. It defines and likely uses third-party endpoints (duolingopro.net, api.duolingopro.net) for network communication, which may transmit user data or perform actions on behalf of the user. It reads cookies, which may contain sensitive information. The script's intent to automate Duolingo actions and submit feedback implies further data collection and transmission. The code is not obfuscated, and permissions are minimal, but the supply chain risk remains due to reliance on custom endpoints. The script is NOT approved for safe use.

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
> The script defines server endpoints (https://www.duolingopro.net, https://api.duolingopro.net) and contains UI text referencing feedback submission, XP/gem requests, and server-side processing. This strongly suggests network requests and user data transmission to third-party servers, but the code is incomplete and does not show the actual network request implementation. The intent and endpoints are clear, so this is a critical risk.  
> 位置：Global scope, variables and UI text  
> 建议：Remove or fully disclose all network requests and data sent. Only communicate with trusted, official endpoints. Inform users about all data transmissions.

**⛔ CRITICAL** — Privacy Collection  
> The script reads document.cookie to extract the 'lang' value, which may include sensitive user information if other cookies are present. This is a privacy risk, especially if combined with network transmission.  
> 位置：let systemLanguage = document.cookie.split('; ').find(row => row.startsWith('lang=')).split('=')[1];  
> 建议：Avoid reading cookies unless absolutely necessary. Never transmit cookie values to third-party servers.

**🔴 HIGH** — Remote Code Execution (Potential)  
> The script is not minified or obfuscated, but the code is incomplete. If the rest of the script contains eval, new Function, or dynamic script loading, there could be remote code execution risk. The presence of server endpoints and references to 'server-side processing' increases this risk, but cannot be confirmed with the provided code.  
> 位置：N/A (incomplete code)  
> 建议：Review the full script for eval, new Function, or dynamic script loading. Avoid executing remote code unless integrity is verifiable.

**🟠 MEDIUM** — Supply Chain Risk  
> The script uses @downloadURL and @updateURL pointing to greasyfork.org, which is a trusted source. However, the main server endpoints for API and UI are custom domains (duolingopro.net), which may pose supply chain risks if those endpoints are compromised.  
> 位置：// @downloadURL ... // @updateURL ... serverURL/apiURL variables  
> 建议：Ensure all third-party code and endpoints are trustworthy and use subresource integrity or version pinning where possible.

**🟡 LOW** — Permission Usage  
> The script requests only GM_log permission, which is appropriate. No excessive permissions detected in metadata.  
> 位置：// @grant GM_log  
> 建议：Continue to request only necessary permissions.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/473310-duolingo-pro)*
