---
title: "CheatGuessr Universal (Works in GeoGuessr | OpenGuessr | WorldGuessr | FreeGuessr)"
---

# CheatGuessr Universal (Works in GeoGuessr | OpenGuessr | WorldGuessr | FreeGuessr)



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/CheatGuessr_Universal_Works_in_GeoGuessr_OpenGuessr_WorldGuessr_FreeGuessr.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**5.65**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/572651-cheatguessr-universal-works-in-geoguessr-openguessr-worldguessr-freeguessr) <Badge type="tip" text="GreasyFork" />　　安装量：**349**　　评分：👍1 / 👎0

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

**风险等级**：⛔ CRITICAL　　**安全评分**：25/100　　**分析时间**：2026-06-15

> 该脚本存在严重的数据外传和隐私采集风险，主要通过 GM_xmlhttpRequest 向 discord.com 和 nominatim.openstreetmap.org 发送用户地理位置及相关信息。未检测到代码混淆、远程代码执行、DOM XSS、供应链风险等问题，但敏感 API（通知）和高权限申请存在中等风险。整体安全评分为 25，风险等级为 CRITICAL，不建议在敏感环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（地理坐标（lat/lng）采集, 地址信息采集） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 discord.com 发送用户地理位置、地址信息等数据，属于数据外传行为，且目标为第三方服务器。  
> 位置：sendToDiscord(embed) 函数  
> 建议：禁止向第三方服务器发送用户敏感数据，或需明确告知用户风险并征得同意。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 nominatim.openstreetmap.org 查询地理位置反查地址，涉及用户地理坐标外传。  
> 位置：_getAddress(lat, lng) 函数  
> 建议：如需调用第三方地理服务，建议脱敏处理或征得用户同意。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取并处理用户地理坐标（lat/lng），并通过 Discord webhook 外传，属于隐私采集与外传。  
> 位置：getCoordinates()、sendToDiscord(embed) 函数  
> 建议：避免采集并外传用户地理位置，或需明确告知用户风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请 GM_xmlhttpRequest 高权限，并实际用于外部数据传输。  
> 位置：元数据 @grant GM_xmlhttpRequest  
> 建议：仅申请实际需要的权限，避免滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本通过 Notification API 发送通知，可能被滥用。  
> 位置：sendNotification(title, body) 函数  
> 建议：仅在用户明确授权后使用通知功能。

**🟡 LOW** — 远程代码执行  
> 脚本未检测到代码混淆、eval、动态 script 加载等远程代码执行风险。  
> 位置：全局代码  
> 建议：保持代码透明，避免混淆和动态执行。

**🟡 LOW** — DOM XSS  
> 脚本未检测到 DOM XSS 或注入风险。  
> 位置：全局代码  
> 建议：继续保持安全的 DOM 操作。

**🟡 LOW** — 供应链风险  
> 脚本未检测到供应链风险（未使用 @require 加载第三方库）。  
> 位置：元数据  
> 建议：如需加载第三方库，建议固定版本哈希并使用可信 CDN。

**🟡 LOW** — iframe 风险  
> 脚本未检测到 iframe 风险或 clickjacking 行为。  
> 位置：Element.prototype.setAttribute 重写  
> 建议：如需操作 iframe，需谨慎处理安全策略。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-works-in-geoguessr-openguessr-worldguessr-freeguessr)*
