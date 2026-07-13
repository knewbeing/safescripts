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

**风险等级**：🟠 MEDIUM　　**安全评分**：69/100　　**分析时间**：2026-07-13

> 该脚本未检测到数据外传、隐私采集、远程代码执行或 DOM XSS 风险。存在部分代码混淆和高权限申请（unsafeWindow），以及对 WebAssembly/canvas/shader 的敏感操作，具有一定安全和合规风险。未发现供应链风险或 WebSocket/网络请求。整体安全性中等，但不建议在敏感环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ❌ 检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🔴 HIGH** — 敏感 API 调用  
> 脚本通过 WebAssembly hook、canvas、shader、骨骼数据等方式分析游戏内存和渲染数据，属于高权限操作，可能被用于作弊或绕过安全机制。  
> 位置：核心逻辑（WebAssembly、canvas、shader hook）  
> 建议：警惕此类脚本可能违反游戏服务条款，且存在被恶意利用的风险。

**🔴 HIGH** — 代码混淆  
> 脚本包含部分字符串异或混淆（_SIGKEY, _ENCODED_SIGS, _decodeSig），但整体未见严重混淆或压缩。  
> 位置：_SIGKEY, _ENCODED_SIGS, _decodeSig  
> 建议：避免使用混淆技术，提升代码可审计性。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 @grant unsafeWindow 权限，但实际代码仅用于与页面通信和全局变量注入，没有发现明显滥用，但该权限本身风险较高。  
> 位置：元数据 @grant unsafeWindow  
> 建议：如非必要，建议移除 unsafeWindow 权限，或限制其使用范围。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/574970-deadshot-io-aimbot-codigo-real-matrix-rgb-edition-draggable-multilang)*
