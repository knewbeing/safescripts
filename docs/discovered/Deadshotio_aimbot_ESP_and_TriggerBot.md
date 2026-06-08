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

**风险等级**：🟠 MEDIUM　　**安全评分**：84/100　　**分析时间**：2026-06-08

> 该脚本未检测到明显的数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。主要风险为申请了 unsafeWindow 权限（中等风险），以及深度 hook 游戏 WebAssembly/渲染流程（高危行为，可能影响浏览器稳定性和安全性）。未发现数据外传、WebSocket、fetch、GM_xmlhttpRequest 等网络请求。未发现敏感隐私采集。未发现供应链风险。总体安全评分为 84，建议仅在无敏感信息环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🔴 HIGH** — 敏感 API 调用/高危行为  
> 脚本通过 hook WebAssembly 实例、canvas、shader、内存等方式，深度操作游戏页面，属于高风险作弊行为，可能导致浏览器崩溃或被利用。  
> 位置：全局  
> 建议：仅在可信环境下运行此类脚本，避免在含敏感信息的环境中使用。

**🟠 MEDIUM** — 权限滥用  
> 使用了 @grant unsafeWindow，允许脚本以页面上下文运行，可能被滥用提升权限。  
> 位置：元数据 @grant  
> 建议：仅在确有必要时申请 unsafeWindow，避免滥用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/574487-deadshot-io-aimbot-esp-and-triggerbot)*
