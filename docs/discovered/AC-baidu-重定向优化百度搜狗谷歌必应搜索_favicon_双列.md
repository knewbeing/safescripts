---
title: "AC-百度重定向优化搜索双列"
---

# AC-百度重定向优化搜索双列

`搜索引擎优化`  `去重定向`  `广告拦截`  `界面美化`  `自动翻页`  `自定义设置`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/AC-baidu-重定向优化百度搜狗谷歌必应搜索_favicon_双列.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**27.19**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/14178-ac-baidu-%E9%87%8D%E5%AE%9A%E5%90%91%E4%BC%98%E5%8C%96%E7%99%BE%E5%BA%A6%E6%90%9C%E7%8B%97%E8%B0%B7%E6%AD%8C%E5%BF%85%E5%BA%94%E6%90%9C%E7%B4%A2-favicon-%E5%8F%8C%E5%88%97) <Badge type="tip" text="GreasyFork" />　　安装量：**3,426,870**　　评分：👍7641 / 👎34

## 功能介绍

本脚本可去除百度、搜狗、谷歌、必应等搜索结果中的跳转链接，直接访问原始网页。支持自定义拦截网站、显示每条结果的favicon图标、页面美化（双列/暗黑模式）、计数和自动翻页。用户可根据需要开启或关闭各项功能。

## 适用网站

- 百度搜索
- 搜狗搜索
- 谷歌搜索
- 必应搜索
- DuckDuckGo
- Dogedoge
- 好搜
- 90dao
- Tujidu

## 使用方法

1. 安装脚本后，访问百度、谷歌、必应等搜索引擎页面。
2. 搜索结果会自动去除跳转，直接显示真实网址。
3. 每条结果旁会显示网站favicon图标，页面支持双列和暗黑模式。
4. 可在浏览器脚本菜单中调整拦截、样式、自动翻页等功能设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取脚本设置数据。 |
| `GM.getValue` | 用于读取脚本设置数据（新版API）。 |
| `GM_setValue` | 用于保存脚本设置数据。 |
| `GM.setValue` | 用于保存脚本设置数据（新版API）。 |
| `GM_addStyle` | 用于动态添加自定义样式。 |
| `GM_getResourceURL` | 获取资源文件的URL地址。 |
| `GM_listValues` | 列出所有存储的脚本变量。 |
| `GM.getResourceUrl` | 获取资源文件的URL地址（新版API）。 |
| `GM_xmlhttpRequest` | 用于发起跨域网络请求，获取真实网页地址等。 |
| `GM_getResourceText` | 获取资源文件的文本内容。 |
| `GM_registerMenuCommand` | 在浏览器菜单中添加自定义命令，方便用户操作。 |
| `GM_addValueChangeListener` | 监听脚本变量变化，实时响应设置更改。 |
| `unsafeWindow` | 允许脚本访问网页的原生window对象，增强功能。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：52/100　　**分析时间**：2026-06-22

> 该脚本元数据中存在高风险安全隐患，主要为 @connect * 允许任意域名网络请求，极易被滥用为数据外传通道，属于严重安全隐患。@require 和 @resource 加载的外部依赖未锁定哈希，存在供应链污染风险。脚本申请了大量高权限，部分可能未实际使用，建议最小化权限。未发现明显隐私采集、代码混淆、DOM XSS 或远程代码执行问题。建议移除 @connect *，锁定依赖版本和哈希，并精简权限申请。

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
> 建议：移除 @connect *，仅保留实际需要的域名，最小化外联权限。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的第三方库（less.js、vue.js）未锁定哈希，存在供应链污染风险。  
> 位置：元数据 @require  
> 建议：建议使用官方 CDN 并锁定具体版本和哈希，或自行托管已验证的文件。

**🟠 MEDIUM** — 权限滥用  
> 申请了大量 GM_* 权限（如 GM_xmlhttpRequest、unsafeWindow），部分高权限未必全部用到，存在权限滥用嫌疑。  
> 位置：元数据 @grant  
> 建议：仅申请实际用到的权限，移除未使用的高权限（如 unsafeWindow、GM_xmlhttpRequest）。

**🟠 MEDIUM** — 供应链风险  
> @resource 加载了多个外部 less/css 文件，部分来源为自定义域名（ibaidu.tujidu.com、gitcode.net），存在供应链风险。  
> 位置：元数据 @resource  
> 建议：确保资源来源可信，建议使用官方 CDN 或自有可信托管。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/14178-ac-baidu-%E9%87%8D%E5%AE%9A%E5%90%91%E4%BC%98%E5%8C%96%E7%99%BE%E5%BA%A6%E6%90%9C%E7%8B%97%E8%B0%B7%E6%AD%8C%E5%BF%85%E5%BA%94%E6%90%9C%E7%B4%A2-favicon-%E5%8F%8C%E5%88%97)*
