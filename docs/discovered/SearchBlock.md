---
title: "AC-有道取词+翻译-库文件"
---

# AC-有道取词+翻译-库文件

`翻译`  `取词`  `辅助工具`  `库文件`  `有道`  `脚本依赖`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/SearchBlock.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.8**　　发现时间：**2026-06-01**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本是一个库文件，主要用于获取有道取词和翻译相关的密钥信息，不能单独使用。它为其他脚本提供必要的数据支持，帮助实现取词和翻译功能。

## 适用网站

- 所有网站

## 使用方法

1. 本脚本不能直接使用。
2. 需配合其他取词或翻译脚本一起安装。
3. 安装后无需操作，其他脚本会自动调用其功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送跨域网络请求，用于获取翻译密钥等数据。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：75/100　　**分析时间**：2026-06-01

> 该脚本作为库文件，主要通过 GM_xmlhttpRequest 请求第三方服务器获取密钥。未发现隐私采集、远程代码执行、代码混淆、DOM XSS 等高危行为。但存在向第三方服务器发起请求的行为，存在一定数据外传和追踪风险。建议仅在可信环境下使用。

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
> 脚本通过 GM_xmlhttpRequest 向第三方服务器 xbaidu.ntaow.com 发起网络请求，可能导致用户数据外传风险。虽然当前请求未携带页面内容或用户数据，但第三方服务器可追踪请求行为。  
> 位置：GM_xmlhttpRequest 调用  
> 建议：仅允许可信服务器通信，避免向第三方服务器发送敏感信息。

**🟡 LOW** — 权限申请  
> @grant 仅申请了 GM_xmlhttpRequest，未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：无须修改。

**🟡 LOW** — 供应链风险  
> @require 未使用，未发现供应链风险。  
> 位置：元数据 @require  
> 建议：无须修改。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/75950f3060eab08874180f6ab428465e2b63afb4/temp/SearchBlock.user.js)*
