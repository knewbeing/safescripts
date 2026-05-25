---
title: "Telegram受限图片视频下载器"
---

# Telegram受限图片视频下载器

`Telegram`  `下载`  `图片`  `视频`  `语音`  `突破限制`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Telegram_Media_Downloader.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.212**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/446342-telegram-media-downloader) <Badge type="tip" text="GreasyFork" />　　安装量：**210,727**　　评分：👍195 / 👎43

## 功能介绍

此脚本可让你在Telegram网页版中下载被频道限制的图片、视频、GIF和语音消息，即使频道禁止下载和保存内容。

## 适用网站

- Telegram网页版

## 使用方法

1. 安装脚本后，打开Telegram网页版。
2. 进入你想下载内容的频道或聊天。
3. 在受限内容旁会出现下载按钮，点击即可保存图片、视频或语音。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-05-25

> 该脚本仅用于在 Telegram 官方 Web 应用中下载媒体内容，无数据外传、隐私采集、远程代码执行、混淆、DOM 注入、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。安全评分为 100，风险等级 SAFE。建议持续保持代码透明与安全，勿添加高风险功能。

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
> 脚本使用 fetch API 仅向 Telegram 源站请求媒体内容，没有向第三方服务器发送数据，也未携带用户敏感信息。  
> 位置：tel_download_video() -> fetch(url)  
> 建议：确保 fetch 请求目标仅为 Telegram 官方域名，避免修改为第三方。

**⛔ CRITICAL** — Privacy Collection  
> 未发现 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板读取、键盘监听等隐私采集行为。  
> 位置：全局代码审查  
> 建议：保持现有状态，勿添加隐私采集代码。

**🔴 HIGH** — Remote Code Execution  
> 未使用 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML 执行脚本等远程代码执行风险。  
> 位置：全局代码审查  
> 建议：避免动态执行字符串代码。

**🔴 HIGH** — Code Obfuscation  
> 代码未混淆，无 base64 解码、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：全局代码审查  
> 建议：保持代码可读性，勿混淆。

**🔴 HIGH** — DOM XSS/Injection  
> 未发现用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 document.write 注入风险。  
> 位置：createProgressBar(), updateProgress() 等 DOM 操作  
> 建议：如需插入用户输入，务必转义。

**🟠 MEDIUM** — Permission Abuse  
> 未申请任何 @grant 权限，未滥用高权限 API。  
> 位置：元数据与代码  
> 建议：如需申请权限，按需申请，避免多余高权限。

**🟠 MEDIUM** — Sensitive API Usage  
> 未调用敏感 API（地理位置、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局代码审查  
> 建议：如需调用敏感 API，需征得用户同意。

**🟠 MEDIUM** — Supply Chain Risk  
> 未使用 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，使用官方 CDN 并固定版本。

**🟡 LOW** — ClickJacking / iframe Risk  
> 未修改 frame 保护策略，未创建隐藏 iframe。  
> 位置：全局代码审查  
> 建议：如需使用 iframe，需明确用途并防范 clickjacking。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/446342-telegram-media-downloader)*
