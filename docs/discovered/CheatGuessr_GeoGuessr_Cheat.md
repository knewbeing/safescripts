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

**风险等级**：🔴 HIGH　　**安全评分**：52/100　　**分析时间**：2026-06-22

> This script transmits user location data to a third-party (OpenStreetMap Nominatim) for reverse geocoding, which is a critical privacy risk. It also requests an unused high-privilege permission (GM_webRequest), and monkey-patches XMLHttpRequest, which is a high-risk pattern. There is no evidence of code obfuscation or DOM XSS, but localStorage is used for settings. The overall risk is HIGH and the script is NOT approved for use in sensitive environments.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（localStorage: stores user settings） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script sends latitude and longitude coordinates to the public OpenStreetMap Nominatim API to reverse geocode the location. This is a third-party server and may receive user-derived location data.  
> 位置：fetchLocationDetails() function (fetch to https://nominatim.openstreetmap.org)  
> 建议：Warn users about third-party data transmission. Consider making this feature optional or allow users to use their own API endpoint.

**🔴 HIGH** — Remote Code Execution Risk  
> The script monkey-patches XMLHttpRequest.prototype.open to intercept requests. While not directly dangerous here, this is a high-risk pattern that can lead to breakage or security issues if misused.  
> 位置：XMLHttpRequest.prototype.open override  
> 建议：Limit monkey-patching to only what is necessary and document the rationale. Monitor for compatibility issues.

**🟠 MEDIUM** — Privacy Collection  
> The script stores user settings in localStorage, which is accessible by any script running on the same domain. While not directly exfiltrated, this is a privacy consideration.  
> 位置：loadSettings() and saveSettings() functions (localStorage usage)  
> 建议：Consider using GM_setValue/GM_getValue for more isolated storage, or clearly document the privacy model.

**🟠 MEDIUM** — Permission Abuse  
> The script requests the GM_webRequest permission, but does not use it in the code. Unused high-privilege permissions increase attack surface.  
> 位置：@grant GM_webRequest in metadata  
> 建议：Remove unused permissions from @grant to minimize risk.

**🟡 LOW** — DOM XSS Risk  
> The script dynamically creates and injects HTML for the settings modal using innerHTML. However, no user input is inserted into the DOM without escaping, so XSS risk is low in this context.  
> 位置：toggleSettingsModal() function (modal.innerHTML assignment)  
> 建议：If user input is ever inserted, sanitize it before using innerHTML.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/525302-cheatguessr-geoguessr-cheat)*
