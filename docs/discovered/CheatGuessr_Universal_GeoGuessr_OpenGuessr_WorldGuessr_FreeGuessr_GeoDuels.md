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

**风险等级**：⛔ CRITICAL　　**安全评分**：25/100　　**分析时间**：2026-06-15

> 该脚本存在严重的数据外传和隐私采集风险，尤其是向 discord.com 和 nominatim.openstreetmap.org 发送用户游戏行为和位置数据。脚本未检测到远程代码执行、代码混淆、DOM XSS、供应链风险等问题，但因数据外传和隐私采集，安全评分较低。建议仅在用户明确同意下发送数据，并减少敏感信息采集与外传。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（玩家猜测坐标, 玩家昵称, 玩家账号ID） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ⚠️ 使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 discord.com 发送数据，可能包含用户游戏位置、行为等敏感信息。  
> 位置：GM_xmlhttpRequest 调用，@connect discord.com  
> 建议：仅允许用户主动发送数据，避免自动上报；明确告知用户数据内容和用途。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 nominatim.openstreetmap.org 查询地理位置，可能包含用户游戏坐标。  
> 位置：GM_xmlhttpRequest 调用，@connect nominatim.openstreetmap.org  
> 建议：避免发送精确用户坐标，或在发送前征得用户同意。

**⛔ CRITICAL** — 数据外传  
> 脚本监听 WebSocket 消息并处理玩家猜测数据，存在将用户行为数据外传的风险。  
> 位置：WebSocket.prototype.send/Proxy、WebSocket.prototype.addEventListener/Proxy  
> 建议：确保仅在本地处理数据，不向第三方服务器发送用户行为。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取并操作游戏中的玩家猜测、昵称、坐标等信息，属于隐私采集。  
> 位置：handleOpponentMarker、player.guess、player.username、player.accountId  
> 建议：仅在本地显示，不外传敏感信息；告知用户采集内容。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请 GM_xmlhttpRequest 高权限，但未申请 GM_download、GM_openInTab 等其他高权限。  
> 位置：@grant GM_xmlhttpRequest  
> 建议：仅申请实际需要的权限，避免权限滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本使用 Notification API，可能被滥用发送通知。  
> 位置：state.notificationPermission、Notification.permission  
> 建议：仅在用户主动操作时发送通知。

**🟡 LOW** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等远程代码执行方式。  
> 位置：全局代码审查  
> 建议：保持当前安全实践。

**🟡 LOW** — 代码混淆  
> 脚本未检测到代码混淆、base64、unicode、字符串数组映射等混淆特征。  
> 位置：全局代码审查  
> 建议：保持代码可读性。

**🟡 LOW** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 或注入风险，未直接插入用户输入到 innerHTML。  
> 位置：全局代码审查  
> 建议：保持当前安全实践。

**🟡 LOW** — 供应链风险  
> 脚本未检测到供应链风险，未通过 @require 加载第三方库。  
> 位置：元数据 @require 缺失  
> 建议：如需加载第三方库，请固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到 clickjacking 或 iframe 风险。  
> 位置：全局代码审查  
> 建议：保持当前安全实践。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr-geoduels)*
