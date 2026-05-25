---
title: "有道取词翻译库文件"
---

# 有道取词翻译库文件

`翻译`  `取词`  `有道`  `脚本库`  `辅助工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/SearchBlock.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.8**　　发现时间：**2026-05-18**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本是一个库文件，提供有道取词和翻译的基础功能，不能单独使用。它用于配合其他脚本，实现网页上的取词和翻译操作。用户无需直接操作此脚本。

## 适用网站

- 所有网站

## 使用方法

1. 无需单独安装或操作此脚本。
2. 请配合主脚本或相关取词翻译脚本一起使用。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本在后台发送网络请求，用于获取翻译所需的密钥。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：42/100　　**分析时间**：2026-05-25

> 该脚本存在严重的数据外传风险，向第三方服务器发起网络请求，可能泄露用户隐私。未检测到隐私采集、代码混淆、DOM XSS、远程代码执行等高风险行为，但存在权限滥用和供应链风险。建议谨慎使用，并限制网络请求目标。

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
> 脚本通过 GM_xmlhttpRequest 向第三方服务器 xbaidu.ntaow.com 发起 GET 请求，可能泄露用户访问页面的 Referer 信息。  
> 位置：GM_xmlhttpRequest 调用  
> 建议：仅允许请求可信域名，避免请求第三方服务器，或明确告知用户数据传输风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，并实际使用该权限进行网络请求。  
> 位置：@grant GM_xmlhttpRequest  
> 建议：确认该权限为必要且安全使用，避免滥用。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @connect 指定了 xbaidu.ntaow.com，允许所有页面向该域名发起请求，存在供应链风险。  
> 位置：@connect xbaidu.ntaow.com  
> 建议：仅允许必要的可信域名，避免供应链污染。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/75950f3060eab08874180f6ab428465e2b63afb4/temp/SearchBlock.user.js)*
