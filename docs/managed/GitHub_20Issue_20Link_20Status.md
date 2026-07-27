---
title: "Github 增强 - 高速下载"
---

# Github 增强 - 高速下载

`下载加速`  `Github增强`  `文件管理`  `开发工具`  `公益加速`  `便捷操作`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/GitHub_20Issue_20Link_20Status.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.6.38**　　最后更新：**2026-07-27**

## 功能介绍

本脚本为 Github 提供高速下载功能，支持加速 Git Clone/SSH、Release、Raw、Code(ZIP) 等文件。用户可在项目列表中快速下载单个文件，提升下载体验。

## 适用网站

- Github
- bgithub.xyz

## 使用方法

1. 安装脚本后，访问 Github 或 bgithub.xyz。
2. 在项目页面会出现加速下载按钮或菜单。
3. 点击按钮即可高速下载代码、文件或项目。
4. 如需自定义加速源，可在菜单中进行设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除自定义菜单命令。 |
| `GM_openInTab` | 用于在新标签页打开加速下载链接。 |
| `GM_getValue` | 用于保存脚本设置和用户偏好。 |
| `GM_setValue` | 用于修改和存储脚本设置。 |
| `GM_notification` | 用于弹出通知提醒用户操作结果。 |
| `GM_setClipboard` | 用于复制下载链接到剪贴板，方便用户粘贴。 |
| `window.onurlchange` | 用于监听网址变化，确保脚本在页面切换时正常工作。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：60/100　　**分析时间**：2026-07-27

> 该脚本主要风险在于将 Github 文件下载请求重定向到大量第三方加速代理服务器，存在数据外传和潜在隐私泄露风险。未检测到隐私采集、远程代码执行、代码混淆、DOM XSS、供应链等其他高危行为。建议用户仅用于公开文件下载，敏感内容请勿通过第三方加速节点。整体安全评分为 60，风险等级为 HIGH。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：gh.h233.eu.org, gh.ddlc.top, gh-proxy.org） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本将 Github 文件下载请求重定向到多个第三方加速代理服务器，涉及大量外部数据传输。  
> 位置：download_url_us, clone_url, raw_url 等数组及相关下载逻辑  
> 建议：警告用户这些加速节点为第三方，下载敏感内容需谨慎，建议仅用于公开文件。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到隐私采集行为，如读取 cookie、localStorage、sessionStorage、IndexedDB、表单、剪贴板等。  
> 位置：全局代码  
> 建议：保持现有状态，勿添加隐私采集逻辑。

**🔴 HIGH** — 远程代码执行  
> 脚本未检测到远程代码执行风险，如 eval/new Function/setTimeout(string)/setInterval(string) 或动态加载外部 JS。  
> 位置：全局代码  
> 建议：保持现有状态，勿添加动态代码执行逻辑。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到代码混淆行为，代码结构清晰，无 base64/unicode/字符串数组混淆。  
> 位置：全局代码  
> 建议：保持代码可读性，勿混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 或注入风险，无用户输入直接插入 innerHTML/outerHTML 或 document.write。  
> 位置：全局代码  
> 建议：继续避免不可信内容插入 DOM。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_notification、GM_setClipboard 等权限，但实际用途与功能相符，无权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请必要权限，定期复查。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API，如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API（读取）、Notification API（仅用于通知）。  
> 位置：全局代码  
> 建议：继续避免敏感 API 滥用。

**🟠 MEDIUM** — 供应链风险  
> 脚本未使用 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，务必固定版本哈希并使用可信 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到 ClickJacking 或 iframe 风险，无 frame 保护策略修改或隐藏 iframe 数据提取。  
> 位置：全局代码  
> 建议：继续避免 iframe 滥用。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://update.greasyfork.org/scripts/412245/GitHub%20Issue%20Link%20Status.user.js)*
