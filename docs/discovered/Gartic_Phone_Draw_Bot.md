---
title: "Gartic Phone自动绘图机器人"
---

# Gartic Phone自动绘图机器人

`自动绘图`  `游戏辅助`  `Gartic Phone`  `娱乐`  `脚本工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Gartic_Phone_Draw_Bot.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.1**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/495177-gartic-phone-draw-bot) <Badge type="tip" text="GreasyFork" />　　安装量：**13,374**　　评分：👍1 / 👎1

## 功能介绍

本脚本可以自动在 Gartic Phone 游戏中进行绘画，模拟玩家画图操作，帮助快速完成游戏任务。适用于需要自动绘图的场景。

## 适用网站

- Gartic Phone

## 使用方法

1. 1. 安装 Tampermonkey 插件并添加本脚本。
2. 2. 打开 Gartic Phone 网站，进入游戏房间。
3. 3. 在绘画环节，脚本会自动开始绘图，无需手动操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改网页的全局变量，增强与页面的交互能力。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取外部资源或数据。 |
| `GM_log` | 用于在调试时输出日志信息，方便开发和排查问题。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：72/100　　**分析时间**：2026-07-13

> 该脚本主要通过 WebSocket 与 garticphone.com 服务器通信，未发现向第三方服务器或外部域名发送数据，也未收集用户隐私信息。未检测到远程代码执行、代码混淆、DOM XSS 或供应链风险。存在未使用的 GM_xmlhttpRequest 权限申请，建议移除。整体风险较低，适合在信任环境下使用。

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
> 脚本通过 WebSocket 发送数据包到 garticphone.com 服务器（sendPackets 函数），但仅限于游戏协议数据，无用户敏感信息或页面内容外传。  
> 位置：sendPackets, customWebSocket, draw  
> 建议：确认仅发送游戏协议数据，不要拼接或发送用户敏感信息。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但实际代码未使用该 API。  
> 位置：@grant 元数据  
> 建议：移除未使用的高权限申请，减少权限滥用风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/495177-gartic-phone-draw-bot)*
