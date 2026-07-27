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

**风险等级**：⛔ CRITICAL　　**安全评分**：34/100　　**分析时间**：2026-07-27

> This script transmits user/game data (coordinates) to third-party services (discord.com, nominatim.openstreetmap.org), which is a critical privacy and data exfiltration risk. It also hijacks built-in browser functions via Proxy, which could have unintended consequences. No evidence of code obfuscation, DOM XSS, or supply chain risk. Sensitive API usage is limited to notifications. Overall, the script poses a CRITICAL risk due to external data transmission and function hijacking.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（Coordinates (lat/lng) sent to external APIs, Notification permission requested） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script sends data to discord.com via GM_xmlhttpRequest, potentially including user coordinates or game data.  
> 位置：sendToDiscord feature, GM_xmlhttpRequest usage  
> 建议：Ensure only non-sensitive, non-personal data is transmitted. Warn users about external transmission.

**⛔ CRITICAL** — Data Exfiltration  
> Script sends coordinates to nominatim.openstreetmap.org for reverse geocoding.  
> 位置：_getAddress function, GM_xmlhttpRequest usage  
> 建议：Review transmitted data for privacy concerns. Use only trusted APIs.

**🔴 HIGH** — Remote Code Execution / Function Hijacking  
> Script applies Proxy wrappers to built-in functions (setAttribute, push, fetch, setItem, startsWith) to bypass cheat detection and alter behavior.  
> 位置：Proxy usage throughout platform-specific blocks  
> 建议：Carefully review for unintended side effects or privilege escalation.

**🟠 MEDIUM** — Sensitive API Usage  
> Script requests Notification API permission and sends notifications.  
> 位置：requestNotificationPermission, sendNotification  
> 建议：Limit notification usage and avoid spam.

**🟠 MEDIUM** — Permission Abuse  
> Script grants GM_xmlhttpRequest permission and @connect to external domains, which is necessary but increases attack surface.  
> 位置：UserScript metadata  
> 建议：Restrict @connect domains to only those strictly required.

**🟡 LOW** — Remote Code Execution  
> Script does not use eval, new Function, or dynamic script injection, reducing RCE risk.  
> 位置：Global code review  
> 建议：Maintain this practice.

**🟡 LOW** — Obfuscation  
> No evidence of code obfuscation or minification.  
> 位置：Global code review  
> 建议：Maintain code transparency.

**🟡 LOW** — DOM XSS  
> No DOM XSS or injection detected; user input is not inserted into innerHTML/outerHTML.  
> 位置：Global code review  
> 建议：Maintain input sanitization.

**🟡 LOW** — Sensitive API Usage  
> No clipboard, geolocation, RTCPeerConnection, MediaDevices, or browser fingerprinting APIs used.  
> 位置：Global code review  
> 建议：Maintain privacy-respecting practices.

**🟡 LOW** — Supply Chain Risk  
> No supply chain risk detected; script does not use @require for external libraries.  
> 位置：UserScript metadata  
> 建议：Maintain strict supply chain control.

**🟡 LOW** — ClickJacking / iframe Risk  
> No clickjacking or iframe manipulation for data extraction detected.  
> 位置：Global code review  
> 建议：Maintain safe iframe usage.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr)*
