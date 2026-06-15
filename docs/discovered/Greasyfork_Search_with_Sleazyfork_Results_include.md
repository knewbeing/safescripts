---
title: "大人的Greasyfork"
---

# 大人的Greasyfork

`脚本搜索`  `成人内容`  `Greasyfork`  `Sleazyfork`  `增强功能`  `评分展示`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Greasyfork_Search_with_Sleazyfork_Results_include.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.6.6**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/23840-greasyfork-search-with-sleazyfork-results-include) <Badge type="tip" text="GreasyFork" />　　安装量：**906,115**　　评分：👍2747 / 👎1

## 功能介绍

在Greasyfork搜索时，自动显示Sleazyfork上的成人脚本结果，并为所有脚本添加评分和版本号。如果访问匿名不可用的脚本，会自动跳转到Sleazyfork对应页面。

## 适用网站

- Greasyfork
- Sleazyfork

## 使用方法

1. 安装脚本后，访问Greasyfork或Sleazyfork网站。
2. 在Greasyfork搜索脚本时，自动显示Sleazyfork的成人脚本结果。
3. 查看脚本列表时会显示评分和版本号。
4. 访问匿名不可用脚本时会自动跳转到Sleazyfork页面。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本跨域请求数据，用于获取Sleazyfork和Greasyfork的搜索结果。 |
| `GM_setValue` | 保存脚本设置或数据到本地。 |
| `GM_getValue` | 读取本地保存的脚本设置或数据。 |
| `GM_registerMenuCommand` | 在浏览器菜单中添加自定义操作按钮。 |
| `GM_notification` | 在浏览器中弹出通知提醒用户。 |
| `GM.xmlHttpRequest` | 允许脚本跨域请求数据（新版API）。 |
| `GM.setValue` | 保存脚本设置或数据到本地（新版API）。 |
| `GM.getValue` | 读取本地保存的脚本设置或数据（新版API）。 |
| `GM.registerMenuCommand` | 在浏览器菜单中添加自定义操作按钮（新版API）。 |
| `GM.notification` | 在浏览器中弹出通知提醒用户（新版API）。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：59/100　　**分析时间**：2026-06-15

> 脚本主要用于合并 greasyfork 和 sleazyfork 的搜索结果，未发现向第三方服务器发送敏感数据，也未发现恶意隐私采集、远程代码执行或代码混淆。存在一定的权限申请冗余和通过 innerHTML 插入外部 HTML 的风险，但内容来源可信。整体风险为中等，建议持续关注权限申请和 HTML 注入方式。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：greasyfork.org, sleazyfork.org） |
| 隐私采集 | ❌ 检测到（localStorage, GM_setValue, GM_getValue） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用 GM_xmlhttpRequest 向 greasyfork.org 和 sleazyfork.org 发起 GET 请求，目的是抓取搜索结果并合并显示。未发现向第三方域名发送用户数据或页面内容。  
> 位置：GM_xmlhttpRequest 调用  
> 建议：确保仅请求官方域名，避免携带敏感用户数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取和写入 localStorage 以及 GM_setValue/GM_getValue，用于存储脚本配置。未发现读取 cookie、sessionStorage、IndexedDB、表单字段或剪贴板内容。  
> 位置：storage.getItem/setItem  
> 建议：仅存储必要的非敏感配置数据，避免存储敏感信息。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本通过 innerHTML 插入来自 greasyfork/sleazyfork 的 HTML，但未直接插入用户输入或 URL 参数，且内容来源可信。  
> 位置：doc.documentElement.innerHTML = result.responseText  
> 建议：如后续插入用户输入，需严格转义。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行方式。  
> 位置：全局代码检查  
> 建议：保持禁止远程代码执行。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_notification、GM_registerMenuCommand 等权限，但实际代码仅有限使用，未发现滥用。  
> 位置：元数据 @grant  
> 建议：建议只申请实际需要的权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未使用 WebSocket、EventSource、navigator.sendBeacon 等实时数据传输方式。  
> 位置：全局代码检查  
> 建议：如需使用，需严格限制目标和数据内容。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，也未动态加载外部 JS。  
> 位置：元数据检查  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/23840-greasyfork-search-with-sleazyfork-results-include)*
