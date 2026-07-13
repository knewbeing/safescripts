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

**风险等级**：🔴 HIGH　　**安全评分**：42/100　　**分析时间**：2026-07-13

> 该脚本存在数据外传（向第三方 API 发送经纬度）、本地存储访问、权限冗余等安全隐患。未发现远程代码执行、代码混淆或 DOM XSS 风险。建议移除未使用的权限，明确告知用户数据用途，并持续关注第三方 API 的安全性。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（访问 localStorage 以保存/读取脚本设置） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 fetch 向 https://nominatim.openstreetmap.org 发送经纬度数据以获取地理信息。虽然这是公开 API，且未携带用户敏感信息，但属于数据外传行为。  
> 位置：fetchLocationDetails()  
> 建议：明确告知用户数据用途，避免发送敏感信息。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取和写入 localStorage 用于保存设置。虽然内容为脚本自身配置，但涉及本地存储访问。  
> 位置：loadSettings(), saveSettings()  
> 建议：仅存储必要的非敏感信息，避免存储用户隐私数据。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本重写 XMLHttpRequest.prototype.open 以拦截 Google Maps API 的响应内容，提取经纬度信息。此行为属于页面内容监控，但未发现外传。  
> 位置：XMLHttpRequest.prototype.open  
> 建议：确保不将拦截到的数据外传。

**🟠 MEDIUM** — 权限滥用  
> @grant 仅申请了 GM_webRequest，但脚本未实际使用该 API，存在权限冗余。  
> 位置：元数据 @grant  
> 建议：移除未使用的高权限申请，最小化权限。

**🟡 LOW** — 远程代码执行  
> 未发现代码混淆、eval、Function 构造器、动态 script 标签、document.write 等远程代码执行高危行为。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆和动态执行。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/525302-cheatguessr-geoguessr-cheat)*
