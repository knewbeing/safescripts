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

**风险等级**：🔴 HIGH　　**安全评分**：42/100　　**分析时间**：2026-06-22

> This script provides helper features for GeoGuessr-like games, including sending map pin locations to Discord and reverse geocoding via OpenStreetMap. It transmits user location data to third-party servers (discord.com and nominatim.openstreetmap.org), which is a critical privacy and data exfiltration risk. It also requests notification permissions and modifies browser APIs to bypass anti-cheat mechanisms. No code obfuscation or DOM XSS risks were detected. The script should be considered HIGH risk due to the critical data transmission and privacy issues.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（Reads and stores user hotkey and feature toggle preferences via GM_setValue/GM_getValue., Sends user location (latitude/longitude) to third-party APIs.） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script sends location data to Discord via GM_xmlhttpRequest, which may include user coordinates and possibly other metadata. This is a third-party server and could be used for tracking or data exfiltration.  
> 位置：sendToDiscord function and GM_xmlhttpRequest usage (discord.com)  
> 建议：Clearly inform users about what data is sent and allow opt-out. Do not send sensitive or identifying information. Consider allowing users to configure the webhook endpoint.

**⛔ CRITICAL** — Data Exfiltration  
> The script sends latitude and longitude to nominatim.openstreetmap.org to reverse geocode the location. While this is a public geocoding API, it still constitutes sharing user location with a third party.  
> 位置：_getAddress function (nominatim.openstreetmap.org)  
> 建议：Inform users about this data sharing. Consider allowing users to disable this feature.

**🟠 MEDIUM** — Sensitive API Usage  
> The script requests Notification API permission and can send browser notifications.  
> 位置：requestNotificationPermission, sendNotification  
> 建议：Ensure notifications are not abused. Only use with clear user consent.

**🟠 MEDIUM** — Potential Abuse of Permissions  
> The script applies proxies to native browser APIs (e.g., fetch, setAttribute, setItem, push) to bypass anti-cheat and sandboxing mechanisms. This is a form of anti-detection/anti-tamper, but could also be abused.  
> 位置：Multiple locations (platform-specific blocks)  
> 建议：Minimize API monkey-patching and clearly document all such behavior for transparency.

**🟠 MEDIUM** — Permission Usage  
> The script requests GM_xmlhttpRequest permission, which is high-privilege and allows cross-origin requests.  
> 位置：Metadata block (@grant GM_xmlhttpRequest)  
> 建议：Only request this permission if strictly necessary and document its use.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-geoguessr-openguessr-worldguessr-freeguessr-helper-universal)*
