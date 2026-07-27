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

**风险等级**：⛔ CRITICAL　　**安全评分**：25/100　　**分析时间**：2026-07-27

> 该脚本存在严重的数据外传和隐私采集风险，尤其是向 discord.com 和 nominatim.openstreetmap.org 发送地理位置数据，以及操作 localStorage 可能影响用户隐私。未检测到远程代码执行、混淆、DOM XSS、供应链风险等问题。建议严格限制数据外传行为，确保用户知情并主动操作，避免自动泄露敏感信息。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（操作 localStorage（Storage.prototype.setItem Proxy）, 可能读取或影响存储的用户数据） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 discord.com 发送地理位置数据（send location to discord），存在用户数据外传风险。  
> 位置：sendToDiscord 功能、GM_xmlhttpRequest 调用  
> 建议：仅允许用户主动触发发送，明确告知用户数据外传行为，并限制发送内容为非敏感信息。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 nominatim.openstreetmap.org 查询地理位置，可能包含用户当前坐标。  
> 位置：_getAddress()、getAddress()  
> 建议：仅在用户主动操作时请求，避免自动频繁发送坐标。

**⛔ CRITICAL** — 数据外传  
> 脚本申请 GM_xmlhttpRequest 权限并声明 @connect discord.com，允许向第三方服务器发送任意数据。  
> 位置：元数据 @grant/@connect  
> 建议：限制发送内容，避免敏感信息泄露。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取并操作 localStorage（Storage.prototype.setItem Proxy），可能影响或访问存储的用户数据。  
> 位置：WORLDGUESSR 分支 Storage.prototype.setItem Proxy  
> 建议：避免读取或修改与用户隐私相关的存储项，确保不泄露敏感信息。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本使用 Notification API 发送通知，可能被滥用。  
> 位置：sendNotification()、requestNotificationPermission()  
> 建议：仅在用户允许和主动操作时使用通知功能。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请 GM_xmlhttpRequest 高权限，但实际用途仅为地理位置查询和发送到 Discord，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，避免过度授权。

**🟡 LOW** — 代码混淆  
> 脚本未混淆，代码结构清晰，无明显混淆特征。  
> 位置：全局代码  
> 建议：无

**🟡 LOW** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 或注入风险，未直接操作 innerHTML/outerHTML 插入用户输入。  
> 位置：全局代码  
> 建议：无

**🟡 LOW** — 远程代码执行  
> 脚本未检测到远程代码执行（未使用 eval/new Function/setTimeout(string) 等）。  
> 位置：全局代码  
> 建议：无

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到 WebSocket/EventSource/iframe 隐藏数据提取等行为。  
> 位置：全局代码  
> 建议：无

**🟡 LOW** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：无

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-geoguessr-openguessr-worldguessr-freeguessr-helper-universal)*
