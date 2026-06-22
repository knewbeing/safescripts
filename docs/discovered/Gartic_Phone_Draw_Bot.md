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

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-06-22

> 该脚本主要通过 WebSocket 与 garticphone.com 官方服务器通信，实现自动绘图功能。未发现向第三方服务器外传用户数据或页面内容，也未检测到隐私采集、远程代码执行、代码混淆、DOM XSS 等高危行为。存在未使用的 GM_xmlhttpRequest 权限和 unsafeWindow 权限，建议移除未用权限以降低风险。整体风险为中等，建议仅在信任环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：garticphone.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ⚠️ 使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 fetch() 和 WebSocket 发送数据到 garticphone.com，但未发现向第三方域名或外部服务器传输用户数据。  
> 位置：requestText, requestBuffer, customWebSocket, sendPackets  
> 建议：确保仅与受信任的官方服务器通信，避免修改为第三方域名。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 Proxy 劫持 WebSocket 构造函数，捕获并操作与 garticphone.com 的通信。  
> 位置：customWebSocket, sendPackets  
> 建议：确认未将敏感用户数据发送到非预期服务器。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但实际代码未使用该 API。  
> 位置：@grant GM_xmlhttpRequest  
> 建议：移除未使用的高权限申请，减少权限滥用风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 unsafeWindow 权限，存在一定安全隐患。  
> 位置：@grant unsafeWindow  
> 建议：仅在确有必要时使用 unsafeWindow，避免潜在的跨域脚本注入风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/495177-gartic-phone-draw-bot)*
