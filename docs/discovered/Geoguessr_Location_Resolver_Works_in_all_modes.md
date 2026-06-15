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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-15

> 该脚本未发现数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险或敏感 API 调用。主要风险为权限滥用（申请未使用的 GM_webRequest）和网络拦截行为。整体安全风险较低，建议移除未使用权限。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — Network interception  
> Overrides XMLHttpRequest.prototype.open to intercept Google Maps API responses. No data is sent externally; only local extraction.  
> 位置：XMLHttpRequest.prototype.open override  
> 建议：Ensure no code modifications allow data exfiltration in future updates.

**🟠 MEDIUM** — Permission misuse  
> Uses @grant GM_webRequest, but script does not utilize GM_webRequest API.  
> 位置：Metadata block  
> 建议：Remove unused @grant permissions to minimize attack surface.

**🟡 LOW** — Event listener  
> Listens for keydown events to trigger script actions. No evidence of keylogger behavior or data exfiltration.  
> 位置：document.addEventListener("keydown", onKeyDown)  
> 建议：Limit event listeners to only necessary keys and actions.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/450253-geoguessr-location-resolver-works-in-all-modes)*
