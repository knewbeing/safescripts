---
title: "CheatGuessr 通用地理猜谜辅助"
---

# CheatGuessr 通用地理猜谜辅助

`地理猜谜`  `游戏辅助`  `地图工具`  `位置分享`  `隐蔽功能`  `社交集成`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/CheatGuessr_Universal_GeoGuessr_OpenGuessr_WorldGuessr_FreeGuessr_GeoDuels.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**10.82**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels) <Badge type="tip" text="GreasyFork" />　　安装量：**4,052**　　评分：👍5 / 👎2

## 功能介绍

本脚本为 GeoGuessr 及类似地理猜谜网站提供隐蔽式辅助功能。按 Tab 键可打开设置菜单，支持在地图上标点、将位置发送到 Discord，以及在 Google 地图中打开当前位置。

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
2. 按 Tab 键打开脚本设置菜单。
3. 在地图上标记当前位置，或选择发送到 Discord。
4. 可一键在 Google 地图中查看当前地点。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于保存脚本的设置和数据。 |
| `GM_getValue` | 用于读取脚本保存的设置和数据。 |
| `GM_xmlhttpRequest` | 用于与外部网站（如 Discord、地理服务）通信，实现发送位置等功能。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：25/100　　**分析时间**：2026-05-25

> This script transmits map/location data to third-party servers (discord.com, nominatim.openstreetmap.org) and monitors keyboard input for hotkeys. There is a risk of user/game data exfiltration and privacy leakage. Notification API is used but not abused. No code obfuscation or DOM XSS detected. Supply chain risk is low as no @require external scripts are used. Overall, the script poses CRITICAL risk due to data transmission and privacy concerns.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（Keyboard input (hotkeys) is monitored., Map pin/location data may be sent externally.） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script uses GM_xmlhttpRequest to send data to discord.com, likely for sharing map pins or game data. This is a third-party server and may transmit user/game information.  
> 位置：GM_xmlhttpRequest usage, @connect discord.com  
> 建议：Ensure only minimal, non-sensitive data is sent. Warn users about external transmission.

**⛔ CRITICAL** — Data Exfiltration  
> Script uses GM_xmlhttpRequest to nominatim.openstreetmap.org for geocoding. While this is a public API, user coordinates or map data may be transmitted.  
> 位置：GM_xmlhttpRequest usage, @connect nominatim.openstreetmap.org  
> 建议：Avoid sending sensitive or identifiable user data. Document what is sent.

**⛔ CRITICAL** — Privacy Collection  
> Script listens for keyboard events (hotkeys) and may transmit map pin data to Discord. If user input or coordinates are sent, this is a privacy risk.  
> 位置：Hotkey handlers, sendToDiscord feature  
> 建议：Limit data sent to Discord, avoid transmitting user input or sensitive information.

**🟠 MEDIUM** — Sensitive API Usage  
> Script requests Notification API permission and may send notifications.  
> 位置：state.notificationPermission, Notification API usage  
> 建议：Ensure notifications are not abused or spammed.

**🟡 LOW** — Permission Usage  
> Script grants GM_xmlhttpRequest but does not appear to use GM_download or GM_openInTab. Permissions are appropriate.  
> 位置：@grant section  
> 建议：Do not request unnecessary permissions.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels)*
