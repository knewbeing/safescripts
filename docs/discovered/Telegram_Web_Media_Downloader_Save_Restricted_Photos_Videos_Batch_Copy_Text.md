---
title: "Telegram网页版媒体下载器"
---

# Telegram网页版媒体下载器

`Telegram`  `下载`  `批量操作`  `受限内容`  `复制文本`  `网页增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Telegram_Web_Media_Downloader_Save_Restricted_Photos_Videos_Batch_Copy_Text.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/477900-telegram-web-media-downloader-save-restricted-photos-videos-batch-copy-text) <Badge type="tip" text="GreasyFork" />　　安装量：**24,680**　　评分：👍33 / 👎2

## 功能介绍

本脚本可在Telegram网页版下载图片和视频，支持单个或批量保存，即使在禁止转发的受限聊天中也能使用。同时恢复复制受保护消息中的文字功能。

## 适用网站

- Telegram网页版

## 使用方法

1. 安装脚本后，打开Telegram网页版。
2. 在聊天中选择图片或视频，可单个或批量下载。
3. 在受保护消息中，可直接复制文字。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，直接运行。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-13

> 该脚本仅在 Telegram Web 页面作用域内运行，未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。脚本逻辑清晰，未申请任何特权，安全性极高。适合普通用户放心使用。

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
> 脚本未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、sendBeacon），也未发现数据外传行为。  
> 位置：全局  
> 建议：保持现状，勿添加任何外传逻辑。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到任何隐私数据采集（如读取 cookie、localStorage、sessionStorage、IndexedDB、监听键盘输入、读取表单字段、指纹采集、剪贴板读取等）。  
> 位置：全局  
> 建议：保持现状，勿添加隐私采集逻辑。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)、动态 script 标签、@require、document.write 等远程代码执行相关 API。  
> 位置：全局  
> 建议：保持现状，勿引入动态代码执行。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到任何代码混淆（无 atob/btoa、字符串数组映射、unicode 混淆、高度压缩单行代码等）。  
> 位置：全局  
> 建议：保持源码可读性，便于安全审计。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未检测到任何 DOM XSS 风险（未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未使用 document.write 注入内容，未操作 iframe src 为 javascript:）。  
> 位置：全局  
> 建议：保持现状，插入 HTML 时始终注意信任边界。

**🟠 MEDIUM** — 权限滥用  
> 脚本未申请任何 @grant 权限（@grant none），无权限滥用风险。  
> 位置：元数据  
> 建议：如需申请权限，仅申请必要最小集。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：全局  
> 建议：如需调用敏感 API，需征得用户同意。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载任何第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，建议使用可信官方 CDN 并锁定版本哈希。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到任何 ClickJacking 或 iframe 风险（未修改 frame 保护策略，未创建隐藏 iframe）。  
> 位置：全局  
> 建议：如需操作 iframe，需确保安全边界。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/477900-telegram-web-media-downloader-save-restricted-photos-videos-batch-copy-text)*
