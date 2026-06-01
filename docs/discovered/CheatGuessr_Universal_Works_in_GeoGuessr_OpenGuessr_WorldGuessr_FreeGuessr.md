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

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-06-01

> 该脚本存在严重的数据外传风险：会将地理坐标、地址等信息通过 GM_xmlhttpRequest 发送到 nominatim.openstreetmap.org 进行反查，并允许用户配置 Discord Webhook，将地理信息主动推送到 Discord 服务器。若 Webhook 配置为第三方地址，可能导致敏感信息泄露。脚本未发现代码混淆和 DOM XSS 问题，但存在权限滥用、供应链风险和敏感 API 调用等中等风险。总体安全性较低，不建议在含有敏感信息的环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：nominatim.openstreetmap.org, discord.com） |
| 隐私采集 | ❌ 检测到（存储 Discord Webhook URL 到本地, 存储用户热键、功能开关设置） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 nominatim.openstreetmap.org 发送地理坐标，获取地址信息。  
> 位置：_getAddress() 函数  
> 建议：仅允许必要的地理查询，避免发送敏感信息。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向用户配置的 Discord Webhook 发送地理坐标、地址、地图截图等信息。  
> 位置：sendToDiscord() 函数  
> 建议：警告用户不要填写第三方 Webhook，防止敏感信息泄露。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，并允许 @connect 到 discord.com 和 nominatim.openstreetmap.org，存在外传风险。  
> 位置：元数据 @grant/@connect  
> 建议：限制 @connect 域名，最小化权限。

**🟠 MEDIUM** — 供应链风险  
> 脚本未检测到代码混淆，但部分功能依赖用户输入 Discord Webhook，存在供应链风险（如钓鱼 Webhook）。  
> 位置：sendToDiscord() 函数  
> 建议：提醒用户仅使用可信 Webhook。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本通过 Notification API 发送通知，可能被滥用。  
> 位置：sendNotification() 函数  
> 建议：仅在用户明确授权后使用通知。

**🟡 LOW** — 隐私采集  
> 脚本通过 GM_setValue/GM_getValue 存储和读取用户设置，包括 Discord Webhook URL。  
> 位置：全局状态管理  
> 建议：确保存储内容不包含敏感信息。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-works-in-geoguessr-openguessr-worldguessr-freeguessr)*
