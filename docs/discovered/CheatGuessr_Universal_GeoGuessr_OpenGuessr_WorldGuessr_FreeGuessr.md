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

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-07-06

> This script transmits game coordinates and address data to third-party servers (Discord and OpenStreetMap Nominatim), which constitutes critical data exfiltration and privacy risks. It also requests Notification API permission and modifies iframe sandboxing, introducing additional medium and low risks. No code obfuscation or DOM XSS detected. Supply chain risk is low as no @require external libraries are used. Overall, the script is not safe for privacy-sensitive users.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（Collects latitude/longitude coordinates, Collects address data via reverse geocoding） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script sends game coordinates and address data to Discord via GM_xmlhttpRequest. This is a third-party server and may expose user/game data.  
> 位置：sendToDiscord function (not fully shown, but referenced in hotkeys/features and GM_xmlhttpRequest usage)  
> 建议：Limit data sent to Discord, inform users, and allow opt-out. Avoid sending sensitive or identifying information.

**⛔ CRITICAL** — Data Exfiltration  
> Script sends latitude/longitude to nominatim.openstreetmap.org for reverse geocoding. While this is a public API, it may expose user/game location data.  
> 位置：_getAddress function  
> 建议：Minimize data sent, inform users, and consider local geocoding if privacy is a concern.

**🟠 MEDIUM** — Sensitive API Usage  
> Script requests Notification API permission and sends notifications. This is a sensitive API and may be abused.  
> 位置：requestNotificationPermission, sendNotification functions  
> 建议：Use Notification API responsibly, ensure user consent, and avoid spam.

**🟠 MEDIUM** — Permission Usage  
> Script grants GM_xmlhttpRequest, which is used for cross-origin requests. This is a high privilege and must be justified.  
> 位置：@grant GM_xmlhttpRequest in metadata  
> 建议：Ensure GM_xmlhttpRequest is only used for necessary, user-initiated actions.

**🟡 LOW** — ClickJacking Risk  
> Script modifies Element.prototype.setAttribute to block sandbox attribute on iframes for certain platforms. This may weaken frame protection and expose to clickjacking.  
> 位置：Element.prototype.setAttribute Proxy  
> 建议：Avoid weakening iframe sandboxing unless absolutely necessary.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr)*
