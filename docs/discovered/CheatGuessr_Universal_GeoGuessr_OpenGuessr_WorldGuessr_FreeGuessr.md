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

**风险等级**：⛔ CRITICAL　　**安全评分**：0/100　　**分析时间**：2026-06-15

> 该脚本存在严重的数据外传风险（向 discord.com 和 nominatim.openstreetmap.org 发送数据），并通过 Proxy 操作多个原生方法（如 fetch、push、setAttribute），可能导致远程代码执行和页面行为异常。脚本未收集隐私数据，但存在权限滥用、敏感 API 调用、iframe 风险等问题。安全评分为 0，建议谨慎使用并严格限制数据传输内容。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script sends data to discord.com via GM_xmlhttpRequest, potentially including game coordinates or user actions.  
> 位置：GM_xmlhttpRequest usage, @connect discord.com  
> 建议：Limit data sent to Discord, ensure no sensitive user information or authentication tokens are transmitted.

**⛔ CRITICAL** — Data Transmission  
> Script sends coordinates to nominatim.openstreetmap.org for reverse geocoding.  
> 位置：_getAddress function, GM_xmlhttpRequest usage  
> 建议：Ensure only non-sensitive data (coordinates) are sent; avoid transmitting user identifiers or cookies.

**🔴 HIGH** — Remote Code Execution  
> Script applies Proxy wrappers to built-in methods (setAttribute, push, fetch, setItem) to bypass cheat detection and manipulate behavior.  
> 位置：Proxy usage throughout platform-specific code blocks  
> 建议：Ensure Proxy usage does not introduce security vulnerabilities or break site functionality.

**🔴 HIGH** — Remote Code Execution  
> Script applies Proxy to unsafeWindow.fetch, potentially interfering with legitimate network requests.  
> 位置：unsafeWindow.fetch Proxy (freeguessr platform)  
> 建议：Limit Proxy scope to only cheat-related requests; avoid interfering with unrelated fetch calls.

**🔴 HIGH** — Remote Code Execution  
> Script applies Proxy to Array.prototype.push, which may affect unrelated code and introduce unpredictable behavior.  
> 位置：Array.prototype.push Proxy (multiple platforms)  
> 建议：Restrict Proxy usage to only relevant arrays or contexts.

**🟠 MEDIUM** — Sensitive API Usage  
> Script requests Notification API permission and sends notifications.  
> 位置：requestNotificationPermission, sendNotification functions  
> 建议：Avoid excessive or misleading notifications; do not use Notification API for phishing or spam.

**🟠 MEDIUM** — Permission Abuse  
> Script requests @grant GM_xmlhttpRequest, but also manipulates fetch and other APIs, potentially exceeding necessary permissions.  
> 位置：@grant section  
> 建议：Review granted permissions and remove any not strictly required.

**🟠 MEDIUM** — Sensitive API Usage  
> Script requests Notification API permission, which could be abused for spam or phishing.  
> 位置：Notification API usage  
> 建议：Use Notification API responsibly and only for legitimate user alerts.

**🟡 LOW** — ClickJacking / iframe Risk  
> Script modifies iframe sandbox attributes, potentially weakening frame protection.  
> 位置：Element.prototype.setAttribute Proxy (worldguessr, openguessr, freeguessr platforms)  
> 建议：Do not remove sandbox attributes from iframes unless absolutely necessary and safe.

**🟡 LOW** — Obfuscation  
> Script does not use code obfuscation or minification.  
> 位置：Entire script  
> 建议：Maintain transparency; avoid obfuscation unless necessary for protection.

**🟡 LOW** — Supply Chain Risk  
> Script uses @require only for update/download URLs, not for third-party libraries.  
> 位置：@downloadURL, @updateURL  
> 建议：If using @require for libraries, ensure source is trusted and version is fixed.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr)*
