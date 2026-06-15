---
title: "Gartic Phone自动绘画机器人"
---

# Gartic Phone自动绘画机器人

`自动绘画`  `游戏辅助`  `Gartic Phone`  `脚本工具`  `娱乐`  `自动化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Gartic_Phone_Draw_Bot.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.1**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/495177-gartic-phone-draw-bot) <Badge type="tip" text="GreasyFork" />　　安装量：**12,529**　　评分：👍1 / 👎1

## 功能介绍

本脚本可自动在 Gartic Phone 游戏中进行绘画，模拟玩家的画图操作。适用于需要快速完成绘画任务或自动生成图案的场景。

## 适用网站

- Gartic Phone

## 使用方法

1. 安装脚本后，进入 Gartic Phone 网站。
2. 开始游戏时，脚本会自动接管绘画环节。
3. 无需手动操作，脚本会自动完成画图。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改网页的全局对象，便于与游戏内部交互。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取或提交数据到 Gartic Phone 网站。 |
| `GM_log` | 用于在调试时输出日志信息，帮助开发者追踪脚本运行情况。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：49/100　　**分析时间**：2026-06-15

> 该脚本主要通过 WebSocket 向 garticphone.com 发送自动绘图数据，未发现明显的隐私采集行为。存在远程代码执行风险（动态修改脚本、setTimeout 字符串用法），以及权限滥用（未使用的 GM_xmlhttpRequest、unsafeWindow）。未检测到代码混淆或 DOM XSS。整体风险为中等，建议优化权限申请和远程代码执行方式。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：garticphone.com (via WebSocket)） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ⚠️ 使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script establishes a WebSocket connection to garticphone.com and sends drawing packets, which may include user-generated drawing data.  
> 位置：customWebSocket class, sendPackets function  
> 建议：Ensure only intended drawing data is sent; avoid sending sensitive or unintended user information.

**🔴 HIGH** — Remote Code Execution  
> Script dynamically modifies and injects game scripts via Proxy on Node.prototype.appendChild, but only for scripts containing 'draw' in their src.  
> 位置：Node.prototype.appendChild Proxy  
> 建议：Carefully validate injected code and avoid introducing vulnerabilities.

**🔴 HIGH** — Remote Code Execution  
> Script uses setTimeout with string arguments in sendPackets function.  
> 位置：sendPackets function  
> 建议：Replace setTimeout(string) with setTimeout(function) to avoid code injection risks.

**🟠 MEDIUM** — Permission Abuse  
> Script grants GM_xmlhttpRequest but does not use it in the code. Unused high privilege.  
> 位置：Metadata (@grant GM_xmlhttpRequest)  
> 建议：Remove unused GM_xmlhttpRequest grant to minimize attack surface.

**🟠 MEDIUM** — Permission Abuse  
> Script grants unsafeWindow, which can expose internal variables to the page context and vice versa.  
> 位置：Metadata (@grant unsafeWindow)  
> 建议：Review necessity of unsafeWindow; restrict usage if possible.

**🟠 MEDIUM** — Supply Chain Risk  
> Script uses fetch to load external scripts and resources, but only from garticphone.com domain.  
> 位置：requestText, requestBuffer functions  
> 建议：Ensure fetch is not used to load from untrusted domains.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/495177-gartic-phone-draw-bot)*
