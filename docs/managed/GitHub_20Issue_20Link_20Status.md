---
title: GitHub增强 - 高速下载
---

# GitHub增强 - 高速下载

`GitHub增强`  `高速下载`  `代码管理`  `项目文件下载`  `公益加速`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/GitHub_20Issue_20Link_20Status.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.6.37**　　最后更新：**2026-04-15**

## 功能介绍

该脚本为GitHub及相关镜像站点提供高速下载功能，支持Git Clone/SSH、Release、Raw文件及代码压缩包的快速下载。它利用公益加速服务提升下载速度，并支持项目列表中的单文件快捷下载。安装后可方便地通过菜单操作实现高速下载体验。

## 适用网站

- GitHub
- hub.whtrys.space
- dgithub.xyz
- kkgithub.com
- github.site
- github.store
- bgithub.xyz

## 使用方法

1. 安装脚本后访问GitHub或支持的镜像站点。
2. 在页面右上角或菜单中找到高速下载相关选项。
3. 选择需要下载的文件类型或项目文件，点击开始高速下载。
4. 根据提示完成下载，享受加速服务。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 注册自定义菜单命令，方便用户操作脚本功能。 |
| `GM_unregisterMenuCommand` | 注销已注册的菜单命令，管理菜单项。 |
| `GM_openInTab` | 在新标签页打开链接，用于快速下载或跳转。 |
| `GM_getValue` | 获取脚本存储的配置信息，保存用户设置。 |
| `GM_setValue` | 保存配置信息，记住用户偏好。 |
| `GM_notification` | 显示桌面通知，提醒下载状态或错误。 |
| `GM_setClipboard` | 将内容复制到剪贴板，方便分享或使用。 |
| `window.onurlchange` | 监听URL变化，动态响应页面切换。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：76/100　　**分析时间**：2026-04-15

> 该脚本主要功能为通过多个第三方公益加速节点实现 GitHub 文件的高速下载，存在数据外传风险，因请求会经过多个第三方代理服务器。未发现隐私采集、远程代码执行、代码混淆及 DOM XSS 风险。部分权限申请未被使用，存在权限滥用风险。供应链风险较低。综合评估安全等级为中等，建议用户谨慎使用并关注第三方节点的安全性。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://gh.h233.eu.org, https://rapidgit.jjda.de5.net, https://gh.ddlc.top） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本中存在大量访问第三方公益加速节点的网络请求，可能会将用户请求的 GitHub 资源通过这些第三方代理服务器转发，存在数据外传风险。  
> 位置：脚本中定义的 download_url_us 数组及相关网络请求部分  
> 建议：确认所有第三方节点的安全性和隐私政策，避免敏感数据泄露。

**⛔ CRITICAL** — 隐私采集  
> 脚本未发现访问 document.cookie、localStorage、sessionStorage、IndexedDB 等隐私敏感数据的行为。  
> 位置：代码整体  
> 建议：继续遵守隐私保护原则。

**⛔ CRITICAL** — 隐私采集  
> 脚本未发现监听键盘事件或读取剪贴板等敏感操作。  
> 位置：代码整体  
> 建议：继续避免敏感隐私采集行为。

**🔴 HIGH** — 远程代码执行  
> 脚本未发现使用 eval、new Function、setTimeout(string) 等远程代码执行风险函数。  
> 位置：代码整体  
> 建议：保持代码安全，避免动态执行不可信代码。

**🔴 HIGH** — 代码混淆  
> 脚本代码未见明显混淆或压缩，代码结构清晰。  
> 位置：代码整体  
> 建议：保持代码可读性，避免混淆带来的安全隐患。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未发现直接将用户输入或 URL 参数插入 innerHTML/outerHTML 的行为，DOM XSS 风险较低。  
> 位置：代码整体  
> 建议：继续避免不安全的 DOM 操作。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了多个 GM_* 权限，但部分权限如 GM_openInTab 未在代码中明显使用，存在权限滥用风险。  
> 位置：元数据 @grant 部分  
> 建议：清理未使用的权限申请，减少权限滥用风险。

**🟠 MEDIUM** — 供应链风险  
> 脚本 @require 未使用，未加载第三方库，供应链风险较低。  
> 位置：元数据 @require 部分  
> 建议：继续避免加载不可信第三方库。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://greasyfork.org/scripts/412245-github-issue-link-status/code/GitHub%20Issue%20Link%20Status.user.js)*
