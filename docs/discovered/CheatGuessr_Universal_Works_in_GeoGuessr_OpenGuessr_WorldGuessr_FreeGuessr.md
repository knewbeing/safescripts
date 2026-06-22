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

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-06-22

> 该脚本存在严重的数据外传和隐私收集风险。它会将用户当前的地理坐标和逆地理编码后的地址通过 Discord Webhook 主动外传到 discord.com，并将坐标发送到 nominatim.openstreetmap.org 进行地址解析。虽然部分功能需用户主动触发，但依然属于高风险行为。未发现远程代码执行、代码混淆或 DOM XSS 风险。建议仅在完全信任脚本作者和明确知情的情况下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com (via Discord Webhook), nominatim.openstreetmap.org） |
| 隐私采集 | ❌ 检测到（收集地理坐标（lat, lng）并外传） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向用户自定义的 Discord Webhook（discord.com）发送地理坐标、地址等信息，属于用户数据外传。  
> 位置：sendToDiscord() 函数  
> 建议：仅允许本地存储或用户明确同意后外传，或移除该功能。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 nominatim.openstreetmap.org 发送地理坐标，获取地址信息。虽然为地图逆地理编码服务，但属于第三方数据外传。  
> 位置：_getAddress() 函数  
> 建议：提示用户并获得同意后再发送，或允许用户自定义服务端点。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，并实际使用于外部数据传输。  
> 位置：@grant GM_xmlhttpRequest, sendToDiscord, _getAddress  
> 建议：仅在确有必要时申请高权限，并告知用户用途。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 @connect discord.com 和 nominatim.openstreetmap.org，允许任意向这些域名发起跨域请求。  
> 位置：@connect 元数据  
> 建议：仅在确有必要时申请，且应限制为最小权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-works-in-geoguessr-openguessr-worldguessr-freeguessr)*
