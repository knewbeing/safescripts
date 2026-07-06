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

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-07-06

> The script does not transmit data externally, does not collect sensitive user information, and avoids dynamic code execution and obfuscation. The only notable issue is the unnecessary GM_webRequest permission, which should be removed. Overall, the script is safe with a low risk profile.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script intercepts Google Maps API responses via XMLHttpRequest, but does not transmit data externally. No evidence of data exfiltration or external network requests.  
> 位置：XMLHttpRequest.prototype.open override  
> 建议：Continue to monitor for any future changes that may introduce external requests.

**⛔ CRITICAL** — Privacy Collection  
> Script listens for keydown events but does not transmit input data or collect sensitive information.  
> 位置：document.addEventListener("keydown", onKeyDown)  
> 建议：Ensure no future code changes combine input collection with network requests.

**🔴 HIGH** — Remote Code Execution  
> No use of eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection detected.  
> 位置：Full script scan  
> 建议：Maintain avoidance of dynamic code execution.

**🔴 HIGH** — Code Obfuscation  
> No code obfuscation detected; script is readable and not minified or encoded.  
> 位置：Full script scan  
> 建议：Maintain transparency for security review.

**🔴 HIGH** — DOM XSS/Injection  
> No DOM XSS or injection risk detected; user input is not inserted into the DOM via innerHTML/outerHTML.  
> 位置：Full script scan  
> 建议：Continue to avoid unsafe DOM manipulation.

**🟠 MEDIUM** — Permission Abuse  
> Script requests GM_webRequest permission but does not use it in the code.  
> 位置：@grant GM_webRequest in metadata  
> 建议：Remove unused permission to minimize attack surface.

**🟠 MEDIUM** — Sensitive API Usage  
> No sensitive browser APIs (geolocation, RTCPeerConnection, MediaDevices, Clipboard, Notification) are used.  
> 位置：Full script scan  
> 建议：Maintain avoidance of sensitive APIs.

**🟠 MEDIUM** — Supply Chain Risk  
> No @require third-party libraries or supply chain risk detected.  
> 位置：Metadata block  
> 建议：If adding dependencies, use official sources and fixed versions.

**🟡 LOW** — ClickJacking/Iframe Risk  
> No iframe manipulation or clickjacking risk detected.  
> 位置：Full script scan  
> 建议：Continue to avoid iframe manipulation.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/450253-geoguessr-location-resolver-works-in-all-modes)*
