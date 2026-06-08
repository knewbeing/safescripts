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

**风险等级**：🟡 LOW　　**安全评分**：97/100　　**分析时间**：2026-06-08

> 该脚本整体安全，未发现数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 滥用或供应链风险。仅与 Torn 官方 API 通信，未发现向第三方服务器发送用户数据。建议移除未使用的 @connect weav3r.dev 权限。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：api.torn.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟡 LOW** — Network request  
> 脚本通过 fetch 请求 Torn 官方 API（api.torn.com），未发现向第三方服务器发送用户数据。  
> 位置：AIO.getMarket (fetch https://api.torn.com/torn/)  
> 建议：仅与官方 API 通信，避免向未知第三方域名发送数据。

**🟡 LOW** — Permission  
> 脚本元数据声明 @connect weav3r.dev，但代码中未发现实际对 weav3r.dev 的请求。  
> 位置：metadata / code  
> 建议：如未使用第三方域名建议移除 @connect weav3r.dev，减少权限暴露。

**🟡 LOW** — Code execution  
> 未发现 eval、new Function、setTimeout(string) 等远程代码执行风险。  
> 位置：全局  
> 建议：保持此安全实践，避免动态执行字符串代码。

**🟡 LOW** — Privacy  
> 未发现 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板、键盘监听等隐私采集行为。  
> 位置：全局  
> 建议：继续避免采集用户隐私数据。

**🟡 LOW** — Obfuscation  
> 未发现代码混淆、base64 解码、字符串数组映射、unicode 混淆等特征。  
> 位置：全局  
> 建议：保持代码可读性，便于社区审查。

**🟡 LOW** — DOM XSS  
> 未发现 DOM XSS 风险，未将用户输入直接插入 innerHTML/outerHTML。  
> 位置：全局  
> 建议：如后续涉及用户输入，需严格转义。

**🟡 LOW** — Permission  
> @grant 仅申请了实际使用的 GM_* API，无权限滥用。  
> 位置：metadata  
> 建议：仅申请所需权限，避免过度授权。

**🟡 LOW** — Supply chain  
> 未发现 @require 加载第三方库，无供应链风险。  
> 位置：metadata  
> 建议：如需第三方库，建议固定版本并使用可信 CDN。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/573645-torn-toolbox)*
