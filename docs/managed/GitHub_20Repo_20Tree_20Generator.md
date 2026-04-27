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

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-04-27

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。所有第三方库均来自可信 CDN 且固定版本。安全评分为 100，风险等级 SAFE。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> 脚本未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、navigator.sendBeacon），不存在数据外传行为。  
> 位置：全局  
> 建议：保持现有设计，避免添加任何外部数据传输。

**⛔ CRITICAL** — Privacy Collection  
> 脚本未检测到任何隐私采集行为（如读取 cookie、localStorage、sessionStorage、IndexedDB、监听键盘输入并外传、读取表单字段、访问指纹 API、读取剪贴板内容）。  
> 位置：全局  
> 建议：保持现有设计，避免添加隐私采集代码。

**🔴 HIGH** — Remote Code Execution  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML/outerHTML 执行外部脚本、@require 加载非可信 JS、document.write 插入脚本等远程代码执行风险。  
> 位置：全局  
> 建议：保持现有设计，避免动态执行外部代码。

**🔴 HIGH** — Code Obfuscation  
> 脚本未检测到任何代码混淆（无 base64 解码执行、字符串数组映射、unicode 混淆、高度压缩单行代码）。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS/Injection  
> 脚本未检测到任何 DOM XSS 或注入风险（未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未使用 document.write 插入不可信内容，未操作 iframe src 为 javascript: 协议）。  
> 位置：全局  
> 建议：保持现有设计，插入内容时始终注意转义。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请的 @grant 权限与实际代码使用相符（GM_addStyle、GM_setClipboard、GM_download），未申请未使用的高权限。  
> 位置：元数据  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — Supply Chain Risk  
> 脚本通过 @require 加载的第三方库均来自官方 CDN（cdnjs），且指定了固定版本，供应链风险较低。  
> 位置：元数据  
> 建议：继续使用可信 CDN 并固定版本。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://update.greasyfork.org/scripts/544254/GitHub%20Repo%20Tree%20Generator.user.js)*
