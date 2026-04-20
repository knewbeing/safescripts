---
title: "地理猜图辅助通用脚本"
---

# 地理猜图辅助通用脚本

`地理猜图`  `辅助工具`  `地图`  `作弊`  `分享`  `自动化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/CheatGuessr_Universal_GeoGuessr_OpenGuessr_WorldGuessr_FreeGuessr.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**7.33**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr) <Badge type="tip" text="GreasyFork" />　　安装量：**740**　　评分：👍2 / 👎1

## 功能介绍

本脚本为地理猜图类网站提供辅助功能。按 Tab 键可打开设置菜单，支持在地图上标记位置、将位置信息发送到 Discord、在谷歌地图中打开定位。脚本设计为难以被检测，保障使用安全。

## 适用网站

- GeoGuessr
- OpenGuessr
- WorldGuessr
- FreeGuessr
- GuessWhereYouAre

## 使用方法

1. 安装脚本后，进入支持的地理猜图网站。
2. 按下 Tab 键打开脚本设置菜单。
3. 根据需要在地图上标记位置，或一键发送位置信息到 Discord。
4. 可直接在谷歌地图中查看当前定位。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于在本地保存脚本设置和用户数据。 |
| `GM_getValue` | 用于从本地读取脚本设置和用户数据。 |
| `GM_xmlhttpRequest` | 用于向外部网站（如 Discord）发送网络请求，实现分享等功能。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：25/100　　**分析时间**：2026-04-20

> 该脚本存在严重的数据外传和隐私采集风险，主要表现为自动或手动将用户地理位置、地址等敏感信息发送到第三方服务器（Discord、OpenStreetMap）。未检测到远程代码执行、代码混淆、DOM XSS 等高危行为，但敏感权限和 API 调用存在中等风险。整体安全评分较低，不建议在敏感环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（收集用户地理坐标, 收集地理反查地址信息, 发送到 Discord Webhook） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 discord.com 发送用户地理位置、地址信息等数据，属于数据外传行为，且目标为第三方服务器。  
> 位置：sendToDiscord(embed) 函数  
> 建议：仅在用户明确授权情况下发送数据，避免自动外传敏感信息。建议增加用户确认提示，并限制数据内容。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 nominatim.openstreetmap.org 查询地理位置反查地址，涉及用户地理坐标外传。  
> 位置：_getAddress(lat, lng) 函数  
> 建议：仅在用户主动操作时请求，避免自动批量发送坐标。建议增加用户提示。

**⛔ CRITICAL** — 隐私采集  
> 脚本收集并处理用户地理坐标、地址信息，并有发送到 Discord 的功能，涉及隐私采集。  
> 位置：createEmbed(), sendToDiscord(embed), _getAddress(lat, lng)  
> 建议：明确告知用户采集内容及用途，避免自动采集和外传敏感信息。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请 GM_xmlhttpRequest 高权限，并实际用于外部数据传输，权限申请合理但风险较高。  
> 位置：元数据 @grant GM_xmlhttpRequest  
> 建议：仅申请必要权限，限制外部通信目标。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本调用 Notification API，可能被滥用发送通知。  
> 位置：sendNotification(title, body), requestNotificationPermission()  
> 建议：仅在用户主动操作时发送通知，避免骚扰。

**🟡 LOW** — 一般安全建议  
> 脚本未检测到远程代码执行、代码混淆、DOM XSS、iframe 风险等高危行为。  
> 位置：整体代码审查  
> 建议：保持代码透明，避免动态加载或混淆。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr)*
