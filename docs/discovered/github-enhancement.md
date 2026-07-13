---
title: "Github增强"
---

# Github增强

`下载加速`  `Github增强`  `文件管理`  `快捷操作`  `开发工具`  `公益加速`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/github-enhancement.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.0.2**　　发现时间：**2026-06-22**　　来源：[pdone/jset](https://github.com/pdone/jset) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为 Github 网站提供高速下载功能，包括 Git Clone/SSH、Release、Raw、Code(ZIP) 等文件的加速下载。支持项目列表中单文件的快捷下载，提升文件获取效率。

## 适用网站

- Github

## 使用方法

1. 安装脚本后，访问 Github 网站。
2. 在项目页面或文件列表中，会出现加速下载按钮。
3. 点击相应按钮即可高速下载文件或项目。
4. 可在脚本菜单中调整相关功能设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除脚本菜单中的命令。 |
| `GM_openInTab` | 允许脚本在新标签页打开链接，便于下载或查看文件。 |
| `GM_getValue` | 用于存储和读取用户的配置或偏好设置。 |
| `GM_setValue` | 用于保存用户的配置或偏好设置。 |
| `GM_notification` | 在桌面弹出通知，提醒用户操作结果。 |
| `GM_setClipboard` | 将内容复制到剪贴板，方便用户快速获取下载链接。 |
| `window.onurlchange` | 监听页面地址变化，确保脚本在页面切换时正常工作。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-13

> 该脚本主要用于在 Github 页面上增强下载体验，未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险或权限滥用等安全问题。所有 @grant 权限均有实际用途。整体安全性高，适合公开分发。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何网络请求（如 fetch、GM_xmlhttpRequest、XMLHttpRequest、WebSocket、sendBeacon 等）用于数据外传。  
> 位置：全局  
> 建议：保持现状，勿添加任何外传逻辑。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到任何隐私数据采集行为（如读取 cookie、localStorage、sessionStorage、IndexedDB、监听键盘输入、读取表单字段、访问指纹 API、读取剪贴板等）。  
> 位置：全局  
> 建议：保持现状，勿添加任何隐私采集逻辑。

**🔴 HIGH** — 远程代码执行  
> 脚本未检测到 eval、new Function、setTimeout(string)、setInterval(string)、动态 script 标签、@require 远程 JS、document.write 等远程代码执行风险。  
> 位置：全局  
> 建议：保持现状，勿引入动态执行代码。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到代码混淆、base64 解码、字符串数组混淆、unicode 混淆或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 风险（如用户输入或 URL 参数直接插入 innerHTML/outerHTML、document.write 注入、iframe src 操作等）。  
> 位置：全局  
> 建议：如后续涉及动态内容插入，需严格转义。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了部分 GM_* 权限（如 GM_openInTab、GM_notification、GM_setClipboard），但均有实际用途，未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未检测到敏感 API 调用（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API 读取、Notification 滥用等）。  
> 位置：全局  
> 建议：如需使用敏感 API，需征得用户同意。

**🟠 MEDIUM** — 供应链风险  
> 脚本未检测到 @require 加载第三方库，无供应链风险。  
> 位置：元数据 @require  
> 建议：如需引入第三方库，建议使用官方 CDN 并锁定版本。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到对 frame 保护策略的修改，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：保持现状，勿引入相关风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/pdone/jset/4ceee304614b90219ecdf58633516b71f49511d1/src/github-enhancement.user.js)*
