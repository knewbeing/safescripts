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

**风险等级**：🔴 HIGH　　**安全评分**：37/100　　**分析时间**：2026-07-27

> 该脚本主要通过 WebSocket 向 garticphone.com 服务器自动发送绘图数据，存在数据外传风险（CRITICAL）。脚本重写 WebSocket 构造函数并全局代理，属于高风险远程代码执行行为。未使用的高权限申请（GM_xmlhttpRequest、unsafeWindow）增加权限滥用风险。未检测到隐私采集、代码混淆或 DOM XSS。总体安全评分为 37，建议严格限制数据发送内容、移除不必要权限，并避免全局 WebSocket 替换。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：garticphone.com (via WebSocket)） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ⚠️ 使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 WebSocket 向 garticphone.com 服务器发送大量自动生成的绘图数据包（packets），这些数据可能包含用户操作生成的内容。  
> 位置：sendPackets()、draw()、customWebSocket 类  
> 建议：确保发送的数据仅限于游戏所需，避免携带任何敏感用户信息。建议明确数据结构并限制内容。

**🔴 HIGH** — 远程代码执行  
> 脚本重写了 WebSocket 构造函数，并全局代理 unsafeWindow.WebSocket，可能导致后续页面所有 WebSocket 行为被劫持或监控。  
> 位置：customWebSocket 类、unsafeWindow.WebSocket 替换  
> 建议：仅代理必要的 WebSocket 实例，避免全局替换，防止潜在安全隐患。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但实际代码未使用该 API，存在权限滥用风险。  
> 位置：元数据 @grant GM_xmlhttpRequest  
> 建议：移除未使用的高权限申请，减少攻击面。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 unsafeWindow 权限，允许与页面脚本深度交互，存在被滥用风险。  
> 位置：元数据 @grant unsafeWindow  
> 建议：仅在必要场景下使用 unsafeWindow，避免滥用。

**🟠 MEDIUM** — 供应链风险  
> 脚本未固定 @require 版本哈希，虽然未实际使用 @require，但 downloadURL/updateURL 指向 GreasyFork，理论上存在供应链风险。  
> 位置：元数据 @downloadURL/@updateURL  
> 建议：如需加载第三方库，务必固定版本哈希并使用可信 CDN。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/495177-gartic-phone-draw-bot)*
