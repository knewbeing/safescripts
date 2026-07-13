---
title: "地理猜谜助手通用版"
---

# 地理猜谜助手通用版

`地理猜谜`  `游戏辅助`  `地图工具`  `信息分享`  `安全`  `多平台`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/GeoGuessr_OpenGuessr_WorldGuessr_FreeGuessr_Helper_Universal.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**8.8**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/572651-geoguessr-openguessr-worldguessr-freeguessr-helper-universal) <Badge type="tip" text="GreasyFork" />　　安装量：**1,227**　　评分：👍2 / 👎1

## 功能介绍

本脚本为地理猜谜类网站提供辅助功能。按 Tab 键可打开设置菜单，支持在地图上标记位置、将位置发送到 Discord、在谷歌地图中打开位置。脚本设计为难以被检测，保障使用安全。

## 适用网站

- GeoGuessr
- OpenGuessr
- WorldGuessr
- FreeGuessr
- GuessWhereYouAre

## 使用方法

1. 安装脚本后，进入支持的地理猜谜网站。
2. 在游戏页面按 Tab 键打开设置菜单。
3. 根据需要在地图上标记位置、发送位置到 Discord 或打开谷歌地图。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于保存脚本设置和数据。 |
| `GM_getValue` | 用于读取脚本保存的数据。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，如将位置发送到 Discord。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-07-13

> This script transmits user location data to third-party servers (discord.com and nominatim.openstreetmap.org) via GM_xmlhttpRequest, which is a critical privacy and data exfiltration risk. It also requests Notification API permissions and modifies iframe protections, but does not appear to contain code obfuscation, DOM XSS, or supply chain risks. The main concern is the transmission of sensitive user data to external servers, which may be used for tracking or logging without explicit user consent.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（Reads and stores user hotkeys and feature toggles via GM_setValue/GM_getValue., Sends user-selected map coordinates to third-party APIs.） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script sends location data to Discord via GM_xmlhttpRequest, which may include user-coordinated map pins or game data. This is a third-party server and may be used for tracking or data collection.  
> 位置：sendToDiscord function (implied by description and GM_xmlhttpRequest usage)  
> 建议：Warn users and make data transmission opt-in. Allow users to review and edit data before sending. Document exactly what is sent.

**⛔ CRITICAL** — Data Exfiltration  
> The script sends latitude and longitude to nominatim.openstreetmap.org for reverse geocoding. While this is a public geocoding API, it still transmits user location data to a third party.  
> 位置：_getAddress function  
> 建议：Inform users about this data transmission. Consider caching or minimizing requests.

**🟠 MEDIUM** — Sensitive API Usage  
> The script requests Notification API permission and can send notifications to the user.  
> 位置：requestNotificationPermission, sendNotification  
> 建议：Ensure notifications are not abused. Only use for legitimate user actions.

**🟡 LOW** — ClickJacking / iframe Risk  
> The script modifies iframe sandbox attributes and disables anti-cheat scripts, which may weaken frame protections.  
> 位置：Element.prototype.setAttribute proxy, script removal  
> 建议：Avoid interfering with security features unless strictly necessary.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-geoguessr-openguessr-worldguessr-freeguessr-helper-universal)*
