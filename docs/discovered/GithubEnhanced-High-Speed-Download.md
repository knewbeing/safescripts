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

**风险等级**：🔴 HIGH　　**安全评分**：50/100　　**分析时间**：2026-07-27

> 该脚本主要通过第三方加速代理服务器实现 Github 文件高速下载，存在数据外传风险（用户请求和下载内容会被第三方服务器处理和记录），但未检测到隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险或 iframe 风险。建议用户下载敏感内容时谨慎，脚本整体安全性为中高风险，安全评分为 50。未检测到 WebSocket 使用。

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
> 脚本通过构造下载链接，将用户请求重定向到第三方加速代理服务器（如 gh.h233.eu.org、ghproxy.net 等），这些服务器可能会记录用户下载行为和请求内容。  
> 位置：download_url_us、clone_url、raw_url 等数组和相关下载逻辑  
> 建议：提醒用户这些加速节点为第三方，下载敏感内容时需谨慎。建议脚本作者在界面明确提示用户数据可能被第三方代理服务器收集。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到任何隐私采集行为，如读取 cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段或监听键盘输入。  
> 位置：全局代码  
> 建议：保持现有状态，勿添加隐私采集逻辑。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等动态代码执行方式，也未通过 innerHTML/outerHTML 插入外部脚本。  
> 位置：全局代码  
> 建议：保持现有状态，勿添加远程代码执行相关逻辑。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到代码混淆、base64 解码、字符串数组映射或高度压缩单行代码。  
> 位置：全局代码  
> 建议：保持代码可读性，勿使用混淆技术。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，也未操作 iframe src 为 javascript: 协议。  
> 位置：全局代码  
> 建议：继续避免直接插入不可信内容。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_notification、GM_setClipboard 等权限，但实际用途与功能相符，未检测到权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请必要权限，避免申请未使用的高权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API 读取、Notification API 滥用）。  
> 位置：全局代码  
> 建议：继续避免敏感 API 调用。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，也未检测到供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：全局代码  
> 建议：继续避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/d8fcb017ba7108be3b9813667e63b7f28cbf6424/GithubEnhanced-High-Speed-Download.user.js)*
