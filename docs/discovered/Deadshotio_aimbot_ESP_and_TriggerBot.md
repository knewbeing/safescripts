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

**风险等级**：🟠 MEDIUM　　**安全评分**：77/100　　**分析时间**：2026-06-15

> 该脚本未检测到数据外传和隐私采集行为，但存在高权限申请（unsafeWindow）和 WebAssembly 方法重写，属于远程代码执行高风险。未发现代码混淆、DOM XSS、敏感 API 调用、供应链风险等问题。整体安全评分为77，建议谨慎使用并持续关注后续版本的安全变化。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🔴 HIGH** — 远程代码执行  
> 脚本通过覆盖 WebAssembly.instantiate 和 WebAssembly.instantiateStreaming，拦截并操作 WASM 实例，可能影响页面正常行为并存在远程代码执行风险。  
> 位置：WebAssembly.instantiate 重写  
> 建议：避免拦截和修改 WebAssembly 原生方法，除非有充分理由并确保安全。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 @grant unsafeWindow 权限，允许脚本访问和修改页面的全局对象，存在高权限滥用风险。  
> 位置：元数据 @grant unsafeWindow  
> 建议：仅申请必要权限，避免使用 unsafeWindow，除非确实需要与页面脚本交互。

**🟡 LOW** — 敏感 API 调用  
> 脚本通过 window.ipcRenderer.send 方法模拟鼠标移动事件，可能被滥用为自动化操作或作弊行为。  
> 位置：window.ipcRenderer.send  
> 建议：限制自动化操作的范围，避免影响用户体验或违反目标网站规则。

**🟡 LOW** — 数据外传  
> 脚本未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、WebSocket 等），未发现数据外传行为。  
> 位置：全局代码  
> 建议：继续监控后续版本，防止新增数据外传代码。

**🟡 LOW** — 隐私采集  
> 脚本未检测到 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板读取等隐私采集行为。  
> 位置：全局代码  
> 建议：继续监控后续版本，防止新增隐私采集代码。

**🟡 LOW** — 远程代码执行  
> 脚本未检测到 eval、new Function、setTimeout(string)、setInterval(string) 等动态执行代码行为。  
> 位置：全局代码  
> 建议：避免使用动态执行代码，防止远程代码注入风险。

**🟡 LOW** — 代码混淆  
> 脚本未检测到代码混淆（如 base64 解码、字符串数组映射、unicode 混淆、大量压缩单行代码等）。  
> 位置：全局代码  
> 建议：保持代码可读性，便于安全审查。

**🟡 LOW** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 或注入风险（如未转义用户输入插入 innerHTML/outerHTML、document.write 插入不可信内容等）。  
> 位置：全局代码  
> 建议：确保所有用户输入经过严格转义后再插入 DOM。

**🟡 LOW** — 敏感 API 调用  
> 脚本未检测到敏感 API 调用（如 geolocation、RTCPeerConnection、MediaDevices、Notification、Clipboard API 等）。  
> 位置：全局代码  
> 建议：避免调用敏感 API，除非确实需要并征得用户同意。

**🟡 LOW** — 供应链风险  
> 脚本未检测到供应链风险（未使用 @require 加载第三方库）。  
> 位置：元数据  
> 建议：如需加载第三方库，请使用官方 CDN 并固定版本哈希。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到 ClickJacking 或 iframe 风险（未修改 frame 保护策略或创建隐藏 iframe）。  
> 位置：全局代码  
> 建议：避免创建隐藏 iframe 或修改 frame 保护策略。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/574487-deadshot-io-aimbot-esp-and-triggerbot)*
