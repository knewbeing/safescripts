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

**风险等级**：⛔ CRITICAL　　**安全评分**：25/100　　**分析时间**：2026-06-01

> This script defines and likely uses third-party endpoints (duolingopro.net, api.duolingopro.net) for core functionality, which presents a critical risk of user data exfiltration. It reads cookies and browser locale, which are privacy-sensitive. The script's purpose (XP farming, free gems, etc.) and the presence of external API endpoints strongly suggest that user actions and possibly authentication data are transmitted to these servers. The script is not obfuscated in the provided snippet, but the code is incomplete. There is no evidence of DOM XSS or dynamic code execution in the visible code, but the overall risk is CRITICAL due to data exfiltration and privacy collection. Use with extreme caution.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://www.duolingopro.net, https://api.duolingopro.net） |
| 隐私采集 | ❌ 检测到（Reads document.cookie for 'lang' value, Reads navigator.language and infers region） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script defines external server endpoints (duolingopro.net, api.duolingopro.net) and references them as API endpoints. Although the code snippet is incomplete, the presence of these endpoints and the script's description (XP farming, gems, etc.) strongly suggest network requests to these third-party servers, likely transmitting user actions or data.  
> 位置：Global scope, variables serverURL and apiURL  
> 建议：Review all network requests. Do not transmit user data or authentication tokens to third-party servers unless strictly necessary and with user consent.

**⛔ CRITICAL** — Privacy Collection  
> Script reads document.cookie to extract the 'lang' value. This is a privacy-sensitive operation, as cookies may contain session or user information.  
> 位置：let systemLanguage = document.cookie.split('; ').find(row => row.startsWith('lang=')).split('=')[1];  
> 建议：Limit cookie access to only necessary keys. Do not transmit cookie values externally.

**🔴 HIGH** — Privacy Collection  
> Script uses navigator.language and Intl.Locale to infer user region and measurement system. While not highly sensitive, this is a form of browser fingerprinting.  
> 位置：const region = new Intl.Locale(navigator.language).maximize().region;  
> 建议：Avoid collecting unnecessary browser fingerprinting data unless required for functionality.

**🔴 HIGH** — Obfuscation  
> Script is not minified or obfuscated, but the code is incomplete. If the rest of the script contains obfuscated or minified code, this would increase risk.  
> 位置：N/A (based on provided code)  
> 建议：Avoid code obfuscation. Publish readable source code for transparency.

**🔴 HIGH** — Remote Code Execution  
> Script does not use eval, new Function, or dynamic script injection in the provided snippet. However, the script is incomplete and may contain such patterns elsewhere.  
> 位置：N/A (based on provided code)  
> 建议：Avoid dynamic code execution. Only use static, auditable code.

**🟠 MEDIUM** — Supply Chain Risk  
> Script references external download and update URLs (GreasyFork). Supply chain risk is low if only official sources are used, but if the script or its dependencies are loaded from duolingopro.net, risk increases.  
> 位置：@downloadURL, @updateURL  
> 建议：Pin dependencies to specific versions and use trusted CDNs only.

**🟡 LOW** — Permission Usage  
> @grant only requests GM_log, which is low risk. No evidence of permission abuse in the provided code.  
> 位置：Metadata block  
> 建议：Only request permissions actually used by the script.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/473310-duolingo-pro)*
