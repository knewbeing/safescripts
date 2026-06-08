---
title: "AC-baidu-重定向优化百度搜狗谷歌必应搜索_favicon_双列"
---

# AC-baidu-重定向优化百度搜狗谷歌必应搜索_favicon_双列

`搜索引擎优化`  `去重定向`  `广告拦截`  `页面美化`  `自动翻页`  `自定义拦截`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/AC-baidu-重定向优化百度搜狗谷歌必应搜索_favicon_双列.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**27.19**　　发现时间：**2026-06-08**　　来源：[GreasyFork](https://greasyfork.org/scripts/14178-ac-baidu-%E9%87%8D%E5%AE%9A%E5%90%91%E4%BC%98%E5%8C%96%E7%99%BE%E5%BA%A6%E6%90%9C%E7%8B%97%E8%B0%B7%E6%AD%8C%E5%BF%85%E5%BA%94%E6%90%9C%E7%B4%A2-favicon-%E5%8F%8C%E5%88%97) <Badge type="tip" text="GreasyFork" />　　安装量：**3,426,234**　　评分：👍7639 / 👎34

## 功能介绍

本脚本可去除百度、搜狗、谷歌、必应等搜索结果中的跳转链接，直接访问原始网页。支持自定义网站拦截、显示每条结果的favicon、页面美化（双列/暗黑模式）、自动翻页和计数功能。用户可根据需要开启或关闭各项功能。

## 适用网站

- 百度搜索
- 搜狗搜索
- 谷歌搜索
- 必应搜索
- DuckDuckGo
- Dogedoge
- 90dao
- Tujidu

## 使用方法

1. 安装脚本后，访问百度、谷歌、必应等搜索页面。
2. 搜索结果会自动去除跳转，直接显示真实网页链接。
3. 每条结果显示网站favicon，页面可切换双列/暗黑模式。
4. 可在脚本菜单中设置拦截网站、开启自动翻页等功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于获取和保存脚本设置，例如功能开关状态。 |
| `GM.getValue` | 用于获取和保存脚本设置，例如功能开关状态。 |
| `GM_setValue` | 用于保存脚本设置，例如功能开关状态。 |
| `GM.setValue` | 用于保存脚本设置，例如功能开关状态。 |
| `GM_addStyle` | 用于动态添加自定义样式，优化搜索页面显示效果。 |
| `GM_getResourceURL` | 用于获取脚本资源的URL，如样式文件。 |
| `GM_listValues` | 用于获取已保存的所有脚本设置键名。 |
| `GM.getResourceUrl` | 用于获取脚本资源的URL，如样式文件。 |
| `GM_xmlhttpRequest` | 用于发起网络请求，获取真实网页地址或资源。 |
| `GM_getResourceText` | 用于获取脚本资源的文本内容，如样式文件。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加自定义命令，方便用户操作脚本。 |
| `GM_addValueChangeListener` | 用于监听脚本设置的变化，实时响应用户操作。 |
| `unsafeWindow` | 允许脚本访问网页的原始窗口对象，增强功能兼容性。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：52/100　　**分析时间**：2026-06-08

> 该脚本元数据存在严重安全隐患：@connect * 允许任意域名网络请求，理论上可导致数据外传（CRITICAL）；部分依赖和样式文件来源于非官方第三方 CDN，存在供应链风险（MEDIUM）；权限申请过多，部分高权限未必实际使用（MEDIUM）。当前未发现明显隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。建议严格限制 @connect 域名、仅使用可信依赖、最小化权限申请。若后续代码有网络请求或外部脚本注入行为，需进一步详细审查。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> @connect * 允许任意域名的网络请求，存在数据外传潜在风险，尤其是脚本后续代码如有 GM_xmlhttpRequest/fetch/WS 等调用。  
> 位置：元数据 @connect  
> 建议：移除 @connect *，仅保留实际需要的域名，最小化外联范围。

**🟠 MEDIUM** — 供应链风险  
> 部分 @resource 样式文件和 @require 的 JS 依赖（如 less.js、vue.js）来自第三方 CDN，部分为非官方源（如 ibaidu.tujidu.com、gitcode.net），存在供应链污染风险。  
> 位置：元数据 @resource/@require  
> 建议：建议仅使用官方 CDN 并固定版本哈希，避免使用未知或不可信第三方源。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了大量 GM_* 权限（如 GM_xmlhttpRequest、GM_addValueChangeListener、unsafeWindow），部分高权限如 GM_xmlhttpRequest、unsafeWindow 可能被滥用，且未见全部实际使用。  
> 位置：元数据 @grant  
> 建议：仅申请实际使用的权限，避免权限滥用，移除未用高权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/14178-ac-baidu-%E9%87%8D%E5%AE%9A%E5%90%91%E4%BC%98%E5%8C%96%E7%99%BE%E5%BA%A6%E6%90%9C%E7%8B%97%E8%B0%B7%E6%AD%8C%E5%BF%85%E5%BA%94%E6%90%9C%E7%B4%A2-favicon-%E5%8F%8C%E5%88%97)*
