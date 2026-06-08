---
title: "Torn战争信息增强"
---

# Torn战争信息增强

`游戏辅助`  `信息高亮`  `状态显示`  `数据排序`  `Torn`  `派系管理`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Torn_War_Stuff_Enhanced.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.16**　　发现时间：**2026-06-01**　　来源：[GreasyFork](https://greasyfork.org/scripts/529238-torn-war-stuff-enhanced) <Badge type="tip" text="GreasyFork" />　　安装量：**7,182**　　评分：👍1 / 👎0

## 功能介绍

本脚本在 Torn 游戏的派系战争页面显示成员的旅行状态和住院时间，并可按住院时间排序。它还通过颜色高亮不同状态，方便玩家快速了解敌我双方的情况。

## 适用网站

- Torn 游戏派系页面

## 使用方法

1. 安装脚本后，进入 Torn 的派系页面。
2. 首次使用时，通过菜单设置你的 Torn 公共 API 密钥。
3. 页面会自动显示成员的旅行和住院状态，并按住院时间排序。
4. 不同状态的成员会被高亮显示，方便识别。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让页面显示高亮效果。 |
| `GM_registerMenuCommand` | 允许用户通过菜单设置 API 密钥，方便获取数据。 |
| `GM_xmlhttpRequest` | 用于向 Torn API 请求成员状态数据。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-06-08

> The script is generally safe for use, with its main risk being the storage and transmission of a user-provided API key to a third-party API (api.torn.com). There is no evidence of code obfuscation, DOM XSS, or supply chain risk. Users should be aware that their API key is stored in localStorage and only use a public key as recommended by the script author.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：api.torn.com） |
| 隐私采集 | ❌ 检测到（Reads and writes API key to localStorage） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> The script uses GM_xmlhttpRequest to communicate with api.torn.com, which is a third-party API, and sends a user-provided API key (stored in localStorage).  
> 位置：GM_xmlhttpRequest usage (implied by @grant and @connect, though not shown in the truncated code)  
> 建议：Ensure only the minimum required data is sent and the API key is not reused elsewhere. Warn users not to use sensitive/private API keys.

**🔴 HIGH** — Privacy Collection  
> The script stores and retrieves the API key from localStorage, which is accessible to any script running on the page.  
> 位置：localStorage.getItem/setItem for API key  
> 建议：Warn users that the API key is stored in localStorage and may be accessible to other scripts. Consider using a more secure storage method if possible.

**🟠 MEDIUM** — Permission Usage  
> The script requests GM_xmlhttpRequest permission, which is a high-privilege API, but only uses it for api.torn.com as declared in @connect.  
> 位置：@grant GM_xmlhttpRequest, @connect api.torn.com  
> 建议：Limit @connect to only required domains and ensure GM_xmlhttpRequest is not used for other destinations.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/529238-torn-war-stuff-enhanced)*
