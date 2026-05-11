---
title: "CheatGuessr Universal | GeoGuessr | OpenGuessr | WorldGuessr | FreeGuessr"
---

# CheatGuessr Universal | GeoGuessr | OpenGuessr | WorldGuessr | FreeGuessr



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/CheatGuessr_Universal_GeoGuessr_OpenGuessr_WorldGuessr_FreeGuessr.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**9.2**　　发现时间：**2026-05-04**　　来源：[GreasyFork](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr) <Badge type="tip" text="GreasyFork" />　　安装量：**1,858**　　评分：👍2 / 👎1

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

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-05-11

> This script transmits user location data to third-party services (OpenStreetMap Nominatim and potentially Discord), which is a critical privacy and data exfiltration risk. It does not appear to collect other sensitive data or use obfuscation, but the network requests and permissions require user awareness and explicit consent. The script does not appear to have DOM XSS or supply chain risks in the provided code. Overall, the main risk is third-party data transmission.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：nominatim.openstreetmap.org, discord.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script sends latitude and longitude coordinates to nominatim.openstreetmap.org for reverse geocoding using GM_xmlhttpRequest. This is a third-party service and may receive user location data.  
> 位置：function _getAddress(lat, lng)  
> 建议：Warn users about location data being sent to OpenStreetMap Nominatim. Consider making this optional or informing users.

**⛔ CRITICAL** — Data Exfiltration  
> The script requests @connect permission for discord.com, and the description mentions 'send to discord', implying user data (possibly coordinates or game info) can be sent to Discord webhooks.  
> 位置：Metadata (@connect discord.com), feature toggles (sendToDiscord), hotkey (sendToDiscord: 'q')  
> 建议：Ensure users are aware of what data is sent to Discord. Do not send sensitive or personal data without explicit user consent.

**🟠 MEDIUM** — Sensitive API Usage  
> The script uses the Notification API to send browser notifications.  
> 位置：sendNotification() function  
> 建议：Ensure notifications are not abused. Only use with user consent.

**🟠 MEDIUM** — Permission Usage  
> The script requests GM_xmlhttpRequest permission, which is high-privilege and can be abused for data exfiltration.  
> 位置：Metadata (@grant GM_xmlhttpRequest)  
> 建议：Limit usage to only necessary domains and document all network requests.

**🟠 MEDIUM** — Sensitive API Usage  
> The script requests Notification API permission, which can be abused for spam.  
> 位置：requestNotificationPermission()  
> 建议：Request permission only when needed and explain to the user.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr)*
