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

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-07-06

> 该脚本存在严重的数据外传风险：会将用户地理坐标和地址信息发送到 Discord Webhook（第三方服务器），并向 nominatim.openstreetmap.org 查询地理反向地址。未检测到远程代码执行、代码混淆、DOM XSS、供应链风险等问题。隐私采集行为有限，仅存储用户设置。总体安全评分为 50，风险等级为 CRITICAL。

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
> 脚本通过 GM_xmlhttpRequest 将用户地理坐标和地址信息发送到 Discord Webhook（第三方服务器），存在数据外传风险。  
> 位置：sendToDiscord(embed) 函数  
> 建议：仅允许用户明确同意后发送数据，并警告用户敏感信息可能被泄露。建议限制 webhook 域名为受信任范围。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 nominatim.openstreetmap.org 查询地理反向地址，传递用户坐标信息。  
> 位置：_getAddress(lat, lng) 函数  
> 建议：告知用户地理位置将被发送到第三方服务，避免自动化批量请求。

**🟠 MEDIUM** — 隐私采集  
> 脚本读取并存储用户设置（hotkeys、featureToggles、discordWebhookUrl），但未涉及 cookie、localStorage、sessionStorage、IndexedDB 或表单字段。  
> 位置：GM_getValue / GM_setValue 用法  
> 建议：确保不存储敏感信息（如密码、token）。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本通过 Notification API 发送通知，需用户授权。  
> 位置：sendNotification() 函数  
> 建议：仅在用户同意后使用通知功能。

**🟡 LOW** — 权限滥用  
> 脚本申请 GM_xmlhttpRequest 权限并实际使用，未申请过多高权限，但 @grant GM_setValue/GM_getValue/GM_xmlhttpRequest 均被用到。  
> 位置：元数据 @grant  
> 建议：无多余高权限申请，合理。

**🟡 LOW** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行方式，也未动态加载外部 JS。  
> 位置：全局代码审查  
> 建议：保持无远程代码执行风险。

**🟡 LOW** — 代码混淆  
> 脚本未检测到代码混淆、base64 解码、字符串数组映射或高度压缩代码。  
> 位置：全局代码审查  
> 建议：保持代码可读性。

**🟡 LOW** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 或注入风险，未将用户输入直接插入 innerHTML/outerHTML。  
> 位置：全局代码审查  
> 建议：继续避免直接插入用户输入。

**🟡 LOW** — 供应链风险  
> 脚本未检测到供应链风险，未通过 @require 加载第三方库。  
> 位置：元数据 @require  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — 数据外传  
> 脚本未检测到 WebSocket、EventSource、fetch、navigator.sendBeacon 等其他网络请求方式。  
> 位置：全局代码审查  
> 建议：如需使用，需严格审查数据流向。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到 iframe 隐藏、frame 保护策略修改或 clickjacking 风险。  
> 位置：Element.prototype.setAttribute 重写  
> 建议：继续避免 iframe 滥用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-works-in-geoguessr-openguessr-worldguessr-freeguessr)*
