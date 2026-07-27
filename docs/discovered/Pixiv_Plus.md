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

**风险等级**：🟡 LOW　　**安全评分**：100/100　　**分析时间**：2026-07-27

> Pixiv Plus 用户脚本整体安全性较高，未发现数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用等高风险行为。仅存在部分权限冗余，建议精简权限申请。所有第三方依赖均为官方 CDN 且固定版本，供应链风险较低。整体风险等级为 LOW，安全评分为 100。

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
> 脚本申请了 GM.xmlHttpRequest 和 GM_xmlhttpRequest 权限，但实际代码中未发现向第三方服务器发送用户数据、页面内容或 Cookie 的行为。所有网络请求均为 Pixiv 官方域名或本地接口。  
> 位置：元数据与主代码  
> 建议：保持仅连接 Pixiv 官方域名，避免向非官方域名发送用户数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本未监听键盘输入、未读取 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板内容，也未访问浏览器指纹相关 API。仅通过页面接口获取用户信息和作品信息。  
> 位置：主代码  
> 建议：继续避免采集用户隐私数据，确保仅处理公开页面信息。

**🔴 HIGH** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险。未通过 innerHTML/outerHTML 插入外部脚本或动态加载远程 JS。  
> 位置：主代码  
> 建议：保持安全的代码执行方式，避免动态执行字符串代码。

**🔴 HIGH** — 代码混淆  
> 未发现代码混淆、base64 解码执行、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：主代码  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未通过 document.write() 插入不可信内容，未操作 iframe src 为 javascript: 协议。  
> 位置：主代码  
> 建议：继续避免 DOM XSS 风险，确保所有插入内容经过安全处理。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 unsafeWindow、GM.xmlHttpRequest、GM.setClipboard、GM.setValue、GM.getValue、GM_addStyle、GM_xmlhttpRequest、GM_registerMenuCommand、GM_unregisterMenuCommand 等权限，但部分权限如 GM.setClipboard、GM.setValue、GM.getValue、GM_registerMenuCommand 并未在主代码中实际使用，存在权限冗余。  
> 位置：元数据  
> 建议：仅申请实际需要的权限，减少权限滥用风险。

**🟠 MEDIUM** — 敏感 API 调用  
> 未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：主代码  
> 建议：继续避免敏感 API 调用，保障用户安全。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的第三方库均来自 greasyfork 官方 CDN，且指定了具体版本号，供应链风险较低。  
> 位置：元数据  
> 建议：继续固定版本哈希，避免加载可变 URL。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未发现修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：主代码  
> 建议：继续避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/34153-pixiv-plus)*
