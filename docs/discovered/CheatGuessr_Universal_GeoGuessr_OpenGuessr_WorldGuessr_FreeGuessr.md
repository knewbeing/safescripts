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

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-05-18

> This script transmits user location data (coordinates/address) to third-party servers (Discord and OpenStreetMap Nominatim) via GM_xmlhttpRequest. This is a critical privacy and data exfiltration risk. It also uses Proxy to patch native prototypes, which can introduce stability and security issues. Notification API is used, but not in a clearly abusive way. No code obfuscation or supply chain risks detected. Overall, the script poses a CRITICAL risk due to data exfiltration and privacy concerns. User consent and transparency are required. Not recommended for use in sensitive environments.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（Sends coordinates to third-party APIs (Discord, OpenStreetMap Nominatim)） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script allows sending location data (coordinates/address) to Discord via webhook, which is a third-party server. This is a form of data exfiltration and may leak user activity or sensitive information.  
> 位置：sendToDiscord function, GM_xmlhttpRequest to discord.com  
> 建议：Warn users and make this feature opt-in with clear consent. Do not send any user-identifiable or sensitive data without explicit permission.

**⛔ CRITICAL** — Data Exfiltration  
> The script sends latitude and longitude to nominatim.openstreetmap.org for reverse geocoding. While this is a public API, it still transmits user location data to a third party.  
> 位置：_getAddress function, GM_xmlhttpRequest to nominatim.openstreetmap.org  
> 建议：Inform users about this behavior. Consider proxying requests or minimizing data sent.

**🔴 HIGH** — Code Safety  
> The script applies Proxy wrappers to native prototypes (e.g., Array.prototype.push, Element.prototype.setAttribute, Storage.prototype.setItem, String.prototype.startsWith, fetch). This can have unpredictable side effects and may break page functionality or introduce security issues if not carefully handled.  
> 位置：Multiple locations (platform-specific blocks)  
> 建议：Minimize prototype pollution and avoid Proxying global prototypes unless absolutely necessary.

**🟠 MEDIUM** — Sensitive API Usage  
> The script requests Notification API permission and can send browser notifications. This can be abused for spam or phishing if not properly controlled.  
> 位置：requestNotificationPermission, sendNotification  
> 建议：Limit notification usage and ensure it is only used for legitimate user actions.

**🟡 LOW** — Permissions  
> The script grants GM_xmlhttpRequest but does not appear to use it for any purpose other than the two documented endpoints. No excessive permissions detected.  
> 位置：@grant GM_xmlhttpRequest  
> 建议：No action needed unless new endpoints are added.

**🟡 LOW** — Obfuscation  
> No code obfuscation, eval, or dynamic code execution detected in the provided code.  
> 位置：N/A  
> 建议：N/A

**🟡 LOW** — Supply Chain  
> No supply chain risk detected (no @require or external scripts loaded).  
> 位置：N/A  
> 建议：N/A

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr)*
