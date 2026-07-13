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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-07-13

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险或 iframe 风险。唯一的安全问题是声明了未使用的高权限 GM_webRequest，建议移除。整体风险极低，安全性良好。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script overrides XMLHttpRequest.prototype.open to intercept Google Maps API responses, but does not transmit data to third-party servers. No evidence of data exfiltration or external network requests was found.  
> 位置：XMLHttpRequest.prototype.open override  
> 建议：Continue to avoid sending intercepted data to external servers. Monitor for future code changes that may introduce network requests.

**⛔ CRITICAL** — Privacy Collection  
> The script listens for keydown events to trigger its features, but does not log or transmit key inputs. No keylogger behavior detected.  
> 位置：document.addEventListener('keydown', onKeyDown)  
> 建议：Ensure that key events are not logged or transmitted in future updates.

**🔴 HIGH** — Remote Code Execution  
> No use of eval, new Function, setTimeout(string), setInterval(string), or dynamic script execution detected. No remote code execution risk found.  
> 位置：Full script  
> 建议：Maintain current practice of avoiding dynamic code execution.

**🔴 HIGH** — Obfuscation  
> No code obfuscation detected. Code is readable and not minified or encoded.  
> 位置：Full script  
> 建议：Maintain code transparency for security review.

**🔴 HIGH** — DOM XSS  
> No DOM XSS or injection risk detected. No user input or URL parameters are inserted into the DOM without sanitization.  
> 位置：Full script  
> 建议：Continue to avoid inserting untrusted data into the DOM.

**🟠 MEDIUM** — Permission Abuse  
> The script requests the GM_webRequest permission, but does not use any GM_* APIs in the code. This is an unused high-privilege permission.  
> 位置：@grant GM_webRequest in metadata  
> 建议：Remove unused @grant GM_webRequest to minimize attack surface.

**🟠 MEDIUM** — Sensitive API  
> No use of sensitive APIs such as geolocation, RTCPeerConnection, MediaDevices, or Clipboard API detected.  
> 位置：Full script  
> 建议：Continue to avoid unnecessary access to sensitive browser APIs.

**🟠 MEDIUM** — Supply Chain  
> No @require directives or external library dependencies detected. No supply chain risk found.  
> 位置：Metadata  
> 建议：If adding dependencies in the future, use official CDNs and fixed versions.

**🟡 LOW** — ClickJacking/iframe  
> No modification of frame protection or creation of hidden iframes detected.  
> 位置：Full script  
> 建议：Continue to avoid iframe-based risks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/450253-geoguessr-location-resolver-works-in-all-modes)*
