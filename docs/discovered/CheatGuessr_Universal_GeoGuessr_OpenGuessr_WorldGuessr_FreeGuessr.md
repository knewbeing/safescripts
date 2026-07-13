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

**风险等级**：🔴 HIGH　　**安全评分**：50/100　　**分析时间**：2026-07-13

> 该脚本存在严重的数据外传风险，主要体现在将地理坐标等信息发送到第三方服务器（nominatim.openstreetmap.org、discord.com），可能导致用户隐私泄露。未发现明显的隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。部分敏感 API（通知）和 iframe 安全策略被修改，存在中低风险。整体安全评级为 HIGH，不建议在敏感环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：nominatim.openstreetmap.org, discord.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 发送地理坐标到 nominatim.openstreetmap.org 进行逆地理编码。  
> 位置：_getAddress() 函数  
> 建议：仅允许可信的第三方 API，明确告知用户数据用途。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 允许连接 discord.com，结合描述“send to discord”功能，可能将用户操作或地理信息发送到 Discord 服务器。  
> 位置：@connect discord.com 及相关功能代码（未完全展示）  
> 建议：确保用户明确知情并同意外发数据，避免敏感信息泄露。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本使用 Notification API 发送通知，需防止滥用骚扰用户。  
> 位置：sendNotification() 函数  
> 建议：确保通知行为可控，用户可关闭。

**🟡 LOW** — 隐私采集  
> 脚本未发现明显的隐私采集（如读取 cookie、localStorage、监听键盘输入、读取表单/剪贴板等）。  
> 位置：全局  
> 建议：继续关注后续代码更新，防止新增隐私采集行为。

**🟡 LOW** — 远程代码执行  
> 脚本未发现 eval、new Function、setTimeout(string) 等远程代码执行风险。  
> 位置：全局  
> 建议：保持禁止动态代码执行的良好实践。

**🟡 LOW** — 代码混淆  
> 脚本未发现明显的代码混淆、base64 解码、字符串数组混淆或高度压缩代码。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

**🟡 LOW** — DOM XSS  
> 脚本未发现 DOM XSS 或将用户输入直接插入 innerHTML/outerHTML。  
> 位置：全局  
> 建议：如后续涉及 DOM 操作，需严格转义用户输入。

**🟡 LOW** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限并实际使用，未发现权限滥用。  
> 位置：@grant  
> 建议：仅申请实际需要的权限。

**🟡 LOW** — 供应链风险  
> 脚本通过 @require 未加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，建议使用官方 CDN 并锁定版本。

**🟡 LOW** — ClickJacking/iframe 风险  
> 脚本在部分平台通过 Proxy 修改 Element.prototype.setAttribute，可能影响 iframe sandbox 属性，存在一定 ClickJacking/iframe 风险。  
> 位置：Element.prototype.setAttribute Proxy  
> 建议：避免破坏页面安全策略，防止潜在安全隐患。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-geoguessr-openguessr-worldguessr-freeguessr)*
