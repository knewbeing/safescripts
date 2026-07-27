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

**风险等级**：🔴 HIGH　　**安全评分**：42/100　　**分析时间**：2026-07-27

> 该脚本存在用户地理坐标数据外传至第三方服务器（OpenStreetMap Nominatim），属于严重安全风险。未检测到代码混淆、远程代码执行、DOM XSS、供应链风险等高危行为。存在权限滥用（申请 GM_webRequest 未实际使用）和隐私采集（localStorage 持久化设置）。建议移除未使用权限、明确告知用户数据外传行为，并限制敏感数据的发送。整体风险等级为 HIGH，安全评分为 42。未批准上线。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://nominatim.openstreetmap.org/reverse） |
| 隐私采集 | ❌ 检测到（localStorage: 存储设置项） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 fetch 向 https://nominatim.openstreetmap.org/reverse 发送地理坐标数据，存在用户数据外传风险。  
> 位置：fetchLocationDetails()  
> 建议：明确告知用户数据外传行为，并限制仅在用户主动操作时发送。避免自动发送敏感数据。

**🟠 MEDIUM** — 隐私采集  
> 脚本读取并存储设置到 localStorage，未涉及敏感隐私字段，但存在持久化风险。  
> 位置：loadSettings()/saveSettings()  
> 建议：确保存储内容不包含敏感信息，建议加密或限制存储范围。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_webRequest 权限，但实际代码未使用该 API，属于权限滥用。  
> 位置：@grant GM_webRequest  
> 建议：移除未使用的高权限申请，减少攻击面。

**🟡 LOW** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等远程代码执行方式。  
> 位置：全局  
> 建议：保持当前安全实践，避免动态执行字符串。

**🟡 LOW** — 供应链风险  
> 脚本未加载第三方库，无供应链风险。  
> 位置：全局  
> 建议：如需加载第三方库，建议使用官方 CDN 并固定版本。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/525302-cheatguessr-geoguessr-cheat)*
