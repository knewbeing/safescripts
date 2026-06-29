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

**风险等级**：🔴 HIGH　　**安全评分**：35/100　　**分析时间**：2026-06-29

> 该脚本存在高风险，主要因其将地理坐标等用户数据通过 GM_xmlhttpRequest 发送到第三方（nominatim.openstreetmap.org）和 Discord（可能为 Webhook），属于严重的数据外传和隐私泄露风险。脚本未检测到代码混淆、远程代码执行、DOM XSS 等问题，但存在对原生方法的 Proxy 劫持，可能影响页面安全性。建议仅在信任环境下使用，并确保 Discord Webhook 仅为个人控制。

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
> 脚本通过 GM_xmlhttpRequest 发送地理坐标到 nominatim.openstreetmap.org 进行逆地理编码。  
> 位置：_getAddress() 函数  
> 建议：仅允许可信第三方 API，避免发送敏感信息。

**⛔ CRITICAL** — 数据外传  
> 脚本元数据声明 @connect discord.com，且描述中有“send location to discord”，暗示可能将地理位置通过 Webhook 发送到 Discord。  
> 位置：元数据与功能描述  
> 建议：用户需确认 Discord Webhook 仅为个人使用，避免敏感信息泄露。

**🔴 HIGH** — 远程代码执行/页面劫持  
> 脚本通过 Proxy 劫持 Element.prototype.setAttribute、Array.prototype.push、Storage.prototype.setItem、String.prototype.startsWith、fetch 等原生方法，可能影响页面行为。  
> 位置：多处平台适配代码  
> 建议：仅在必要范围内使用 Proxy，防止副作用。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请 GM_xmlhttpRequest 权限，并实际用于外部 API 通信。  
> 位置：元数据与代码  
> 建议：最小化权限申请，确保仅用于必要功能。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本使用 Notification API 发送通知。  
> 位置：sendNotification() 函数  
> 建议：确保通知内容不包含敏感信息，防止骚扰。

**🟡 LOW** — 权限使用  
> 脚本申请 GM_setValue/GM_getValue 权限，实际用于热键和功能开关存储，未见滥用。  
> 位置：元数据与代码  
> 建议：无明显风险，但建议定期复查存储内容。

**🟡 LOW** — 远程代码执行  
> 脚本未检测到 eval、new Function、setTimeout(string) 等直接远程代码执行风险。  
> 位置：全局  
> 建议：保持此安全实践。

**🟡 LOW** — 代码混淆  
> 未检测到代码混淆、base64 解码、字符串数组映射等混淆特征。  
> 位置：全局  
> 建议：保持代码可读性。

**🟡 LOW** — DOM XSS  
> 未检测到 DOM XSS 或用户输入直接插入 innerHTML/outerHTML。  
> 位置：全局  
> 建议：保持此安全实践。

**🟡 LOW** — 供应链风险  
> 未检测到 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需第三方库，建议固定版本和来源。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-geoguessr-openguessr-worldguessr-freeguessr-helper-universal)*
