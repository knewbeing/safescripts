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

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-06-01

> 该脚本主要通过 WebSocket 与 garticphone.com 服务器通信，实现自动绘图功能。未发现隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。存在数据外传（仅限目标站点）、未使用的高权限申请（GM_xmlhttpRequest）和对 WebSocket 的全局代理（可能影响页面其他功能）。建议移除未使用的权限，并限制 WebSocket 代理范围。

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
> 脚本通过 WebSocket 发送数据包到 garticphone.com 服务器，内容为自动绘图生成的数据。  
> 位置：sendPackets()、customWebSocket 类  
> 建议：确认仅发送游戏相关数据，不包含用户敏感信息。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但实际代码未使用该 API。  
> 位置：@grant 元数据  
> 建议：移除未使用的高权限申请，减少权限滥用风险。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本通过 Proxy 劫持 WebSocket 构造函数，可能影响页面其他 WebSocket 行为。  
> 位置：customWebSocket 类  
> 建议：确保只影响目标 WebSocket，避免副作用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/495177-gartic-phone-draw-bot)*
