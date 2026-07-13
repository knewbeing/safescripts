---
title: "EvoWars全自动助手"
---

# EvoWars全自动助手

`游戏辅助`  `自动化`  `模拟操作`  `UUID拦截`  `进化升级`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/EvoWars_KILLER_CHESTER_Fully_Automated_UUID.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.0**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/583957-evowars-killer-chester-fully-automated-uuid) <Badge type="tip" text="GreasyFork" />　　安装量：**293**　　评分：👍0 / 👎0

## 功能介绍

此脚本为 EvoWars 游戏提供全自动操作，包括自动模拟玩家行为和自动获取用户UUID。安装后可自动执行游戏内的开箱、购买和进化操作，无需手动点击。

## 适用网站

- EvoWars.io
- EvoWars（像素角斗士）

## 使用方法

1. 安装脚本后，进入 EvoWars.io 或 master.evo.pixelhorns.com。
2. 脚本会自动模拟玩家操作，包括开箱、购买和进化。
3. 无需手动操作，脚本会自动获取并显示你的UUID。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本无需额外权限，仅在网页内运行。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-07-13

> This UserScript does not transmit data to third-party servers and does not perform network exfiltration. However, it actively intercepts the user's UUID from in-game network traffic and stores it in localStorage, which is a critical privacy concern. No code obfuscation, remote code execution, DOM XSS, or supply chain risks were detected. The script does not request elevated permissions and does not use sensitive browser APIs beyond localStorage. The main risk is the interception and storage of a unique user identifier without explicit user consent.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（Intercepts and stores user UUID from network traffic, Reads and writes to localStorage for UUID persistence） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Privacy Collection  
> The script intercepts and stores the user's UUID from network requests by hooking into the game's network engine and saving the UUID to localStorage. This is a form of privacy-sensitive data interception.  
> 位置：hookNetworkEngine() and localStorage.setItem('evowars_auto_uuid', userUUID)  
> 建议：Clearly inform users about UUID interception and storage. Avoid storing sensitive identifiers unless necessary and with user consent.

**⛔ CRITICAL** — Privacy Collection  
> The script reads from localStorage to retrieve the previously captured UUID.  
> 位置：let userUUID = localStorage.getItem('evowars_auto_uuid')  
> 建议：Limit access to localStorage to only what is necessary. Ensure no sensitive data is stored or exposed.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/583957-evowars-killer-chester-fully-automated-uuid)*
