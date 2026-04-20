---
title: "AC-百度谷歌搜索优化双列"
---

# AC-百度谷歌搜索优化双列

`搜索优化`  `去重定向`  `广告屏蔽`  `界面美化`  `自动翻页`  `自定义拦截`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/AC-baidu-重定向优化百度搜狗谷歌必应搜索_favicon_双列.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**27.19**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/14178-ac-baidu-%E9%87%8D%E5%AE%9A%E5%90%91%E4%BC%98%E5%8C%96%E7%99%BE%E5%BA%A6%E6%90%9C%E7%8B%97%E8%B0%B7%E6%AD%8C%E5%BF%85%E5%BA%94%E6%90%9C%E7%B4%A2-favicon-%E5%8F%8C%E5%88%97) <Badge type="tip" text="GreasyFork" />　　安装量：**3,424,163**　　评分：👍7635 / 👎34

## 功能介绍

本脚本优化百度、搜狗、谷歌、必应等搜索引擎的搜索结果，去除重定向链接，直接访问原始网页。支持自定义拦截网站、显示网站图标（favicon）、页面美化、广告屏蔽、结果计数和自动翻页等功能。用户可根据需要开启或关闭各项功能，提升搜索体验。

## 适用网站

- 百度
- 搜狗
- 谷歌
- 必应
- DuckDuckGo
- Dogedoge
- 90dao
- 图集都
- 好搜
- 本地localhost

## 使用方法

1. 1. 安装脚本后，访问百度、谷歌、必应等搜索引擎页面。
2. 2. 搜索结果会自动去除重定向，直接显示真实链接和网站图标。
3. 3. 如需自定义拦截或调整功能，可通过脚本菜单进行设置。
4. 4. 搜索结果支持自动翻页和界面美化，无需手动操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取和保存脚本设置。 |
| `GM.getValue` | 用于读取和保存脚本设置（新版API）。 |
| `GM_setValue` | 用于保存脚本设置。 |
| `GM.setValue` | 用于保存脚本设置（新版API）。 |
| `GM_addStyle` | 用于向页面添加自定义样式。 |
| `GM_getResourceURL` | 用于获取脚本资源的URL。 |
| `GM_listValues` | 用于获取所有已保存的设置项。 |
| `GM.getResourceUrl` | 用于获取脚本资源的URL（新版API）。 |
| `GM_xmlhttpRequest` | 用于发起跨域网络请求，获取网页内容。 |
| `GM_getResourceText` | 用于获取脚本资源的文本内容。 |
| `GM_registerMenuCommand` | 用于在用户脚本菜单中添加自定义命令。 |
| `GM_addValueChangeListener` | 用于监听设置值的变化并响应。 |
| `unsafeWindow` | 允许脚本访问网页的原始window对象，进行深度操作。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：49/100　　**分析时间**：2026-04-20

> 该脚本未发现明显的数据外传、隐私采集、远程代码执行或 DOM XSS 风险，但元数据中存在严重权限滥用（@connect *）、供应链风险（@require/@resource 非官方 CDN）、以及敏感 API 权限申请（unsafeWindow）。建议严格收缩权限、使用可信 CDN 并固定版本哈希。当前安全评分为 49，风险等级为 HIGH，不建议在敏感环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 权限滥用  
> @connect * 允许任意域名的网络请求，存在数据外传风险，虽然代码未见明显数据上报，但此权限极易被滥用。  
> 位置：UserScript 元数据 @connect *  
> 建议：移除 @connect *，仅保留实际需要的域名。

**🟠 MEDIUM** — 权限滥用  
> 大量 @grant 权限申请，包括 GM_xmlhttpRequest、unsafeWindow 等高权限，部分未在代码中实际使用。  
> 位置：UserScript 元数据 @grant  
> 建议：仅申请实际需要的权限，移除未用高权限。

**🟠 MEDIUM** — 供应链风险  
> @require 加载 less.js 和 vue.js，来源为 registry.npmmirror.com，虽然为知名镜像，但非官方 CDN，存在供应链风险。  
> 位置：UserScript 元数据 @require  
> 建议：建议使用官方 CDN 并固定版本哈希，避免供应链污染。

**🟠 MEDIUM** — 供应链风险  
> @resource 加载大量样式文件，部分来源为 tujidu.com 和 gitcode.net，非官方域名，存在供应链风险。  
> 位置：UserScript 元数据 @resource  
> 建议：建议使用可信 CDN 并固定版本哈希，避免供应链污染。

**🟠 MEDIUM** — 敏感 API 调用  
> 申请了 unsafeWindow 权限，可能导致脚本可访问页面全局对象，存在安全隐患。  
> 位置：UserScript 元数据 @grant unsafeWindow  
> 建议：仅在确实需要时使用 unsafeWindow，并限制其操作范围。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/14178-ac-baidu-%E9%87%8D%E5%AE%9A%E5%90%91%E4%BC%98%E5%8C%96%E7%99%BE%E5%BA%A6%E6%90%9C%E7%8B%97%E8%B0%B7%E6%AD%8C%E5%BF%85%E5%BA%94%E6%90%9C%E7%B4%A2-favicon-%E5%8F%8C%E5%88%97)*
