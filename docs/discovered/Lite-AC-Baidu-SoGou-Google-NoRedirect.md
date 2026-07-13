---
title: "优化搜索结果重定向"
---

# 优化搜索结果重定向

`搜索优化`  `去重定向`  `隐私保护`  `广告屏蔽`  `效率提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Lite-AC-Baidu-SoGou-Google-NoRedirect.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**11.0**　　发现时间：**2026-07-06**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本可以自动去除百度、搜狗、谷歌等搜索结果中的跳转链接，让你点击搜索结果时直接访问原始网页，提升访问速度并保护隐私。部分情况下还能去除广告和优化favicon显示。

## 适用网站

- 百度搜索
- 百度知道
- 搜狗搜索
- Bing搜索
- 谷歌搜索

## 使用方法

1. 1. 安装脚本后，打开百度、搜狗、谷歌、Bing等搜索页面。
2. 2. 搜索任意内容，点击结果时会直接跳转到真实网页，无需额外操作。
3. 3. 如遇广告或跳转问题，刷新页面即可。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发起跨域网络请求，用于获取真实网页地址。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：75/100　　**分析时间**：2026-07-13

> 该脚本主要用于去除百度、搜狗等搜索结果的重定向，提升用户体验。仅使用 GM_xmlhttpRequest 向 www.baidu.com 发起 GET 请求以解析真实链接，未发现向第三方服务器或作者服务器上报数据，也未采集用户隐私信息。无远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链或 iframe 风险。整体安全性较高，风险等级为 LOW。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：www.baidu.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用 GM_xmlhttpRequest 仅向 www.baidu.com 发起 GET 请求以解析真实目标链接，未发现向第三方服务器或作者服务器发送用户数据。  
> 位置：resetURL > GM_xmlhttpRequest  
> 建议：确认请求内容仅为公开页面链接，避免携带敏感信息。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 cookie、localStorage、sessionStorage、IndexedDB、表单字段、剪贴板等隐私数据。  
> 位置：全局  
> 建议：无。

**🔴 HIGH** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险。  
> 位置：全局  
> 建议：无。

**🔴 HIGH** — 代码混淆  
> 未发现代码混淆、base64 解码、字符串数组混淆、unicode 混淆或高度压缩单行代码。  
> 位置：全局  
> 建议：无。

**🔴 HIGH** — DOM XSS/注入  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 document.write 或 iframe src 注入。  
> 位置：全局  
> 建议：无。

**🟠 MEDIUM** — 权限滥用  
> @grant 仅申请 GM_xmlhttpRequest，且实际使用 GM_xmlhttpRequest，无权限滥用。  
> 位置：元数据与代码对比  
> 建议：无。

**🟠 MEDIUM** — 敏感 API 调用  
> 未调用 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification 等敏感 API。  
> 位置：全局  
> 建议：无。

**🟠 MEDIUM** — 供应链风险  
> 未使用 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：无。

**🟡 LOW** — ClickJacking/iframe 风险  
> 未发现修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局  
> 建议：无。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/2d93f39fd1dd61c477a147fae583c259cbbc00fd/Lite-AC-Baidu-SoGou-Google-NoRedirect.user.js)*
