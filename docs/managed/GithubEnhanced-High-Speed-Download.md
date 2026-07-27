---
title: "Github增强 - 高速下载"
---

# Github增强 - 高速下载

`下载加速`  `Github增强`  `代码管理`  `资源获取`  `公益工具`  `便捷操作`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/GithubEnhanced-High-Speed-Download.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.6.38**　　最后更新：**2026-07-27**

## 功能介绍

本脚本为 Github 提供高速下载功能，包括 Git Clone/SSH、Release、Raw、Code(ZIP) 等文件的加速下载，并支持项目列表单文件快捷下载。通过公益加速源，提升下载速度，方便获取代码和资源。

## 适用网站

- Github
- bgithub加速镜像

## 使用方法

1. 安装脚本后，访问 Github 或 bgithub 镜像网站。
2. 在项目页面会出现高速下载按钮或菜单。
3. 点击对应按钮即可选择加速源进行下载。
4. 可在浏览器菜单中切换加速源或反馈问题。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除自定义菜单命令，保持菜单整洁。 |
| `GM_openInTab` | 用于在新标签页打开下载链接，便于多任务操作。 |
| `GM_getValue` | 用于保存和读取用户设置，如加速源选择。 |
| `GM_setValue` | 用于保存和读取用户设置，如加速源选择。 |
| `GM_notification` | 用于弹出通知提醒用户操作结果或提示信息。 |
| `GM_setClipboard` | 用于一键复制下载链接到剪贴板，方便粘贴使用。 |
| `window.onurlchange` | 用于监听页面地址变化，确保脚本功能在页面切换时正常工作。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：50/100　　**分析时间**：2026-07-27

> 该脚本主要通过重定向下载链接到第三方加速节点实现 Github 文件高速下载，存在数据外传风险（所有下载请求均被第三方服务器处理）。未发现隐私采集、远程代码执行、代码混淆、DOM XSS、供应链等高风险问题。建议用户下载敏感文件时谨慎使用，开发者应在文档中明确风险。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://gh.h233.eu.org, https://gh.ddlc.top, https://gh-proxy.org） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过修改下载链接，将用户的下载请求重定向到第三方加速代理服务器（如 gh.h233.eu.org、gh-proxy.org 等），存在数据外传风险。虽然主要为文件下载用途，但所有下载请求均会被第三方服务器处理，可能泄露用户下载行为和目标文件信息。  
> 位置：下载链接重定向逻辑（download_url_us、clone_url、raw_url 等数组及后续处理）  
> 建议：提醒用户这些加速节点为第三方，下载敏感文件时需谨慎。建议在文档中明确风险，或允许用户自定义节点。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等动态代码执行方式，也未通过 innerHTML/outerHTML 插入外部脚本。  
> 位置：全局代码审查  
> 建议：保持当前安全实践，避免后续引入远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 脚本未发现代码混淆、base64 解码、字符串映射或高度压缩单行代码。  
> 位置：全局代码审查  
> 建议：保持代码可读性，便于社区审查。

**🔴 HIGH** — DOM XSS  
> 脚本未发现 DOM XSS 风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：全局代码审查  
> 建议：保持当前安全实践，避免后续引入 XSS 风险。

**🟠 MEDIUM** — 隐私采集  
> 脚本未直接采集用户隐私数据（如 cookie、localStorage、表单、剪贴板等），但通过 GM_getValue/GM_setValue 存储用户配置，未发现敏感信息存储。  
> 位置：GM_getValue/GM_setValue 使用  
> 建议：确保仅存储非敏感配置项，避免后续扩展时采集隐私数据。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_notification、GM_setClipboard 等权限，实际代码中主要用于增强用户体验，未发现滥用高权限行为。  
> 位置：元数据 @grant 与实际代码对比  
> 建议：建议仅申请实际需要的权限，避免权限冗余。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API），仅使用 GM_notification 发送通知。  
> 位置：全局代码审查  
> 建议：保持当前安全实践，避免后续引入敏感 API 滥用。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，也未动态加载远程 JS，供应链风险较低。  
> 位置：元数据与代码审查  
> 建议：如需引入第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局代码审查  
> 建议：保持当前安全实践，避免后续引入 ClickJacking 风险。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/XIU2/UserScript/master/GithubEnhanced-High-Speed-Download.user.js)*
