---
title: 密码显示助手
---

# 密码显示助手

`密码显示`  `输入框增强`  `用户体验`  `快捷键切换`  `网页辅助`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/Password-Revealer.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.0**　　最后更新：**2026-04-15**

## 功能介绍

本脚本可以让网页上的密码输入框内容以多种方式显示，包括聚焦时显示、鼠标悬浮时预览、双击切换显示状态以及始终显示密码。用户可以通过菜单或快捷键（Meta/Ctrl+Alt+P）方便地切换显示模式。它帮助用户更方便地查看密码输入内容，提升使用体验。

## 适用网站

- 所有网站

## 使用方法

1. 安装脚本后，打开任意网页的密码输入框。
2. 根据需要，将鼠标聚焦、悬浮或双击密码框查看密码。
3. 通过右键菜单或按快捷键（Meta/Ctrl+Alt+P）切换不同的密码显示模式。
4. 选择“始终可见”模式可让密码框内容一直显示。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取脚本保存的设置和状态 |
| `GM_setValue` | 用于保存脚本的设置和状态 |
| `GM_registerMenuCommand` | 用于在脚本菜单中注册切换显示模式的命令 |
| `GM_unregisterMenuCommand` | 用于注销脚本菜单中的命令 |
| `GM_addStyle` | 用于添加自定义样式美化密码显示效果 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-06-15

> 脚本不会外传任何数据，也不远程加载代码，权限申请合理，无混淆和 XSS 风险。但由于会读取并明文显示用户密码输入框内容，存在本地隐私暴露风险（尤其在公共场所或多人共用设备时）。建议用户谨慎使用，开发者确保仅在用户主动操作时显示密码。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（读取页面 input[type='password'] 的 value 并以明文显示） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 隐私采集  
> 脚本会读取和操作页面上的密码输入框（type='password'），将其内容以明文显示，但未将密码数据发送到任何外部服务器。  
> 位置：所有页面 input[type='password'] 元素  
> 建议：确保仅在用户明确操作（如聚焦、悬浮、双击、菜单切换、快捷键）时显示密码内容，避免自动暴露。

**⛔ CRITICAL** — 数据外传（未发现问题，仅说明）  
> 脚本未检测到任何网络请求（GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、sendBeacon），不存在数据外传行为。  
> 位置：全局  
> 建议：保持无数据外传，勿添加任何外部通信代码。

**🔴 HIGH** — 远程代码执行（未发现问题，仅说明）  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML 插入脚本、document.write、动态加载远程 JS，无远程代码执行风险。  
> 位置：全局  
> 建议：继续避免动态代码执行和远程脚本加载。

**🔴 HIGH** — 代码混淆（未发现问题，仅说明）  
> 脚本未检测到代码混淆、base64 解码、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS/注入（未发现问题，仅说明）  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未检测到 DOM XSS 注入风险。  
> 位置：全局  
> 建议：继续避免不可信内容插入 DOM。

**🟠 MEDIUM** — 权限滥用（未发现问题，仅说明）  
> 脚本申请的 @grant 权限与实际使用相符，无权限滥用。未申请 GM_download、GM_openInTab 等高风险权限。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 敏感 API 调用（未发现问题，仅说明）  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：全局  
> 建议：继续避免敏感 API 调用。

**🟠 MEDIUM** — 供应链风险（未发现问题，仅说明）  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据 @require  
> 建议：如需加载第三方库，务必使用官方 CDN 并固定版本哈希。

**🟡 LOW** — ClickJacking/iframe 风险（未发现问题，仅说明）  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe。  
> 位置：全局  
> 建议：避免 iframe 操作和 ClickJacking。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/MiPoNianYou/UserScripts/main/Scripts/Password-Revealer.user.js)*
