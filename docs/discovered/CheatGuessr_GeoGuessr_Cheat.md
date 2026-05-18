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

**风险等级**：🔴 HIGH　　**安全评分**：52/100　　**分析时间**：2026-05-18

> The script transmits coordinates to a third-party API (OpenStreetMap Nominatim), which is a critical data exfiltration risk. It also collects settings in localStorage, monkey-patches XMLHttpRequest, and requests an unused high-privilege permission. No code obfuscation or DOM XSS risks were found. The overall risk is HIGH and the script is NOT approved for safe use.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（Reads/writes settings to localStorage） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script sends latitude and longitude coordinates to the public OpenStreetMap Nominatim API to retrieve location details. This constitutes data transmission to a third-party server.  
> 位置：fetchLocationDetails() function  
> 建议：Warn users about the external API call and avoid sending sensitive or user-identifiable data. Consider making this feature optional.

**🟠 MEDIUM** — Privacy Collection  
> The script reads and writes settings to localStorage under the key 'geoGuessrHelper'.  
> 位置：loadSettings() and saveSettings() functions  
> 建议：Ensure no sensitive or personal data is stored. Document the usage for transparency.

**🟠 MEDIUM** — Sensitive API Usage  
> The script modifies XMLHttpRequest.prototype.open to intercept Google Maps API responses and extract coordinates. This is a form of monkey-patching and may break site functionality or introduce compatibility/security risks.  
> 位置：XMLHttpRequest.prototype.open override  
> 建议：Limit the scope of monkey-patching and restore the original function when not needed.

**🟠 MEDIUM** — Permission Abuse  
> The script requests the GM_webRequest permission, but does not use any GM_webRequest API in the code.  
> 位置：@grant GM_webRequest in metadata  
> 建议：Remove unnecessary permissions to reduce attack surface.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/525302-cheatguessr-geoguessr-cheat)*
