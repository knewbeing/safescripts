---
title: "CheatGuessr | GeoGuessr Cheat"
---

# CheatGuessr | GeoGuessr Cheat



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/CheatGuessr_GeoGuessr_Cheat.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.2**　　发现时间：**2026-05-04**　　来源：[GreasyFork](https://greasyfork.org/scripts/525302-cheatguessr-geoguessr-cheat) <Badge type="tip" text="GreasyFork" />　　安装量：**9,421**　　评分：👍4 / 👎4

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

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-06-08

> The script does not collect or transmit sensitive user data, but it does send coordinates to a third-party API (OpenStreetMap Nominatim) for reverse geocoding. It stores settings in localStorage and unnecessarily requests the GM_webRequest permission. No code obfuscation, XSS, or remote code execution risks were found. Overall, the script is relatively safe for use, but users should be aware of the data transmission to OpenStreetMap and the unnecessary permission request.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（localStorage: stores user settings） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> The script sends latitude and longitude coordinates to the public OpenStreetMap Nominatim API to reverse geocode the location. This is a third-party server, but the data sent is not user-identifiable or sensitive (just coordinates).  
> 位置：fetchLocationDetails() function (fetch to https://nominatim.openstreetmap.org)  
> 建议：Document this behavior in the script description. If privacy is a concern, allow users to disable this feature.

**🟠 MEDIUM** — Privacy Collection  
> The script stores user settings in localStorage under the key 'geoGuessrHelper'. No sensitive data is stored, but localStorage is used.  
> 位置：loadSettings() and saveSettings() functions  
> 建议：No action needed unless sensitive data is stored. Document usage for transparency.

**🟠 MEDIUM** — Permission Abuse  
> The script requests the GM_webRequest permission, but does not use any GM_* API in the code. This is an unnecessary high privilege.  
> 位置：@grant GM_webRequest in metadata  
> 建议：Remove unused @grant GM_webRequest to reduce attack surface.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/525302-cheatguessr-geoguessr-cheat)*
