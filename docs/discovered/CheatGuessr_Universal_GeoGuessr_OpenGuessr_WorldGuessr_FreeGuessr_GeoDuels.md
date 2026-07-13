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

**风险等级**：🔴 HIGH　　**安全评分**：52/100　　**分析时间**：2026-07-13

> This script transmits data to third-party servers (notably Discord and OpenStreetMap's Nominatim API) and intercepts WebSocket traffic for game manipulation. No evidence of direct privacy data collection (cookies, localStorage, keylogging, etc.) or code obfuscation was found. The script does not appear to introduce DOM XSS risks. However, the use of high-privilege APIs and external data transmission, especially to Discord, presents a significant security risk. Users should be aware of what data is sent externally and ensure no sensitive information is transmitted.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ⚠️ 使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script uses GM_xmlhttpRequest to send data to discord.com and nominatim.openstreetmap.org, which are third-party servers. The Discord integration is explicitly mentioned in the description and code (send to Discord feature).  
> 位置：GM_xmlhttpRequest usage, feature: sendToDiscord  
> 建议：Ensure only non-sensitive, user-approved data is sent. Inform users clearly about what is transmitted. Avoid sending cookies or personal data.

**🔴 HIGH** — WebSocket Usage  
> The script uses WebSocket interception and modification (Proxy on WebSocket.prototype.send and addEventListener) to manipulate or monitor game data. While not directly exfiltrating user data, this is a HIGH risk for code maintainability and could be abused.  
> 位置：WebSocket.prototype.send Proxy, WebSocket.prototype.addEventListener Proxy  
> 建议：Limit interception to only necessary cases. Ensure no user credentials or sensitive data are sent externally.

**🟠 MEDIUM** — Sensitive API Usage  
> The script requests Notification API permission and can send notifications to the user.  
> 位置：Notification.permission, notify feature  
> 建议：Ensure notifications are not abused for spam or phishing.

**🟠 MEDIUM** — Permission Usage  
> The script requests GM_xmlhttpRequest permission, which is high-privilege and can be abused for data exfiltration.  
> 位置：@grant GM_xmlhttpRequest  
> 建议：Restrict usage to only necessary domains and actions.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels)*
