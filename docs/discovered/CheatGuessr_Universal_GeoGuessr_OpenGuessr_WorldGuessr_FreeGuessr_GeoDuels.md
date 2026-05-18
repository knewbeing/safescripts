---
title: "CheatGuessr 通用辅助器"
---

# CheatGuessr 通用辅助器

`游戏辅助`  `地图工具`  `GeoGuessr`  `作弊工具`  `位置分享`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/CheatGuessr_Universal_GeoGuessr_OpenGuessr_WorldGuessr_FreeGuessr_GeoDuels.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**10.4**　　发现时间：**2026-05-18**　　来源：[GreasyFork](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels) <Badge type="tip" text="GreasyFork" />　　安装量：**3,361**　　评分：👍4 / 👎1

## 功能介绍

本脚本是一款隐蔽的 GeoGuessr 及其同类网站辅助工具。它允许你通过按 Tab 键打开设置菜单，在地图上标记位置，并可将位置信息发送到 Discord 或在 Google 地图中打开。适合需要辅助定位和分享的用户使用。

## 适用网站

- GeoGuessr
- OpenGuessr
- WorldGuessr
- WorldGuessrGame
- FreeGuessr
- GeoDuels
- GuessWhereYouAre

## 使用方法

1. 安装脚本后，进入支持的网站（如 GeoGuessr）。
2. 按下 Tab 键即可打开脚本的设置菜单。
3. 根据需要在地图上标记位置，或选择发送到 Discord、在 Google 地图中查看。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于在本地保存脚本的设置和用户数据。 |
| `GM_getValue` | 用于读取之前保存的设置和数据。 |
| `GM_xmlhttpRequest` | 用于向外部网站（如 Discord、地图服务）发送网络请求，实现分享和定位功能。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：34/100　　**分析时间**：2026-05-18

> This script transmits user-selected location data to Discord (a third-party server) and interacts with OpenStreetMap's API. It modifies native prototypes, which can cause reliability issues, and disables anti-cheat mechanisms on several platforms. There is no evidence of code obfuscation or DOM XSS, but the script collects and transmits user data (map pins) externally. The overall risk is HIGH due to data exfiltration, prototype modification, and anti-cheat bypass.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（Sends user-selected map pin/location to Discord via network request） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data exfiltration  
> The script uses GM_xmlhttpRequest and has @connect permissions for discord.com and nominatim.openstreetmap.org. It includes a feature to send map pins to Discord, which may transmit user-selected location data to a third-party server.  
> 位置：GM_xmlhttpRequest usage, @connect discord.com  
> 建议：Warn users that sending data to Discord may expose location information. Limit data sent and make user consent explicit.

**🔴 HIGH** — Code reliability risk  
> The script modifies native prototypes (e.g., Array.prototype.push, Element.prototype.setAttribute, Storage.prototype.setItem, String.prototype.startsWith, fetch) via Proxy. This can have unpredictable side effects and may break page or other scripts’ functionality.  
> 位置：Multiple locations (Array.prototype, Element.prototype, etc.)  
> 建议：Limit prototype modifications to the minimum required scope. Avoid global monkey-patching unless strictly necessary.

**🔴 HIGH** — Anti-cheat bypass  
> The script disables or bypasses anti-cheat and ban mechanisms on target platforms by intercepting analytics and ban-related storage.  
> 位置：Platform-specific blocks (e.g., gtag, Storage.setItem, banned property)  
> 建议：Inform users of the ethical and ToS implications. Such bypasses may violate platform rules.

**🟠 MEDIUM** — Sensitive API usage  
> The script requests Notification API permission and can send notifications to the user.  
> 位置：state.notificationPermission, Notification.permission  
> 建议：Ensure notifications are not abused for spam or phishing. Only use with clear user intent.

**🟠 MEDIUM** — Permission overgrant  
> The script grants GM_xmlhttpRequest but does not appear to use it for arbitrary third-party communication beyond the declared @connect domains. However, the permission is high and could be abused if the code is modified.  
> 位置：@grant GM_xmlhttpRequest  
> 建议：Restrict @grant permissions to only those required. Review code for any dynamic or user-influenced network requests.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels)*
