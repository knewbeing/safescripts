---
title: "CheatGuessr Universal (Works in GeoGuessr | OpenGuessr | WorldGuessr | FreeGuessr)"
---

# CheatGuessr Universal (Works in GeoGuessr | OpenGuessr | WorldGuessr | FreeGuessr)



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/CheatGuessr_Universal_Works_in_GeoGuessr_OpenGuessr_WorldGuessr_FreeGuessr.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**5.65**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/572651-cheatguessr-universal-works-in-geoguessr-openguessr-worldguessr-freeguessr) <Badge type="tip" text="GreasyFork" />　　安装量：**349**　　评分：👍1 / 👎0

## 功能介绍



## 适用网站

- 通用

## 使用方法

- 请参阅脚本说明

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：25/100　　**分析时间**：2026-04-20

> This script poses a critical privacy and data exfiltration risk by transmitting user location and address data to third-party servers (Discord and OpenStreetMap Nominatim). No code obfuscation or DOM XSS detected. Notification API is used, but not abused. No supply chain risk or excessive permissions. Users should be warned about the privacy implications and external data transmission.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（Collects latitude and longitude from platform-specific DOM elements, Reverse geocodes location to address, Transmits location/address to Discord webhook） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script sends user location data (latitude, longitude, formatted address) to Discord via webhook, which is a third-party server. This is triggered by user action and can include sensitive location information.  
> 位置：sendToDiscord(embed) function, GM_xmlhttpRequest to Discord webhook  
> 建议：Warn users about the privacy risk and allow disabling this feature. Ensure webhook URLs are not hardcoded or shared.

**⛔ CRITICAL** — Data Exfiltration  
> Script sends latitude and longitude to nominatim.openstreetmap.org for reverse geocoding. While this is a public API, it transmits user location data externally.  
> 位置：_getAddress(lat, lng) function, GM_xmlhttpRequest to nominatim.openstreetmap.org  
> 建议：Inform users about external API usage and minimize data sent.

**⛔ CRITICAL** — Privacy Collection  
> Script collects and processes user location (lat/lng), potentially derived from StreetView or platform-specific DOM elements. This is used for address lookup and Discord transmission.  
> 位置：getCoordinates(), _getAddress(), sendToDiscord()  
> 建议：Limit collection to only necessary data and provide clear user consent.

**🟠 MEDIUM** — Sensitive API Usage  
> Script requests Notification API permission and sends notifications to the user.  
> 位置：requestNotificationPermission(), sendNotification()  
> 建议：Ensure notifications are not abused and only used for legitimate purposes.

**🟡 LOW** — Permission Usage  
> Script applies GM_xmlhttpRequest for external requests, but only requests @grant GM_xmlhttpRequest, GM_setValue, GM_getValue. No excessive permissions detected.  
> 位置：Metadata block  
> 建议：Do not request unused high privileges.

**🟡 LOW** — Supply Chain Risk  
> Script connects to discord.com and nominatim.openstreetmap.org as declared in @connect. No supply chain risk detected as no @require is used.  
> 位置：Metadata block  
> 建议：Always verify external domains and avoid dynamic code loading.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-works-in-geoguessr-openguessr-worldguessr-freeguessr)*
