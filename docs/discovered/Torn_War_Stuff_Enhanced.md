---
title: "Torn战争信息增强"
---

# Torn战争信息增强

`游戏辅助`  `信息展示`  `状态管理`  `Torn`  `帮派管理`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Torn_War_Stuff_Enhanced.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.0**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/529238-torn-war-stuff-enhanced) <Badge type="tip" text="GreasyFork" />　　安装量：**8,655**　　评分：👍1 / 👎0

## 功能介绍

本脚本在 Torn 游戏的帮派战争页面显示玩家的旅行状态和住院时间，并支持按住院时间排序，方便管理和查看成员状态。

## 适用网站

- Torn 城市游戏

## 使用方法

1. 安装脚本后，进入 Torn 的帮派页面。
2. 页面会自动显示成员的旅行状态和住院时间。
3. 可根据住院时间对成员列表进行排序，无需额外操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让页面显示更美观。 |
| `GM_registerMenuCommand` | 允许在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_xmlhttpRequest` | 用于向外部接口（如 Torn API）发送网络请求，获取玩家状态信息。 |
| `unsafeWindow` | 允许脚本访问和操作页面的原始窗口对象，增强功能。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：27/100　　**分析时间**：2026-07-27

> Script transmits user API key and faction data to api.torn.com and twse.dev, stores API key in localStorage, and grants unsafeWindow. No evidence of DOM XSS, code injection, or obfuscation. Supply chain risk is low. Main risks are data transmission and privacy collection. Remove unsafeWindow and improve API key storage for better security.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：api.torn.com, twse.dev） |
| 隐私采集 | ❌ 检测到（localStorage: stores API key and config） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script uses GM_xmlhttpRequest to send requests to api.torn.com and twse.dev. The API key is user-provided and stored in localStorage, then sent to api.torn.com for game data. Requests to twse.dev may include faction IDs and hospital times, but do not appear to transmit sensitive user data or cookies.  
> 位置：GM_xmlhttpRequest calls (not fully shown in provided code, but implied by @connect and config usage)  
> 建议：Ensure only necessary data is sent, avoid transmitting cookies or sensitive information. Document transmitted fields for transparency.

**⛔ CRITICAL** — Privacy Collection  
> Script reads and writes to localStorage for storing API keys and configuration. No evidence of document.cookie, sessionStorage, or IndexedDB usage. No keylogger or clipboard access.  
> 位置：Config and Storage classes  
> 建议：Do not store sensitive keys in localStorage if possible. Consider encrypting API keys or using GM_setValue for better isolation.

**🔴 HIGH** — Permission Abuse  
> Script grants unsafeWindow, which exposes script context to the page and vice versa. This can be abused if the page is compromised.  
> 位置：@grant unsafeWindow in metadata  
> 建议：Remove unsafeWindow unless strictly necessary. Use GM_* APIs for communication instead.

**🟠 MEDIUM** — Permission Abuse  
> Script requests GM_xmlhttpRequest, GM_addStyle, GM_registerMenuCommand, unsafeWindow. GM_xmlhttpRequest and unsafeWindow are high-risk if not used carefully.  
> 位置：Metadata block  
> 建议：Review necessity of each permission. Remove unused or high-risk grants.

**🟠 MEDIUM** — Supply Chain  
> Script loads no external libraries via @require. All code is inline. No supply chain risk detected.  
> 位置：Metadata block  
> 建议：If using @require in future, always pin versions and use official CDNs.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/529238-torn-war-stuff-enhanced)*
