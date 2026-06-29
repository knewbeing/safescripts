---
title: "Pixiv 增强"
---

# Pixiv 增强

`图片下载`  `广告屏蔽`  `批量操作`  `画师信息`  `评论增强`  `界面优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Pixiv_Plus.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.9.5**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/34153-pixiv-plus) <Badge type="tip" text="GreasyFork" />　　安装量：**398,355**　　评分：👍1297 / 👎8

## 功能介绍

本脚本为 Pixiv 网站提供增强功能，包括屏蔽广告、直接访问热门图片、支持多种搜索方式（如pid、uid、作者），显示原图及尺寸、图片重命名与批量下载（支持原图、GIF、动图帧zip、多图zip），展示画师信息与背景图，自动加载评论，支持作品类型动态标记、去除重定向、单页排序，并提供控制面板自定义功能。

## 适用网站

- Pixiv

## 使用方法

1. 安装脚本后，打开 Pixiv 网站。
2. 页面会自动屏蔽广告并显示增强功能。
3. 通过控制面板选择需要的功能，如图片下载、批量操作等。
4. 可直接搜索图片、画师或作品，自动加载评论。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和操作页面的全局对象，增强与网站的交互能力。 |
| `GM.xmlHttpRequest` | 用于发送网络请求，获取图片等资源。 |
| `GM.setClipboard` | 允许脚本将内容复制到剪贴板，方便用户操作。 |
| `GM.setValue` | 用于存储自定义设置或数据，提升脚本个性化体验。 |
| `GM.getValue` | 用于读取脚本存储的数据，保持用户偏好。 |
| `GM_addStyle` | 允许脚本添加自定义样式，优化页面显示。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取图片等资源（与GM.xmlHttpRequest类似）。 |
| `GM_registerMenuCommand` | 允许脚本在菜单中注册自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 允许脚本移除自定义菜单命令，管理功能入口。 |
| `GM_setClipboard` | 允许脚本将内容复制到剪贴板，方便用户操作（与GM.setClipboard类似）。 |
| `GM_setValue` | 用于存储自定义设置或数据（与GM.setValue类似）。 |
| `GM_getValue` | 用于读取脚本存储的数据（与GM.getValue类似）。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-29

> 该脚本主要功能为 Pixiv 网页增强，未发现数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。所有网络请求均指向 Pixiv 官方 CDN，未见敏感数据外传。@require 加载的第三方库来源可信且为固定版本。存在部分未使用的高权限申请，建议精简。整体安全风险较低，建议定期复查。

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
> 脚本通过 @grant 申请了 GM.xmlHttpRequest/GM_xmlhttpRequest，但实际代码中未发现向第三方服务器发送用户数据或敏感信息的行为。所有网络请求均指向 Pixiv 官方图片 CDN，未见数据外传。  
> 位置：@grant, $.ajax, GM_xmlhttpRequest  
> 建议：保持对网络请求目标的限制，避免未来代码变更导致数据外传。

**⛔ CRITICAL** — 隐私采集  
> 脚本未监听键盘输入、未读取表单字段、未访问剪贴板内容、未访问指纹 API，未见隐私采集行为。  
> 位置：全局  
> 建议：继续保持，不要采集用户隐私数据。

**🔴 HIGH** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string) 等动态代码执行。未见通过 innerHTML/outerHTML 插入外部脚本。@require 加载的库均为 GreasyFork 官方 CDN，且为固定版本。  
> 位置：全局  
> 建议：避免引入不可信的远程代码。

**🔴 HIGH** — 代码混淆  
> 未发现 atob/btoa、字符串数组混淆、unicode 混淆或高度压缩代码。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

**🔴 HIGH** — DOM XSS  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：全局  
> 建议：如需插入用户输入，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> @grant 申请了 unsafeWindow、GM_setClipboard、GM_setValue、GM_getValue、GM_registerMenuCommand 等高权限，但部分权限如 GM_setClipboard、GM_setValue、GM_getValue 在当前代码片段未见实际使用。  
> 位置：@grant  
> 建议：建议仅申请实际使用的权限，减少权限滥用风险。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的第三方库均来自 GreasyFork 官方 CDN，且为固定版本，供应链风险较低。  
> 位置：@require  
> 建议：继续使用可信来源和固定版本。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/34153-pixiv-plus)*
