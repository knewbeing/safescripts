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

**风险等级**：🟡 LOW　　**安全评分**：97/100　　**分析时间**：2026-07-13

> 该脚本主要通过在页面上添加加速下载链接，便于用户选择第三方公益 CDN/proxy 节点加速 Github 相关资源的下载。未检测到自动数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。所有网络请求均为用户主动触发，且仅为资源下载用途。整体安全风险极低，建议定期复查第三方加速节点的可信度。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟡 LOW** — Potential third-party data transmission  
> 脚本内定义了大量第三方加速节点（CDN/proxy），但未检测到自动向这些节点发送用户数据或页面内容的网络请求。仅在用户主动点击下载相关按钮时，才会重定向或构造下载链接。  
> 位置：全局变量 download_url_us, clone_url, raw_url 等  
> 建议：确保所有网络请求均为用户主动触发，且不携带敏感信息。

**🟡 LOW** — Privacy collection  
> 脚本未检测到对 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段、键盘事件等隐私相关 API 的访问或监听。  
> 位置：全局  
> 建议：继续保持，不要采集用户隐私数据。

**🟡 LOW** — Remote code execution  
> 未检测到 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML/outerHTML 注入外部脚本、document.write、@require 或动态 script 标签加载远程 JS。  
> 位置：全局  
> 建议：继续避免远程代码执行相关危险操作。

**🟡 LOW** — Obfuscation  
> 未检测到代码混淆、base64 解码执行、字符串数组混淆、unicode 混淆或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，便于社区审计。

**🟡 LOW** — Permission usage  
> @grant 权限申请与实际代码使用基本匹配，无明显高权限滥用。  
> 位置：元数据 @grant  
> 建议：如未使用 GM_openInTab 等高权限，可考虑移除。

**🟡 LOW** — Sensitive API usage  
> 未检测到敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）被调用。  
> 位置：全局  
> 建议：继续避免调用敏感 API。

**🟡 LOW** — Supply chain risk  
> 未检测到 @require 加载第三方库，也未发现供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用可信官方 CDN 并锁定版本。

**🟡 LOW** — ClickJacking/iframe risk  
> 未检测到脚本修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局  
> 建议：继续避免 ClickJacking/iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/d8fcb017ba7108be3b9813667e63b7f28cbf6424/GithubEnhanced-High-Speed-Download.user.js)*
