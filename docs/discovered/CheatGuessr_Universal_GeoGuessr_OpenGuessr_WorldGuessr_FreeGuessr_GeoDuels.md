---
title: "CheatGuessr 通用版｜GeoGuessr 辅助"
---

# CheatGuessr 通用版｜GeoGuessr 辅助

`地理猜谜`  `游戏辅助`  `地图工具`  `信息分享`  `自动化`  `社交`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/CheatGuessr_Universal_GeoGuessr_OpenGuessr_WorldGuessr_FreeGuessr_GeoDuels.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**12.3**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels) <Badge type="tip" text="GreasyFork" />　　安装量：**5,856**　　评分：👍11 / 👎6

## 功能介绍

这是一个隐蔽式 GeoGuessr 辅助工具，支持多个地理猜谜类网站。用户可通过按 Tab 键打开设置菜单，在地图上标记位置，并将位置信息发送到 Discord 或在 Google 地图中打开。脚本旨在帮助玩家更轻松地定位和分享游戏地点。

## 适用网站

- GeoGuessr
- OpenGuessr
- WorldGuessr
- WorldGuessrGame
- FreeGuessr
- GeoDuels
- GuessWhereYouAre

## 使用方法

1. 安装脚本后，进入支持的地理猜谜网站。
2. 在游戏页面按 Tab 键打开设置菜单。
3. 根据菜单提示，在地图上标记位置。
4. 可将位置信息发送到 Discord 或在 Google 地图中查看。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于保存脚本设置和用户数据。 |
| `GM_getValue` | 用于读取脚本保存的设置和数据。 |
| `GM_deleteValue` | 用于删除脚本保存的数据。 |
| `GM_xmlhttpRequest` | 用于与外部网站（如 Discord 和地理定位服务）通信，发送或获取信息。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：35/100　　**分析时间**：2026-06-29

> This script transmits game data (including map coordinates and possibly user actions) to third-party services such as Discord and OpenStreetMap. It hooks into WebSocket communication, which may impact privacy and game integrity. No code obfuscation or DOM XSS risks were detected. The script requests high-privilege permissions and connects to external endpoints, introducing supply chain and data exfiltration risks. User consent and transparency are critical.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（Intercepts game data via WebSocket, including player guesses and possibly usernames., May send map coordinates and game actions to Discord webhooks.） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ⚠️ 使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script uses GM_xmlhttpRequest to send data to discord.com (likely via webhook) and nominatim.openstreetmap.org. This may include map coordinates, user actions, or other game-related data.  
> 位置：GM_xmlhttpRequest usage, @connect permissions  
> 建议：Ensure only non-sensitive, user-approved data is sent. Inform users clearly about what is transmitted.

**🔴 HIGH** — Remote Code Execution / Game Manipulation  
> The script hooks into WebSocket.prototype.send and WebSocket.prototype.addEventListener to intercept and possibly modify game data. While it does not appear to exfiltrate user credentials, it does manipulate game communication.  
> 位置：WebSocket.prototype.send Proxy, WebSocket.prototype.addEventListener Proxy  
> 建议：Do not intercept or modify WebSocket traffic unless strictly necessary and with user consent.

**🟠 MEDIUM** — Permission Overuse  
> The script requests GM_xmlhttpRequest permission, which is high-privilege and can be abused for data exfiltration.  
> 位置：@grant GM_xmlhttpRequest  
> 建议：Limit permissions to only those required. Remove GM_xmlhttpRequest if not strictly necessary.

**🟠 MEDIUM** — Supply Chain / Data Transmission Risk  
> The script requests @connect to discord.com and nominatim.openstreetmap.org, which are third-party services. Data sent to these endpoints may be outside user control.  
> 位置：@connect discord.com, @connect nominatim.openstreetmap.org  
> 建议：Ensure all third-party endpoints are trusted and data sent is minimal and anonymized.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels)*
