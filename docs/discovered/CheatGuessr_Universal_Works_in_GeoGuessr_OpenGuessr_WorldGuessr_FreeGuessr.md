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

**风险等级**：⛔ CRITICAL　　**安全评分**：42/100　　**分析时间**：2026-07-13

> 该脚本存在严重的数据外传风险：会将用户当前地理坐标、地址等信息通过 Discord Webhook 主动外传到第三方服务器，并调用外部地理反查服务（nominatim.openstreetmap.org）。此外，脚本会存储用户的 Discord Webhook URL 等设置。未发现代码混淆、远程代码执行或 DOM XSS 风险。建议仅在充分理解风险的前提下使用，并避免将敏感信息外传到不受信任的服务器。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：nominatim.openstreetmap.org, discord.com） |
| 隐私采集 | ❌ 检测到（存储 Discord Webhook URL、热键、功能开关等用户设置） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 nominatim.openstreetmap.org 发送地理坐标，获取地址信息。  
> 位置：_getAddress() 函数  
> 建议：仅允许必要的地理数据外传，明确告知用户。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向用户自定义的 Discord Webhook 发送地理坐标、地址、地图截图等信息。  
> 位置：sendToDiscord() 函数  
> 建议：警告用户敏感数据外传风险，避免将个人信息发送到第三方。

**🟠 MEDIUM** — 隐私采集  
> 脚本读取和存储用户设置（如 Discord Webhook URL、热键、功能开关）到本地存储。  
> 位置：GM_setValue / GM_getValue 多处  
> 建议：确保仅存储必要的非敏感信息。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，并声明 @connect discord.com，允许任意 Discord Webhook 数据外传。  
> 位置：@grant/@connect 元数据  
> 建议：仅申请必要权限，限制外联域名。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本使用 Notification API 发送通知。  
> 位置：sendNotification() 函数  
> 建议：仅在用户明确授权后使用通知。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-works-in-geoguessr-openguessr-worldguessr-freeguessr)*
