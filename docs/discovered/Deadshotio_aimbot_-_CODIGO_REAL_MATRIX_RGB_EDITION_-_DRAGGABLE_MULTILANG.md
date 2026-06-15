---
title: "Deadshot.io 辅助脚本"
---

# Deadshot.io 辅助脚本

`游戏辅助`  `自动瞄准`  `透视`  `界面增强`  `多语言`  `矩阵风格`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Deadshotio_aimbot_-_CODIGO_REAL_MATRIX_RGB_EDITION_-_DRAGGABLE_MULTILANG.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.4**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/574970-deadshot-io-aimbot-codigo-real-matrix-rgb-edition-draggable-multilang) <Badge type="tip" text="GreasyFork" />　　安装量：**128**　　评分：👍0 / 👎0

## 功能介绍

本脚本为 Deadshot.io 游戏提供自动瞄准（Aimbot）、透视（ESP）、人物高亮（Chams）等辅助功能，界面支持拖动和多语言，整体风格为矩阵 RGB。安装后可提升游戏体验和操作便捷性。

## 适用网站

- Deadshot.io

## 使用方法

1. 安装脚本后，进入 Deadshot.io 游戏网站。
2. 进入游戏时会弹出矩阵风格提示窗口。
3. 按下菜单快捷键（-）打开设置面板，可拖动和切换语言。
4. 根据需要开启自动瞄准、透视等功能，调整参数。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改网页的全局对象，增强功能实现。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：62/100　　**分析时间**：2026-06-15

> 该脚本未检测到数据外传和远程代码执行风险，但申请了 unsafeWindow 权限并捕获 WASM 内存实例，存在较高的隐私采集和权限滥用风险。未检测到代码混淆、DOM XSS、敏感 API、供应链和 iframe 风险。整体安全评分为 62，建议谨慎使用，避免在包含敏感信息的环境中运行。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（捕获 WASM 内存实例，可能用于读取游戏内部数据） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🔴 HIGH** — 权限滥用  
> 脚本申请了 unsafeWindow 权限，允许脚本访问和修改页面的全局对象，可能导致安全边界被突破，增加远程代码执行和数据泄露风险。  
> 位置：元数据 @grant unsafeWindow  
> 建议：仅在确实需要时申请 unsafeWindow，建议移除或限制使用，并确保不引入外部不可信代码。

**🔴 HIGH** — 隐私采集  
> 脚本通过覆盖 WebAssembly.instantiate 和 WebAssembly.instantiateStreaming，捕获 WASM 内存实例。这种行为可能被用于读取游戏内部数据，存在隐私采集风险。  
> 位置：WebAssembly.instantiate 重写  
> 建议：仅在明确知晓用途时使用此技术，避免采集用户敏感数据或游戏内部隐私信息。

**🟡 LOW** — 数据外传  
> 脚本未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、WebSocket 等），未发现数据外传行为。  
> 位置：全局代码  
> 建议：保持无外传设计，避免未来版本引入数据上报。

**🟡 LOW** — 远程代码执行  
> 脚本未检测到 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险。  
> 位置：全局代码  
> 建议：继续避免动态执行字符串代码。

**🟡 LOW** — 代码混淆  
> 脚本未检测到代码混淆（如 base64 解码、字符串数组映射、unicode 混淆、大量单行压缩代码）。  
> 位置：全局代码  
> 建议：保持代码可读性，便于安全审查。

**🟡 LOW** — DOM XSS  
> 脚本未检测到 DOM XSS 风险（如用户输入直接插入 innerHTML/outerHTML、document.write 注入、iframe src 操作）。  
> 位置：全局代码  
> 建议：继续避免直接插入不可信内容。

**🟡 LOW** — 敏感 API  
> 未检测到敏感 API 调用（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：全局代码  
> 建议：避免调用敏感 API，除非确有必要。

**🟡 LOW** — 供应链风险  
> 未检测到供应链风险，脚本未通过 @require 加载第三方库。  
> 位置：元数据  
> 建议：如需加载第三方库，建议固定版本并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未检测到 ClickJacking 或 iframe 风险，脚本未修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局代码  
> 建议：继续避免相关风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/574970-deadshot-io-aimbot-codigo-real-matrix-rgb-edition-draggable-multilang)*
