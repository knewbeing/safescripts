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

**风险等级**：⛔ CRITICAL　　**安全评分**：42/100　　**分析时间**：2026-06-15

> 该脚本存在数据外传（地理坐标发送到第三方服务器）和隐私采集（localStorage存储用户设置）等关键安全风险。还存在权限滥用（申请未用GM_webRequest）和敏感API调用。未检测到代码混淆、DOM XSS或供应链风险。建议移除未用权限、明确告知用户数据用途，并避免发送敏感信息。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://nominatim.openstreetmap.org/reverse） |
| 隐私采集 | ❌ 检测到（localStorage: 存储用户设置） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 fetch 向 https://nominatim.openstreetmap.org/reverse 发送地理坐标数据，存在用户数据外传风险。  
> 位置：fetchLocationDetails()  
> 建议：仅在用户明确同意时发送数据，并在文档中声明数据用途。避免发送敏感信息。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取并存储用户设置到 localStorage，涉及隐私采集。  
> 位置：loadSettings()/saveSettings()  
> 建议：确保仅存储必要的非敏感数据，并在文档中告知用户。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_webRequest 权限，但实际代码未使用该 API，存在权限滥用风险。  
> 位置：@grant GM_webRequest  
> 建议：移除未使用的高权限申请，减少攻击面。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本通过 XMLHttpRequest.prototype.open 拦截并处理 Google Maps API 响应，属于敏感 API 调用。  
> 位置：XMLHttpRequest.prototype.open  
> 建议：确保拦截逻辑不会泄露用户敏感信息，且仅用于本地处理。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/525302-cheatguessr-geoguessr-cheat)*
