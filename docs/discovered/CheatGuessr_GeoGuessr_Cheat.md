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

**风险等级**：🟠 MEDIUM　　**安全评分**：59/100　　**分析时间**：2026-05-11

> The script does not contain code obfuscation, remote code execution, or DOM XSS risks. It does transmit coordinates to a third-party (OpenStreetMap Nominatim) for reverse geocoding, which is a privacy consideration but not a critical leak of user data. It stores settings in localStorage and requests an unused GM_webRequest permission. No supply chain or iframe/clickjacking risks detected. Overall, the script is medium risk due to third-party data transmission and minor privacy/permission issues.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（localStorage: stores settings (keybinds, UI preferences)） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> The script sends latitude and longitude coordinates to the public OpenStreetMap Nominatim API to reverse geocode the location when the user requests detailed location information. This is a third-party data transmission, but only coordinates are sent, not user-identifiable data.  
> 位置：fetchLocationDetails() function  
> 建议：Document this behavior for transparency. If possible, allow users to disable this feature.

**🟠 MEDIUM** — Privacy Collection  
> The script stores user settings in localStorage under the key 'geoGuessrHelper'. This includes keybinds and UI preferences, but no sensitive or personal data.  
> 位置：loadSettings() and saveSettings() functions  
> 建议：No action needed unless sensitive data is added in the future.

**🟠 MEDIUM** — Sensitive API Usage  
> The script modifies XMLHttpRequest.prototype.open to intercept certain Google Maps API calls and extract coordinates. This is a form of monkey-patching but does not execute remote code or introduce direct RCE risk.  
> 位置：XMLHttpRequest.prototype.open override  
> 建议：Monitor for future changes that could introduce RCE or data exfiltration.

**🟠 MEDIUM** — Permission Abuse  
> The script requests the GM_webRequest permission, but does not use any GM_* APIs in the provided code.  
> 位置：@grant GM_webRequest in metadata  
> 建议：Remove unused permissions to reduce attack surface.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/525302-cheatguessr-geoguessr-cheat)*
