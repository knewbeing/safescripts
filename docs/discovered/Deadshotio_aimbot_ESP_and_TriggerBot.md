---
title: "Deadshot.io 辅助脚本"
---

# Deadshot.io 辅助脚本

`游戏辅助`  `射击游戏`  `自动瞄准`  `透视`  `作弊`  `Deadshot.io`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Deadshotio_aimbot_ESP_and_TriggerBot.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0**　　发现时间：**2026-05-11**　　来源：[GreasyFork](https://greasyfork.org/scripts/574487-deadshot-io-aimbot-esp-and-triggerbot) <Badge type="tip" text="GreasyFork" />　　安装量：**639**　　评分：👍0 / 👎1

## 功能介绍

本脚本为 Deadshot.io 游戏提供自动瞄准（Aimbot）、透视（ESP）、自动开枪（TriggerBot）等辅助功能，帮助玩家更容易发现和击败对手。安装后可自动增强游戏体验，无需手动配置。适合希望提升射击效率和游戏表现的用户。

## 适用网站

- Deadshot.io

## 使用方法

1. 1. 安装脚本后，进入 Deadshot.io 网站。
2. 2. 游戏加载后，辅助功能会自动启用。
3. 3. 享受自动瞄准、透视和自动开枪等增强功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改页面的全局变量，便于与游戏内部数据交互。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-05-18

> 该脚本主要通过 hook WebAssembly 实例和内存，分析 deadshot.io 游戏中的实体数据，实现 aimbot、ESP 等功能。未检测到任何数据外传、隐私采集、远程代码执行、混淆或 XSS 风险。唯一的中等风险为申请了 unsafeWindow 权限，建议最小化权限。整体安全性较高，但属于游戏作弊脚本，存在被游戏官方检测和封禁的风险。

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
> 脚本申请了 @grant unsafeWindow 权限，允许脚本访问页面的原始 window 对象，可能被滥用进行高权限操作。  
> 位置：@grant 元数据  
> 建议：仅在确有必要时申请 unsafeWindow，建议最小化权限申请。

**🟡 LOW** — 隐私采集  
> 脚本通过 hook WebAssembly 实例和内存，分析游戏实体数据，属于高级作弊行为，但未发现数据外传。  
> 位置：核心逻辑  
> 建议：确认脚本不会将敏感数据发送到第三方服务器。

**🟡 LOW** — 代码安全  
> 脚本未发现任何网络请求、数据外传、远程代码加载、eval 或混淆代码。  
> 位置：全局  
> 建议：保持代码开源透明，防止后续版本引入恶意行为。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/574487-deadshot-io-aimbot-esp-and-triggerbot)*
