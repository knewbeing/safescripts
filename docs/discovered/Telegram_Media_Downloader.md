---
title: "Telegram受限图片视频下载器"
---

# Telegram受限图片视频下载器

`Telegram`  `下载工具`  `图片视频`  `语音消息`  `内容保存`  `受限频道`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Telegram_Media_Downloader.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.212**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/446342-telegram-media-downloader) <Badge type="tip" text="GreasyFork" />　　安装量：**215,530**　　评分：👍198 / 👎43

## 功能介绍

该脚本可以让你在Telegram网页版中下载被频道禁用下载的图片、视频、GIF和语音消息。即使频道限制保存内容，也能实现下载。

## 适用网站

- Telegram网页版

## 使用方法

1. 安装脚本后，打开Telegram网页版。
2. 进入你想下载内容的频道或聊天。
3. 在图片、视频、GIF或语音消息旁会出现下载按钮。
4. 点击按钮即可保存对应媒体文件到本地。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-06-15

> 该脚本仅用于在 Telegram Web 客户端下载受限媒体内容，未发现任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。安全性极高，适合公开使用。

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
> 脚本通过 fetch 请求 Telegram 本地资源（视频、图片等），但未向第三方服务器发送数据，也未携带用户敏感信息或 Cookie。未发现数据外传行为。  
> 位置：tel_download_video()、fetchNextPart()  
> 建议：保持现有行为，勿添加任何外部数据上报。

**⛔ CRITICAL** — Privacy Collection  
> 未发现隐私采集行为。脚本未读取 cookie、localStorage、sessionStorage、IndexedDB，也未监听键盘输入或表单字段。  
> 位置：全局  
> 建议：保持现有行为，勿添加隐私采集代码。

**🔴 HIGH** — Remote Code Execution  
> 未发现远程代码执行风险。脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)，也未动态加载外部 JS。  
> 位置：全局  
> 建议：避免动态执行字符串代码或加载不可信 JS。

**🔴 HIGH** — Code Obfuscation  
> 未发现代码混淆。代码结构清晰，无 base64/unicode 混淆，无高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS/Injection  
> 未发现 DOM XSS 或注入风险。未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未操作 iframe src 为 javascript:。  
> 位置：全局  
> 建议：插入内容时始终注意转义。

**🟠 MEDIUM** — Permission Abuse  
> 未申请任何 @grant 权限，未滥用高权限 API。  
> 位置：元数据  
> 建议：仅申请必要权限。

**🟠 MEDIUM** — Sensitive API Usage  
> 未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局  
> 建议：避免调用敏感 API。

**🟠 MEDIUM** — Supply Chain Risk  
> 未使用 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，固定版本并使用官方 CDN。

**🟡 LOW** — ClickJacking/Iframe Risk  
> 未修改 frame 保护策略，未创建隐藏 iframe。  
> 位置：全局  
> 建议：避免 iframe 滥用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/446342-telegram-media-downloader)*
