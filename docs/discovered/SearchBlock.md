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

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-07-13

> 该脚本作为库文件，主要通过 GM_xmlhttpRequest 向第三方服务器 xbaidu.ntaow.com 获取 SoGouKey。未发现用户数据、页面内容或隐私信息被采集和外传，也未发现远程代码执行、代码混淆、DOM XSS 等高危行为。主要风险在于主动与第三方服务器通信，存在一定的数据外传风险。建议仅在可信环境下使用，并关注第三方服务器的安全性。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：http://xbaidu.ntaow.com/newcss/sogoukey.php） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 主动向第三方服务器 xbaidu.ntaow.com 发起网络请求，获取数据。虽然当前未携带用户数据，但存在外部通信行为。  
> 位置：GM_xmlhttpRequest 调用  
> 建议：仅允许可信服务器通信，避免发送敏感信息。

**🟠 MEDIUM** — 权限申请  
> 脚本申请了 GM_xmlhttpRequest 权限，并实际使用。未发现权限滥用。  
> 位置：@grant 元数据与实际代码  
> 建议：仅申请必要权限。

**🟡 LOW** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string) 等远程代码执行风险。  
> 位置：全局  
> 建议：保持当前实现，避免动态执行字符串代码。

**🟡 LOW** — 代码混淆  
> 未发现代码混淆、base64 解码、字符串数组混淆等特征。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

**🟡 LOW** — 供应链风险  
> @require 未使用，未发现供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，建议使用官方 CDN 并锁定版本。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/2d93f39fd1dd61c477a147fae583c259cbbc00fd/temp/SearchBlock.user.js)*
