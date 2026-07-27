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

**风险等级**：⛔ CRITICAL　　**安全评分**：25/100　　**分析时间**：2026-07-27

> 该脚本存在严重的数据外传和隐私采集风险，主要通过 GM_xmlhttpRequest 向第三方服务器（discord.com、nominatim.openstreetmap.org）发送用户地理位置和游戏数据。脚本允许用户输入 Discord webhook URL 并存储，存在远程代码执行风险。部分敏感 API（通知、iframe 原型链修改）存在滥用和安全隐患。建议仅在用户明确授权和知情情况下使用，并限制敏感数据的采集和外传。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（采集用户地理坐标（lat/lng）, 采集用户输入的 Discord webhook URL） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 discord.com 发送用户地理位置、游戏数据等敏感信息，属于数据外传行为。  
> 位置：sendToDiscord(embed) 函数  
> 建议：仅允许用户明确授权后发送数据，并在文档中声明数据用途。避免自动上报敏感信息。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 nominatim.openstreetmap.org 查询地理位置，可能包含用户当前坐标。  
> 位置：_getAddress(lat, lng) 函数  
> 建议：仅在用户主动操作时发送请求，避免自动采集和外传用户位置。

**⛔ CRITICAL** — 隐私采集  
> 脚本采集用户地理坐标（lat/lng），并通过 Discord webhook 外传。  
> 位置：getCoordinates()、sendToDiscord(embed) 函数  
> 建议：限制采集范围，仅在用户明确同意时采集和外传。

**🔴 HIGH** — 远程代码执行  
> 脚本允许用户输入 Discord webhook URL，并将其存储在 GM_setValue，存在远程代码执行风险（如 webhook 被攻击者控制）。  
> 位置：sendToDiscord(embed) 函数  
> 建议：验证 webhook URL 来源，避免用户输入恶意 URL。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请 GM_xmlhttpRequest 权限，并实际用于跨域数据发送，权限申请合理但存在滥用风险。  
> 位置：元数据 @grant GM_xmlhttpRequest  
> 建议：仅申请实际需要的权限，避免滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本通过 Notification API 发送通知，可能被滥用骚扰用户。  
> 位置：sendNotification(title, body) 函数  
> 建议：仅在用户明确授权后使用通知功能。

**🟡 LOW** — 供应链风险  
> 脚本未使用代码混淆，但部分功能（如 buildTileUrl）生成复杂 URL，需关注是否有隐藏数据传输。  
> 位置：buildTileUrl(lat, lng) 函数  
> 建议：确保所有生成的 URL 不含敏感信息。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本修改 Element.prototype.setAttribute，可能影响页面 iframe 的 sandbox 属性，存在 clickjacking/iframe 风险。  
> 位置：Element.prototype.setAttribute 重写  
> 建议：避免全局修改原型链，仅针对特定元素操作。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-works-in-geoguessr-openguessr-worldguessr-freeguessr)*
