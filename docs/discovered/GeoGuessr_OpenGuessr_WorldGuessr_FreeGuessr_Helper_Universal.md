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

**风险等级**：🔴 HIGH　　**安全评分**：42/100　　**分析时间**：2026-05-11

> 该脚本存在高风险的数据外传行为，尤其是将用户地理坐标发送到第三方（nominatim.openstreetmap.org 和 discord.com）。虽然未发现代码混淆、远程代码执行或 DOM XSS 风险，但涉及敏感数据的外传和部分权限滥用。建议加强用户知情同意机制，最小化权限申请，并限制敏感数据的自动外传。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（地理坐标（用户在地图上的操作）） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 发送地理坐标到 nominatim.openstreetmap.org 进行逆地理编码。虽然该服务为公开地图 API，但用户的地理坐标被外传到第三方。  
> 位置：_getAddress() 函数  
> 建议：仅在用户明确同意时发送地理坐标，或在隐私政策中明确说明。

**⛔ CRITICAL** — 数据外传  
> 脚本支持“send location to discord”功能，意味着用户的地理坐标可能被发送到 discord.com（如 Webhook），属于敏感数据外传。  
> 位置：功能描述及 @connect discord.com 权限  
> 建议：确保用户知情并同意，避免自动发送敏感信息到第三方。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，并允许连接 discord.com 和 nominatim.openstreetmap.org，具备外传数据能力。  
> 位置：元数据 @grant/@connect  
> 建议：最小化权限申请，仅申请实际需要的域名。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本调用 Notification API 发送通知，可能被滥用骚扰用户。  
> 位置：sendNotification() 函数  
> 建议：仅在用户主动授权后使用通知功能。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-geoguessr-openguessr-worldguessr-freeguessr-helper-universal)*
