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

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-05-11

> 该脚本存在严重的数据外传和隐私采集风险。它会将用户当前地理坐标通过 GM_xmlhttpRequest 发送到 nominatim.openstreetmap.org 获取地址信息，并可将地理坐标、地址、地图截图等通过 Discord Webhook 外传到 discord.com。虽然未检测到键盘输入内容被外传，但涉及地理位置的敏感信息传输，且用户可配置任意 Discord Webhook，存在较高隐私泄露风险。未发现远程代码执行、代码混淆或 DOM XSS 问题。建议仅在完全信任脚本和 Webhook 接收方时使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：nominatim.openstreetmap.org, discord.com） |
| 隐私采集 | ❌ 检测到（获取地理坐标（lat/lng）并外传） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 nominatim.openstreetmap.org 发送地理坐标，获取地址信息。  
> 位置：_getAddress() 函数  
> 建议：仅允许必要的地理数据请求，避免发送用户敏感信息。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向用户配置的 Discord Webhook（discord.com）发送地理坐标、地址、地图截图等信息。  
> 位置：sendToDiscord() 函数  
> 建议：警告用户此行为可能导致隐私泄露，确保 Webhook 仅为本人所有。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本使用 Notification API 发送通知。  
> 位置：sendNotification() 函数  
> 建议：仅在用户授权后使用通知，避免骚扰。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，并声明 @connect discord.com，允许向 Discord 发送任意数据。  
> 位置：元数据 @grant/@connect  
> 建议：仅申请必要权限，警告用户风险。

**🟡 LOW** — 隐私采集  
> 脚本监听键盘事件（如 Tab、Q、G、X、V），但未检测到键盘输入内容被外传。  
> 位置：热键处理相关代码  
> 建议：确保不采集或外传用户输入内容。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-works-in-geoguessr-openguessr-worldguessr-freeguessr)*
