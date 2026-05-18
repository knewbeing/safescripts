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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-05-18

> 该脚本主要通过 WebGL Hook 和 MouseEvent 属性代理实现游戏辅助功能。未检测到数据外传、隐私采集、远程代码执行、代码混淆、供应链风险或 WebSocket 使用。唯一中等风险为申请了 unsafeWindow 权限，但未发现滥用。整体安全性较高。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传（无问题，仅说明）  
> 未检测到任何网络请求、数据外传、WebSocket、EventSource、sendBeacon 等外联行为。  
> 位置：全局  
> 建议：保持无外传，勿添加任何数据上报逻辑。

**🟠 MEDIUM** — 权限滥用  
> 使用了 @grant unsafeWindow，允许脚本访问页面的全局对象，增加潜在攻击面，但本脚本未滥用。  
> 位置：元数据 @grant  
> 建议：仅在确有必要时申请 unsafeWindow 权限。

**🟡 LOW** — DOM 注入  
> 脚本通过 document.body.appendChild(menu) 和 document.createElement('style') 动态插入 UI，但未插入任何外部脚本或基于用户输入的内容，XSS 风险较低。  
> 位置：createUI 函数  
> 建议：确保所有插入 DOM 的内容均为静态或受控内容。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572110-deadshot-io-chams-aimbot)*
