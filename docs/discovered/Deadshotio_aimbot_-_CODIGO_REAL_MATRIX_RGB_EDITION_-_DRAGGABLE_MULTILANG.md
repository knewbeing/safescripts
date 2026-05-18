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

**风险等级**：🟠 MEDIUM　　**安全评分**：77/100　　**分析时间**：2026-05-18

> 该脚本未检测到明显的数据外传、隐私采集或远程代码执行行为。存在部分代码混淆和权限滥用（@grant unsafeWindow），但未发现高危网络请求或敏感数据泄露。整体风险为中等，建议移除不必要的高权限申请并保持代码可读性。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ❌ 检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🔴 HIGH** — 代码混淆  
> 脚本包含部分字符串混淆（如 SIGKEY、_ENCODED_SIGS 异或处理），但整体未高度混淆。  
> 位置：_SIGKEY, _ENCODED_SIGS, _decodeSig  
> 建议：建议保持代码可读性，避免混淆。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 @grant unsafeWindow 权限，但实际代码中未见必须使用该高权限的场景，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：如非必要，移除 @grant unsafeWindow，降低潜在攻击面。

**🟡 LOW** — 用户体验  
> 脚本会弹出 alert，可能影响用户体验，但不构成安全风险。  
> 位置：alert 调用  
> 建议：可考虑改为非阻塞式通知。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/574970-deadshot-io-aimbot-codigo-real-matrix-rgb-edition-draggable-multilang)*
