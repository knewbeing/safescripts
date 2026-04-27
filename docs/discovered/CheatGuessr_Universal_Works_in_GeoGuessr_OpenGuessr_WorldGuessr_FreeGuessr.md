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

**风险等级**：⛔ CRITICAL　　**安全评分**：25/100　　**分析时间**：2026-04-27

> This script transmits user location data to third-party servers (discord.com and nominatim.openstreetmap.org), collects sensitive location information from the page, and modifies iframe sandboxing. These behaviors pose critical privacy and data exfiltration risks. No code obfuscation or DOM XSS detected. Supply chain risk is low as no @require is used. The script is not safe for privacy-sensitive users.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（Reads coordinates from page elements and React fiber nodes, Sends location data to external APIs） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script sends user location data (latitude, longitude, formatted address) to discord.com via a webhook, which is a third-party server. This is triggered by user action or feature toggles.  
> 位置：sendToDiscord(embed) function, GM_xmlhttpRequest to discord.com  
> 建议：Warn users about the privacy risk and allow disabling this feature. Ensure webhook URLs are not hardcoded or shared.

**⛔ CRITICAL** — Data Exfiltration  
> The script sends user coordinates to nominatim.openstreetmap.org to retrieve address information. While this is a public geocoding API, it transmits user location data externally.  
> 位置：_getAddress(lat, lng) function, GM_xmlhttpRequest to nominatim.openstreetmap.org  
> 建议：Inform users that their location data is sent to a third-party geocoding service.

**⛔ CRITICAL** — Privacy Collection  
> The script reads coordinates from the page, including from React fiber nodes and iframe properties, which may include sensitive location data.  
> 位置：getCoordinates() function  
> 建议：Limit data collection to only what is necessary for the script's functionality.

**🟠 MEDIUM** — Sensitive API Usage  
> The script requests notification permission and uses the Notification API to send notifications.  
> 位置：requestNotificationPermission(), sendNotification()  
> 建议：Ensure notifications are not abused and only used for legitimate purposes.

**🟠 MEDIUM** — Permission Usage  
> The script grants GM_xmlhttpRequest, which is used for external requests, and GM_setValue/GM_getValue for persistent storage. All granted permissions are used.  
> 位置：UserScript metadata  
> 建议：No excessive permissions detected, but review GM_xmlhttpRequest usage for scope.

**🟡 LOW** — ClickJacking / iframe Risk  
> The script modifies Element.prototype.setAttribute to ignore sandbox attribute for iframes, which may weaken frame protection.  
> 位置：Element.prototype.setAttribute override  
> 建议：Do not bypass sandboxing unless absolutely necessary. This may expose the page to clickjacking or iframe-based attacks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-works-in-geoguessr-openguessr-worldguessr-freeguessr)*
