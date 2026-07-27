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

**风险等级**：⛔ CRITICAL　　**安全评分**：25/100　　**分析时间**：2026-07-27

> This script transmits data to third-party servers (duolingopro.net, api.duolingopro.net), reads cookies, and likely collects user input for feedback and auto-update features. There is DOM XSS risk due to unsanitized HTML rendering. No code obfuscation or supply chain risk detected. Security score is critically low due to data exfiltration and privacy collection.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://www.duolingopro.net, https://api.duolingopro.net） |
| 隐私采集 | ❌ 检测到（Reads document.cookie for language setting, Likely collects user feedback and transmits to external server） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ❌ 存在风险 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script defines server endpoints (duolingopro.net, api.duolingopro.net) and references feedback sending, XP/gem redemption, and auto-update features, implying network requests to third-party servers.  
> 位置：Global variables and systemText, feedback, update logic  
> 建议：Review all network requests, ensure no sensitive user data (account, cookies, page content) is transmitted. Avoid sending user data to third-party servers.

**⛔ CRITICAL** — Privacy Collection  
> Script reads document.cookie to extract language setting, which may include session or authentication cookies.  
> 位置：let systemLanguage = document.cookie.split('; ').find(row => row.startsWith('lang=')).split('=')[1];  
> 建议：Avoid reading cookies unless strictly necessary. Never transmit cookies to external servers.

**⛔ CRITICAL** — Privacy Collection  
> Script references feedback sending and auto-update features, which likely involve transmitting user input and possibly page data to external servers.  
> 位置：systemText, feedback logic (SEND, SENDING, SENT, Feedback Sent, Error Sending Feedback)  
> 建议：Ensure user input is not transmitted without explicit consent. Avoid sending page content or sensitive data.

**🔴 HIGH** — DOM XSS  
> Potential DOM XSS risk: systemText includes HTML fragments with user-controlled variables (e.g., {amount}, {timeMessage}) and uses innerHTML for rendering.  
> 位置：systemText, HTML rendering logic  
> 建议：Sanitize all user input and variables before inserting into innerHTML. Use textContent where possible.

**🔴 HIGH** — DOM Manipulation  
> Script uses document.body.appendChild to insert DOM elements for duplicate detection, but does not sanitize input. May be vulnerable if attacker controls attributes.  
> 位置：duplicateDetectionMarker logic  
> 建议：Ensure only trusted values are used for DOM manipulation.

**🟡 LOW** — Obfuscation  
> No evidence of code obfuscation or minification in the provided code.  
> 位置：Global code  
> 建议：Maintain readable, non-obfuscated code for transparency.

**🟡 LOW** — Remote Code Execution  
> No evidence of eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection in the provided code.  
> 位置：Global code  
> 建议：Avoid dynamic code execution.

**🟡 LOW** — Supply Chain  
> No @require third-party libraries or supply chain risk detected in metadata.  
> 位置：Metadata  
> 建议：If adding @require, use official CDN and fixed version.

**🟡 LOW** — Permission Usage  
> Script only requests GM_log permission, which is appropriate and not excessive.  
> 位置：Metadata  
> 建议：Do not request unnecessary permissions.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/473310-duolingo-pro)*
