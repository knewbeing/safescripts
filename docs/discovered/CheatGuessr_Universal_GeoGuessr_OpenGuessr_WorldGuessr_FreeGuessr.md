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

**风险等级**：🔴 HIGH　　**安全评分**：42/100　　**分析时间**：2026-06-22

> This UserScript transmits user location data to third-party services (nominatim.openstreetmap.org for reverse geocoding and discord.com for Discord integration), which constitutes a critical privacy and data exfiltration risk. It does not appear to collect cookies, localStorage, or sensitive form data, nor does it use obfuscation or dynamic code execution. The script uses Proxy wrappers on native functions to bypass anti-cheat mechanisms, which increases the attack surface. Notification API and GM_xmlhttpRequest permissions are requested, which are medium risks. No DOM XSS or supply chain risks were detected. The overall risk is HIGH due to critical data transmission issues.

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
> The script sends latitude and longitude coordinates to nominatim.openstreetmap.org for reverse geocoding via GM_xmlhttpRequest. This is a third-party service and may receive user location data.  
> 位置：_getAddress function  
> 建议：Inform users about third-party data transmission and consider proxying requests if privacy is a concern.

**⛔ CRITICAL** — Data Exfiltration  
> The script is designed to send map pin data to Discord (discord.com) via webhook or API, which may include user actions or location data.  
> 位置：@connect discord.com (potential usage in sendToDiscord feature)  
> 建议：Ensure users are aware of what data is sent to Discord and allow them to opt-in/opt-out.

**🟠 MEDIUM** — Sensitive API Usage  
> The script requests Notification API permission and can send notifications to the user.  
> 位置：requestNotificationPermission, sendNotification functions  
> 建议：Ensure notifications are not abused and only used for legitimate user alerts.

**🟠 MEDIUM** — Sensitive API Usage  
> The script applies Proxy wrappers to native functions (e.g., setAttribute, push, fetch) to bypass anti-cheat and tracking mechanisms. While not directly malicious, this increases attack surface and may break page logic.  
> 位置：Multiple locations (platform-specific logic)  
> 建议：Minimize Proxy usage and ensure it does not introduce security regressions or unexpected behavior.

**🟠 MEDIUM** — Permission Abuse  
> The script requests GM_xmlhttpRequest permission, which allows arbitrary cross-origin requests. This is necessary for its features but increases risk if the script is compromised.  
> 位置：@grant GM_xmlhttpRequest  
> 建议：Limit @connect domains to only those strictly necessary and review code for misuse.

**🟠 MEDIUM** — Sensitive API Usage  
> The script requests Notification API permission and can send notifications to the user.  
> 位置：requestNotificationPermission, sendNotification functions  
> 建议：Ensure notifications are not abused and only used for legitimate user alerts.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr)*
