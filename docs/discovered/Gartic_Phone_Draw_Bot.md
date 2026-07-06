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

**风险等级**：🔴 HIGH　　**安全评分**：47/100　　**分析时间**：2026-07-06

> 该脚本主要通过 WebSocket 与 garticphone.com 服务器通信，自动发送绘图数据。未发现隐私采集、代码混淆或 DOM XSS 风险，但存在数据外传（用户行为数据）、远程代码执行（WebSocket 劫持）、权限滥用（未使用 GM_xmlhttpRequest）、供应链风险（未固定版本哈希）。建议移除未用权限、限制 WebSocket 修改、确保数据结构安全。整体风险较高，不建议在敏感环境下使用。

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
> 脚本通过 WebSocket 向 garticphone.com 服务器发送大量绘图数据（用户行为数据），并可访问当前游戏回合信息。  
> 位置：customWebSocket class, sendPackets function  
> 建议：确保仅发送游戏相关数据，不携带敏感用户信息。建议明确数据结构，避免扩展为追踪用途。

**🔴 HIGH** — 远程代码执行  
> 脚本可访问并修改 WebSocket 行为，理论上可用于数据注入或劫持通信。  
> 位置：unsafeWindow.WebSocket = customWebSocket  
> 建议：限制 WebSocket 修改范围，避免滥用。仅允许与游戏服务器通信。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请 GM_xmlhttpRequest 权限，但实际未使用，仅用 fetch 进行请求。  
> 位置：元数据 @grant GM_xmlhttpRequest  
> 建议：移除未使用的高权限申请，减少权限滥用风险。

**🟠 MEDIUM** — 供应链风险  
> 脚本未固定 @require 版本哈希，虽然未实际使用 @require，但 downloadURL/updateURL 指向 GreasyFork CDN，理论上存在供应链风险。  
> 位置：元数据 @downloadURL, @updateURL  
> 建议：确保所有远程加载代码来源可信且版本固定。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/495177-gartic-phone-draw-bot)*
