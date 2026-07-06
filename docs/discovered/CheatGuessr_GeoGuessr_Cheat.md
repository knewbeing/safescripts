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

**风险等级**：⛔ CRITICAL　　**安全评分**：22/100　　**分析时间**：2026-07-06

> 该脚本存在数据外传（向第三方服务器发送游戏坐标）和隐私采集（localStorage 存储配置、拦截页面数据）等严重安全风险。未检测到远程代码执行、代码混淆、DOM XSS、供应链风险等问题。建议移除未使用的高权限申请，并限制数据外传行为。整体安全评分较低，不建议在敏感环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://nominatim.openstreetmap.org/reverse） |
| 隐私采集 | ❌ 检测到（localStorage: 存储用户设置, 拦截 XMLHttpRequest 响应，解析页面坐标） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 fetch 向 https://nominatim.openstreetmap.org/reverse 发起网络请求，传递用户当前游戏坐标（lat/lng），存在数据外传风险。  
> 位置：fetchLocationDetails()  
> 建议：仅在用户明确操作时发送请求，并在文档中告知用户数据用途。避免自动外传敏感坐标信息。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取并存储用户设置到 localStorage，未涉及敏感信息，但存在隐私采集行为。  
> 位置：loadSettings()/saveSettings()  
> 建议：确保存储内容仅为非敏感配置，避免存储用户账号、密码等敏感信息。

**🔴 HIGH** — 隐私采集  
> 脚本拦截 XMLHttpRequest，解析响应内容以提取坐标信息，未将数据外传，但存在对页面数据的深度访问。  
> 位置：XMLHttpRequest.prototype.open  
> 建议：确保仅处理必要数据，避免扩展为更广泛的隐私采集。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_webRequest 权限，但实际代码未使用该 API，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：移除未使用的高权限申请，减少攻击面。

**🟡 LOW** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行方式。  
> 位置：全局  
> 建议：保持当前安全实践，避免未来引入动态执行代码。

**🟡 LOW** — 代码混淆  
> 脚本未检测到代码混淆、base64 解码、字符串数组映射或高度压缩代码。  
> 位置：全局  
> 建议：保持代码可读性，便于社区审查。

**🟡 LOW** — DOM XSS  
> 脚本未检测到 DOM XSS 或注入风险，未将用户输入直接插入 innerHTML/outerHTML。  
> 位置：toggleSettingsModal()  
> 建议：如未来引入用户输入，需严格转义。

**🟡 LOW** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：全局  
> 建议：保持当前安全实践。

**🟡 LOW** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如未来引入第三方库，需固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：保持当前安全实践。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/525302-cheatguessr-geoguessr-cheat)*
