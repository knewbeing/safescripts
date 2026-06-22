---
title: "GeoGuessr 地点解析助手"
---

# GeoGuessr 地点解析助手

`游戏辅助`  `自动答题`  `地图工具`  `GeoGuessr`  `作弊`  `地理定位`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Geoguessr_Location_Resolver_Works_in_all_modes.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**14.1**　　发现时间：**2026-05-11**　　来源：[GreasyFork](https://greasyfork.org/scripts/450253-geoguessr-location-resolver-works-in-all-modes) <Badge type="tip" text="GreasyFork" />　　安装量：**30,091**　　评分：👍29 / 👎9

## 功能介绍

本脚本可自动获取GeoGuessr游戏中的真实地理位置，帮助用户一键获得最高分或接近满分，并可快速在Google地图中打开当前位置。适用于所有游戏模式，极大简化猜地点过程。

## 适用网站

- GeoGuessr官网

## 使用方法

1. 1. 安装脚本后，打开GeoGuessr官网并开始游戏。
2. 2. 游戏过程中，界面会出现自动定位和得分相关的按钮或功能。
3. 3. 点击相应按钮即可自动获得满分或高分，或在Google地图中查看真实位置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_webRequest` | 允许脚本拦截和分析网页与外部服务（如Google地图API）的数据请求，以获取地理坐标信息。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-22

> 该脚本主要通过拦截 Google Maps API 响应，解析地理坐标并自动在 Geoguessr 地图上标记，未发现数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 等高危行为。唯一中等风险为申请了未使用的 GM_webRequest 权限，建议移除。整体风险较低，安全性良好。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> @grant 仅申请 GM_webRequest，实际代码未使用该 API，存在权限冗余。  
> 位置：元数据 @grant  
> 建议：移除未使用的 GM_webRequest 权限。

**🟡 LOW** — 网络请求拦截  
> 脚本重写 XMLHttpRequest.prototype.open 以拦截 Google Maps API 响应内容，但未将数据外传，仅本地处理。  
> 位置：XMLHttpRequest.prototype.open  
> 建议：确保未来无外传代码加入。

**🟡 LOW** — 键盘事件监听  
> 脚本监听键盘事件（keydown），但未将输入内容外传。  
> 位置：document.addEventListener('keydown', ...)  
> 建议：仅用于快捷键控制，风险较低。

**🟡 LOW** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等动态执行代码。  
> 位置：全局  
> 建议：保持此安全实践。

**🟡 LOW** — 代码混淆  
> 未发现代码混淆、base64 解码、字符串数组混淆等特征。  
> 位置：全局  
> 建议：保持代码可读性。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/450253-geoguessr-location-resolver-works-in-all-modes)*
