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

**风险等级**：🔴 HIGH　　**安全评分**：40/100　　**分析时间**：2026-05-25

> 该脚本未检测到数据外传和隐私采集行为，但存在 unsafeWindow 权限滥用、WebAssembly 内存捕获、轻度代码混淆等高风险特征。未检测到远程代码执行、DOM XSS、供应链风险。整体安全评分为 40，风险等级为 HIGH，不建议在生产环境或含敏感数据场景使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ❌ 检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何网络请求（GM_xmlhttpRequest、fetch、WebSocket、sendBeacon、EventSource），无数据外传行为。  
> 位置：全局代码  
> 建议：保持无外传行为，勿添加任何第三方数据上报。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板读取、键盘监听等隐私采集行为。  
> 位置：全局代码  
> 建议：保持无隐私采集行为，勿添加任何用户敏感数据读取。

**🔴 HIGH** — 权限滥用  
> 脚本申请了 unsafeWindow 权限，允许脚本与页面 JS 进行高权限交互，可能被滥用导致远程代码执行或数据泄露。  
> 位置：元数据 @grant unsafeWindow  
> 建议：仅在必要时申请 unsafeWindow，建议移除或限制其使用范围。

**🔴 HIGH** — 敏感 API 调用  
> 脚本通过覆盖 WebAssembly.instantiate 和 WebAssembly.instantiateStreaming，捕获 WASM 内存实例，可能用于读取游戏内部数据结构。这属于高风险行为，可能被用于作弊或敏感数据采集。  
> 位置：WebAssembly.instantiate 重写  
> 建议：避免对 WebAssembly API 进行全局重写，限制只在必要场景下使用。

**🔴 HIGH** — 代码混淆  
> 脚本包含部分字符串混淆（如 SIGKEY、ENCODED_SIGS、_decodeSig），但整体未高度混淆。存在轻度混淆特征。  
> 位置：SIGKEY、ENCODED_SIGS、_decodeSig  
> 建议：避免使用混淆技术，提升代码可读性和安全透明度。

**🔴 HIGH** — 远程代码执行  
> 脚本未检测到 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML/outerHTML 插入脚本、document.write 等远程代码执行风险。  
> 位置：全局代码  
> 建议：保持无动态代码执行，勿添加任何可执行字符串。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 或注入风险（未直接插入用户输入到 innerHTML/outerHTML、未操作 iframe src 为 javascript:）。  
> 位置：全局代码  
> 建议：保持无 DOM 注入风险，勿信任用户输入。

**🟠 MEDIUM** — 供应链风险  
> 脚本未检测到供应链风险（无 @require 第三方库加载）。  
> 位置：元数据  
> 建议：如需加载第三方库，务必使用官方 CDN 并固定版本哈希。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/574970-deadshot-io-aimbot-codigo-real-matrix-rgb-edition-draggable-multilang)*
