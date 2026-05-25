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

**风险等级**：⛔ CRITICAL　　**安全评分**：34/100　　**分析时间**：2026-05-25

> 该脚本存在严重的数据外传风险，尤其是向 discord.com 和 nominatim.openstreetmap.org 发送用户地理位置数据。部分功能涉及敏感 API 调用和权限滥用，且在部分平台修改 iframe sandbox 属性，存在低级别 ClickJacking 风险。未发现代码混淆、远程代码执行或 DOM XSS 注入问题。整体安全风险为 CRITICAL，不建议在敏感环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（localStorage 操作, 地理坐标采集） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 discord.com 发送地理位置数据（send location to discord），可能包含用户行为、坐标等敏感信息，属于数据外传。  
> 位置：sendToDiscord 功能相关代码（未完整展示，但描述和 @connect 指明用途）  
> 建议：仅允许用户主动触发发送，明确提示用户数据将被外传；避免自动上报；建议用户自行配置 webhook，避免硬编码。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 nominatim.openstreetmap.org 查询地理位置反查，传递用户坐标数据。  
> 位置：_getAddress() 函数  
> 建议：仅在用户主动操作时调用，避免自动批量查询；提示用户数据将被发送至第三方。

**🟠 MEDIUM** — 隐私采集  
> 脚本读取并操作 localStorage（Storage.prototype.setItem Proxy），但未发现敏感数据采集或外传行为。  
> 位置：WORLDGUESSR 分支  
> 建议：确保不采集或外传用户敏感信息。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请 GM_xmlhttpRequest 高权限，并允许连接 discord.com（第三方），存在权限滥用风险。  
> 位置：元数据 @grant/@connect  
> 建议：仅申请实际需要的权限，避免过度授权。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本调用 Notification API，可能被滥用发送通知。  
> 位置：sendNotification() 函数  
> 建议：仅在用户明确授权和操作下使用通知功能。

**🟠 MEDIUM** — 供应链风险  
> 脚本未固定第三方服务版本（如 nominatim.openstreetmap.org），但未加载第三方 JS，供应链风险较低。  
> 位置：@connect nominatim.openstreetmap.org  
> 建议：如需加载第三方库，建议固定版本哈希。

**🟡 LOW** — ClickJacking/iframe 风险  
> 脚本在部分平台修改 Element.prototype.setAttribute，可能影响 iframe sandbox 属性，存在 ClickJacking/iframe 风险。  
> 位置：setAttribute Proxy（非 geoguessr 平台）  
> 建议：避免破坏 iframe sandbox 保护，确保页面安全。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-geoguessr-openguessr-worldguessr-freeguessr-helper-universal)*
