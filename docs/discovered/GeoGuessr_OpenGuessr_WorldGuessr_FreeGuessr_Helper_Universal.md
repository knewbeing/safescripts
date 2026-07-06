---
title: "地理猜谜助手通用版"
---

# 地理猜谜助手通用版

`地理猜谜`  `游戏辅助`  `地图工具`  `信息分享`  `安全`  `多平台`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/GeoGuessr_OpenGuessr_WorldGuessr_FreeGuessr_Helper_Universal.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**8.8**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/572651-geoguessr-openguessr-worldguessr-freeguessr-helper-universal) <Badge type="tip" text="GreasyFork" />　　安装量：**1,227**　　评分：👍2 / 👎1

## 功能介绍

本脚本为地理猜谜类网站提供辅助功能。按 Tab 键可打开设置菜单，支持在地图上标记位置、将位置发送到 Discord、在谷歌地图中打开位置。脚本设计为难以被检测，保障使用安全。

## 适用网站

- GeoGuessr
- OpenGuessr
- WorldGuessr
- FreeGuessr
- GuessWhereYouAre

## 使用方法

1. 安装脚本后，进入支持的地理猜谜网站。
2. 在游戏页面按 Tab 键打开设置菜单。
3. 根据需要在地图上标记位置、发送位置到 Discord 或打开谷歌地图。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于保存脚本设置和数据。 |
| `GM_getValue` | 用于读取脚本保存的数据。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，如将位置发送到 Discord。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-07-06

> 该脚本存在严重的数据外传风险，尤其是向 discord.com 和 nominatim.openstreetmap.org 发送地理位置数据，可能涉及用户隐私。未检测到代码混淆、远程代码执行、DOM XSS、供应链风险等问题。建议加强用户告知和权限控制，避免自动外传敏感信息。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 discord.com 发送地理位置数据（sendToDiscord 功能），可能包含用户行为、坐标等敏感信息。  
> 位置：sendToDiscord 相关功能（未展示完整代码，但元数据和描述已明确）  
> 建议：仅允许用户主动发送，明确告知用户数据外传风险，并避免发送敏感信息。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 nominatim.openstreetmap.org 查询地理位置，可能包含用户当前坐标。  
> 位置：_getAddress() 函数  
> 建议：仅在用户主动操作时发送请求，避免自动采集和外传用户位置。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请 GM_xmlhttpRequest 权限并实际使用，符合最小权限原则，但 @connect 申请了 discord.com，存在高风险。  
> 位置：元数据 @grant/@connect  
> 建议：如非必要，移除 discord.com 连接权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本调用 Notification API，可能被滥用发送通知。  
> 位置：sendNotification() 函数  
> 建议：仅在用户允许并主动操作时调用。

**🟡 LOW** — 远程代码执行  
> 脚本未检测到代码混淆、eval、动态 script 加载等远程代码执行风险。  
> 位置：全局代码审查  
> 建议：保持代码透明，避免混淆和动态执行。

**🟡 LOW** — DOM XSS  
> 脚本未检测到 DOM XSS、用户输入注入等风险。  
> 位置：全局代码审查  
> 建议：继续保持安全的 DOM 操作。

**🟡 LOW** — 供应链风险  
> 脚本未检测到供应链风险（未使用 @require 加载第三方库）。  
> 位置：元数据 @require  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — 隐私采集  
> 脚本未检测到 WebSocket、EventSource、剪贴板读取、键盘监听等隐私采集行为。  
> 位置：全局代码审查  
> 建议：继续避免隐私采集。

**🟡 LOW** — ClickJacking  
> 脚本未检测到 iframe 隐藏、frame 保护策略修改等 ClickJacking 风险。  
> 位置：全局代码审查  
> 建议：继续避免相关风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-geoguessr-openguessr-worldguessr-freeguessr-helper-universal)*
