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

**风险等级**：🔴 HIGH　　**安全评分**：50/100　　**分析时间**：2026-06-08

> 该脚本存在严重的数据外传风险：1）会将用户当前地理坐标通过 GM_xmlhttpRequest 发送到 nominatim.openstreetmap.org 进行逆地理编码；2）会将地理坐标、地址、地图图片等信息通过用户配置的 Discord Webhook 发送到 discord.com。虽然这些行为是脚本功能的一部分，但如果 Webhook 地址被恶意设置，可能导致敏感信息泄露。脚本未发现隐私采集、远程代码执行、代码混淆、DOM XSS 等高危问题。总体安全评分为 50/100，风险等级为 HIGH。

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
> 脚本通过 GM_xmlhttpRequest 向 nominatim.openstreetmap.org 发送地理坐标，获取地址信息。  
> 位置：_getAddress() 函数  
> 建议：仅允许可信 API 访问，避免发送敏感用户数据。

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向用户配置的 Discord Webhook 发送地理坐标、地址、地图图片等信息。  
> 位置：sendToDiscord() 函数  
> 建议：警告用户不要填写不受信任的 Webhook，防止敏感信息泄露。

**🟡 LOW** — 隐私采集  
> 脚本监听键盘事件（如 Tab、Q、G、X、V），但未发现将键盘输入内容外传。  
> 位置：热键处理相关代码  
> 建议：继续监控，确保无键盘记录器行为。

**🟡 LOW** — 远程代码执行  
> 脚本未发现 eval、new Function、setTimeout(string) 等远程代码执行风险。  
> 位置：全局  
> 建议：保持代码安全实践。

**🟡 LOW** — 代码混淆  
> 脚本未发现明显的代码混淆、base64 解码或高度压缩代码。  
> 位置：全局  
> 建议：保持代码可读性。

**🟡 LOW** — DOM XSS  
> 脚本未发现 DOM XSS 或将用户输入直接插入 innerHTML/outerHTML。  
> 位置：全局  
> 建议：继续保持安全的 DOM 操作。

**🟡 LOW** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，并实际使用。未发现权限滥用。  
> 位置：@grant 元数据  
> 建议：仅申请实际需要的权限。

**🟡 LOW** — 敏感 API 调用  
> 脚本未使用敏感 API（如 geolocation、摄像头、麦克风、剪贴板等）。  
> 位置：全局  
> 建议：如需使用敏感 API，需明确告知用户。

**🟡 LOW** — 供应链风险  
> 未发现 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，建议使用可信 CDN 并锁定版本。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本修改了 IFRAME 的 sandbox 属性，可能影响页面 frame 保护策略。  
> 位置：Element.prototype.setAttribute 重写  
> 建议：仅在必要时修改，防止 ClickJacking 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-works-in-geoguessr-openguessr-worldguessr-freeguessr)*
