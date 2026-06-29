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

**风险等级**：🟠 MEDIUM　　**安全评分**：84/100　　**分析时间**：2026-06-29

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等高危行为。主要风险为申请了 unsafeWindow 高权限和劫持 WebAssembly 相关 API，属于中等风险。未发现网络请求、WebSocket、敏感数据读取、第三方依赖等问题。整体安全性中等，建议关注权限最小化和高权限 API 的合理使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 @grant unsafeWindow 权限，允许脚本以更高权限操作页面环境，可能被滥用。  
> 位置：元数据 @grant  
> 建议：仅在确有必要时申请 unsafeWindow，建议最小化权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本会劫持 WebAssembly.instantiate 和 WebAssembly.instantiateStreaming，捕获 WASM 内存，属于高权限操作，可能被滥用分析游戏内存。  
> 位置：WebAssembly.instantiate 重写  
> 建议：仅在确有必要时使用，避免泄露敏感信息。

**🟡 LOW** — 用户体验  
> 脚本会弹出 alert，可能影响用户体验，但无安全风险。  
> 位置：alert 调用  
> 建议：可考虑改为更温和的通知方式。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/574970-deadshot-io-aimbot-codigo-real-matrix-rgb-edition-draggable-multilang)*
