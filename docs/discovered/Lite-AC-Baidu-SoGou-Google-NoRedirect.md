---
title: "优化搜索结果重定向"
---

# 优化搜索结果重定向

`搜索优化`  `去重定向`  `广告屏蔽`  `安全浏览`  `效率提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Lite-AC-Baidu-SoGou-Google-NoRedirect.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**11.0**　　发现时间：**2026-06-08**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本可以自动去除百度、搜狗、谷歌等搜索结果中的重定向链接，让你直接访问真实网页地址，提升访问速度和安全性。部分情况下还能去除广告和优化搜索体验。

## 适用网站

- 百度
- 搜狗
- 谷歌
- 必应

## 使用方法

1. 1. 安装脚本后，打开百度、搜狗、谷歌或必应搜索页面。
2. 2. 搜索任意内容，点击搜索结果时会直接跳转到真实网页，无需额外操作。
3. 3. 若遇到广告或重定向问题，脚本会自动处理，无需手动干预。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于在后台请求真实网页地址，绕过重定向。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-08

> 该脚本主要功能为去除百度、搜狗等搜索结果中的重定向链接，直接访问真实目标地址。代码结构清晰，无混淆，无远程代码执行、DOM XSS、隐私采集等高危行为。唯一的外部网络请求为通过 GM_xmlhttpRequest 向 www.baidu.com 获取真实链接，未携带用户敏感信息。整体安全风险极低，适合日常使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：www.baidu.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 数据外传  
> 脚本使用 GM_xmlhttpRequest 仅向 www.baidu.com 发起 GET 请求以获取真实目标链接，无用户数据、cookie、页面内容等敏感信息被外传。  
> 位置：resetURL() / GM_xmlhttpRequest  
> 建议：确认请求目标仅为百度官方域名，避免未来代码变更导致外传。

**🟡 LOW** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，且仅用于百度重定向解析，未发现权限滥用。  
> 位置：@grant 元数据  
> 建议：无实际风险，但建议仅申请实际需要的权限。

**🟡 LOW** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险。  
> 位置：全局  
> 建议：保持当前实现，避免引入动态代码执行。

**🟡 LOW** — 代码混淆  
> 未发现代码混淆、base64 解码、字符串数组映射或高度压缩代码。  
> 位置：全局  
> 建议：保持代码可读性，便于社区审计。

**🟡 LOW** — DOM XSS  
> 未发现对用户输入、URL 参数直接插入 innerHTML/outerHTML，未发现 DOM XSS 风险。  
> 位置：全局  
> 建议：如后续处理用户输入，需严格转义。

**🟡 LOW** — 隐私采集  
> 未发现对 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段、指纹 API 的访问。  
> 位置：全局  
> 建议：保持当前实现，避免采集用户隐私。

**🟡 LOW** — 供应链风险  
> 未发现 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用官方 CDN 并锁定版本。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/75950f3060eab08874180f6ab428465e2b63afb4/Lite-AC-Baidu-SoGou-Google-NoRedirect.user.js)*
