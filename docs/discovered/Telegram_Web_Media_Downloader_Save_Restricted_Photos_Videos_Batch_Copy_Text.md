---
title: "Telegram网页版媒体下载器"
---

# Telegram网页版媒体下载器

`Telegram`  `下载`  `批量操作`  `图片视频`  `受限聊天`  `复制文字`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Telegram_Web_Media_Downloader_Save_Restricted_Photos_Videos_Batch_Copy_Text.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/477900-telegram-web-media-downloader-save-restricted-photos-videos-batch-copy-text) <Badge type="tip" text="GreasyFork" />　　安装量：**23,334**　　评分：👍33 / 👎2

## 功能介绍

本脚本可让你在Telegram网页版下载图片和视频，无论是单个还是批量，即使在禁止转发的受限聊天中也能使用。同时恢复复制受保护消息中的文字功能。

## 适用网站

- Telegram网页版

## 使用方法

1. 安装脚本后，打开Telegram网页版。
2. 进入任何聊天，选择图片或视频，即可看到下载按钮。
3. 可批量选择多个媒体进行下载。
4. 在受保护消息中可直接复制文字。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本无需额外权限即可运行。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-06-15

> 该脚本仅调用 Telegram Web 页面已有的下载管理器，无任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。安全评分为 100，风险极低。

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
> 脚本未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource），也未向第三方服务器发送数据。  
> 位置：全局  
> 建议：保持无数据外传，确保未来版本不引入外部通信。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage、IndexedDB，也未监听键盘输入或读取表单字段、剪贴板内容。  
> 位置：全局  
> 建议：继续避免隐私采集，确保仅处理页面已有的媒体对象。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)，也未通过 innerHTML/outerHTML 插入外部脚本或动态加载远程 JS。  
> 位置：全局  
> 建议：保持无远程代码执行风险，避免未来引入动态代码执行。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到任何代码混淆、base64 解码、字符串数组映射或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，插入的 HTML 均为固定字符串，未检测到 DOM XSS 风险。  
> 位置：addDownloadItem, addBatchButton  
> 建议：如需插入用户数据，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> 脚本未申请任何 @grant 权限，实际代码与权限申请一致，无权限滥用。  
> 位置：元数据 @grant none  
> 建议：保持最小权限原则。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：全局  
> 建议：继续避免敏感 API 调用。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载任何第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：保持无 ClickJacking/iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/477900-telegram-web-media-downloader-save-restricted-photos-videos-batch-copy-text)*
