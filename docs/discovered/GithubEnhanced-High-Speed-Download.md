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

**风险等级**：🟡 LOW　　**安全评分**：97/100　　**分析时间**：2026-06-29

> 该脚本主要通过在 GitHub 页面上提供多种加速下载节点链接，方便用户选择加速源下载文件。未发现自动外传用户数据、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 滥用、供应链风险等安全问题。所有加速节点链接均为静态构造，未主动与第三方服务器通信。整体安全风险极低，适合日常使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟡 LOW** — Data Transmission  
> 脚本内包含大量第三方加速节点（CDN/proxy），但未发现自动向这些节点发送用户数据或页面内容的网络请求，所有加速链接均为静态构造用于替换下载链接，未主动外传数据。  
> 位置：全局  
> 建议：继续保持不自动上传用户数据，避免未来引入统计/追踪行为。

**🟡 LOW** — Privacy Collection  
> 未发现对 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单、键盘输入等敏感信息的读取或外传。  
> 位置：全局  
> 建议：如后续需用到本地存储，仅存储必要配置，避免存储敏感信息。

**🟡 LOW** — Remote Code Execution  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string)、动态 script 标签、innerHTML 执行 JS、document.write 等远程代码执行风险。  
> 位置：全局  
> 建议：保持当前实现，避免引入动态代码执行。

**🟡 LOW** — Obfuscation  
> 未发现代码混淆、base64 解码执行、字符串数组混淆、unicode 混淆或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，便于社区安全审计。

**🟡 LOW** — DOM XSS  
> 未发现 DOM XSS 风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：全局  
> 建议：如需插入动态内容，务必进行转义。

**🟡 LOW** — Permission Usage  
> @grant 权限申请与实际代码基本匹配，未发现高权限滥用。部分权限如 GM_openInTab、GM_setClipboard 仅用于用户交互功能。  
> 位置：元数据  
> 建议：如未使用部分权限，建议移除以最小化权限。

**🟡 LOW** — Sensitive API  
> 未发现敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Notification、Clipboard）被调用。  
> 位置：全局  
> 建议：如需使用敏感 API，需明确告知用户并最小化调用。

**🟡 LOW** — Supply Chain  
> 未使用 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用可信官方 CDN 并锁定版本。

**🟡 LOW** — ClickJacking/Iframe  
> 未发现脚本修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局  
> 建议：如需操作 iframe，需评估 ClickJacking 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/d8fcb017ba7108be3b9813667e63b7f28cbf6424/GithubEnhanced-High-Speed-Download.user.js)*
