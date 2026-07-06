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

**风险等级**：⛔ CRITICAL　　**安全评分**：25/100　　**分析时间**：2026-07-06

> This script presents CRITICAL risks due to likely transmission of user data and actions to third-party servers (duolingopro.net, api.duolingopro.net), direct access to document.cookie, and possible DOM XSS vulnerabilities. The script's features (XP farming, gems, server-side processing) imply extensive interaction with external endpoints, raising privacy and data exfiltration concerns. No evidence of code obfuscation or supply chain risk, but the overall risk is CRITICAL and the script is NOT APPROVED for safe use.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://www.duolingopro.net, https://api.duolingopro.net） |
| 隐私采集 | ❌ 检测到（Reads document.cookie for language setting） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ❌ 存在风险 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script defines external server endpoints (duolingopro.net, api.duolingopro.net) and references server-side processing for XP, gems, and other features. This strongly suggests user data or actions are transmitted to third-party servers.  
> 位置：Global variables and feature descriptions  
> 建议：Review all network requests and ensure no sensitive user data is transmitted. Avoid sending cookies, authentication tokens, or personal information to third-party servers.

**⛔ CRITICAL** — Privacy Collection  
> Script reads document.cookie to extract language settings. This is a privacy-sensitive operation and may expose session or authentication data if transmitted externally.  
> 位置：let systemLanguage = document.cookie.split('; ').find(row => row.startsWith('lang=')).split('=')[1];  
> 建议：Do not transmit cookie values to external servers. Limit cookie access to only non-sensitive data.

**⛔ CRITICAL** — Data Exfiltration  
> Script references server-side processing for 'instant results' and 'auto-solved lessons', implying possible transmission of user actions or progress to external servers.  
> 位置：Feature descriptions and variable usage  
> 建议：Ensure only minimal, non-sensitive data is sent. Provide transparency to users about what is transmitted.

**🔴 HIGH** — DOM XSS  
> Script inserts HTML strings containing user-facing messages, including dynamic content (e.g., XP amounts, time messages) into the DOM. If these values are derived from user input or URL parameters, there is a risk of DOM XSS.  
> 位置：systemText object and HTML insertion  
> 建议：Sanitize all dynamic content before inserting into the DOM. Avoid using innerHTML with untrusted data.

**🔴 HIGH** — Privacy Collection  
> Script reads document.cookie directly, which is a privacy-sensitive operation.  
> 位置：let systemLanguage = document.cookie.split('; ').find(row => row.startsWith('lang=')).split('=')[1];  
> 建议：Limit cookie access and avoid transmitting cookie values externally.

**🔴 HIGH** — Data Transmission  
> Script defines external endpoints for server communication, but does not show explicit fetch/XMLHttpRequest code in the provided snippet. However, the feature descriptions and variable names strongly imply network requests.  
> 位置：serverURL, apiURL variables  
> 建议：Explicitly review all network request code for data leakage.

**🟡 LOW** — Obfuscation  
> No evidence of code obfuscation, eval, or dynamic script loading in the provided snippet.  
> 位置：General code structure  
> 建议：Continue to avoid obfuscation and dynamic code execution.

**🟡 LOW** — Supply Chain  
> No evidence of supply chain risk (@require not used for third-party libraries).  
> 位置：Metadata block  
> 建议：If adding external libraries, use official CDNs and fixed versions.

**🟡 LOW** — Sensitive API  
> No evidence of WebSocket usage, clipboard access, geolocation, or other sensitive APIs in the provided snippet.  
> 位置：General code structure  
> 建议：Avoid using sensitive APIs unless strictly necessary.

**🟡 LOW** — Permission Usage  
> Script only requests GM_log permission, which is not high risk.  
> 位置：Metadata block  
> 建议：Do not request unnecessary permissions.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/473310-duolingo-pro)*
