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

**风险等级**：⛔ CRITICAL　　**安全评分**：22/100　　**分析时间**：2026-05-25

> This script transmits game coordinates and user actions to third-party servers (discord.com, nominatim.openstreetmap.org), which constitutes critical data exfiltration and privacy risk. It also manipulates browser APIs and site internals to bypass anti-cheat, which may introduce high security risks. Notification API usage is present but not abused. No code obfuscation or DOM XSS detected. Supply chain risk is low as no @require external scripts are used. Overall, the script is not safe for sensitive environments and should not be approved.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（Latitude/longitude coordinates are collected and sent to external services., Notification permission is requested.） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script sends data to discord.com via GM_xmlhttpRequest, potentially including game coordinates and user actions.  
> 位置：sendToDiscord feature, GM_xmlhttpRequest usage  
> 建议：Limit data sent to Discord, avoid transmitting sensitive or user-identifiable information.

**⛔ CRITICAL** — Data Exfiltration  
> Script sends latitude and longitude to nominatim.openstreetmap.org for reverse geocoding.  
> 位置：_getAddress function, GM_xmlhttpRequest usage  
> 建议：Ensure only necessary data is sent; avoid leaking user/game context.

**🔴 HIGH** — Remote Code Execution / Tampering  
> Script applies Proxy wrappers to built-in methods (setAttribute, push, fetch, setItem) to bypass anti-cheat and tracking.  
> 位置：Proxy usage throughout platform-specific blocks  
> 建议：Carefully review Proxy logic to avoid breaking site functionality or introducing security issues.

**🟠 MEDIUM** — Sensitive API Usage  
> Script requests Notification API permission and sends notifications.  
> 位置：requestNotificationPermission, sendNotification  
> 建议：Ensure notifications are not abused for spam or phishing.

**🟠 MEDIUM** — Permission Abuse  
> Script grants GM_xmlhttpRequest but only uses it for specific external requests; no evidence of excessive permission usage.  
> 位置：Metadata @grant section  
> 建议：Review permissions regularly and remove unused grants.

**🟡 LOW** — ClickJacking / iframe Risk  
> Script modifies iframe sandbox attributes, potentially weakening frame protection.  
> 位置：Element.prototype.setAttribute Proxy (non-geoguessr platforms)  
> 建议：Do not remove sandbox attributes unless absolutely necessary.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr)*
