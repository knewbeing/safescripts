---
title: "AC-百度搜索重定向优化"
---

# AC-百度搜索重定向优化

`搜索优化`  `去重定向`  `广告屏蔽`  `界面美化`  `自动翻页`  `网站拦截`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/AC-baidu-重定向优化百度搜狗谷歌必应搜索_favicon_双列.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**27.19**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/14178-ac-baidu-%E9%87%8D%E5%AE%9A%E5%90%91%E4%BC%98%E5%8C%96%E7%99%BE%E5%BA%A6%E6%90%9C%E7%8B%97%E8%B0%B7%E6%AD%8C%E5%BF%85%E5%BA%94%E6%90%9C%E7%B4%A2-favicon-%E5%8F%8C%E5%88%97) <Badge type="tip" text="GreasyFork" />　　安装量：**3,427,143**　　评分：👍7640 / 👎34

## 功能介绍

本脚本可去除百度、搜狗、谷歌、必应等主流搜索引擎结果中的跳转链接，直接访问真实网页。支持自定义网站拦截、显示网站图标（favicon）、页面美化、结果编号、功能开关和自动翻页。

## 适用网站

- 百度搜索
- 搜狗搜索
- 谷歌搜索
- 必应搜索
- DuckDuckGo搜索
- Dogedoge搜索
- 好搜搜索
- 百度学术
- 90dao
- Tujidu

## 使用方法

1. 安装脚本后，访问百度、谷歌、必应等搜索网站。
2. 搜索结果中的链接会自动去除跳转，直接访问目标网页。
3. 页面会显示网站图标、编号等美化效果。
4. 可在页面或浏览器菜单中切换功能开关和拦截规则。
5. 支持自动翻页和自定义拦截网站。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取脚本设置数据。 |
| `GM.getValue` | 用于读取脚本设置数据（新版API）。 |
| `GM_setValue` | 用于保存脚本设置数据。 |
| `GM.setValue` | 用于保存脚本设置数据（新版API）。 |
| `GM_addStyle` | 用于动态添加自定义样式。 |
| `GM_getResourceURL` | 用于获取资源文件的URL。 |
| `GM_listValues` | 用于获取所有已保存的设置项。 |
| `GM.getResourceUrl` | 用于获取资源文件的URL（新版API）。 |
| `GM_xmlhttpRequest` | 用于发起跨域网络请求，获取真实网页地址等。 |
| `GM_getResourceText` | 用于获取资源文件的文本内容。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加脚本操作入口。 |
| `GM_addValueChangeListener` | 用于监听设置项的变化，实时更新脚本功能。 |
| `unsafeWindow` | 用于访问和操作网页的原始窗口对象。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：47/100　　**分析时间**：2026-07-06

> 脚本未发现直接的数据外传、隐私采集、远程代码执行或 DOM XSS，但存在严重的网络权限配置（@connect *），大量高权限申请，第三方库和资源供应链风险。建议收紧网络权限、精简 @grant 权限、固定第三方依赖版本和来源。当前风险等级为 HIGH，安全评分为 47。未批准上线。未发现代码混淆、WebSocket、敏感 API 调用、ClickJacking/iframe 风险。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> @connect * 允许任意域名的网络请求，存在数据外传的潜在风险，尤其如果脚本后续代码中有 GM_xmlhttpRequest/fetch/等网络请求。  
> 位置：UserScript metadata (@connect *)  
> 建议：移除 @connect *，仅保留实际需要的域名，避免任意外部通信。

**🟠 MEDIUM** — Permission Abuse  
> 大量 @grant 权限申请，包括 GM_xmlhttpRequest、unsafeWindow、GM_addValueChangeListener 等高权限，部分未在已审代码中看到实际使用，存在权限滥用风险。  
> 位置：UserScript metadata (@grant)  
> 建议：仅申请实际需要的权限，移除未用高权限，尤其 unsafeWindow 和 GM_xmlhttpRequest。

**🟠 MEDIUM** — Supply Chain Risk  
> @require 加载第三方库 less.min.js 和 vue.runtime.global.prod.js，来源为 registry.npmmirror.com，虽然为知名镜像，但未固定哈希，存在供应链风险。  
> 位置：UserScript metadata (@require)  
> 建议：使用官方 CDN 并固定版本哈希，避免供应链污染。

**🟠 MEDIUM** — Supply Chain Risk  
> @resource 加载大量 CSS/LESS 文件，部分来源为 ibaidu.tujidu.com 和 gitcode.net，非官方 CDN，存在供应链风险。  
> 位置：UserScript metadata (@resource)  
> 建议：建议使用可信 CDN 并固定版本，避免加载可变内容。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/14178-ac-baidu-%E9%87%8D%E5%AE%9A%E5%90%91%E4%BC%98%E5%8C%96%E7%99%BE%E5%BA%A6%E6%90%9C%E7%8B%97%E8%B0%B7%E6%AD%8C%E5%BF%85%E5%BA%94%E6%90%9C%E7%B4%A2-favicon-%E5%8F%8C%E5%88%97)*
