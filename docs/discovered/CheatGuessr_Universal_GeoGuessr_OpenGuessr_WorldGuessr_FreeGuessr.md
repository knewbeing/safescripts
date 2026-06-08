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

**风险等级**：⛔ CRITICAL　　**安全评分**：42/100　　**分析时间**：2026-06-08

> This script transmits map coordinates to external services (nominatim.openstreetmap.org for reverse geocoding and discord.com for sharing pins), which constitutes critical data exfiltration and privacy risk. It also requests notification permissions and modifies native prototypes, which may impact page stability. No code obfuscation or DOM XSS risks were detected. The script should be considered high risk unless all data transmissions are made fully transparent and strictly limited to non-sensitive information.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：nominatim.openstreetmap.org, discord.com） |
| 隐私采集 | ❌ 检测到（Reads and stores user hotkey and feature toggle preferences via GM_getValue/GM_setValue., Sends map coordinates (potentially user location) to external services.） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script sends latitude and longitude coordinates to nominatim.openstreetmap.org for reverse geocoding using GM_xmlhttpRequest.  
> 位置：function _getAddress(lat, lng)  
> 建议：Ensure only non-sensitive, non-personal data is sent. Inform users about this external request.

**⛔ CRITICAL** — Data Exfiltration  
> The script is designed to send map pin data to Discord (discord.com) via webhook or API (as indicated by @connect and feature description).  
> 位置：Feature: sendToDiscord  
> 建议：Ensure no sensitive or personal user data is sent. Make this behavior opt-in and clearly inform users.

**🟠 MEDIUM** — Sensitive API Usage  
> The script requests Notification API permission and can send browser notifications.  
> 位置：requestNotificationPermission, sendNotification  
> 建议：Only use Notification API with clear user consent and avoid spamming notifications.

**🟠 MEDIUM** — Potential Stability/Security Risk  
> The script applies Proxy wrappers to native prototypes (e.g., setAttribute, push, setItem, fetch) which may break page functionality or introduce unexpected behavior.  
> 位置：Multiple locations (platform-specific code blocks)  
> 建议：Limit prototype modifications to only what is strictly necessary and document all changes.

**🟠 MEDIUM** — Permission Usage  
> The script requests GM_xmlhttpRequest permission, which allows arbitrary cross-origin requests.  
> 位置：@grant GM_xmlhttpRequest  
> 建议：Limit usage to only required domains and document all external requests.

**🟠 MEDIUM** — Supply Chain/External Service Risk  
> The script requests @connect for discord.com and nominatim.openstreetmap.org, which are third-party services.  
> 位置：@connect metadata  
> 建议：Ensure only necessary domains are listed and inform users about all external connections.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr)*
