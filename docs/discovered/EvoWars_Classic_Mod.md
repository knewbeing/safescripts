---
title: "EvoWars经典增强版"
---

# EvoWars经典增强版

`游戏辅助`  `EvoWars.io`  `沙盒工具`  `机器人控制`  `动画切换`  `界面增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/EvoWars_Classic_Mod.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2026-06-19_v25.3**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/583519-evowars-classic-mod) <Badge type="tip" text="GreasyFork" />　　安装量：**128**　　评分：👍0 / 👎0

## 功能介绍

本脚本为 EvoWars.io 游戏提供高级沙盒工具，允许玩家调整机器人靠近距离、独立设置机器人大小，并可切换不同动画状态。通过界面面板，用户可自定义游戏体验，增强操作和视觉效果。

## 适用网站

- EvoWars.io

## 使用方法

1. 安装脚本后，进入 EvoWars.io 网站。
2. 页面左上角会出现一个可移动的控制面板。
3. 在面板中调整机器人距离、大小和动画状态。
4. 设置完成后，游戏体验将根据你的选择进行优化。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，仅在页面内运行。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-06

> The EvoWars Classic Mod UserScript does not transmit data externally, collect user privacy, execute remote code, or use obfuscated/minified code. It does not request excessive permissions or load external libraries. No DOM XSS, supply chain, or sensitive API risks detected. The script is considered SAFE with a security score of 100.

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
> No network requests (GM_xmlhttpRequest, fetch, XMLHttpRequest, WebSocket, EventSource, sendBeacon) detected. No data transmission to third-party servers.  
> 位置：Entire script  
> 建议：Maintain no external data transmission unless strictly necessary.

**⛔ CRITICAL** — Privacy Collection  
> No privacy collection: script does not access cookies, localStorage, sessionStorage, IndexedDB, clipboard, or listen to keyboard/form input.  
> 位置：Entire script  
> 建议：Continue to avoid collecting user data.

**🔴 HIGH** — Remote Code Execution  
> No eval, new Function, setTimeout(string), setInterval(string), or dynamic script loading detected. No remote code execution risk.  
> 位置：Entire script  
> 建议：Avoid introducing dynamic code execution.

**🔴 HIGH** — Code Obfuscation  
> No code obfuscation detected: code is readable, no base64/unicode/minified/obfuscated patterns.  
> 位置：Entire script  
> 建议：Keep code transparent and readable.

**🟠 MEDIUM** — Supply Chain  
> No supply chain risk: no @require or external library loading.  
> 位置：Metadata block  
> 建议：If adding dependencies, use official CDN and fixed version.

**🟠 MEDIUM** — Sensitive API  
> No sensitive API calls (geolocation, RTCPeerConnection, MediaDevices, clipboard, notifications) detected.  
> 位置：Entire script  
> 建议：Avoid using sensitive APIs unless necessary.

**🟠 MEDIUM** — Permission Abuse  
> No permission abuse: @grant none, no unused or excessive permissions.  
> 位置：Metadata block  
> 建议：Only request permissions required for functionality.

**🟡 LOW** — DOM Manipulation  
> Script creates a custom UI panel and manipulates DOM elements, but does not use user input or URL parameters in innerHTML/outerHTML. No DOM XSS detected.  
> 位置：initUI() function  
> 建议：Continue to avoid inserting untrusted data into innerHTML/outerHTML.

**🟡 LOW** — ClickJacking  
> No clickjacking or iframe manipulation detected.  
> 位置：Entire script  
> 建议：Avoid creating hidden iframes or modifying frame protection.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/583519-evowars-classic-mod)*
