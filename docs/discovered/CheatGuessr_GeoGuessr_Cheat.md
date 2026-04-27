---
title: "GeoGuessr作弊助手"
---

# GeoGuessr作弊助手

`游戏辅助`  `作弊`  `地理定位`  `快捷键`  `GeoGuessr`  `自定义设置`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/CheatGuessr_GeoGuessr_Cheat.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.2**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/525302-cheatguessr-geoguessr-cheat) <Badge type="tip" text="GreasyFork" />　　安装量：**9,016**　　评分：👍4 / 👎4

## 功能介绍

本脚本为GeoGuessr游戏提供作弊功能，允许用户通过快捷键快速查看地图、获取详细地理位置等信息，并可自定义设置。按数字键3可打开设置菜单，调整各项功能。

## 适用网站

- GeoGuessr网站

## 使用方法

1. 1. 安装脚本后，进入GeoGuessr网站。
2. 2. 按数字键3打开设置菜单，配置快捷键和功能。
3. 3. 在游戏过程中，使用设置好的快捷键快速查看地图或获取位置。
4. 4. 如需关闭地图或功能，再次使用对应快捷键即可。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_webRequest` | 允许脚本发起网络请求，获取或发送数据以辅助作弊功能。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：52/100　　**分析时间**：2026-04-27

> 脚本存在严重的数据外传风险（地理坐标发送至第三方服务器），并申请了未使用的高权限（GM_webRequest）。未发现代码混淆、远程代码执行、DOM XSS、敏感 API 调用等高风险行为。建议移除未使用权限，并明确告知用户地理数据用途。整体安全评分为 52，风险等级为 HIGH。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://nominatim.openstreetmap.org/reverse） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 fetch 向 https://nominatim.openstreetmap.org/reverse 发起网络请求，传递用户当前地理坐标（lat/lng）。该行为属于数据外传，且目标为第三方服务器。  
> 位置：fetchLocationDetails()  
> 建议：仅在用户明确操作时发送请求，并在文档中告知用户数据用途。避免自动或隐式传递敏感地理信息。

**🟠 MEDIUM** — 隐私采集  
> 脚本读取并存储设置到 localStorage，内容包括用户自定义按键等配置。未发现敏感隐私数据采集。  
> 位置：loadSettings(), saveSettings()  
> 建议：确保 localStorage 仅用于非敏感配置，避免存储账号、密码等敏感信息。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_webRequest 权限，但实际代码未使用 GM_webRequest API，属于权限滥用。  
> 位置：元数据 @grant  
> 建议：移除未使用的高权限申请，减少攻击面。

**🟡 LOW** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行相关 API，也未动态加载外部脚本。  
> 位置：全局  
> 建议：保持当前实现，避免引入动态代码执行。

**🟡 LOW** — 代码混淆  
> 脚本未发现代码混淆、base64 解码、字符串映射或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆。

**🟡 LOW** — DOM XSS  
> 脚本未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 DOM XSS 风险。  
> 位置：toggleSettingsModal()  
> 建议：如后续涉及用户输入，需严格转义。

**🟡 LOW** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：全局  
> 建议：保持当前实现，避免调用敏感 API。

**🟡 LOW** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：保持当前实现，避免 iframe 滥用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/525302-cheatguessr-geoguessr-cheat)*
