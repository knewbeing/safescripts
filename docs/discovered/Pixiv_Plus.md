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

**风险等级**：🟡 LOW　　**安全评分**：100/100　　**分析时间**：2026-05-25

> Pixiv Plus 用户脚本未发现数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用等高风险行为。所有网络请求均指向 Pixiv 官方 CDN，@require 第三方库来源可信且版本固定。存在部分权限冗余，建议精简 @grant 权限。整体安全风险极低，适合公开使用。

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
> 脚本使用 GM.xmlHttpRequest 和 GM_xmlhttpRequest，但仅允许连接 Pixiv 官方图片 CDN（i.pximg.net、i-f.pximg.net、i-cf.pximg.net），未发现向第三方服务器发送用户数据或页面内容。  
> 位置：元数据 @connect 和代码网络请求部分  
> 建议：保持仅连接官方 CDN，避免添加第三方数据上报。

**⛔ CRITICAL** — 隐私采集  
> 脚本未监听键盘输入、未读取剪贴板内容、未访问敏感隐私 API，仅通过 Pixiv 官方接口获取用户和作品信息。  
> 位置：代码 userApi/illustApi 及事件监听部分  
> 建议：继续避免采集用户敏感信息，勿扩展至表单/密码等隐私字段。

**🔴 HIGH** — 远程代码执行  
> 未发现 eval/new Function/setTimeout(string) 等远程代码执行风险，也未动态加载未固定版本的脚本。  
> 位置：主代码及 @require 部分  
> 建议：保持不使用动态执行字符串代码，@require 建议固定版本哈希。

**🔴 HIGH** — 代码混淆  
> 未发现代码混淆、base64 解码执行、字符串数组映射或高度压缩单行代码。  
> 位置：主代码  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 document.write 注入风险。  
> 位置：主代码  
> 建议：如需插入用户内容，务必转义。

**🟠 MEDIUM** — 权限滥用  
> 申请了 unsafeWindow、GM.xmlHttpRequest、GM.setClipboard、GM.setValue、GM.getValue 等高权限，但实际代码仅用到部分功能，存在权限冗余。  
> 位置：元数据 @grant 部分  
> 建议：精简 @grant 权限，仅申请实际用到的功能。

**🟠 MEDIUM** — 敏感 API 调用  
> 未调用 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API 等敏感接口。  
> 位置：主代码  
> 建议：继续避免调用敏感 API。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的第三方库均来自 greasyfork 官方 CDN，版本号已固定，供应链风险较低。  
> 位置：元数据 @require 部分  
> 建议：保持使用官方 CDN，固定版本哈希。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未发现修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：主代码  
> 建议：继续避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/34153-pixiv-plus)*
