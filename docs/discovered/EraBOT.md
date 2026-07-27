---
title: "EraBOT自动菜单"
---

# EraBOT自动菜单

`游戏辅助`  `自动化`  `evowars.io`  `自动攻击`  `自动收集`  `自动逃避`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/EraBOT.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**19.1.0**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/585219-erabot) <Badge type="tip" text="GreasyFork" />　　安装量：**226**　　评分：👍0 / 👎1

## 功能介绍

本脚本为 evowars.io 游戏提供自动化辅助功能，包括自动攻击、自动收集食物、自动逃避危险、自动重连和自动决斗等。安装后会自动弹出菜单，方便用户设置和启用各种功能。适合希望提升游戏效率和体验的玩家。

## 适用网站

- evowars.io

## 使用方法

1. 1. 安装脚本后，打开 evowars.io 网站。
2. 2. 进入游戏时，菜单会自动弹出。
3. 3. 根据需要在菜单中开启或关闭自动功能。
4. 4. 开始游戏，脚本会自动执行相应操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，仅在网页内运行。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-07-27

> 该脚本主要用于游戏自动化，未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用或供应链风险。唯一的安全注意点是 WebSocket hook 逻辑，但目前仅用于本地分析。整体安全风险较低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ⚠️ 使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — WebSocket Hook  
> 脚本通过 Proxy 钩住 WebSocket 构造函数和 send 方法，拦截和分析 WebSocket 数据包，但未向第三方服务器发送数据，仅用于本地 AI/自动化逻辑。  
> 位置：hookWebSocket() 函数  
> 建议：确保 WebSocket hook 仅用于本地分析，不添加任何外部数据传输逻辑。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/585219-erabot)*
