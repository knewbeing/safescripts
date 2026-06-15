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

**风险等级**：⛔ CRITICAL　　**安全评分**：25/100　　**分析时间**：2026-06-15

> Duolingo PRO script transmits data to third-party servers (duolingopro.net, api.duolingopro.net), reads cookies, and references server-side processing for user actions. These behaviors pose critical risks of data exfiltration and privacy violation. No evidence of code obfuscation, remote code execution, DOM XSS, or supply chain risk in the visible code. Permission usage is minimal. The script is NOT approved for safe use.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://www.duolingopro.net, https://api.duolingopro.net） |
| 隐私采集 | ❌ 检测到（Reads document.cookie for language setting, Uses navigator.language and Intl.Locale for region detection, Uses crypto.getRandomValues for duplicate detection marker） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script defines server endpoints (duolingopro.net, api.duolingopro.net) and references server-side processing for XP, gems, and other features. This strongly suggests user data or actions are transmitted to third-party servers.  
> 位置：Global variables and feature descriptions  
> 建议：Review all network requests and ensure no sensitive user data is transmitted. Avoid sending cookies, authentication tokens, or personal information to third-party servers.

**⛔ CRITICAL** — Privacy Collection  
> Script reads document.cookie to extract language settings. While not directly exfiltrated in the visible code, this is a privacy-sensitive operation.  
> 位置：let systemLanguage = document.cookie.split('; ').find(row => row.startsWith('lang=')).split('=')[1];  
> 建议：Do not read cookies unless strictly necessary. Ensure no sensitive cookies (e.g., session/auth tokens) are accessed or transmitted.

**⛔ CRITICAL** — Data Exfiltration  
> Script references server-side processing for 'instant results powered by server-side processing' and 'auto-solved lessons', implying possible transmission of user actions or progress to external servers.  
> 位置：systemText.en[61]  
> 建议：Clarify what data is sent to external servers. Avoid sending user progress, answers, or authentication data.

**🔴 HIGH** — Remote Code Execution  
> No evidence of eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection in the visible code.  
> 位置：Full script up to provided cutoff  
> 建议：Avoid dynamic code execution. If used elsewhere, review carefully.

**🔴 HIGH** — Code Obfuscation  
> No evidence of code obfuscation, base64 decoding, or unicode string mangling in the visible code.  
> 位置：Full script up to provided cutoff  
> 建议：Keep code readable and avoid obfuscation.

**🔴 HIGH** — DOM XSS  
> No evidence of DOM XSS or unsafe innerHTML/outerHTML usage in the visible code.  
> 位置：Full script up to provided cutoff  
> 建议：Sanitize all user input before inserting into DOM.

**🟠 MEDIUM** — Privacy Collection  
> Script uses navigator.language and Intl.Locale to determine region, which is a minor fingerprinting vector.  
> 位置：const region = new Intl.Locale(navigator.language).maximize().region;  
> 建议：Avoid collecting browser locale or fingerprinting information unless necessary.

**🟠 MEDIUM** — Sensitive API Usage  
> No evidence of sensitive API usage (geolocation, RTCPeerConnection, MediaDevices, Clipboard, Notification) in the visible code.  
> 位置：Full script up to provided cutoff  
> 建议：Avoid using sensitive APIs unless strictly necessary.

**🟠 MEDIUM** — Supply Chain Risk  
> No @require third-party libraries or supply chain risk in metadata.  
> 位置：Metadata block  
> 建议：If using external libraries, ensure they are from trusted sources and version-pinned.

**🟡 LOW** — Privacy Collection  
> Script uses crypto.getRandomValues for duplicate detection marker, which is not a security issue but may be used for tracking if combined with network requests.  
> 位置：const random16Numbers = Array.from(crypto.getRandomValues(new Uint8Array(16)), b => (b % 10)).join('');  
> 建议：Ensure random markers are not used for user tracking or sent to external servers.

**🟡 LOW** — Permission Abuse  
> Script only requests GM_log permission, which is minimal and not abused.  
> 位置：@grant GM_log  
> 建议：Do not request unnecessary permissions.

**🟡 LOW** — ClickJacking  
> No evidence of clickjacking or iframe manipulation in the visible code.  
> 位置：Full script up to provided cutoff  
> 建议：Do not create hidden iframes or modify frame protection.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/473310-duolingo-pro)*
