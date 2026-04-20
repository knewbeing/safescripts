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

**风险等级**：⛔ CRITICAL　　**安全评分**：25/100　　**分析时间**：2026-04-20

> 该脚本元数据申请了极高权限，尤其是 @connect * 和 GM_xmlhttpRequest，允许任意数据外传，存在严重安全风险。未提供完整代码，无法审查实际行为，建议严格限制网络权限并补充完整代码以便进一步审查。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：dav.jianguoyun.com, localhost, *） |
| 隐私采集 | ❌ 检测到（GM.getValue/GM.setValue/GM.deleteValue/GM.addValueChangeListener 可能涉及用户标签、备注、书签等数据存储与同步） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> @connect * 允许任意域名的数据传输，存在严重数据外传风险。脚本可通过 GM_xmlhttpRequest/GM.xmlHttpRequest 向任何第三方服务器发送数据。  
> 位置：元数据 @connect *  
> 建议：移除 @connect *，仅允许可信域名。严格限制数据传输目标。

**⛔ CRITICAL** — 数据外传  
> 脚本申请了 GM.xmlHttpRequest 和 GM_xmlhttpRequest 权限，结合 @connect *，可实现任意数据外传。  
> 位置：元数据 @grant GM.xmlHttpRequest, GM_xmlhttpRequest  
> 建议：仅申请必要的网络权限，并限制目标域名。

**🔴 HIGH** — 隐私采集  
> 脚本申请了 GM.getValue, GM.setValue, GM.deleteValue, GM.addValueChangeListener 等权限，可能涉及用户数据存储和同步，若结合网络请求可导致隐私泄露。  
> 位置：元数据 @grant GM.getValue, GM.setValue, GM.deleteValue, GM.addValueChangeListener  
> 建议：确保用户数据仅本地存储，不外传。审查数据同步逻辑。

**🔴 HIGH** — 远程代码执行  
> 脚本申请了 GM_addElement 权限，可能用于动态插入脚本或内容，需关注远程代码执行风险。  
> 位置：元数据 @grant GM_addElement  
> 建议：仅允许插入受信任内容，避免插入远程脚本。

**🔴 HIGH** — 未知风险  
> 脚本未提供完整代码，无法审查实际数据采集、远程代码执行、DOM XSS、混淆等行为，存在未知风险。  
> 位置：完整代码缺失  
> 建议：提供完整代码以便全面安全审查。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本申请了 GM.registerMenuCommand 权限，若结合 eval/new Function 等动态执行，可能被滥用。  
> 位置：元数据 @grant GM.registerMenuCommand  
> 建议：避免动态执行用户输入或远程内容。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM.info 权限，但代码未展示实际用途，存在权限滥用风险。  
> 位置：元数据 @grant GM.info  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 供应链风险  
> @connect dav.jianguoyun.com 允许与第三方云存储通信，需审查是否涉及用户数据同步或外传。  
> 位置：元数据 @connect dav.jianguoyun.com  
> 建议：仅允许必要的数据同步，避免敏感信息外传。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://greasyfork.org/scripts/460718-refined-github-sse/code/Refined%20GitHub%20(SSE).user.js)*
