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

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-06-29

> The script does not contain malicious code, obfuscation, or dangerous remote code execution. It does send coordinates to a third-party API (OpenStreetMap Nominatim) for reverse geocoding, which is a privacy consideration but not a direct leak of user-identifiable data. There is no evidence of keylogging, cookie access, or supply chain risk. The script requests an unused GM_webRequest permission, which should be removed. Overall, the script is relatively safe for its intended purpose, but users should be aware of the coordinate data transmission.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（Reads/writes localStorage for settings） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> The script sends latitude and longitude coordinates to the public OpenStreetMap Nominatim API to reverse geocode the location. This is a third-party server, but the data sent is not user-identifiable or sensitive (just coordinates).  
> 位置：fetchLocationDetails() function  
> 建议：Warn users that their coordinates are sent to a third-party service. Consider making this optional or allowing users to use their own API endpoint.

**🟠 MEDIUM** — Privacy Collection  
> The script reads and writes to localStorage for saving user settings.  
> 位置：loadSettings(), saveSettings()  
> 建议：No sensitive data is stored; this is a standard practice. No action needed.

**🟠 MEDIUM** — Sensitive API Usage  
> The script monkey-patches XMLHttpRequest.prototype.open to intercept requests to Google Maps APIs. This is a powerful technique but does not exfiltrate data.  
> 位置：XMLHttpRequest.prototype.open override  
> 建议：Ensure this does not break other site functionality. No data is sent externally.

**🟠 MEDIUM** — Permission Abuse  
> The script requests the GM_webRequest permission, but does not use any GM_* APIs in the code provided.  
> 位置：@grant GM_webRequest  
> 建议：Remove unused permissions to reduce attack surface.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/525302-cheatguessr-geoguessr-cheat)*
