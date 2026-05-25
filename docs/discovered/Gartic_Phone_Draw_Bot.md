---
title: "Gartic Phone自动绘图机器人"
---

# Gartic Phone自动绘图机器人

`自动绘图`  `游戏辅助`  `Gartic Phone`  `机器人`  `网页增强`  `娱乐`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Gartic_Phone_Draw_Bot.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.1**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/495177-gartic-phone-draw-bot) <Badge type="tip" text="GreasyFork" />　　安装量：**11,720**　　评分：👍0 / 👎1

## 功能介绍

本脚本可以自动在 Gartic Phone 游戏中进行绘画，模拟机器人自动作画。适合需要快速完成画图任务或想体验自动绘图功能的用户。

## 适用网站

- Gartic Phone

## 使用方法

1. 安装脚本后，进入 Gartic Phone 网站。
2. 开始游戏时，自动绘图功能会自动激活。
3. 无需手动操作，机器人会自动完成画图任务。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改网页中的全局变量，增强与页面的交互能力。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取外部资源或数据。 |
| `GM_log` | 用于输出调试信息，方便开发者查看脚本运行情况。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：37/100　　**分析时间**：2026-05-25

> The script transmits drawing/game data via WebSocket to garticphone.com, intercepts and rewrites loaded scripts (potential remote code execution risk), and requests unused permissions. No evidence of privacy collection or code obfuscation. The main risks are data transmission (CRITICAL) and remote code execution (HIGH).

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
> The script establishes a WebSocket connection to garticphone.com and sends game drawing data packets, including user actions and possibly game state.  
> 位置：customWebSocket class, sendPackets function  
> 建议：Ensure only necessary game data is transmitted; avoid sending sensitive or unrelated user information.

**🔴 HIGH** — Remote Code Execution  
> The script modifies Node.prototype.appendChild to intercept and rewrite scripts loaded from external sources, potentially allowing remote code execution if the editScript function is abused.  
> 位置：Node.prototype.appendChild Proxy  
> 建议：Restrict script rewriting to trusted sources and validate edited code before execution.

**🔴 HIGH** — Remote Code Execution  
> The script uses unsafeWindow to override WebSocket globally, which may introduce compatibility and security risks.  
> 位置：unsafeWindow.WebSocket = customWebSocket  
> 建议：Limit unsafeWindow usage and ensure no leakage of sensitive data or unintended side effects.

**🟠 MEDIUM** — Permission Abuse  
> The script requests GM_xmlhttpRequest permission but does not use it in the code, indicating potential permission overreach.  
> 位置：@grant GM_xmlhttpRequest in metadata  
> 建议：Remove unused permissions to minimize attack surface.

**🟠 MEDIUM** — Permission Abuse  
> The script requests GM_log permission but does not use it in the code, indicating potential permission overreach.  
> 位置：@grant GM_log in metadata  
> 建议：Remove unused permissions to minimize attack surface.

**🟡 LOW** — Data Transmission  
> The script uses fetch to load external resources, but only from the same domain (garticphone.com). No third-party data exfiltration detected.  
> 位置：requestText, requestBuffer functions  
> 建议：Monitor for future changes that may introduce third-party requests.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/495177-gartic-phone-draw-bot)*
