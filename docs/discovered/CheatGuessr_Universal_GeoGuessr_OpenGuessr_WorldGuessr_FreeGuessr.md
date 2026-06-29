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

**风险等级**：🔴 HIGH　　**安全评分**：52/100　　**分析时间**：2026-06-29

> This script transmits user location data (latitude/longitude) to a third-party geocoding service (nominatim.openstreetmap.org), which is a critical data exfiltration risk. It also requests notification permissions, modifies native browser APIs via Proxy (which could be abused for evasion or obfuscation), and requests more permissions than it uses. There is no evidence of direct privacy collection (e.g., cookies, input fields), DOM XSS, or supply chain risk in the provided code. The overall risk is HIGH due to the external data transmission and advanced API manipulation. User consent and transparency are recommended. Remove unused permissions and avoid weakening browser security features.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：nominatim.openstreetmap.org） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script sends latitude and longitude coordinates to the third-party service nominatim.openstreetmap.org via GM_xmlhttpRequest for reverse geocoding.  
> 位置：function _getAddress(lat, lng)  
> 建议：Ensure only non-sensitive, non-personal data is sent. Inform users of this external request. Consider proxying or limiting data exposure.

**🔴 HIGH** — Obfuscation/Evasion  
> The script applies Proxy wrappers to native functions (e.g., setAttribute, push, fetch) to bypass anti-cheat and tracking mechanisms. This is advanced behavior that could be abused for obfuscation or evasion.  
> 位置：Multiple locations (e.g., Element.prototype.setAttribute, Array.prototype.push, unsafeWindow.fetch)  
> 建议：Review all Proxy usage for legitimate purpose. Avoid using Proxies to hide malicious behavior.

**🟠 MEDIUM** — Sensitive API Usage  
> The script requests Notification API permissions and can send browser notifications.  
> 位置：sendNotification() / requestNotificationPermission()  
> 建议：Ensure notifications are not abused. Inform users about notification usage.

**🟠 MEDIUM** — Permission Overuse  
> The script requests GM_xmlhttpRequest permission and @connect for discord.com, but no code in the provided snippet sends data to discord.com. This is a potential over-privilege.  
> 位置：@grant/@connect metadata  
> 建议：Remove unused permissions to reduce attack surface.

**🟡 LOW** — Clickjacking/iframe Risk  
> The script modifies frame sandboxing behavior by disabling the 'sandbox' attribute on iframes for certain platforms, which may weaken clickjacking protections.  
> 位置：Element.prototype.setAttribute Proxy  
> 建议：Do not remove or bypass iframe sandboxing unless absolutely necessary and safe.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr)*
