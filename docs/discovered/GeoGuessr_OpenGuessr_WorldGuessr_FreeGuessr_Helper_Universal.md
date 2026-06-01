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

**风险等级**：🔴 HIGH　　**安全评分**：42/100　　**分析时间**：2026-06-01

> This script transmits user location data to discord.com and nominatim.openstreetmap.org, which are third-party services. It does not appear to collect sensitive user input (e.g., passwords, cookies), nor does it use eval or dynamic code execution. There is no evidence of code obfuscation or DOM XSS. However, the use of Notification API, modification of native prototypes, and broad permissions increase the risk profile. The main critical risk is data exfiltration of user coordinates.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（Reads and stores user hotkey and feature toggle preferences via GM_getValue/GM_setValue., Sends user coordinates to third-party services.） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script sends location data to discord.com via GM_xmlhttpRequest, which may include user coordinates or game-related information. This is a third-party server and may be used for tracking or data collection.  
> 位置：send location to discord (feature, implied by description and GM_xmlhttpRequest usage)  
> 建议：Warn users about data transmission to discord.com. Only send minimal necessary data and allow users to opt-out.

**⛔ CRITICAL** — Data Exfiltration  
> The script sends reverse geocoding requests to nominatim.openstreetmap.org with user coordinates to obtain address information.  
> 位置：_getAddress() function using GM_xmlhttpRequest  
> 建议：Inform users that their coordinates are sent to a third-party geocoding service. Consider caching or minimizing requests.

**🟠 MEDIUM** — Sensitive API Usage  
> The script requests Notification API permission and can send browser notifications.  
> 位置：requestNotificationPermission(), sendNotification()  
> 建议：Ensure notifications are not abused for spam. Only use with user consent.

**🟠 MEDIUM** — Sensitive API Usage  
> The script applies Proxy wrappers to native prototypes (e.g., Array.prototype.push, Element.prototype.setAttribute, Storage.prototype.setItem, String.prototype.startsWith, fetch) to bypass anti-cheat and detection mechanisms.  
> 位置：Multiple locations, e.g., platform-specific blocks  
> 建议：Modifying native prototypes can introduce compatibility and security risks. Limit scope and document changes.

**🟠 MEDIUM** — Permission Usage  
> The script requests GM_xmlhttpRequest permission, which allows arbitrary cross-origin requests.  
> 位置：@grant GM_xmlhttpRequest  
> 建议：Ensure this permission is strictly necessary and not abused.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-geoguessr-openguessr-worldguessr-freeguessr-helper-universal)*
