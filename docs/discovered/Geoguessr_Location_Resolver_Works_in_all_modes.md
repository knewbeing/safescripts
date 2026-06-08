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

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-06-08

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。主要问题为申请了未使用的 GM_webRequest 权限和敏感 API 拦截。整体风险较低，但建议移除不必要的权限，并持续关注未来代码变更。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — Sensitive API interception  
> The script overrides XMLHttpRequest.prototype.open to intercept Google Maps API responses. While it does not transmit data externally, this is a sensitive operation and should be reviewed for future risks if modified.  
> 位置：XMLHttpRequest.prototype.open override  
> 建议：Ensure no code changes introduce data exfiltration. Monitor for future updates.

**🟠 MEDIUM** — Permission misuse  
> The script requests the GM_webRequest permission, but does not use any GM_* APIs in the code.  
> 位置：@grant GM_webRequest in metadata  
> 建议：Remove unnecessary permissions to reduce attack surface.

**🟡 LOW** — Key event usage  
> The script listens for keydown events globally, but only uses them for local feature triggers. No keylogger behavior detected.  
> 位置：document.addEventListener('keydown', ...)  
> 建议：No action needed, but be cautious if future versions combine this with network requests.

**🟡 LOW** — DOM manipulation  
> The script manipulates React internal properties to trigger map actions. This is fragile and may break with site updates, but does not introduce direct security risk.  
> 位置：placeMarker / placeMarkerStreaks functions  
> 建议：Monitor for site changes that may affect script behavior.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/450253-geoguessr-location-resolver-works-in-all-modes)*
