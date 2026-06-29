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

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-06-29

> This script presents critical security and privacy risks. It transmits data to third-party servers (duolingopro.net, api.duolingopro.net), reads cookies, and references external resources not controlled by the official Duolingo team. These behaviors expose users to data exfiltration, privacy violations, and supply chain attacks. The script does not appear to be obfuscated or to execute remote code, but the incomplete code prevents a full assessment. Use of this script is not recommended for security-conscious users.

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
> The script defines and uses external server URLs (https://www.duolingopro.net, https://api.duolingopro.net) for communication. Although the code is incomplete, the presence of these URLs and references to 'connecting', 'feedback', and 'update' strongly suggest network requests to third-party servers, likely for XP/gem farming and feedback submission. This constitutes data exfiltration to a third-party server.  
> 位置：Global scope, variables 'serverURL', 'apiURL', and text strings referencing feedback and updates  
> 建议：Remove or strictly limit all network requests to third-party servers. If necessary, ensure only non-sensitive, non-personal data is transmitted, and inform users transparently.

**⛔ CRITICAL** — Privacy Collection  
> The script reads document.cookie to extract the 'lang' value, which may include session or authentication information depending on the site's implementation. This is a privacy risk, especially if combined with network transmission.  
> 位置：let systemLanguage = document.cookie.split('; ').find(row => row.startsWith('lang=')).split('=')[1];  
> 建议：Avoid reading cookies unless absolutely necessary. Never transmit cookie values to third-party servers.

**🔴 HIGH** — Remote Code Execution  
> The script is not minified or obfuscated, but the code is incomplete. No evidence of eval, new Function, or dynamic script injection is present in the provided code.  
> 位置：N/A  
> 建议：Continue to avoid obfuscation and dynamic code execution.

**🔴 HIGH** — DOM XSS  
> No evidence of DOM XSS or direct user input injection into the DOM is present in the provided code.  
> 位置：N/A  
> 建议：Always sanitize user input before inserting into the DOM.

**🟠 MEDIUM** — Permission Usage  
> The script only requests GM_log permission, which is low risk and appropriate for its functionality. No evidence of permission abuse.  
> 位置：// @grant GM_log  
> 建议：Only request permissions that are strictly necessary.

**🟠 MEDIUM** — Supply Chain Risk  
> The script references external resources (icon, update/download URLs) hosted on duolingopro.net and greasyfork.org. These are not official Duolingo domains, introducing supply chain risk if these resources are compromised.  
> 位置：@icon, @downloadURL, @updateURL, serverURL, apiURL  
> 建议：Host resources on trusted, official CDNs and pin versions where possible. Avoid loading code from untrusted or variable URLs.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/473310-duolingo-pro)*
