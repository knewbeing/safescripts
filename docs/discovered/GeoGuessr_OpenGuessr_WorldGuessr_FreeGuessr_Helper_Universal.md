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

**风险等级**：⛔ CRITICAL　　**安全评分**：42/100　　**分析时间**：2026-04-27

> 该脚本存在严重的数据外传风险，尤其是地理位置数据被发送到 discord.com 和 nominatim.openstreetmap.org。虽然未检测到远程代码执行、混淆、XSS 等高危行为，但隐私采集和权限滥用问题依然存在。建议加强用户告知、限制数据外传、精简权限申请。当前安全评分为 42，风险等级为 CRITICAL，不建议在敏感环境下使用。

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
> 脚本通过 GM_xmlhttpRequest 向 discord.com 发送地理位置数据（send location to discord），存在用户数据外传至第三方服务器的风险。  
> 位置：功能描述及 GM_xmlhttpRequest 使用  
> 建议：仅允许用户主动发送数据，明确告知用户数据外传行为，并限制数据内容。避免自动或隐蔽发送用户敏感信息。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 nominatim.openstreetmap.org 查询地理位置，涉及用户坐标数据外传。  
> 位置：getAddress/_getAddress 函数  
> 建议：仅在用户明确操作时发送请求，避免自动采集和外传用户坐标。

**🟠 MEDIUM** — 隐私采集  
> 脚本读取并操作 localStorage（Storage.prototype.setItem Proxy），但未检测到敏感数据采集行为。  
> 位置：WORLDGUESSR 分支  
> 建议：避免读取或操作存储中包含敏感信息的数据，确保不采集用户隐私。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请 GM_xmlhttpRequest 高权限，并声明 @connect discord.com，存在权限滥用风险。  
> 位置：元数据 @grant/@connect  
> 建议：仅申请实际需要的权限，避免高权限滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本调用 Notification API，可能被滥用发送通知。  
> 位置：sendNotification/requestNotificationPermission  
> 建议：仅在用户明确授权后使用通知功能，避免骚扰。

**🟡 LOW** — 常规安全检查  
> 脚本未检测到远程代码执行、代码混淆、DOM XSS、供应链风险、WebSocket、iframe 风险等高危行为。  
> 位置：整体代码审查  
> 建议：保持代码透明，避免引入远程脚本和混淆代码。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-geoguessr-openguessr-worldguessr-freeguessr-helper-universal)*
