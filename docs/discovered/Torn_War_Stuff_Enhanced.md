---
title: "Torn战争信息增强"
---

# Torn战争信息增强

`游戏辅助`  `信息展示`  `状态监控`  `数据排序`  `Torn`  `帮派管理`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Torn_War_Stuff_Enhanced.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.16**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/529238-torn-war-stuff-enhanced) <Badge type="tip" text="GreasyFork" />　　安装量：**6,886**　　评分：👍1 / 👎0

## 功能介绍

本脚本在 Torn 游戏的帮派页面显示成员的旅行状态和住院时间，并可按住院时间排序。方便玩家在战争期间快速了解敌我状态，提升决策效率。

## 适用网站

- Torn 游戏帮派页面

## 使用方法

1. 安装脚本后，进入 Torn 游戏的帮派页面。
2. 首次使用需点击菜单命令“Set Api Key”并输入你的 Torn 公共 API 密钥。
3. 页面会自动显示成员的旅行状态和住院时间。
4. 可根据住院时间对成员列表进行排序，方便查看。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让页面显示更直观。 |
| `GM_registerMenuCommand` | 允许用户通过菜单设置 API 密钥，获取更多信息。 |
| `GM_xmlhttpRequest` | 用于向 Torn API 发起请求，获取成员状态数据。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：50/100　　**分析时间**：2026-05-25

> The script interacts with api.torn.com using a user-provided API key stored in localStorage. No evidence of data exfiltration beyond the API key, no DOM XSS, no code obfuscation, and no supply chain risk. The main privacy concern is the handling of the API key. No sensitive browser APIs are used. Overall, the script is safe for its intended purpose, but users should be warned not to use private or sensitive API keys.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：api.torn.com） |
| 隐私采集 | ❌ 检测到（Reads/writes API key to localStorage） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script uses GM_xmlhttpRequest to send requests to api.torn.com. The API key is stored in localStorage and can be set by the user. No evidence of sending page content, cookies, or sensitive user data beyond the API key.  
> 位置：GM_xmlhttpRequest usage and API key handling  
> 建议：Ensure API key is not reused elsewhere and only minimal required data is sent. Consider encrypting API key in storage if possible.

**⛔ CRITICAL** — Privacy Collection  
> Script reads and writes API key to localStorage. No evidence of reading cookies, sessionStorage, IndexedDB, or clipboard. No keylogger or form data extraction.  
> 位置：localStorage usage  
> 建议：Ensure API key is not sensitive or reused for other purposes. Warn users not to use private keys.

**🔴 HIGH** — Remote Code Execution  
> Script uses setTimeout with a function, not a string. No eval, new Function, or dynamic script loading. No @require in metadata.  
> 位置：setTimeout usage  
> 建议：No action needed.

**🔴 HIGH** — Code Obfuscation  
> No evidence of code obfuscation, base64 decoding, unicode encoding, or minified code.  
> 位置：Script body  
> 建议：No action needed.

**🔴 HIGH** — DOM XSS/Injection  
> No evidence of DOM XSS or injection. User input (API key) is only used for API requests and not inserted into DOM.  
> 位置：API key prompt and usage  
> 建议：No action needed.

**🟠 MEDIUM** — Permission Abuse  
> Script requests GM_xmlhttpRequest, GM_addStyle, GM_registerMenuCommand. All are used in code. No unused high privilege grants.  
> 位置：Metadata @grant section  
> 建议：No action needed.

**🟠 MEDIUM** — Sensitive API Usage  
> No sensitive API calls (geolocation, RTCPeerConnection, MediaDevices, clipboard, notifications).  
> 位置：Script body  
> 建议：No action needed.

**🟠 MEDIUM** — Supply Chain Risk  
> No @require or third-party library loading. No supply chain risk.  
> 位置：Metadata and script body  
> 建议：No action needed.

**🟡 LOW** — ClickJacking/Iframe Risk  
> No evidence of clickjacking or iframe manipulation.  
> 位置：Script body  
> 建议：No action needed.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/529238-torn-war-stuff-enhanced)*
