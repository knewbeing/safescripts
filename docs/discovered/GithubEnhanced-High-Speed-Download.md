---
title: "Github增强 - 高速下载"
---

# Github增强 - 高速下载

`下载加速`  `Github增强`  `文件管理`  `公益加速`  `开发者工具`  `快捷操作`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/GithubEnhanced-High-Speed-Download.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.6.38**　　发现时间：**2026-06-22**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为Github提供高速下载功能，包括Git Clone/SSH、Release、Raw、Code(ZIP)等文件，并支持项目列表单文件快捷下载。通过公益加速源，提升下载速度，方便用户获取所需资源。

## 适用网站

- Github
- bgithub加速镜像

## 使用方法

1. 安装脚本后，访问Github相关页面。
2. 在文件、代码、Release等页面会出现高速下载按钮。
3. 点击按钮即可通过加速源下载所需文件。
4. 如需切换加速源或反馈问题，可在浏览器菜单中操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除自定义菜单命令。 |
| `GM_openInTab` | 用于在新标签页打开加速下载链接。 |
| `GM_getValue` | 用于保存用户设置，如加速源选择。 |
| `GM_setValue` | 用于存储用户偏好和配置。 |
| `GM_notification` | 用于弹出通知提醒用户操作结果。 |
| `GM_setClipboard` | 用于复制下载链接到剪贴板，方便用户粘贴使用。 |
| `window.onurlchange` | 用于监听网址变化，确保脚本在页面切换时正常工作。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：60/100　　**分析时间**：2026-07-06

> 该脚本主要风险在于将 Github 文件下载请求重定向到大量第三方加速代理服务器，存在数据外传风险，尤其对私有或敏感仓库内容。未检测到隐私采集、远程代码执行、混淆、DOM XSS、供应链等其他高风险行为。建议用户仅用于公开项目，下载敏感内容需谨慎。整体安全评分为 60，风险等级为 HIGH。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：gh.h233.eu.org, rapidgit.jjda.de5.net, gh.ddlc.top） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本将 Github 文件下载请求重定向到第三方加速代理服务器，涉及大量外部域名。  
> 位置：download_url_us, clone_url, raw_url 等数组及相关下载逻辑  
> 建议：警告用户这些加速节点为第三方，下载敏感内容需谨慎。建议仅用于公开项目。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到隐私采集行为，如读取 cookie、localStorage、sessionStorage、IndexedDB、剪贴板或监听键盘输入。  
> 位置：全局代码  
> 建议：保持现有状态，勿添加隐私采集代码。

**🔴 HIGH** — 远程代码执行  
> 脚本未检测到远程代码执行风险，如 eval、new Function、setTimeout(string)、setInterval(string)、动态 script 标签加载。  
> 位置：全局代码  
> 建议：保持现有状态，勿添加动态代码执行逻辑。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到代码混淆行为，代码结构清晰，无 base64、unicode、字符串数组映射等混淆特征。  
> 位置：全局代码  
> 建议：保持现有状态，勿使用混淆器。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 或注入风险，无用户输入直接插入 innerHTML/outerHTML，未操作 iframe src 为 javascript:。  
> 位置：全局代码  
> 建议：保持现有状态，插入内容需严格转义。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_notification、GM_setClipboard 等权限，均有实际用途，无权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API，如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API（读取）、Notification API（仅用于通知）。  
> 位置：全局代码  
> 建议：保持现有状态，勿调用敏感 API。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据 @require  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到 ClickJacking 或 iframe 风险，无 frame 保护策略修改或隐藏 iframe 创建。  
> 位置：全局代码  
> 建议：保持现有状态，勿创建隐藏 iframe。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/d8fcb017ba7108be3b9813667e63b7f28cbf6424/GithubEnhanced-High-Speed-Download.user.js)*
