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

**风险等级**：⛔ CRITICAL　　**安全评分**：0/100　　**分析时间**：2026-06-08

> This script presents critical security and privacy risks. It is designed to interact with external servers for core features, likely transmitting user data to third-party domains. It reads cookies and uses browser APIs that can be used for fingerprinting. The lack of visible network request code in the snippet does not mitigate these risks, as the UI and feature set imply such behavior. The script should not be considered safe for use without a full code review and explicit user consent for any data transmission. Supply chain risks are present due to non-pinned update URLs. No evidence of code obfuscation or DOM XSS in the provided snippet, but further review is needed for the complete script.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://www.duolingopro.net, https://api.duolingopro.net） |
| 隐私采集 | ❌ 检测到（Reads document.cookie for 'lang' value, Uses navigator.language and Intl.Locale for region detection） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script defines and uses external server URLs (https://www.duolingopro.net, https://api.duolingopro.net) and contains UI text referencing feedback submission, XP/gem redemption, and server-side processing. This strongly suggests network requests and user data transmission to third-party servers, even though the actual network request code is not present in the provided snippet. The script is designed to interact with external APIs for core features.  
> 位置：Global scope, variables serverURL/apiURL, UI text, and feature descriptions  
> 建议：Explicitly review all network request code (fetch, XMLHttpRequest, GM_xmlhttpRequest, WebSocket, etc.) and ensure no sensitive user data is transmitted without user consent. Remove or clearly disclose any telemetry or data collection.

**⛔ CRITICAL** — Privacy Collection  
> The script reads document.cookie to extract the 'lang' value for localization. This is a privacy-sensitive operation, as cookies may contain session or authentication data.  
> 位置：let systemLanguage = document.cookie.split('; ').find(row => row.startsWith('lang=')).split('=')[1];  
> 建议：Avoid reading cookies unless strictly necessary. Do not transmit cookie values to external servers. Limit access to only non-sensitive cookie keys.

**🔴 HIGH** — Privacy Collection  
> The script uses navigator.language and Intl.Locale to infer region and measurement system, which can be used for fingerprinting.  
> 位置：const region = new Intl.Locale(navigator.language).maximize().region;  
> 建议：Minimize use of browser fingerprinting APIs. Do not transmit this information to external servers unless essential for functionality.

**🔴 HIGH** — Remote Code Execution  
> The script does not appear to use eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection in the provided code. However, the code is incomplete and further review is needed for the full implementation.  
> 位置：N/A (based on provided snippet)  
> 建议：Ensure no dynamic code execution or remote script loading is present in the full script.

**🔴 HIGH** — Code Obfuscation  
> The script is not minified or obfuscated in the provided snippet. However, the full script should be checked for obfuscation techniques such as base64 decoding, string array mapping, or unicode escapes.  
> 位置：N/A (based on provided snippet)  
> 建议：Avoid code obfuscation. Publish readable source code for transparency.

**🟠 MEDIUM** — Permission Abuse  
> The script only requests the GM_log permission, which is not excessive. No evidence of permission abuse in the provided snippet.  
> 位置：@grant GM_log  
> 建议：Limit permissions to only those required. Avoid requesting high-risk permissions such as GM_xmlhttpRequest, GM_download, or GM_openInTab unless necessary.

**🟠 MEDIUM** — Supply Chain Risk  
> The script uses @require and @updateURL pointing to greasyfork.org, which is a trusted source. However, the download/update URLs are not version-pinned, which could allow supply chain attacks if the remote file is compromised.  
> 位置：@downloadURL, @updateURL  
> 建议：Pin @require URLs to specific versions or hashes. Monitor for supply chain risks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/473310-duolingo-pro)*
