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

**风险等级**：🔴 HIGH　　**安全评分**：59/100　　**分析时间**：2026-07-27

> 该脚本未检测到数据外传和隐私采集行为，但存在 unsafeWindow 权限滥用、代码混淆和 WASM 内存捕获等高风险项。建议仅在可信环境下使用，并持续关注后续版本的安全变化。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ❌ 检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🔴 HIGH** — 权限滥用  
> 脚本申请了 unsafeWindow 权限，允许脚本与页面 JS 进行深度交互，存在被页面代码利用或注入恶意代码的风险。  
> 位置：元数据 @grant unsafeWindow  
> 建议：仅在必要时使用 unsafeWindow，避免与页面代码共享敏感数据。

**🔴 HIGH** — 代码混淆  
> 脚本包含大量压缩和混淆特征，如字符串数组、位运算、变量名缩写，部分代码高度压缩，存在混淆风险。  
> 位置：主代码块  
> 建议：避免混淆，保持代码可读性，便于安全审查。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本通过覆盖 WebAssembly.instantiate 和 WebAssembly.instantiateStreaming，捕获 WASM 内存实例。这可能用于游戏作弊，但也可能用于读取游戏进程中的敏感数据。  
> 位置：WebAssembly.instantiate/instantiateStreaming 重写  
> 建议：确保捕获的 WASM 内存仅用于合法用途，不要读取或泄露用户敏感信息。

**🟡 LOW** — 数据外传  
> 脚本未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、WebSocket 等），未发现数据外传行为。  
> 位置：全局代码  
> 建议：继续监控后续版本，防止新增数据外传。

**🟡 LOW** — 隐私采集  
> 脚本未直接读取 document.cookie、localStorage、sessionStorage、IndexedDB，也未监听键盘输入或表单字段，未发现隐私采集行为。  
> 位置：全局代码  
> 建议：继续监控后续版本，防止新增隐私采集。

**🟡 LOW** — 远程代码执行  
> 脚本未检测到 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险。  
> 位置：全局代码  
> 建议：避免动态执行字符串代码。

**🟡 LOW** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 或注入风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：全局代码  
> 建议：继续监控后续版本，防止新增 DOM 注入。

**🟡 LOW** — 数据外传  
> 脚本未检测到 WebSocket、EventSource、navigator.sendBeacon 等实时数据传输行为。  
> 位置：全局代码  
> 建议：继续监控后续版本，防止新增实时数据外传。

**🟡 LOW** — 供应链风险  
> 脚本未检测到 @require 加载第三方库，供应链风险较低。  
> 位置：元数据  
> 建议：如需加载第三方库，请固定版本哈希并使用官方 CDN。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/574970-deadshot-io-aimbot-codigo-real-matrix-rgb-edition-draggable-multilang)*
