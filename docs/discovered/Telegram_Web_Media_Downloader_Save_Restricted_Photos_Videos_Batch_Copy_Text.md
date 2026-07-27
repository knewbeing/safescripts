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

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-27

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM 注入、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。代码结构清晰，权限申请合理，未加载第三方库。整体安全性极高，适合在 Telegram Web 环境下使用。

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
> 脚本未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、navigator.sendBeacon），也未向第三方服务器发送数据。  
> 位置：全局  
> 建议：保持现有状态，勿添加外部数据传输逻辑。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage、IndexedDB，也未监听键盘输入或读取表单字段、剪贴板内容。  
> 位置：全局  
> 建议：保持现有状态，勿添加隐私采集逻辑。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)，也未通过 innerHTML/outerHTML 插入外部脚本或动态加载远程 JS。  
> 位置：全局  
> 建议：保持现有状态，勿添加远程代码执行相关逻辑。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到任何代码混淆特征（如 base64 解码、字符串数组映射、unicode 混淆、高度压缩单行代码）。  
> 位置：全局  
> 建议：保持代码可读性，勿采用混淆技术。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未操作 iframe src 为 javascript: 协议，也未通过 document.write 插入不可信内容。  
> 位置：全局  
> 建议：保持现有状态，勿添加 DOM 注入风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本未申请任何 @grant 权限，实际代码与权限申请一致，无权限滥用。  
> 位置：元数据  
> 建议：如需增加权限，需严格对比实际用途。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：全局  
> 建议：保持现有状态，勿调用敏感 API。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载任何第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，建议使用官方 CDN 并固定版本哈希。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：保持现有状态，勿添加 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/477900-telegram-web-media-downloader-save-restricted-photos-videos-batch-copy-text)*
