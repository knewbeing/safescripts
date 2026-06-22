---
title: "公平战斗评分助手"
---

# 公平战斗评分助手

`游戏辅助`  `信息增强`  `战斗分析`  `帮派管理`  `Torn`  `评分显示`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/FF_Scouter_V2_beta.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.0-beta9**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/582442-ff-scouter-v2-beta) <Badge type="tip" text="GreasyFork" />　　安装量：**375**　　评分：👍0 / 👎0

## 功能介绍

此脚本在 Torn 游戏网站上显示目标玩家的 Fair Fight 评分和帮派战争状态，帮助玩家更好地评估战斗对手。通过外部数据查询，提升游戏策略决策。

## 适用网站

- Torn 城市游戏

## 使用方法

1. 安装脚本后，访问 Torn 游戏网站。
2. 在玩家页面或帮派相关页面，会自动显示 Fair Fight 评分和帮派战争状态。
3. 无需额外操作，信息会直接展示在页面上。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送网络请求获取外部数据。 |
| `unsafeWindow` | 允许脚本访问和修改网页的全局对象，增强功能集成。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：35/100　　**分析时间**：2026-06-22

> The script communicates with a third-party server (ffscouter.com) and uses localStorage for configuration. It requests the unsafeWindow grant, which increases risk. No evidence of code obfuscation, DOM XSS, or supply chain risk in the provided code. The main concerns are data exfiltration, privacy collection, and privilege escalation due to unsafeWindow.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ffscouter.com） |
| 隐私采集 | ❌ 检测到（Reads/writes localStorage for configuration and caching） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script uses GM_xmlhttpRequest to communicate with ffscouter.com, a third-party server. While the code provided does not show the exact payload, the script is designed to show Fair Fight scores and faction war status, which likely involves sending some user/game data to the external server.  
> 位置：@connect ffscouter.com and likely in code using GM_xmlhttpRequest  
> 建议：Review all data sent to ffscouter.com. Ensure no sensitive user information (such as authentication tokens, cookies, or personal data) is transmitted. Document the exact payload structure.

**⛔ CRITICAL** — Privacy Collection  
> The script reads and writes to localStorage for configuration and caching purposes. No evidence of sensitive data (like cookies or passwords) being accessed, but localStorage is used.  
> 位置：Storage class and FFConfig usage  
> 建议：Ensure only non-sensitive configuration data is stored. Do not store authentication tokens or personal information in localStorage.

**🔴 HIGH** — Privilege Escalation Risk  
> The script requests the unsafeWindow grant, which allows access to the page's JavaScript context. This increases the risk of privilege escalation or unintended data access.  
> 位置：@grant unsafeWindow  
> 建议：Remove unsafeWindow unless strictly necessary. If required, limit its usage and audit all interactions with the page context.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/582442-ff-scouter-v2-beta)*
