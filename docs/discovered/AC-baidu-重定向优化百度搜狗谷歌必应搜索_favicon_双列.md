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

**风险等级**：🟠 MEDIUM　　**安全评分**：68/100　　**分析时间**：2026-06-29

> 该脚本主要功能为优化搜索引擎结果页面，去除重定向、广告、添加样式等。未发现明显的数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。主要安全隐患为权限滥用（如 @connect *、unsafeWindow）、供应链风险（部分资源和依赖未锁定哈希且来源非官方 CDN）。建议收紧权限、锁定依赖版本、使用可信资源，进一步提升安全性。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 @connect * 权限，允许向任意域名发起跨域请求，存在被滥用的风险。  
> 位置：元数据 @connect  
> 建议：仅申请实际需要的 @connect 域名，移除 @connect *。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但代码片段未见实际外传敏感数据行为。若后续代码有外传行为，需重点关注。  
> 位置：元数据 @grant  
> 建议：确保 GM_xmlhttpRequest 仅用于必要的功能，且目标域名受控。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @require 加载了 less.js 和 vue.runtime.global.prod.js，来源为 registry.npmmirror.com，属于可信的官方镜像，但未锁定具体文件哈希。  
> 位置：元数据 @require  
> 建议：建议使用带有内容哈希的 CDN 地址，防止供应链污染。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @resource 加载了多个 .less 和 .css 文件，部分来源为 ibaidu.tujidu.com 和 gitcode.net，非主流官方 CDN，存在一定供应链风险。  
> 位置：元数据 @resource  
> 建议：建议资源文件使用可信官方 CDN 并锁定版本，或对资源内容进行校验。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 unsafeWindow 权限，可能导致与页面 JS 互操作，存在一定安全隐患。  
> 位置：元数据 @grant  
> 建议：仅在确有必要时使用 unsafeWindow，并注意隔离敏感操作。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/14178-ac-baidu-%E9%87%8D%E5%AE%9A%E5%90%91%E4%BC%98%E5%8C%96%E7%99%BE%E5%BA%A6%E6%90%9C%E7%8B%97%E8%B0%B7%E6%AD%8C%E5%BF%85%E5%BA%94%E6%90%9C%E7%B4%A2-favicon-%E5%8F%8C%E5%88%97)*
