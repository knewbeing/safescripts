---
title: "CheatGuessr Universal | GeoGuessr | OpenGuessr | WorldGuessr | FreeGuessr"
---

# CheatGuessr Universal | GeoGuessr | OpenGuessr | WorldGuessr | FreeGuessr



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/CheatGuessr_Universal_GeoGuessr_OpenGuessr_WorldGuessr_FreeGuessr.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**7.33**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr) <Badge type="tip" text="GreasyFork" />　　安装量：**740**　　评分：👍2 / 👎1

## 功能介绍



## 适用网站

- 通用

## 使用方法

- 请参阅脚本说明

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：25/100　　**分析时间**：2026-04-27

> 该脚本存在严重的数据外传和隐私采集风险，尤其是自动将用户地理位置、地址等敏感信息发送至 Discord Webhook 和第三方地理反查服务。未检测到代码混淆、远程代码执行、DOM XSS 等高风险行为。建议加强用户授权机制，避免自动外传敏感数据。整体安全评分较低，不建议在敏感环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（收集用户地理坐标, 收集用户地址信息, 可将上述信息发送至 Discord Webhook） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 discord.com 发送用户地理位置、地址信息等数据，属于数据外传行为。此行为可导致用户隐私泄露。  
> 位置：sendToDiscord(embed) 函数  
> 建议：仅允许用户明确授权后发送数据，避免自动上报敏感信息。建议增加用户确认提示，并详细说明数据用途。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 nominatim.openstreetmap.org 查询地理反查服务，传递用户当前坐标。虽然为地图功能，但涉及用户地理隐私。  
> 位置：_getAddress(lat, lng) 函数  
> 建议：应告知用户地理坐标将被发送至第三方服务，避免自动发送敏感坐标。

**⛔ CRITICAL** — 隐私采集  
> 脚本收集并处理用户地理坐标、地址信息，并可将其发送至 Discord Webhook。属于隐私采集行为。  
> 位置：createEmbed()、sendToDiscord()、_getAddress() 等函数  
> 建议：应明确告知用户采集内容及用途，避免自动采集和外传敏感信息。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请 GM_xmlhttpRequest 高权限，并实际用于向外部服务器发送数据。权限申请与实际用途一致，但属于高风险操作。  
> 位置：元数据 @grant GM_xmlhttpRequest  
> 建议：仅在必要时申请高权限，避免滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本调用 Notification API，可能被滥用发送通知。  
> 位置：sendNotification()、requestNotificationPermission()  
> 建议：建议仅在用户明确授权后使用通知功能。

**🟡 LOW** — 远程代码执行  
> 脚本未检测到代码混淆、eval、动态 script 加载等远程代码执行风险。  
> 位置：全局代码审查  
> 建议：保持代码透明，避免混淆和动态执行。

**🟡 LOW** — DOM XSS  
> 脚本未检测到 DOM XSS、用户输入直接插入 innerHTML/outerHTML 等注入风险。  
> 位置：全局代码审查  
> 建议：继续保持安全的 DOM 操作。

**🟡 LOW** — 供应链风险  
> 脚本未检测到供应链风险，未使用 @require 加载第三方库。  
> 位置：元数据 @require  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — 隐私采集  
> 脚本未检测到 WebSocket、EventSource、剪贴板读取、键盘监听等高风险行为。  
> 位置：全局代码审查  
> 建议：继续保持安全实践。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本在部分平台修改 iframe sandbox 属性，可能影响 frame 保护策略。  
> 位置：Element.prototype.setAttribute Proxy  
> 建议：避免降低 frame 保护，确保页面安全。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr)*
