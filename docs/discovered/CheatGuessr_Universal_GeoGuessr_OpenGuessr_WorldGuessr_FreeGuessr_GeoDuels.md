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

**风险等级**：⛔ CRITICAL　　**安全评分**：22/100　　**分析时间**：2026-07-27

> 该脚本存在严重的数据外传和隐私采集风险，主要通过 GM_xmlhttpRequest 向 discord.com 和 nominatim.openstreetmap.org 发送用户数据，并监听用户操作。WebSocket代理存在远程代码执行和通信篡改风险。未检测到明显混淆和 DOM XSS，但部分 iframe 操作可能影响页面安全。整体安全风险为 CRITICAL，不建议在敏感环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（监听键盘事件, 读取并发送地图坐标, 通过 WebSocket 代理拦截游戏通信） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ⚠️ 使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 discord.com 发送数据（如地图坐标、游戏信息），存在用户数据外传至第三方服务器的风险。  
> 位置：GM_xmlhttpRequest 调用，@connect discord.com  
> 建议：仅允许用户主动发送数据，避免自动上报；明确提示用户数据外传行为。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 nominatim.openstreetmap.org 查询地理位置，可能包含用户游戏坐标等敏感信息。  
> 位置：GM_xmlhttpRequest 调用，@connect nominatim.openstreetmap.org  
> 建议：仅发送必要的地理坐标，避免携带多余用户信息。

**⛔ CRITICAL** — 隐私采集  
> 脚本监听键盘事件（如 Tab、Q、G、X、V、T），并可将用户操作结果（如地图坐标）发送到 Discord，存在隐私采集并外传风险。  
> 位置：热键监听、sendToDiscord 功能  
> 建议：确保仅在用户明确操作时发送数据，避免自动采集和外传。

**🔴 HIGH** — 远程代码执行  
> 脚本通过 WebSocket 代理和拦截，修改/注入消息内容，存在远程代码执行和游戏通信篡改风险。  
> 位置：WebSocket.prototype.send Proxy、WebSocket.prototype.addEventListener Proxy  
> 建议：避免篡改 WebSocket 消息，防止远程代码注入和通信劫持。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等危险执行方式，远程代码执行风险主要来自 WebSocket代理。  
> 位置：全局代码  
> 建议：避免动态执行字符串代码。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请 GM_xmlhttpRequest 权限，但未申请 GM_download、GM_openInTab 等高权限，权限申请基本合理。  
> 位置：@grant 元数据  
> 建议：定期复查权限申请，避免未来滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未检测到敏感 API 调用（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API），但使用 Notification API 申请通知权限。  
> 位置：state.notificationPermission  
> 建议：仅在用户允许时使用通知功能。

**🟡 LOW** — 代码混淆  
> 脚本未检测到明显混淆（如 atob/btoa、字符串数组映射、unicode编码、大量压缩单行代码），代码可读性较好。  
> 位置：全局代码  
> 建议：保持代码透明，避免混淆。

**🟡 LOW** — DOM XSS  
> 脚本未检测到 DOM XSS 或注入风险（未直接将用户输入插入 innerHTML/outerHTML）。  
> 位置：全局代码  
> 建议：继续避免直接插入用户输入到 DOM。

**🟡 LOW** — 供应链风险  
> 脚本未检测到供应链风险（无 @require 第三方库），所有代码本地实现。  
> 位置：元数据 @require  
> 建议：如未来引入第三方库，需固定版本哈希并使用可信 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本在部分平台修改 iframe sandbox 属性，可能影响 frame 保护策略，存在 clickjacking 风险。  
> 位置：Element.prototype.setAttribute Proxy  
> 建议：避免移除 iframe sandbox 属性，保障页面安全。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels)*
