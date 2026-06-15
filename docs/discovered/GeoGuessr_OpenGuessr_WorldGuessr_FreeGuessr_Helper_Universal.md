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

**风险等级**：⛔ CRITICAL　　**安全评分**：22/100　　**分析时间**：2026-06-15

> 该脚本存在严重的数据外传和隐私采集风险，尤其是地理位置和用户数据被发送到 discord.com 和 nominatim.openstreetmap.org。未发现远程代码执行、混淆、DOM XSS 等高危行为，但权限申请和敏感 API 调用存在中等风险。建议严格限制数据外传、优化权限申请，并加强用户告知与控制。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com, nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（操作 localStorage, 发送地理坐标到第三方） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 discord.com 发送地理位置数据（send location to discord），属于用户数据外传到第三方服务器。  
> 位置：sendToDiscord 功能相关代码（未完整展示，但描述和 @connect 指明）  
> 建议：仅允许用户主动触发数据发送，明确告知用户数据内容和目的，避免自动上报。建议移除或限制敏感数据外传。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 nominatim.openstreetmap.org 查询地理位置，涉及用户坐标数据外传。  
> 位置：_getAddress() 函数  
> 建议：仅在用户明确操作下发送请求，避免自动批量外传。建议在隐私政策中说明用途。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取并操作 localStorage（Storage.prototype.setItem Proxy），可能涉及隐私数据采集。  
> 位置：WORLDGUESSR 分支  
> 建议：仅操作必要的存储项，避免读取或修改用户敏感数据。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请 GM_xmlhttpRequest 高权限，并允许任意外部请求（@connect discord.com, nominatim.openstreetmap.org），存在权限滥用风险。  
> 位置：元数据 @grant/@connect  
> 建议：仅申请实际需要的权限，限制 connect 域名范围。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本调用 Notification API，可能被滥用发送通知。  
> 位置：sendNotification() 函数  
> 建议：仅在用户允许和主动操作下发送通知。

**🟡 LOW** — 一般安全建议  
> 脚本未检测到远程代码执行、代码混淆、DOM XSS、供应链风险等高危行为。  
> 位置：全局代码审查  
> 建议：保持代码透明，避免动态加载和混淆。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-geoguessr-openguessr-worldguessr-freeguessr-helper-universal)*
