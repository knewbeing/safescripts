---
title: "CheatGuessr Universal | GeoGuessr | OpenGuessr | WorldGuessr | FreeGuessr"
---

# CheatGuessr Universal | GeoGuessr | OpenGuessr | WorldGuessr | FreeGuessr



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/CheatGuessr_Universal_GeoGuessr_OpenGuessr_WorldGuessr_FreeGuessr.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**9.2**　　发现时间：**2026-05-04**　　来源：[GreasyFork](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr) <Badge type="tip" text="GreasyFork" />　　安装量：**1,858**　　评分：👍2 / 👎1

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

**风险等级**：🔴 HIGH　　**安全评分**：50/100　　**分析时间**：2026-06-01

> 该脚本存在高风险的数据外传行为，主要通过 GM_xmlhttpRequest 将用户游戏数据（如地理坐标、猜测结果等）发送到第三方服务器（nominatim.openstreetmap.org 和 discord.com）。虽然未检测到代码混淆、远程代码执行、DOM XSS 或隐私采集行为，但数据外传风险极高，尤其是自动或未明确告知用户的情况下。建议仅在用户主动操作时发送数据，并在脚本说明中明确告知用户数据流向。

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
> 脚本通过 GM_xmlhttpRequest 发送请求到 nominatim.openstreetmap.org（第三方地理反查 API），可能传递用户操作的地理坐标。  
> 位置：_getAddress() 函数  
> 建议：仅在用户明确操作时发送请求，并在文档中告知用户。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 发送数据到 discord.com（通常为 webhook），用于“send to discord”功能，可能包含用户游戏内坐标、猜测等敏感信息。  
> 位置：sendToDiscord 相关功能（未完全展示，但元数据和描述已表明）  
> 建议：确保用户知情并自愿触发，避免自动上报。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，并声明 @connect discord.com，存在将用户数据外传到第三方的能力。  
> 位置：元数据 @grant/@connect  
> 建议：仅在必要时申请权限，最小化外联域名。

**🟡 LOW** — 权限滥用  
> 脚本申请了 GM_setValue/GM_getValue 权限，但实际仅用于本地存储热键和功能开关，无明显滥用。  
> 位置：元数据 @grant/@实际代码  
> 建议：无。

**🟡 LOW** — 远程代码执行  
> 脚本未检测到 eval、new Function、setTimeout(string) 等远程代码执行风险。  
> 位置：全局  
> 建议：保持此安全实践。

**🟡 LOW** — 代码混淆  
> 脚本未检测到代码混淆、base64 解码、字符串数组映射等混淆特征。  
> 位置：全局  
> 建议：保持代码可读性。

**🟡 LOW** — DOM XSS  
> 脚本未检测到 DOM XSS 风险（未直接插入用户输入到 innerHTML/outerHTML）。  
> 位置：全局  
> 建议：保持此安全实践。

**🟡 LOW** — 供应链风险  
> 脚本未检测到供应链风险（无 @require 第三方库）。  
> 位置：全局  
> 建议：保持此安全实践。

**🟡 LOW** — 数据外传  
> 脚本未检测到 WebSocket/EventSource 用法。  
> 位置：全局  
> 建议：无。

**🟡 LOW** — 敏感 API  
> 脚本未检测到敏感 API（如 geolocation、摄像头、麦克风、剪贴板）调用。  
> 位置：全局  
> 建议：无。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr)*
