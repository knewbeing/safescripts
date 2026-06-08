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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-08

> 该脚本主要用于增强 Pixiv 网页体验，未发现数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 等高危行为。所有网络请求均指向 Pixiv 官方图片 CDN 或本地 API，无第三方数据上报。@require 的第三方库均为官方 CDN 且固定版本。存在部分未使用的高权限申请，建议最小化权限。整体安全风险较低，适合一般用户使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> 申请了多个高权限（如 unsafeWindow、GM_setValue/GM_getValue/GM_setClipboard），但实际代码未见明显滥用。  
> 位置：Meta @grant  
> 建议：仅申请实际使用的权限，减少攻击面。

**🟡 LOW** — 供应链风险  
> 通过 @require 加载了多个第三方库（jQuery、jszip、FileSaver、gifjs、gm4-polyfill），但均来自 greasyfork 官方 CDN，且带有固定版本号。  
> 位置：Meta @require  
> 建议：继续保持使用可信源和固定版本，避免使用未知或可变 URL。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/34153-pixiv-plus)*
