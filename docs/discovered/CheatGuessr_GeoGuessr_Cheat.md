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

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-06-01

> The script does not contain malicious code, obfuscation, or direct privacy-invasive behavior. It does transmit coordinates to a third-party API (OpenStreetMap Nominatim) for reverse geocoding, which is a critical data transmission but not a privacy risk for most users. There is no evidence of keylogging, DOM XSS, or remote code execution. The script requests an unused high-privilege permission (GM_webRequest), which should be removed. Overall, the script is safe for most users, but transparency about data transmission and permissions is recommended.

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
> The script sends latitude and longitude coordinates to the public OpenStreetMap Nominatim API to reverse geocode the location. This is a third-party data transmission, but the data is not user-identifiable or sensitive (just coordinates).  
> 位置：fetchLocationDetails() function  
> 建议：Document this behavior for transparency. If privacy is a concern, consider making this feature optional or warning users.

**🟠 MEDIUM** — Privacy Collection  
> The script stores user settings in localStorage under the key 'geoGuessrHelper'.  
> 位置：loadSettings() and saveSettings() functions  
> 建议：No sensitive data is stored; this is a standard practice. If storing sensitive data in the future, consider using secure storage.

**🟠 MEDIUM** — Permission Abuse  
> The script requests the GM_webRequest permission, but does not use any GM_* APIs in the code provided.  
> 位置：@grant GM_webRequest in metadata  
> 建议：Remove unused permissions to minimize attack surface and follow the principle of least privilege.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/525302-cheatguessr-geoguessr-cheat)*
