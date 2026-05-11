---
title: "Deadshot.io 自动瞄准与高亮"
---

# Deadshot.io 自动瞄准与高亮

`游戏辅助`  `自动瞄准`  `视觉增强`  `网页游戏`  `Deadshot.io`  `作弊`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Deadshotio_Chams_Aimbot.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.1**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/572110-deadshot-io-chams-aimbot) <Badge type="tip" text="GreasyFork" />　　安装量：**1,091**　　评分：👍5 / 👎2

## 功能介绍

本脚本为 Deadshot.io 游戏提供自动瞄准（Aimbot）和敌人高亮（Chams）功能，帮助玩家更容易发现敌人并提升射击准确度。脚本还提供可视化菜单，允许用户调整瞄准范围、灵敏度和预测参数。

## 适用网站

- Deadshot.io

## 使用方法

1. 安装 Tampermonkey 插件。
2. 添加本脚本并刷新 Deadshot.io 游戏页面。
3. 页面右上角会出现菜单，可调整参数。
4. 按 Insert 键可显示或隐藏菜单。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改页面的全局变量，实现游戏功能增强。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-05-11

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等高危安全问题。主要安全关注点为申请了未使用的高权限（unsafeWindow），建议移除。脚本本身为游戏作弊用途，存在伦理风险。整体安全性较高，但不建议用于破坏游戏公平性。

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
> 脚本申请了 @grant unsafeWindow 权限，但实际代码未发现对 unsafeWindow 的使用。  
> 位置：@grant 元数据  
> 建议：如无必要，建议移除 @grant unsafeWindow 权限，减少潜在攻击面。

**🟡 LOW** — 伦理风险  
> 脚本通过 Object.defineProperty 劫持 MouseEvent.prototype.movementX/Y，实现自动瞄准功能，属于游戏作弊行为。  
> 位置：核心逻辑  
> 建议：仅供学习用途，勿用于破坏游戏公平性。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572110-deadshot-io-chams-aimbot)*
