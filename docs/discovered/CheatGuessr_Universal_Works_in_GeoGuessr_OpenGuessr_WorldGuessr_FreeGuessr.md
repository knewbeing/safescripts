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

**风险等级**：⛔ CRITICAL　　**安全评分**：42/100　　**分析时间**：2026-06-29

> 该脚本存在严重的数据外传风险：会将用户当前地理坐标通过 Discord Webhook 主动外传到 discord.com，且默认启用。脚本还会访问 nominatim.openstreetmap.org 进行逆地理编码。虽然未检测到代码混淆、远程代码执行或 DOM XSS，但涉及敏感地理信息的外传，属于高危行为。建议仅在完全信任的环境下使用，并警告用户相关风险。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：nominatim.openstreetmap.org, discord.com） |
| 隐私采集 | ❌ 检测到（存储用户热键、功能开关、Discord Webhook 地址） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 发送地理坐标到 nominatim.openstreetmap.org 进行逆地理编码。  
> 位置：_getAddress() 函数  
> 建议：仅允许可信第三方 API，避免发送敏感/用户相关数据。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 发送地理坐标、格式化地址、地图截图等信息到用户配置的 Discord Webhook（discord.com），可能导致用户地理位置外泄。  
> 位置：sendToDiscord() 函数  
> 建议：警告用户风险，避免默认启用，限制敏感信息外传。

**🟠 MEDIUM** — 隐私采集  
> 脚本读取和存储用户自定义热键、功能开关、Discord Webhook 地址等信息到本地存储（GM_setValue/GM_getValue），并允许用户输入 Discord Webhook。  
> 位置：GM_setValue/GM_getValue 调用  
> 建议：敏感信息应加密存储，提示用户风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限并声明 @connect discord.com，允许向 Discord 发送任意数据。  
> 位置：@grant/@connect 元数据  
> 建议：仅申请必要权限，限制外部通信。

**🟠 MEDIUM** — 供应链风险  
> 脚本未检测到通过 @require 加载第三方库，但依赖外部 API（nominatim.openstreetmap.org）。  
> 位置：@require/@connect  
> 建议：确保外部 API 可信，避免供应链风险。

**🟡 LOW** — 代码混淆  
> 脚本未检测到代码混淆，但部分功能如平台适配、热键处理等代码较为复杂。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

**🟡 LOW** — DOM XSS  
> 脚本未检测到 DOM XSS 或直接插入用户输入到 innerHTML/outerHTML。  
> 位置：全局  
> 建议：继续保持安全的 DOM 操作。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-works-in-geoguessr-openguessr-worldguessr-freeguessr)*
