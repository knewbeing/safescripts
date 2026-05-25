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

**风险等级**：⛔ CRITICAL　　**安全评分**：25/100　　**分析时间**：2026-05-25

> 该脚本存在严重的数据外传和隐私采集风险，尤其是自动或手动将用户地理位置、地址等敏感信息发送到 Discord Webhook 和第三方地理解析服务。未检测到远程代码执行、混淆、DOM XSS、供应链风险等问题，但权限申请较宽泛。建议仅在完全信任环境下使用，并确保用户知晓所有数据流向和风险。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：nominatim.openstreetmap.org, discord.com） |
| 隐私采集 | ❌ 检测到（读取地理坐标（lat/lng）, 解析地址信息, 结合用户操作发送到第三方） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 nominatim.openstreetmap.org 发送地理坐标请求，可能包含用户游戏位置数据。  
> 位置：function _getAddress(lat, lng)  
> 建议：仅在用户明确同意时发送请求，并限制数据内容。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 Discord Webhook（用户输入）发送地理坐标、地址、地图截图等敏感信息。  
> 位置：function sendToDiscord(embed)  
> 建议：确保用户知晓数据内容和风险，避免自动发送敏感信息。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取页面中的地理坐标信息（lat/lng），并结合地址解析后外传到第三方。  
> 位置：function getCoordinates()  
> 建议：限制采集范围，避免采集其他敏感数据。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请 GM_xmlhttpRequest 权限并实际使用，存在数据外传风险。  
> 位置：@grant GM_xmlhttpRequest  
> 建议：仅申请必要权限，减少攻击面。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请 @connect discord.com 和 nominatim.openstreetmap.org，允许任意外部通信。  
> 位置：@connect discord.com, @connect nominatim.openstreetmap.org  
> 建议：限制 connect 域名，仅允许必要的 API。

**🟡 LOW** — 一般安全建议  
> 脚本未检测到远程代码执行、混淆、DOM XSS、敏感 API 调用、供应链风险、iframe 风险等问题。  
> 位置：全局  
> 建议：保持代码透明，避免引入高风险操作。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-works-in-geoguessr-openguessr-worldguessr-freeguessr)*
