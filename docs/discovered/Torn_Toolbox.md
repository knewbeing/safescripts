---
title: "Torn Toolbox"
---

# Torn Toolbox



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Torn_Toolbox.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.0**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/573645-torn-toolbox) <Badge type="tip" text="GreasyFork" />　　安装量：**141**　　评分：👍0 / 👎0

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

**风险等级**：⛔ CRITICAL　　**安全评分**：17/100　　**分析时间**：2026-05-25

> 该脚本存在数据外传和隐私采集的 CRITICAL 风险，主要体现在 API Key 的存储和向官方及第三方服务器发起请求。未发现远程代码执行、代码混淆、DOM XSS 等高风险行为。建议移除未使用的高权限申请，并对 API Key 做本地加密存储。整体风险等级为 CRITICAL，安全评分为 17。请谨慎使用。若后续代码有向 weav3r.dev 发送用户数据行为，风险将进一步提升。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：api.torn.com, weav3r.dev） |
| 隐私采集 | ❌ 检测到（存储和读取用户 API Key） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 fetch 向 api.torn.com 发起请求，携带用户 API Key，属于用户数据外传行为。虽然目标为官方 API，但涉及敏感数据。  
> 位置：AIO.getMarket() 方法  
> 建议：确保 API Key 仅用于官方 Torn API，避免泄露给第三方。建议对 API Key 做本地加密存储。

**⛔ CRITICAL** — 数据外传  
> 脚本元数据 @connect weav3r.dev，可能存在后续 GM_xmlhttpRequest 向 weav3r.dev 发起请求的风险（如 Bazaar 数据、统计等）。  
> 位置：元数据 @connect weav3r.dev  
> 建议：检查所有向 weav3r.dev 的请求，确认不携带用户敏感信息或 Cookie。建议明确数据类型和用途。

**⛔ CRITICAL** — 隐私采集  
> 脚本存储和读取 API Key，属于隐私采集行为。虽然仅用于 Torn API，但存储敏感信息。  
> 位置：AIO.getApiKey()、AIO.set('apiKey', ...)  
> 建议：建议对 API Key 做本地加密存储，并在 UI 中明确告知用户用途。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请 GM.xmlHttpRequest 和 GM_xmlhttpRequest 高权限，但实际代码中仅使用 fetch，存在权限滥用风险。  
> 位置：元数据 @grant GM.xmlHttpRequest, GM_xmlHttpRequest  
> 建议：移除未使用的高权限申请，减少攻击面。

**🟡 LOW** — 远程代码执行  
> 脚本通过 fetch 动态请求 Torn API，未发现远程代码执行、eval、innerHTML 注入等高风险操作。  
> 位置：全局代码审查  
> 建议：保持代码安全，避免后续引入 eval 或动态脚本加载。

**🟡 LOW** — 代码混淆  
> 未发现代码混淆、base64 解码、字符串映射等混淆特征。  
> 位置：全局代码审查  
> 建议：保持代码可读性，便于社区审查。

**🟡 LOW** — DOM XSS  
> 未发现 DOM XSS、用户输入直接插入 innerHTML/outerHTML 的风险。  
> 位置：AIO.showWarning() 等 UI 相关代码  
> 建议：继续保持安全的 DOM 操作，避免后续引入不可信内容。

**🟡 LOW** — 敏感 API 调用  
> 未发现敏感 API 调用（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等）。  
> 位置：全局代码审查  
> 建议：如需调用敏感 API，需征得用户明确同意。

**🟡 LOW** — 供应链风险  
> 未发现 @require 加载第三方库，供应链风险较低。  
> 位置：元数据 @require 缺失  
> 建议：如需引入第三方库，建议固定版本哈希并使用官方 CDN。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/573645-torn-toolbox)*
