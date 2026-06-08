---
title: "AC-有道取词+翻译库文件"
---

# AC-有道取词+翻译库文件

`翻译`  `取词`  `辅助工具`  `库文件`  `有道`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/SearchBlock.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.8**　　发现时间：**2026-06-08**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本是一个库文件，主要用于获取有道取词和翻译相关的密钥信息，不能直接使用。它为其他脚本提供必要的数据支持，帮助实现取词和翻译功能。

## 适用网站

- 所有网站

## 使用方法

1. 安装后无需操作，作为其他取词或翻译脚本的依赖库。
2. 请勿单独运行，需配合主脚本使用。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送跨域网络请求，获取外部数据。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：75/100　　**分析时间**：2026-06-08

> 该脚本作为库文件，核心行为是通过 GM_xmlhttpRequest 请求第三方服务器 xbaidu.ntaow.com 获取 SoGouKey。虽然未直接收集用户隐私数据，但存在向第三方服务器发起请求的行为，存在数据外传风险。未发现代码混淆、远程代码执行、隐私采集或供应链风险。建议明确请求用途，确保不会外传敏感信息。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：xbaidu.ntaow.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向第三方服务器 xbaidu.ntaow.com 发起网络请求，可能外传用户 Cookie 或页面信息。  
> 位置：GM_xmlhttpRequest 调用  
> 建议：仅允许请求可信服务器，避免发送敏感信息，或在代码中明确说明用途。

**🟡 LOW** — 权限申请  
> @grant 仅申请了 GM_xmlhttpRequest，未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：无风险。

**🟡 LOW** — 远程代码执行/混淆  
> 未发现代码混淆、eval、远程代码执行等高危操作。  
> 位置：全局  
> 建议：保持代码可读性，避免后续引入高危操作。

**🟡 LOW** — 供应链风险  
> @require 未使用，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用官方 CDN 并锁定版本。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/75950f3060eab08874180f6ab428465e2b63afb4/temp/SearchBlock.user.js)*
