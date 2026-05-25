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

**风险等级**：⛔ CRITICAL　　**安全评分**：0/100　　**分析时间**：2026-05-25

> This script transmits data to third-party servers (duolingopro.net), reads cookies, and uses browser fingerprinting vectors. It also injects user input into the DOM, creating potential XSS risks. The script is not obfuscated and only requests GM_log permission. Due to critical data exfiltration and privacy collection risks, the script is not approved.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://www.duolingopro.net, https://api.duolingopro.net） |
| 隐私采集 | ❌ 检测到（Reads document.cookie for language, Uses navigator.language and Intl.Locale (fingerprinting)） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ❌ 存在风险 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script defines server endpoints (duolingopro.net, api.duolingopro.net) and references feedback sending, XP/gem requests, and server-side processing. These likely involve transmitting user data, XP/gem requests, and possibly page content to third-party servers.  
> 位置：Global variables and systemText, feedback, XP/gem request logic  
> 建议：Review all network requests for user data leakage; restrict transmission to only necessary, non-sensitive data; disclose all data sent to users.

**⛔ CRITICAL** — Privacy Collection  
> Script reads document.cookie to extract language setting. Potential for reading other cookies, including session/auth tokens.  
> 位置：let systemLanguage = document.cookie.split('; ').find(row => row.startsWith('lang=')).split('=')[1];  
> 建议：Limit cookie access to only non-sensitive values; avoid reading authentication/session cookies.

**🔴 HIGH** — Privacy Collection  
> Script references navigator.language and Intl.Locale, which are browser fingerprinting vectors.  
> 位置：const region = new Intl.Locale(navigator.language).maximize().region;  
> 建议：Avoid collecting fingerprinting information unless strictly necessary; disclose to users.

**🔴 HIGH** — DOM XSS  
> Script uses innerHTML to inject Terms & Conditions and other UI elements, including user-provided feedback. Potential DOM XSS if user input is not sanitized.  
> 位置：systemText, feedback UI, Terms & Conditions display  
> 建议：Sanitize all user input before inserting into DOM via innerHTML.

**🔴 HIGH** — Data Transmission  
> Script defines external server endpoints and likely uses fetch/XMLHttpRequest to communicate with them, but actual network request code is not shown in the snippet.  
> 位置：serverURL, apiURL variables  
> 建议：Ensure all network requests are secure (HTTPS), and avoid sending sensitive user data.

**🟡 LOW** — Obfuscation  
> No evidence of code obfuscation or minification in the provided snippet.  
> 位置：Global code structure  
> 建议：Maintain transparency; avoid obfuscation.

**🟡 LOW** — Remote Code Execution  
> No evidence of eval, new Function, or dynamic script loading in the provided snippet.  
> 位置：Global code structure  
> 建议：Avoid dynamic code execution.

**🟡 LOW** — Permission Usage  
> Script only requests GM_log permission, which is low risk and matches usage.  
> 位置：@grant GM_log  
> 建议：Do not request unnecessary permissions.

**🟡 LOW** — Supply Chain  
> No evidence of supply chain risk (@require) in metadata or code.  
> 位置：Metadata block  
> 建议：If using external libraries, fix version and use trusted sources.

**🟡 LOW** — WebSocket Usage  
> No evidence of WebSocket/EventSource usage in the provided snippet.  
> 位置：Global code structure  
> 建议：Avoid persistent connections unless necessary.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/473310-duolingo-pro)*
