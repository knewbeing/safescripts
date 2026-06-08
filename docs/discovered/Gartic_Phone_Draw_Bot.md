---
title: "Gartic Phone自动绘画机器人"
---

# Gartic Phone自动绘画机器人

`自动绘画`  `游戏辅助`  `Gartic Phone`  `效率提升`  `脚本工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Gartic_Phone_Draw_Bot.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.1**　　发现时间：**2026-06-01**　　来源：[GreasyFork](https://greasyfork.org/scripts/495177-gartic-phone-draw-bot) <Badge type="tip" text="GreasyFork" />　　安装量：**11,967**　　评分：👍0 / 👎1

## 功能介绍

该脚本可以在 Gartic Phone 游戏中自动绘制图画，帮助用户快速完成绘画任务。它通过修改游戏脚本，实现自动化操作，适合不擅长绘画或想提高效率的玩家。

## 适用网站

- Gartic Phone

## 使用方法

1. 安装 Tampermonkey 插件。
2. 在 Tampermonkey 中添加此脚本。
3. 进入 Gartic Phone 网站，开始游戏。
4. 脚本会自动进行绘画，无需手动操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改网页中的全局变量，实现自动绘画功能。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取绘画数据或与服务器通信。 |
| `GM_log` | 用于输出调试信息，方便开发者查看脚本运行情况。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：66/100　　**分析时间**：2026-06-08

> 该脚本主要通过代理 WebSocket 与 garticphone.com 官方服务器通信，实现自动绘图功能。未发现向第三方服务器外传数据或隐私采集行为。未检测到远程代码执行、代码混淆、DOM XSS、供应链风险等高危问题。存在未使用的 GM_xmlhttpRequest 权限和 unsafeWindow 权限申请，建议移除未用权限以降低潜在风险。整体风险较低。

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
> 使用 fetch 进行网络请求，目标为 garticphone.com（与脚本运行域一致），未见向第三方域名外传数据。  
> 位置：requestText, requestBuffer 函数  
> 建议：确保仅请求可信站点资源，避免携带敏感用户数据。

**⛔ CRITICAL** — 数据外传  
> WebSocket 用于与 garticphone.com 服务器通信，未见向第三方服务器发送数据。  
> 位置：customWebSocket 类、sendPackets 函数  
> 建议：确保 WebSocket 仅连接官方服务器，避免敏感信息泄露。

**🟠 MEDIUM** — 权限滥用  
> 申请了 GM_xmlhttpRequest 权限，但实际代码未使用该 API。  
> 位置：@grant 元数据  
> 建议：移除未使用的高权限申请，减少权限滥用风险。

**🟠 MEDIUM** — 权限滥用  
> 申请了 unsafeWindow 权限，实际用于重写 WebSocket 构造函数，存在一定安全风险。  
> 位置：@grant 元数据、unsafeWindow.WebSocket  
> 建议：仅在必要时使用 unsafeWindow，并确保无副作用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/495177-gartic-phone-draw-bot)*
