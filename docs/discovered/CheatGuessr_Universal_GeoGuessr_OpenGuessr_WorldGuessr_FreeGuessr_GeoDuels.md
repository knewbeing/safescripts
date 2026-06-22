---
title: "CheatGuessr 通用版｜GeoGuessr 辅助"
---

# CheatGuessr 通用版｜GeoGuessr 辅助

`地理猜谜`  `游戏辅助`  `地图工具`  `信息分享`  `自动化`  `社交`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/CheatGuessr_Universal_GeoGuessr_OpenGuessr_WorldGuessr_FreeGuessr_GeoDuels.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**12.3**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels) <Badge type="tip" text="GreasyFork" />　　安装量：**5,856**　　评分：👍11 / 👎6

## 功能介绍

这是一个隐蔽式 GeoGuessr 辅助工具，支持多个地理猜谜类网站。用户可通过按 Tab 键打开设置菜单，在地图上标记位置，并将位置信息发送到 Discord 或在 Google 地图中打开。脚本旨在帮助玩家更轻松地定位和分享游戏地点。

## 适用网站

- GeoGuessr
- OpenGuessr
- WorldGuessr
- WorldGuessrGame
- FreeGuessr
- GeoDuels
- GuessWhereYouAre

## 使用方法

1. 安装脚本后，进入支持的地理猜谜网站。
2. 在游戏页面按 Tab 键打开设置菜单。
3. 根据菜单提示，在地图上标记位置。
4. 可将位置信息发送到 Discord 或在 Google 地图中查看。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于保存脚本设置和用户数据。 |
| `GM_getValue` | 用于读取脚本保存的设置和数据。 |
| `GM_deleteValue` | 用于删除脚本保存的数据。 |
| `GM_xmlhttpRequest` | 用于与外部网站（如 Discord 和地理定位服务）通信，发送或获取信息。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：35/100　　**分析时间**：2026-06-22

> 该脚本存在高风险数据外传行为，允许用户将游戏坐标、昵称等信息通过 GM_xmlhttpRequest 主动发送到 Discord（第三方服务器），以及通过 nominatim.openstreetmap.org 进行地理反查。虽然未见自动化隐私采集和远程代码执行，但涉及敏感数据外传，需用户高度警惕。建议仅在用户明确知情同意下使用相关功能，并避免自动化批量外传。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（可能处理昵称、坐标等游戏相关信息用于 Discord 发送） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ⚠️ 使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本允许通过 GM_xmlhttpRequest 发送数据到 discord.com（如 sendToDiscord 功能），可能外传用户游戏坐标、昵称等信息。  
> 位置：GM_xmlhttpRequest 调用（sendToDiscord 相关功能）  
> 建议：仅允许用户主动触发发送，明确告知用户外传内容，避免自动上报敏感信息。

**⛔ CRITICAL** — 数据外传  
> 脚本允许通过 GM_xmlhttpRequest 访问 nominatim.openstreetmap.org 进行地理反查，可能外传用户游戏坐标。  
> 位置：GM_xmlhttpRequest 调用（地理反查功能）  
> 建议：仅在用户明确操作下请求，避免自动批量查询。

**🔴 HIGH** — WebSocket 使用  
> 脚本通过 WebSocket 监听和发送消息，部分代码会拦截/伪造聊天消息，但未见将用户行为数据主动外传到第三方。  
> 位置：WebSocket 相关代理代码  
> 建议：确保不将用户敏感数据通过 WebSocket 发送到非游戏官方服务器。

**🔴 HIGH** — 隐私采集  
> 脚本未见明显隐私采集（如读取 cookie、localStorage、表单、剪贴板等），但部分功能可能间接处理昵称、坐标等信息。  
> 位置：全局变量与 sendToDiscord 相关逻辑  
> 建议：确保所有敏感信息仅在用户知情同意下处理和外传。

**🟡 LOW** — 远程代码执行  
> 脚本未见 eval、new Function、setTimeout(string) 等远程代码执行风险。  
> 位置：全局  
> 建议：保持禁止动态代码执行。

**🟡 LOW** — 代码混淆  
> 脚本未见明显代码混淆、base64 解码、字符串数组混淆等。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

**🟡 LOW** — DOM XSS  
> 脚本未见 DOM XSS 风险（未直接将用户输入插入 innerHTML/outerHTML）。  
> 位置：全局  
> 建议：如后续涉及 DOM 操作，需严格转义。

**🟡 LOW** — 权限滥用  
> @grant 仅申请了实际用到的权限，无明显权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请必要权限。

**🟡 LOW** — 供应链风险  
> @require 未使用，未见供应链风险。  
> 位置：元数据  
> 建议：如需第三方库，建议固定版本和可信来源。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels)*
