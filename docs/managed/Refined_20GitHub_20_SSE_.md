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

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-06-15

> 该脚本元数据存在严重安全风险，尤其是 @connect * 及 GM_xmlHttpRequest 权限组合，允许向任意第三方服务器发送数据，存在数据外传和隐私泄露隐患。未见代码内容，无法进一步评估实际行为，但仅凭元数据配置已属高危。建议严格限制网络请求目标、移除不必要高权限，并审查实际代码实现。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：dav.jianguoyun.com, localhost, any (*)） |
| 隐私采集 | ❌ 检测到（GM storage API 可用于存储用户标签、备注等信息） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> @connect * 允许脚本向任意域名发起网络请求，存在严重数据外传风险。  
> 位置：metadata (@connect *)  
> 建议：限制 @connect 域名范围，仅允许必要的可信域名。

**⛔ CRITICAL** — Data Transmission  
> 申请了 GM.xmlHttpRequest 和 GM_xmlhttpRequest 权限，结合 @connect *，可向任意第三方服务器发送数据。  
> 位置：metadata (@grant GM.xmlHttpRequest, GM_xmlhttpRequest)  
> 建议：移除不必要的高权限申请，限制网络请求目标。

**🔴 HIGH** — Data Transmission  
> 脚本可访问本地服务器 (localhost)，存在本地服务数据泄露风险。  
> 位置：metadata (@connect localhost)  
> 建议：移除对 localhost 的连接权限，除非确有必要。

**🟠 MEDIUM** — Privacy Collection  
> 申请了 GM.addValueChangeListener, GM.getValue, GM.setValue, GM.deleteValue 权限，可能用于存储和同步用户数据。  
> 位置：metadata (@grant GM.addValueChangeListener, GM.getValue, GM.setValue, GM.deleteValue)  
> 建议：确保所有存储和同步操作不涉及敏感隐私数据或外传。

**🟠 MEDIUM** — DOM XSS  
> 申请了 GM_addElement 权限，允许动态插入元素，若结合 innerHTML/outerHTML 使用可能导致 XSS。  
> 位置：metadata (@grant GM_addElement)  
> 建议：插入内容时需严格过滤和转义用户输入。

**🟡 LOW** — Permission Abuse  
> 申请了 GM.registerMenuCommand 权限，允许脚本注册菜单命令，若滥用可能影响用户体验。  
> 位置：metadata (@grant GM.registerMenuCommand)  
> 建议：仅注册必要且安全的菜单命令。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://greasyfork.org/scripts/460718-refined-github-sse/code/Refined%20GitHub%20(SSE).user.js)*
