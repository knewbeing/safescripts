---
title: 🏷️ 小鱼标签 (UTags) - 为链接添加用户标签
---

# 🏷️ 小鱼标签 (UTags) - 为链接添加用户标签

`用户标签`  `内容整理`  `书签管理`  `网页增强`  `信息过滤`  `多网站支持`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/Refined_20GitHub_20_SSE_.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.34.2**　　最后更新：**2026-04-15**

## 功能介绍

这款脚本可以在网页上的用户、帖子和视频链接上添加自定义标签和备注，帮助你更好地识别用户和整理内容。它还能过滤掉不想看到的信息，同时具备现代化的书签管理功能。支持超过100个热门网站，极大提升你的浏览体验。

## 适用网站

- V2EX
- X (Twitter)
- YouTube
- TikTok
- Reddit
- GitHub
- B站
- 抖音
- 小红书
- 知乎
- 掘金
- 豆瓣
- 吾爱破解
- pixiv
- LINUX DO
- 小众软件
- NGA
- BOSS直聘
- Facebook
- Instagram
- Threads
- Hacker News
- Greasy Fork
- Twitch

## 使用方法

1. 安装脚本后，访问支持的网站。
2. 在用户、帖子或视频链接上添加或查看自定义标签和备注。
3. 通过脚本菜单管理标签和书签。
4. 利用标签过滤和整理网页内容，提高浏览效率。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM.info` | 获取脚本和环境的相关信息。 |
| `GM.addValueChangeListener` | 监听存储值的变化，方便同步标签和备注。 |
| `GM.getValue` | 读取存储的标签和备注数据。 |
| `GM.deleteValue` | 删除存储的标签和备注数据。 |
| `GM.setValue` | 保存自定义标签和备注数据。 |
| `GM_addElement` | 动态添加页面元素，增强界面交互。 |
| `GM.registerMenuCommand` | 注册菜单命令，方便用户操作脚本功能。 |
| `GM.xmlHttpRequest` | 发送跨域网络请求，支持同步和数据获取。 |
| `GM_xmlhttpRequest` | 发送跨域网络请求，支持同步和数据获取（兼容旧接口）。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：35/100　　**分析时间**：2026-07-27

> 脚本元数据存在严重安全风险：@connect * 允许任意网络请求，结合 GM_xmlhttpRequest 权限，存在数据外传隐患。未提供完整代码，无法审查代码层面风险。建议严格限定网络请求目标、移除高权限申请，并提供完整代码以便全面审查。当前安全评分为 35，风险等级 CRITICAL，不建议在生产环境使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：dav.jianguoyun.com, localhost, *） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> @connect * 允许脚本向任意域名发起网络请求，存在严重的数据外传风险。结合 GM_xmlhttpRequest 权限，脚本可将用户数据、页面内容等发送到第三方服务器。  
> 位置：元数据 @connect *  
> 建议：严格限定 @connect 域名，仅允许必要的可信服务器，移除 @connect *。

**⛔ CRITICAL** — Data Exfiltration  
> 申请了 GM.xmlHttpRequest 和 GM_xmlhttpRequest 权限，允许脚本进行跨域网络请求，结合 @connect * 存在数据外传风险。  
> 位置：元数据 @grant GM.xmlHttpRequest, GM_xmlhttpRequest  
> 建议：移除不必要的高权限，限制网络请求目标。

**🔴 HIGH** — Code Transparency  
> 脚本未提供完整代码，无法审查远程代码执行、混淆、DOM XSS、敏感 API 调用等风险。  
> 位置：代码缺失  
> 建议：提供完整代码以便全面安全审查。

**🟠 MEDIUM** — Privacy Collection  
> 脚本申请了 GM.getValue, GM.setValue, GM.deleteValue, GM.addValueChangeListener 等权限，可能用于存储和同步用户标签数据，但未明确说明是否涉及隐私数据采集。  
> 位置：元数据 @grant GM.getValue, GM.setValue, GM.deleteValue, GM.addValueChangeListener  
> 建议：明确告知用户存储的数据类型及用途，避免存储敏感信息。

**🟡 LOW** — Permission Usage  
> 脚本申请了 GM_addElement 和 GM.registerMenuCommand 权限，属于功能性权限，但需注意是否被滥用。  
> 位置：元数据 @grant GM_addElement, GM.registerMenuCommand  
> 建议：仅在必要场景使用，避免滥用。

**🟡 LOW** — Supply Chain  
> 脚本未声明 @require 第三方库，供应链风险较低，但 update/download URL 指向 Greasy Fork 官方 CDN，风险可控。  
> 位置：元数据 @downloadURL, @updateURL  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://greasyfork.org/scripts/460718-refined-github-sse/code/Refined%20GitHub%20(SSE).user.js)*
