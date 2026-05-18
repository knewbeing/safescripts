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

**风险等级**：⛔ CRITICAL　　**安全评分**：25/100　　**分析时间**：2026-05-18

> 该脚本存在严重的数据外传和隐私采集风险。脚本会将用户当前地理坐标通过第三方 API（nominatim.openstreetmap.org）进行逆地理编码，并可通过 Discord Webhook 主动外传地理位置、地址、地图截图等信息。虽然部分操作需用户交互，但一旦配置 Webhook，存在敏感信息泄露风险。未发现远程代码执行、代码混淆、DOM XSS 等高危问题。建议仅在完全信任脚本和 Webhook 配置安全的前提下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：nominatim.openstreetmap.org, discord.com） |
| 隐私采集 | ❌ 检测到（采集地理坐标信息（lat, lng）, 可采集用户自定义 Discord Webhook） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 发送地理坐标到 nominatim.openstreetmap.org 进行逆地理编码。  
> 位置：_getAddress() 函数  
> 建议：仅允许可信第三方 API，避免发送敏感信息。

**⛔ CRITICAL** — 数据外传  
> 脚本允许用户配置 Discord Webhook，并通过 GM_xmlhttpRequest 主动向 discord.com 发送地理坐标、地址、地图截图等信息。  
> 位置：sendToDiscord() 函数  
> 建议：警告用户 Webhook 泄漏风险，避免自动化外传敏感数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取页面上的地理坐标信息，并可将其外传。  
> 位置：getCoordinates()、sendToDiscord()  
> 建议：仅在用户明确同意下采集和外传地理信息。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本使用 Notification API 发送通知。  
> 位置：sendNotification()、requestNotificationPermission()  
> 建议：仅在用户同意下使用通知权限。

**🟡 LOW** — 权限申请  
> 脚本申请了 GM_xmlhttpRequest 权限并实际使用，@grant 权限与代码一致。  
> 位置：元数据与主逻辑  
> 建议：无异常。

**🟡 LOW** — 远程代码执行  
> 未发现代码混淆、eval、动态 script 加载等远程代码执行风险。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆。

**🟡 LOW** — DOM XSS  
> 未发现 DOM XSS、用户输入插入 innerHTML/outerHTML 等注入风险。  
> 位置：全局  
> 建议：保持输入输出安全。

**🟡 LOW** — 敏感 API 调用  
> 未发现 WebSocket/EventSource/Clipboard/摄像头/麦克风/RTCPeerConnection 等敏感 API 调用。  
> 位置：全局  
> 建议：无。

**🟡 LOW** — 供应链风险  
> 未发现 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需依赖第三方库，建议固定版本和来源。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本覆盖了 Element.prototype.setAttribute，可能影响 iframe sandbox 属性，降低 frame 保护。  
> 位置：Element.prototype.setAttribute 重写  
> 建议：避免全局覆盖，限制为必要场景。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572651-cheatguessr-universal-works-in-geoguessr-openguessr-worldguessr-freeguessr)*
