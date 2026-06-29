---
title: "Gartic Phone自动画图机器人"
---

# Gartic Phone自动画图机器人

`自动绘画`  `游戏辅助`  `Gartic Phone`  `机器人`  `娱乐`  `自动化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Gartic_Phone_Draw_Bot.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.1**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/495177-gartic-phone-draw-bot) <Badge type="tip" text="GreasyFork" />　　安装量：**12,810**　　评分：👍1 / 👎1

## 功能介绍

本脚本可以自动在 Gartic Phone 游戏中绘画，模拟玩家的画图操作，帮助快速完成绘画任务。适合想要自动作画或尝试机器人绘画效果的用户。

## 适用网站

- Gartic Phone

## 使用方法

1. 安装脚本后，进入 Gartic Phone 网站。
2. 开始游戏时，脚本会自动接管绘画环节。
3. 无需手动操作，自动完成画图。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改网页中的全局变量，便于控制游戏行为。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取或提交数据到 Gartic Phone 网站。 |
| `GM_log` | 用于在调试时输出日志信息，方便开发者查看脚本运行情况。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：64/100　　**分析时间**：2026-06-29

> 该脚本主要通过 WebSocket 与 garticphone.com 官方服务器通信，仅发送游戏相关的绘图数据，无第三方数据外传或隐私采集行为。未发现代码混淆、DOM XSS、远程代码执行等高危问题。存在权限过度申请（GM_xmlhttpRequest 未使用）和对 unsafeWindow 的必要但敏感操作。整体风险较低，建议移除未用权限并关注后续更新。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：garticphone.com (WebSocket, per @connect)） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ⚠️ 使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> The script establishes and manipulates a WebSocket connection to garticphone.com, sending drawing data and possibly user actions. All transmissions are to the first-party domain only.  
> 位置：customWebSocket class, sendPackets function  
> 建议：Ensure only intended game data is sent. No evidence of third-party exfiltration.

**🟠 MEDIUM** — Permission Overgrant  
> The script requests @grant GM_xmlhttpRequest but does not use it in the code, which is a higher-than-needed permission.  
> 位置：Metadata block  
> 建议：Remove unused GM_xmlhttpRequest grant to reduce attack surface.

**🟠 MEDIUM** — Sensitive API Exposure  
> The script uses unsafeWindow to override the WebSocket constructor, which is necessary for its function but increases risk if the page is compromised.  
> 位置：unsafeWindow.WebSocket assignment  
> 建议：Limit unsafeWindow usage and ensure no exposure of sensitive functions to the page context.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/495177-gartic-phone-draw-bot)*
