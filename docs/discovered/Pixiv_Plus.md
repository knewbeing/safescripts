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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-22

> 该脚本主要功能为增强 Pixiv 使用体验，未检测到数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。所有网络请求均指向 Pixiv 官方图片 CDN 或 API，未见向第三方服务器传输用户数据。依赖库来源可信，且版本固定。唯一中等风险为申请了 unsafeWindow 权限，建议如无必要可移除。整体安全性较高，适合普通用户使用。

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
> 申请了高权限（unsafeWindow），但代码未见明显滥用。  
> 位置：metadata @grant  
> 建议：如无必要，建议移除 unsafeWindow 权限。

**🟡 LOW** — 供应链风险  
> 通过 @require 加载第三方库（jQuery、jszip、FileSaver、gifjs、gm4-polyfill），但均为 GreasyFork 官方 CDN，且带有具体版本号。  
> 位置：metadata @require  
> 建议：建议定期检查依赖库安全性，确保未被污染。

**🟡 LOW** — 数据外传  
> 代码中存在对 $.ajax 的同步请求，但仅限于 Pixiv 官方 API（/ajax/user/ 和 /ajax/illust/），未见向第三方域名发送用户数据。  
> 位置：illustApi, userApi  
> 建议：同步请求可能影响性能，建议优化为异步。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/34153-pixiv-plus)*
