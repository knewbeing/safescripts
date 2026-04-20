---
title: "GeoGuessr作弊助手"
---

# GeoGuessr作弊助手

`游戏辅助`  `作弊`  `地图工具`  `快捷键`  `广告屏蔽`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/CheatGuessr_GeoGuessr_Cheat.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.2**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/525302-cheatguessr-geoguessr-cheat) <Badge type="tip" text="GreasyFork" />　　安装量：**8,428**　　评分：👍4 / 👎3

## 功能介绍

本脚本为GeoGuessr游戏提供作弊辅助工具，允许用户通过快捷键显示谷歌地图、获取详细地理位置信息等。支持自定义设置菜单，提升游戏体验。还可屏蔽广告，界面可自定义。

## 适用网站

- GeoGuessr官网

## 使用方法

1. 安装脚本后，进入GeoGuessr官网。
2. 按下数字键3可打开设置菜单，自定义快捷键和功能。
3. 按快捷键1可显示谷歌地图辅助定位。
4. 根据需要使用其他快捷键获取详细位置或进行快速定位。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_webRequest` | 允许脚本拦截和修改网页的网络请求，便于实现作弊功能。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：34/100　　**分析时间**：2026-04-20

> 该脚本存在数据外传（向第三方 API 发送地图坐标）和隐私采集（localStorage 读取/写入）风险，且申请了未使用的高权限（GM_webRequest）。未发现远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险或 iframe 风险。建议移除未使用权限，并明确告知用户数据外传行为。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://nominatim.openstreetmap.org/reverse） |
| 隐私采集 | ❌ 检测到（localStorage 读取/写入） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 fetch 向 https://nominatim.openstreetmap.org/reverse 发起网络请求，传递当前地图坐标（lat/lng），用于获取地理位置详情。该请求为第三方服务，可能涉及用户行为数据外传。  
> 位置：fetchLocationDetails() 函数  
> 建议：如需使用第三方 API，建议明确告知用户并限制请求内容，仅发送必要数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取和写入 localStorage 以保存用户设置。未发现敏感数据采集行为。  
> 位置：loadSettings()/saveSettings()  
> 建议：确保仅存储非敏感配置数据，避免存储用户隐私信息。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行方式，也未动态加载外部 JS。  
> 位置：全局代码审查  
> 建议：保持当前安全实践，避免未来引入远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 脚本未发现明显混淆、压缩或 base64/unicode 编码混淆特征。  
> 位置：全局代码审查  
> 建议：保持代码可读性，便于社区审查。

**🔴 HIGH** — DOM XSS  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 DOM XSS 风险。  
> 位置：toggleSettingsModal() 等 UI 构建函数  
> 建议：如未来涉及用户输入，需严格转义。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_webRequest 权限，但实际代码未使用 GM_webRequest API。  
> 位置：@grant 元数据  
> 建议：移除未使用的高权限申请，减少权限滥用风险。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：全局代码审查  
> 建议：保持当前安全实践。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用官方 CDN 并固定版本。

**🟡 LOW** — ClickJacking/iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：mapsFromCoords() 函数仅打开新窗口  
> 建议：保持当前安全实践。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/525302-cheatguessr-geoguessr-cheat)*
