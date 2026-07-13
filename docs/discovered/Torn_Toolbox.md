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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-07-13

> 该脚本主要与 Torn 官方 API 通信，未发现向第三方服务器发送数据、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。存在部分未使用的高权限声明（GM.xmlHttpRequest/GM_xmlhttpRequest、@connect weav3r.dev），建议最小化权限。整体安全风险较低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：api.torn.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> 脚本声明 @connect weav3r.dev，但代码中未发现实际向该域名发起请求。  
> 位置：元数据 @connect  
> 建议：如无实际用途，建议移除 @connect weav3r.dev 权限。

**🟠 MEDIUM** — 权限滥用  
> @grant 声明了 GM.xmlHttpRequest/GM_xmlhttpRequest，但实际代码未使用，仅用 fetch。  
> 位置：元数据 @grant  
> 建议：建议移除未使用的高权限声明，最小化权限。

**🟡 LOW** — 网络请求  
> 脚本通过 fetch 请求 Torn 官方 API（api.torn.com），未发现向第三方服务器发送用户数据。  
> 位置：AIO.getMarket (fetch https://api.torn.com/torn/)  
> 建议：仅与官方 API 通信，避免向未知第三方域名发送数据。

**🟡 LOW** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string) 等远程代码执行风险。  
> 位置：全局  
> 建议：保持此安全实践，避免动态执行字符串代码。

**🟡 LOW** — 隐私采集  
> 未发现 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板、键盘监听等隐私采集行为。  
> 位置：全局  
> 建议：继续避免采集用户隐私数据。

**🟡 LOW** — 代码混淆  
> 未发现代码混淆、base64 解码、字符串数组映射、unicode 混淆等特征。  
> 位置：全局  
> 建议：保持代码可读性，便于社区审查。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/573645-torn-toolbox)*
