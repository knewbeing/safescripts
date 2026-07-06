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

**风险等级**：🟡 LOW　　**安全评分**：82/100　　**分析时间**：2026-07-06

> 该脚本主要用于 Deadshot.io 游戏的辅助功能，未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险或 iframe 风险。唯一高风险项为 unsafeWindow 权限申请，建议仅在必要时使用。整体安全风险较低，但不建议在含敏感信息页面使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未发现任何网络请求（如 GM_xmlhttpRequest、fetch、WebSocket 等），未检测到数据外传行为。  
> 位置：全局代码  
> 建议：保持无数据外传，勿添加任何第三方数据上报。

**⛔ CRITICAL** — 隐私采集  
> 脚本未发现任何隐私采集行为（如读取 cookie、localStorage、sessionStorage、IndexedDB、剪贴板、监听键盘输入等）。  
> 位置：全局代码  
> 建议：保持无隐私采集，勿添加任何用户敏感数据读取。

**🔴 HIGH** — 权限滥用  
> 脚本申请了 unsafeWindow 权限，允许脚本访问和修改页面的全局对象，存在高风险。  
> 位置：@grant unsafeWindow  
> 建议：仅在必要时申请 unsafeWindow，避免滥用。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等动态代码执行方式。  
> 位置：全局代码  
> 建议：继续避免远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 脚本未发现代码混淆（如 base64 解码、字符串数组映射、unicode 混淆、高度压缩单行代码等）。  
> 位置：全局代码  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS  
> 脚本未发现 DOM XSS 或注入风险（如未转义用户输入插入 innerHTML/outerHTML、document.write、iframe src=javascript: 等）。  
> 位置：全局代码  
> 建议：继续避免 DOM 注入风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本未申请或使用 GM_openInTab、GM_download 等高权限 API。  
> 位置：@grant  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局代码  
> 建议：避免调用敏感 API，保护用户隐私。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe。  
> 位置：全局代码  
> 建议：避免 iframe 风险，保护页面安全。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/574970-deadshot-io-aimbot-codigo-real-matrix-rgb-edition-draggable-multilang)*
