---
title: "优化搜索结果重定向"
---

# 优化搜索结果重定向

`搜索优化`  `去重定向`  `隐私保护`  `广告屏蔽`  `效率提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Lite-AC-Baidu-SoGou-Google-NoRedirect.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**11.0**　　发现时间：**2026-07-27**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本可以自动去除百度、搜狗、谷歌等搜索结果中的跳转链接，让你直接访问原始网页，提升访问速度和隐私安全。部分情况下还能去除广告和优化搜索体验。

## 适用网站

- 百度
- 搜狗
- 谷歌
- 必应

## 使用方法

1. 1. 安装脚本后，打开百度、搜狗、谷歌或必应搜索页面。
2. 2. 搜索任意内容，点击搜索结果时会直接跳转到真实网页。
3. 3. 无需额外操作，脚本自动生效。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本在后台发起网络请求，用于获取真实网页地址。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：97/100　　**分析时间**：2026-07-27

> 该脚本主要用于去除搜索结果重定向，未发现用户数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。唯一的网络请求为解析真实链接，未携带敏感信息。整体安全性高，风险极低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用 GM_xmlhttpRequest 向 baidu.com 和 sogou.com 发起 GET 请求，但仅用于解析真实目标链接，无用户数据、cookie、页面内容或敏感信息外传。  
> 位置：resetURL() -> GM_xmlhttpRequest  
> 建议：确保请求仅用于解析跳转链接，不携带用户敏感数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本未涉及 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段、指纹 API 等隐私采集行为。  
> 位置：全局  
> 建议：保持现有状态，勿添加隐私采集代码。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML/outerHTML 执行 JS、动态 script 标签加载远程 JS、document.write 插入脚本。  
> 位置：全局  
> 建议：保持现有状态，勿添加远程代码执行相关代码。

**🔴 HIGH** — 代码混淆  
> 脚本未发现代码混淆、base64 解码执行、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，勿混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未使用 document.write 插入不可信内容，未操作 iframe src 为 javascript: 协议。  
> 位置：全局  
> 建议：保持现有状态，勿添加 XSS 注入风险代码。

**🟠 MEDIUM** — 权限滥用  
> 脚本仅申请 GM_xmlhttpRequest 权限，未申请高权限如 GM_openInTab、GM_download，权限申请与实际使用一致。  
> 位置：元数据 @grant  
> 建议：保持最小权限原则。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局  
> 建议：勿添加敏感 API 调用。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，未创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：勿添加 iframe 风险相关代码。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/2d93f39fd1dd61c477a147fae583c259cbbc00fd/Lite-AC-Baidu-SoGou-Google-NoRedirect.user.js)*
