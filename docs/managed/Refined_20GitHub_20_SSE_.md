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

**风险等级**：🟠 MEDIUM　　**安全评分**：69/100　　**分析时间**：2026-04-15

> 脚本功能为为网页链接添加用户标签，申请了多项 GM_* 权限并使用了 GM_xmlhttpRequest 进行网络请求，连接目标包括第三方服务器和任意地址。未检测到隐私采集、远程代码执行、代码混淆及 DOM XSS 风险。存在数据外传风险和权限滥用风险，建议限制网络请求目标和精简权限申请。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：dav.jianguoyun.com, localhost, *） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用了 GM.xmlHttpRequest 和 GM_xmlhttpRequest 进行网络请求，连接目标包括第三方服务器 dav.jianguoyun.com 和任意地址。需要确认是否传输用户敏感数据。  
> 位置：@grant 和 @connect 元数据声明  
> 建议：确认网络请求不传输敏感用户数据，避免隐私泄露。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了大量 GM_* 权限，但部分权限未必被使用，存在权限滥用风险。  
> 位置：@grant 元数据声明  
> 建议：精简权限申请，仅申请必要权限。

**🟠 MEDIUM** — 供应链风险  
> @connect 使用了通配符 *，可能导致任意网络请求，存在供应链风险。  
> 位置：@connect 元数据声明  
> 建议：限制 @connect 目标域名，避免任意请求。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://greasyfork.org/scripts/460718-refined-github-sse/code/Refined%20GitHub%20(SSE).user.js)*
