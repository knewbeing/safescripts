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

**风险等级**：⛔ CRITICAL　　**安全评分**：42/100　　**分析时间**：2026-06-08

> 该脚本存在严重的数据外传风险，尤其是地理坐标可能被发送到 Discord Webhook 和第三方地理编码服务（nominatim.openstreetmap.org），可能导致用户隐私泄露。未发现明显的隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。脚本权限申请合理但存在一定滥用空间。总体安全风险为 CRITICAL，不建议在敏感环境下使用。

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
> 建议：仅允许可信第三方服务，避免发送敏感用户数据。

**⛔ CRITICAL** — 数据外传  
> 脚本支持将地理坐标通过 Discord Webhook 发送到 discord.com，可能导致用户地理位置外泄。  
> 位置：功能描述和 @connect discord.com  
> 建议：仅允许用户主动触发，明确告知用户数据外传风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限并实际使用，存在向第三方服务器发送数据的能力。  
> 位置：元数据 @grant GM_xmlhttpRequest, 代码多处  
> 建议：最小化权限申请，限制外部通信。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本使用 Notification API 发送通知，可能被滥用。  
> 位置：sendNotification() 函数  
> 建议：确保仅在用户明确授权和交互下使用通知。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-geoguessr-openguessr-worldguessr-freeguessr-helper-universal)*
