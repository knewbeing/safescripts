---
title: "GeoGuessr 通用辅助器"
---

# GeoGuessr 通用辅助器

`地理猜谜`  `游戏辅助`  `地图工具`  `自动化`  `社交分享`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/CheatGuessr_Universal_GeoGuessr_OpenGuessr_WorldGuessr_FreeGuessr_GeoDuels.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**10.2**　　发现时间：**2026-05-11**　　来源：[GreasyFork](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels) <Badge type="tip" text="GreasyFork" />　　安装量：**2,646**　　评分：👍3 / 👎1

## 功能介绍

本脚本是一款隐蔽的 GeoGuessr 及类似地理猜谜游戏的辅助工具。它允许用户在地图上标记位置，可一键将位置信息发送到 Discord，并能直接在 Google 地图中打开当前位置。按下 Tab 键可快速打开设置菜单，方便进行相关操作。

## 适用网站

- GeoGuessr
- OpenGuessr
- WorldGuessr
- WorldGuessrGame
- FreeGuessr
- GeoDuels
- GuessWhereYouAre

## 使用方法

1. 安装脚本后，进入支持的地理猜谜类网站。
2. 按下 Tab 键打开脚本设置菜单。
3. 根据需要在地图上标记位置、发送到 Discord 或在 Google 地图中查看。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于保存脚本设置和用户偏好。 |
| `GM_getValue` | 用于读取脚本保存的设置和数据。 |
| `GM_xmlhttpRequest` | 用于向 Discord 或其他服务发送网络请求，实现分享等功能。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：59/100　　**分析时间**：2026-05-11

> The script does not appear to be malicious or obfuscated, but it does transmit user location data to third-party services (Discord, OpenStreetMap) and requests high-privilege permissions. There is no evidence of keylogging, credential theft, or DOM XSS. Users should be aware that their game actions and locations may be sent to external servers, especially Discord. Prototype modifications may cause compatibility issues. Overall, the script is medium risk due to data transmission and permission usage, but not critically dangerous.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（Location data (map pins, coordinates) may be collected and sent to Discord or OpenStreetMap.） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script uses GM_xmlhttpRequest to send data to discord.com (likely for the 'send to Discord' feature). This may transmit map pin/location data or user actions to a third-party server.  
> 位置：Feature: sendToDiscord, @connect discord.com, likely in code not fully shown  
> 建议：Warn users that location data may be sent to Discord. Ensure no sensitive user data (e.g., cookies, credentials) is transmitted. Consider making this opt-in and clearly informing users.

**🟠 MEDIUM** — Data Transmission  
> The script uses GM_xmlhttpRequest to access nominatim.openstreetmap.org, likely for reverse geocoding. While this is a public API, it may transmit coordinates or location data.  
> 位置：Feature: address lookup, @connect nominatim.openstreetmap.org  
> 建议：Ensure only necessary location data is sent. Inform users of this behavior.

**🟠 MEDIUM** — Sensitive API Usage  
> The script requests Notification API permission and uses Notification.permission, which could be abused to send unwanted notifications.  
> 位置：Global state: notificationPermission, Notification API usage  
> 建议：Ensure notifications are only used for legitimate user actions and are not spammy.

**🟠 MEDIUM** — Code Robustness  
> The script applies Proxy wrappers to native prototypes (e.g., Array.prototype.push, Element.prototype.setAttribute, Storage.prototype.setItem, String.prototype.startsWith, fetch). This can have unpredictable side effects and may break page or other extension functionality.  
> 位置：Multiple locations: platform-specific code blocks  
> 建议：Limit prototype modifications to only what is strictly necessary. Document all such changes.

**🟠 MEDIUM** — Permission Usage  
> The script requests GM_xmlhttpRequest permission, which allows arbitrary cross-origin requests. While used for Discord and OpenStreetMap, this is a high-privilege grant.  
> 位置：@grant GM_xmlhttpRequest  
> 建议：Restrict usage to only necessary domains and document all external requests.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels)*
