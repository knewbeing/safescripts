---
title: "GitHub仓库目录树生成器"
---

# GitHub仓库目录树生成器

`GitHub增强`  `目录树`  `项目管理`  `分享工具`  `界面优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/GitHub_20Repo_20Tree_20Generator.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1**　　最后更新：**2026-04-20**

## 功能介绍

本脚本可在 GitHub 仓库页面生成简洁的目录树，支持筛选和分享。用户可以一键复制目录结构、下载为图片或生成二维码，方便展示和分享项目结构。界面集成于 GitHub 页面，操作简单直观。

## 适用网站

- GitHub

## 使用方法

1. 安装脚本后，访问任意 GitHub 仓库页面。
2. 页面会出现“生成目录树”按钮，点击即可生成目录树。
3. 可筛选、复制、下载目录树或生成二维码进行分享。
4. 关闭弹窗即可返回正常浏览。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于为脚本界面和弹窗添加自定义样式。 |
| `GM_setClipboard` | 允许一键将生成的目录树内容复制到剪贴板。 |
| `GM_download` | 支持将目录树导出为图片等文件并下载到本地。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-20

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。所有第三方库均来自可信 CDN 且版本固定。安全评分为 100，风险等级 SAFE。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传检查  
> 脚本未检测到任何网络请求（GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、sendBeacon）用于数据外传。  
> 位置：全局代码  
> 建议：保持现有状态，勿添加外部数据传输。

**⛔ CRITICAL** — 隐私采集检查  
> 脚本未检测到任何隐私采集行为，如读取 cookie、localStorage、sessionStorage、IndexedDB、剪贴板内容、监听键盘输入并外传、访问指纹 API。  
> 位置：全局代码  
> 建议：保持现有状态，勿添加隐私采集代码。

**🔴 HIGH** — 远程代码执行检查  
> 脚本未检测到 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML/outerHTML 执行外部脚本、动态 script 标签加载远程 JS、document.write 插入脚本内容。  
> 位置：全局代码  
> 建议：保持现有状态，勿添加远程代码执行相关代码。

**🔴 HIGH** — 代码混淆检查  
> 脚本未检测到代码混淆特征，如 base64 解码执行、字符串数组索引映射、unicode 混淆、大量压缩单行代码。  
> 位置：全局代码  
> 建议：保持代码可读性，勿混淆。

**🔴 HIGH** — DOM XSS/注入检查  
> 脚本未检测到 DOM XSS 风险，如用户输入或 URL 参数直接插入 innerHTML/outerHTML、document.write 插入不可信内容、操作 iframe src 为 javascript: 协议。  
> 位置：全局代码  
> 建议：保持现有状态，勿插入不可信内容。

**🟠 MEDIUM** — 权限滥用检查  
> 脚本申请的 @grant 权限与实际代码使用相符，无高权限滥用。  
> 位置：元数据与全局代码  
> 建议：保持现有状态，勿申请未使用的高权限。

**🟠 MEDIUM** — 敏感 API 调用检查  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API 读取、Notification API）。  
> 位置：全局代码  
> 建议：保持现有状态，勿调用敏感 API。

**🟠 MEDIUM** — 供应链风险检查  
> @require 加载的第三方库均来自官方 CDN（cdnjs），且版本号固定，无供应链风险。  
> 位置：元数据  
> 建议：继续使用可信 CDN，并固定版本。

**🟡 LOW** — ClickJacking/iframe 风险检查  
> 脚本未检测到修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：全局代码  
> 建议：保持现有状态，勿滥用 iframe。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://update.greasyfork.org/scripts/544254/GitHub%20Repo%20Tree%20Generator.user.js)*
