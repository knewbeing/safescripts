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

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-05-11

> 该脚本元数据存在严重安全隐患：声明了 @connect * 允许任意跨域请求，配合 GM_xmlhttpRequest 等高权限 API，存在数据外传和隐私泄露的高风险。同时允许连接 localhost，可能被滥用访问本地服务。由于未提供完整代码，无法进一步分析实际数据采集、远程代码执行等风险。强烈建议限制 @connect 域名范围、最小化权限申请，并补充完整代码以完成全面安全审查。

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
> 脚本声明 @connect *，允许向任意域名发起跨域请求，存在数据外传高风险。  
> 位置：元数据 @connect  
> 建议：严格限制 @connect 域名范围，仅允许必要的可信域名。

**⛔ CRITICAL** — 数据外传  
> 脚本声明 @grant GM.xmlHttpRequest 和 GM_xmlhttpRequest，具备任意跨域请求能力，配合 @connect * 存在数据外传风险。  
> 位置：元数据 @grant  
> 建议：移除不必要的 GM_xmlhttpRequest 权限，或限制 @connect 域名。

**🔴 HIGH** — 数据外传  
> 脚本声明 @connect localhost，可能被滥用访问本地服务，存在隐私和安全风险。  
> 位置：元数据 @connect  
> 建议：移除 @connect localhost，除非确有本地调试需求。

**🟠 MEDIUM** — 权限滥用  
> 脚本声明了多个高权限 GM_* API，但未见实际代码，无法判断是否滥用。  
> 位置：元数据 @grant  
> 建议：仅申请实际使用的权限，最小化授权。

**🟠 MEDIUM** — 代码完整性  
> 未提供完整代码，无法审查实际数据采集、远程代码执行、DOM XSS、混淆等实现细节。  
> 位置：代码缺失  
> 建议：请补充完整脚本代码以进行全面安全审查。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://greasyfork.org/scripts/460718-refined-github-sse/code/Refined%20GitHub%20(SSE).user.js)*
