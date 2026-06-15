---
title: "AC-baidu-重定向优化百度搜狗谷歌必应搜索"
---

# AC-baidu-重定向优化百度搜狗谷歌必应搜索

`搜索优化`  `去重定向`  `广告屏蔽`  `页面美化`  `自动翻页`  `自定义拦截`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/AC-baidu-重定向优化百度搜狗谷歌必应搜索_favicon_双列.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**27.19**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/14178-ac-baidu-%E9%87%8D%E5%AE%9A%E5%90%91%E4%BC%98%E5%8C%96%E7%99%BE%E5%BA%A6%E6%90%9C%E7%8B%97%E8%B0%B7%E6%AD%8C%E5%BF%85%E5%BA%94%E6%90%9C%E7%B4%A2-favicon-%E5%8F%8C%E5%88%97) <Badge type="tip" text="GreasyFork" />　　安装量：**3,426,594**　　评分：👍7639 / 👎34

## 功能介绍

本脚本可去除百度、搜狗、谷歌、必应等搜索结果中的跳转链接，直接访问原始网页。支持自定义网站拦截、显示每条结果的favicon、页面美化、结果计数、功能开关和自动翻页。让搜索体验更快捷、清爽。

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

1. 安装脚本后，打开百度、谷歌、必应等搜索页面。
2. 搜索结果会自动去除跳转，直接显示真实链接。
3. 每条结果左侧会显示网站图标（favicon）。
4. 可在页面或浏览器菜单中切换功能，如拦截、自动翻页等。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于存储和读取脚本设置数据。 |
| `GM.getValue` | 用于存储和读取脚本设置数据（新版API）。 |
| `GM_setValue` | 用于保存脚本设置数据。 |
| `GM.setValue` | 用于保存脚本设置数据（新版API）。 |
| `GM_addStyle` | 用于动态添加自定义样式到页面。 |
| `GM_getResourceURL` | 获取资源文件的URL，用于加载样式等。 |
| `GM_listValues` | 获取所有已存储的脚本数据键名。 |
| `GM.getResourceUrl` | 获取资源文件的URL（新版API）。 |
| `GM_xmlhttpRequest` | 用于发起跨域网络请求，获取真实网页地址等。 |
| `GM_getResourceText` | 获取资源文件的文本内容，用于页面美化。 |
| `GM_registerMenuCommand` | 在浏览器菜单中添加脚本功能入口。 |
| `GM_addValueChangeListener` | 监听脚本数据变化，实时更新页面。 |
| `unsafeWindow` | 允许脚本访问网页的原生窗口对象，增强功能。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：25/100　　**分析时间**：2026-06-15

> 该脚本存在严重安全风险，主要体现在 @connect * 允许任意域名网络请求，结合 GM_xmlhttpRequest 权限理论上可外传任意数据。虽然代码未见明显数据上报，但权限配置极高危。另有供应链风险（第三方库和样式资源未固定哈希，部分来源非官方）。未检测到隐私采集、代码混淆、DOM XSS、WebSocket 使用等问题。建议严格收缩权限、固定依赖来源和版本。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Permission Risk  
> @connect * 允许任意域名的网络请求，存在数据外传风险，虽然代码未见明显数据上报，但此权限极高危。  
> 位置：UserScript metadata (@connect *)  
> 建议：移除 @connect *，仅保留实际需要的域名，避免任意外部请求。

**🔴 HIGH** — Permission Risk  
> 大量 @grant GM_xmlhttpRequest 权限，结合 @connect *，理论上可向任意域名发送请求，存在滥用风险。  
> 位置：UserScript metadata (@grant GM_xmlhttpRequest)  
> 建议：仅申请实际需要的权限，移除不必要的高权限。

**🟠 MEDIUM** — Supply Chain Risk  
> 动态加载第三方库（less.js、vue.js）通过 @require，虽然来源为 npmmirror 官方镜像，但未固定哈希，存在供应链风险。  
> 位置：UserScript metadata (@require)  
> 建议：使用官方 CDN 并固定版本哈希，避免供应链污染。

**🟠 MEDIUM** — Supply Chain Risk  
> 大量 @resource 加载样式文件，部分来源为非官方域名（ibaidu.tujidu.com），存在供应链风险。  
> 位置：UserScript metadata (@resource)  
> 建议：确保资源来源可信，建议使用官方 CDN 并固定版本。

**🟠 MEDIUM** — Permission Risk  
> 申请了 unsafeWindow 权限，可能导致脚本可访问页面全局对象，存在被滥用风险。  
> 位置：UserScript metadata (@grant unsafeWindow)  
> 建议：仅在确实需要时使用 unsafeWindow，避免滥用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/14178-ac-baidu-%E9%87%8D%E5%AE%9A%E5%90%91%E4%BC%98%E5%8C%96%E7%99%BE%E5%BA%A6%E6%90%9C%E7%8B%97%E8%B0%B7%E6%AD%8C%E5%BF%85%E5%BA%94%E6%90%9C%E7%B4%A2-favicon-%E5%8F%8C%E5%88%97)*
