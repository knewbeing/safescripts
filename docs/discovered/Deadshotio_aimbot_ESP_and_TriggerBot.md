---
title: "Deadshot.io 辅助脚本"
---

# Deadshot.io 辅助脚本

`游戏辅助`  `自动瞄准`  `透视`  `射击游戏`  `作弊工具`  `Deadshot.io`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Deadshotio_aimbot_ESP_and_TriggerBot.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/574487-deadshot-io-aimbot-esp-and-triggerbot) <Badge type="tip" text="GreasyFork" />　　安装量：**1,156**　　评分：👍0 / 👎1

## 功能介绍

本脚本为 Deadshot.io 游戏提供自动瞄准（aimbot）、透视（ESP）、自动开枪（TriggerBot）等辅助功能，帮助玩家更轻松地发现敌人并提升射击准确率。安装后，游戏内会自动启用这些增强功能，无需手动设置。

## 适用网站

- Deadshot.io

## 使用方法

1. 1. 安装脚本后，进入 Deadshot.io 游戏网站。
2. 2. 游戏加载后，辅助功能会自动启用。
3. 3. 可根据需要在游戏内体验自动瞄准、透视和自动开枪等功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改页面的全局变量，实现游戏功能增强。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：84/100　　**分析时间**：2026-07-27

> 该脚本未发现数据外传、远程代码执行、代码混淆、DOM XSS、供应链风险和 iframe 风险，安全性较高。主要风险为申请 unsafeWindow 权限和通过 WebAssembly 钩子间接采集游戏状态数据。建议限制权限申请和采集范围，避免滥用。整体安全评分为 84，风险等级为 MEDIUM。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（WebAssembly 钩子和 canvas 事件操作，可能间接采集游戏状态数据） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未发现任何网络请求（GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、sendBeacon），不存在数据外传行为。  
> 位置：全局代码  
> 建议：保持无外传，勿添加任何数据上报代码。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML/outerHTML 插入脚本、document.write、动态加载远程 JS，远程代码执行风险较低。  
> 位置：全局代码  
> 建议：继续避免使用危险的动态执行方式。

**🔴 HIGH** — 代码混淆  
> 脚本未发现代码混淆（无 base64 解码、字符串数组映射、unicode 混淆、高度压缩单行代码），代码结构清晰。  
> 位置：全局代码  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未发现 DOM XSS 风险（未将用户输入或 URL 参数插入 innerHTML/outerHTML、document.write、iframe src=javascript:）。  
> 位置：全局代码  
> 建议：继续避免直接插入不可信内容。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 @grant unsafeWindow 权限，允许脚本访问和修改页面的全局对象。这可能被滥用，导致脚本可访问页面敏感数据或与其他脚本交互，存在安全隐患。  
> 位置：元数据 @grant unsafeWindow  
> 建议：仅在确实需要时申请 unsafeWindow，建议移除或限制使用。

**🟠 MEDIUM** — 隐私采集  
> 脚本通过 WebAssembly 钩子和 canvas 事件操作，可能间接访问游戏 WASM 内存和 canvas 渲染数据，存在隐私采集风险（如游戏状态、玩家位置等）。但未发现直接读取 cookie、localStorage、sessionStorage、IndexedDB 或剪贴板。  
> 位置：WebAssembly.instantiate 重写、canvas 事件  
> 建议：明确限制采集范围，避免收集用户敏感信息。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：全局代码  
> 建议：避免调用敏感 API，除非确有必要。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，建议使用官方 CDN 并固定版本。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局代码  
> 建议：继续避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/574487-deadshot-io-aimbot-esp-and-triggerbot)*
