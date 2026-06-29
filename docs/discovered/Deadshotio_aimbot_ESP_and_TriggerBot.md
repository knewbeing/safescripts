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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-29

> 该脚本主要通过 hook WebAssembly 和渲染流程实现游戏辅助功能，未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 或供应链风险。唯一的安全关注点是申请了 unsafeWindow 权限和高权限 hook 行为，但未发现被滥用。整体安全风险较低。

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
> 使用了 @grant unsafeWindow，允许脚本访问页面上下文，增加潜在攻击面，但未发现直接滥用。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，避免使用 unsafeWindow，或严格限制其用途。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本会 hook WebAssembly 实例和渲染流程，分析游戏内存和渲染状态，属于高权限操作，但未发现外传行为。  
> 位置：主逻辑  
> 建议：确保所有 hook 仅用于本地分析，不要添加任何外部通信代码。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/574487-deadshot-io-aimbot-esp-and-triggerbot)*
