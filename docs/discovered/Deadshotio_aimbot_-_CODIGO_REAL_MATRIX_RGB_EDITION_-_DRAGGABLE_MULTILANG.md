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

**风险等级**：🟠 MEDIUM　　**安全评分**：77/100　　**分析时间**：2026-04-27

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等严重安全问题。主要风险在于申请 unsafeWindow 权限和捕获 WASM 内存实例，可能被滥用。整体安全评分为 77，建议谨慎使用并定期复查。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🔴 HIGH** — 权限滥用  
> 脚本申请了 unsafeWindow 权限，允许脚本与页面 JS 进行深度交互，可能被滥用导致远程代码执行或数据泄露。  
> 位置：元数据 @grant unsafeWindow  
> 建议：仅在必要时申请 unsafeWindow，避免滥用。建议移除或限制使用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本通过覆盖 WebAssembly.instantiate 和 WebAssembly.instantiateStreaming，捕获 WASM 内存实例。这可能用于游戏作弊，但也可能被滥用读取敏感数据。  
> 位置：WebAssembly.instantiate/instantiateStreaming 重写  
> 建议：仅在明确知晓用途时使用此技术，避免泄露敏感数据。建议增加安全注释和限制。

**🟡 LOW** — 数据外传  
> 脚本未检测到任何网络请求、数据外传或 WebSocket 使用。  
> 位置：全局代码  
> 建议：保持无外传行为，定期复查。

**🟡 LOW** — 隐私采集  
> 脚本未检测到隐私采集行为（如读取 cookie、localStorage、剪贴板、表单等）。  
> 位置：全局代码  
> 建议：保持无隐私采集，定期复查。

**🟡 LOW** — 远程代码执行  
> 脚本未检测到 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险。  
> 位置：全局代码  
> 建议：保持无动态执行，定期复查。

**🟡 LOW** — 代码混淆  
> 脚本未检测到代码混淆、base64 解码、字符串映射或高度压缩代码。  
> 位置：全局代码  
> 建议：保持代码可读性，避免混淆。

**🟡 LOW** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 或注入风险（如 innerHTML/outerHTML 插入用户输入、document.write 等）。  
> 位置：全局代码  
> 建议：保持无注入风险，定期复查。

**🟡 LOW** — 供应链风险  
> 脚本未检测到供应链风险（无 @require 加载第三方库）。  
> 位置：元数据  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到 ClickJacking 或 iframe 风险。  
> 位置：全局代码  
> 建议：保持无 iframe 风险，定期复查。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/574970-deadshot-io-aimbot-codigo-real-matrix-rgb-edition-draggable-multilang)*
