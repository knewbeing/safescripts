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

**风险等级**：⛔ CRITICAL　　**安全评分**：42/100　　**分析时间**：2026-06-22

> 该脚本元数据声明存在严重安全风险，主要体现在允许向任意域名发起网络请求（@connect *），并申请了高权限的 GM_xmlhttpRequest/GM.xmlHttpRequest。实际代码缺失，无法排查更深层次的安全问题。强烈建议限制网络权限、最小化权限申请，并补充完整代码以便进一步审查。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：*, dav.jianguoyun.com, localhost） |
| 隐私采集 | ❌ 检测到（GM.getValue/GM.setValue/GM.deleteValue/GM.addValueChangeListener 可能涉及用户数据存储） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 @connect * 允许向任意域名发起网络请求，存在数据外传的高风险。  
> 位置：@connect * (元数据)  
> 建议：限制 @connect 仅允许必要的可信域名，避免任意外部通信。

**⛔ CRITICAL** — 数据外传  
> 脚本申请了 GM.xmlHttpRequest 和 GM_xmlhttpRequest 高权限，允许跨域网络请求，且未限制目标域名。  
> 位置：@grant GM.xmlHttpRequest, GM_xmlhttpRequest (元数据)  
> 建议：仅在确有必要时申请，并配合严格的 @connect 域名白名单。

**🔴 HIGH** — 远程代码执行  
> 脚本申请了 GM_addElement，可用于动态插入脚本或 HTML，存在远程代码执行或 XSS 风险。  
> 位置：@grant GM_addElement (元数据)  
> 建议：仅用于插入受信任内容，避免插入外部 JS。

**🟠 MEDIUM** — 隐私采集  
> 脚本申请了多个 GM_* 存储相关权限，可能涉及用户数据的本地存储和读取。  
> 位置：@grant GM.getValue, GM.setValue, GM.deleteValue, GM.addValueChangeListener (元数据)  
> 建议：确保仅存储必要的非敏感数据，并在代码中明确告知用户。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM.info 权限，可能访问用户脚本管理器信息。  
> 位置：@grant GM.info (元数据)  
> 建议：仅在确有必要时申请，避免收集用户环境信息。

**🟠 MEDIUM** — 数据外传  
> 脚本允许 @connect localhost，可能被用于本地服务通信，存在一定风险。  
> 位置：@connect localhost (元数据)  
> 建议：仅在开发调试时使用，发布版应移除。

**🟠 MEDIUM** — 代码完整性  
> 脚本未提供实际代码，无法进一步分析是否存在代码混淆、DOM XSS、敏感 API 调用等问题。  
> 位置：代码缺失  
> 建议：提供完整代码以进行全面安全审查。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://greasyfork.org/scripts/460718-refined-github-sse/code/Refined%20GitHub%20(SSE).user.js)*
