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

**风险等级**：⛔ CRITICAL　　**安全评分**：25/100　　**分析时间**：2026-06-01

> 该脚本在元数据声明中允许向任意域名发起跨域网络请求（@connect *），并申请了 GM_xmlhttpRequest 等高权限 API，存在严重的数据外传和隐私泄露风险。未发现代码混淆、DOM XSS 或隐私采集行为，但由于权限过高，安全风险极大。建议严格限制网络请求目标和最小化权限申请。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：dav.jianguoyun.com, localhost, *） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 @connect * 允许向任意域名发起网络请求，存在数据外传高风险。  
> 位置：@connect * 元数据声明  
> 建议：限制 @connect 域名范围，仅允许必要的可信域名。

**⛔ CRITICAL** — 数据外传  
> 脚本声明了 GM.xmlHttpRequest 和 GM_xmlhttpRequest 权限，允许跨域请求任意第三方服务器，可能导致用户数据外传。  
> 位置：@grant GM.xmlHttpRequest, GM_xmlhttpRequest  
> 建议：仅在确有必要时申请跨域请求权限，并限制请求目标。

**⛔ CRITICAL** — 数据外传  
> 脚本允许连接 dav.jianguoyun.com、localhost 及任意域名，存在隐私数据被上传到第三方服务器的风险。  
> 位置：@connect dav.jianguoyun.com, @connect localhost, @connect *  
> 建议：移除不必要的 @connect 声明，避免隐私数据泄露。

**🟠 MEDIUM** — 权限滥用  
> 脚本声明了较多 GM_* 权限，包括 GM.addValueChangeListener、GM.getValue、GM.setValue、GM.deleteValue、GM_addElement、GM.registerMenuCommand，部分权限可能未被实际使用，存在权限滥用风险。  
> 位置：@grant 多项 GM_* 权限  
> 建议：仅申请实际使用的最小权限集。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://greasyfork.org/scripts/460718-refined-github-sse/code/Refined%20GitHub%20(SSE).user.js)*
