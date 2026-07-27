---
title: "AC-有道取词+翻译库文件"
---

# AC-有道取词+翻译库文件

`翻译`  `取词`  `辅助库`  `有道`  `搜狗API`  `脚本开发`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/SearchBlock.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.8**　　发现时间：**2026-07-06**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本是有道取词和翻译功能的库文件，不能直接使用。它主要用于为其他脚本提供搜狗API的密钥，支持取词和翻译相关操作。

## 适用网站

- 所有网站

## 使用方法

1. 此脚本为库文件，需与其他取词或翻译脚本配合使用。
2. 安装后无需操作，其他脚本会自动调用其功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送网络请求，获取搜狗API密钥等数据。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：42/100　　**分析时间**：2026-07-27

> 该脚本存在严重的数据外传风险，向第三方服务器发起网络请求，且存在供应链风险。未检测到隐私采集、代码混淆或 DOM XSS。建议限制网络请求目标并加强供应链安全。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：http://xbaidu.ntaow.com/newcss/sogoukey.php） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向第三方服务器 xbaidu.ntaow.com 发起 GET 请求，可能泄露用户访问页面的相关信息。  
> 位置：GM_xmlhttpRequest 调用  
> 建议：仅允许请求可信域名，避免请求第三方服务器，或明确说明用途并限制数据传输内容。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，并实际使用该权限进行网络请求。  
> 位置：@grant GM_xmlhttpRequest  
> 建议：确保仅申请和使用必要权限，避免权限滥用。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @connect 指定了 xbaidu.ntaow.com，存在供应链风险，因该域名非官方 CDN。  
> 位置：@connect xbaidu.ntaow.com  
> 建议：建议仅连接官方、可信的第三方服务，避免供应链污染。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/2d93f39fd1dd61c477a147fae583c259cbbc00fd/temp/SearchBlock.user.js)*
