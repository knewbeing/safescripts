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

**风险等级**：🔴 HIGH　　**安全评分**：42/100　　**分析时间**：2026-07-13

> The script collects and stores the user's Torn API key in localStorage, and transmits it to api.torn.com and twse.dev via GM_xmlhttpRequest. This is a critical privacy and data exfiltration risk. The script also requests high-privilege grants (unsafeWindow) that are not used, increasing the attack surface. No code obfuscation or DOM XSS was detected. Supply chain risk is low as no @require is used. The script should warn users about API key handling, minimize permissions, and avoid storing sensitive data in localStorage.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：api.torn.com, twse.dev） |
| 隐私采集 | ❌ 检测到（Torn API key is collected and stored in localStorage via prompt, Other user preferences stored in localStorage） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script uses GM_xmlhttpRequest to communicate with api.torn.com and twse.dev. User's Torn API key is collected via prompt and stored in localStorage, and may be sent to these endpoints for API calls.  
> 位置：GM_xmlhttpRequest usage, Config class, KeyManagerFeature  
> 建议：Ensure only necessary data is sent, and endpoints are trusted. Warn users about API key usage and storage.

**⛔ CRITICAL** — Privacy Collection  
> Script stores and retrieves the Torn API key and other settings in localStorage, which is accessible to any script running on the same domain/context.  
> 位置：Config class, Storage class  
> 建议：Minimize sensitive data storage in localStorage. Consider using more secure storage if possible.

**🟠 MEDIUM** — Permission Abuse  
> @grant unsafeWindow is requested, but not used in the provided code. This is a high-privilege grant and can be abused if used carelessly.  
> 位置：Metadata block (@grant)  
> 建议：Remove unused high-privilege grants to reduce attack surface.

**🟠 MEDIUM** — Permission Abuse  
> @require is not used, but @grant GM_xmlhttpRequest is present. Ensure only necessary permissions are requested.  
> 位置：Metadata block (@grant)  
> 建议：Review and minimize granted permissions.

**🟡 LOW** — DOM Manipulation  
> Script loads and injects CSS via <style> tags, but does not use innerHTML/outerHTML with untrusted input. No DOM XSS found.  
> 位置：importCSS function  
> 建议：Continue to avoid inserting untrusted content into the DOM.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/529238-torn-war-stuff-enhanced)*
