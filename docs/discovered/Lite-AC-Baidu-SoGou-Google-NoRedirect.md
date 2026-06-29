---
title: "优化搜索结果重定向"
---

# 优化搜索结果重定向

`搜索优化`  `去重定向`  `广告屏蔽`  `浏览器增强`  `隐私保护`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Lite-AC-Baidu-SoGou-Google-NoRedirect.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**11.0**　　发现时间：**2026-06-15**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本可以自动去除百度、搜狗、谷歌等搜索结果中的重定向链接，让你直接访问原始网页，提升访问速度和安全性。部分情况下还能去除广告和优化搜索体验。

## 适用网站

- 百度
- 搜狗
- 谷歌
- 必应

## 使用方法

1. 1. 安装脚本后，打开百度、搜狗、谷歌或必应搜索页面。
2. 2. 搜索任意内容，点击搜索结果时会自动跳过重定向，直接访问目标网站。
3. 3. 无需额外操作，脚本会自动生效。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发起网络请求，用于获取真实网页地址。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：97/100　　**分析时间**：2026-06-29

> 该脚本主要通过 GM_xmlhttpRequest 请求百度和搜狗以获取真实跳转链接，未发现向第三方服务器或作者服务器外传用户数据，也未采集隐私信息。无远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链或 iframe 风险。整体安全性高，风险极低。建议持续关注 GM_xmlhttpRequest 的目标域名，防止未来代码变更导致外传。适合普通用户使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：www.baidu.com, sogou.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 使用 GM_xmlhttpRequest 访问 www.baidu.com 和 sogou.com，目的是获取真实跳转链接，未发现向第三方服务器或作者服务器发送用户数据。  
> 位置：resetURL -> GM_xmlhttpRequest  
> 建议：确认请求仅限于目标搜索引擎，避免未来代码变更导致外传。

**⛔ CRITICAL** — 隐私采集  
> 未发现对 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段、键盘输入等隐私数据的读取。  
> 位置：全局  
> 建议：保持现状，勿添加隐私采集逻辑。

**🔴 HIGH** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险，也未动态加载外部脚本。  
> 位置：全局  
> 建议：保持现状，勿引入动态代码执行逻辑。

**🔴 HIGH** — 代码混淆  
> 未发现代码混淆、base64 解码、字符串数组混淆、unicode 混淆或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审查。

**🔴 HIGH** — DOM XSS / 注入  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未见 document.write 注入，未见 iframe src 操作。  
> 位置：全局  
> 建议：保持现状，勿引入 XSS 风险。

**🟠 MEDIUM** — 权限滥用  
> 仅申请了 GM_xmlhttpRequest 权限，未见权限滥用或未使用高权限。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 未调用 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API 等敏感接口。  
> 位置：全局  
> 建议：勿添加敏感 API 调用。

**🟠 MEDIUM** — 供应链风险  
> 未使用 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需第三方库，固定版本并使用可信源。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未见修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局  
> 建议：勿引入 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/75950f3060eab08874180f6ab428465e2b63afb4/Lite-AC-Baidu-SoGou-Google-NoRedirect.user.js)*
