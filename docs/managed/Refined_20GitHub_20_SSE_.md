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

**风险等级**：⛔ CRITICAL　　**安全评分**：42/100　　**分析时间**：2026-04-27

> 该脚本元数据申请了极高权限，尤其是 @connect * 和 GM_xmlhttpRequest，允许向任意域名发送数据，存在严重数据外传风险。脚本可读写本地存储，可能涉及隐私数据。未发现代码混淆、远程代码执行、DOM XSS，但权限配置极不安全。建议严格限制网络请求目标，移除不必要的高权限申请。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：dav.jianguoyun.com, localhost, *） |
| 隐私采集 | ❌ 检测到（本地存储读写（GM.getValue, GM.setValue, GM.deleteValue, GM.addValueChangeListener）） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> @connect * 允许任意域名的数据传输，存在严重数据外传风险。结合 GM_xmlhttpRequest 权限，脚本可向任何第三方服务器发送数据。  
> 位置：元数据 @connect *  
> 建议：限制 @connect 域名范围，仅允许可信服务。移除 @connect *，只保留必要的域名。

**⛔ CRITICAL** — Data Exfiltration  
> 申请了 GM.xmlHttpRequest 和 GM_xmlhttpRequest 权限，允许脚本进行跨域网络请求，结合 @connect * 存在数据外传风险。  
> 位置：元数据 @grant GM.xmlHttpRequest, GM_xmlhttpRequest  
> 建议：仅申请必要的网络请求权限，并配合严格的 @connect 域名限制。

**🟠 MEDIUM** — Privacy Collection  
> 脚本申请了 GM.getValue、GM.setValue、GM.deleteValue、GM.addValueChangeListener 等权限，允许读写本地存储，可能涉及用户隐私数据。  
> 位置：元数据 @grant GM.getValue, GM.setValue, GM.deleteValue, GM.addValueChangeListener  
> 建议：确保存储的数据不包含敏感信息，且不会被外传。

**🟡 LOW** — DOM Manipulation  
> 脚本申请了 GM_addElement 权限，允许动态插入元素，若结合 innerHTML/outerHTML 操作可能存在 XSS 风险。  
> 位置：元数据 @grant GM_addElement  
> 建议：插入元素时避免使用不可信内容，严格转义用户输入。

**🟡 LOW** — Permission Abuse  
> 脚本申请了 GM.registerMenuCommand 权限，允许注册菜单命令，若结合敏感操作可能被滥用。  
> 位置：元数据 @grant GM.registerMenuCommand  
> 建议：菜单命令应避免触发敏感操作，如数据外传、远程代码执行。

**🟡 LOW** — Permission Abuse  
> 脚本申请了 GM.info 权限，允许访问脚本元信息，通常风险较低，但需注意信息泄露。  
> 位置：元数据 @grant GM.info  
> 建议：仅在必要场景下使用 GM.info，避免泄露用户环境信息。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://greasyfork.org/scripts/460718-refined-github-sse/code/Refined%20GitHub%20(SSE).user.js)*
