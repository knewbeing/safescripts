---
title: "Telegram受限图片视频下载器"
---

# Telegram受限图片视频下载器

`Telegram`  `下载`  `图片`  `视频`  `语音`  `突破限制`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Telegram_Media_Downloader.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.212**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/446342-telegram-media-downloader) <Badge type="tip" text="GreasyFork" />　　安装量：**220,508**　　评分：👍201 / 👎43

## 功能介绍

该脚本允许用户在Telegram网页版中下载被频道限制无法保存的图片、视频、GIF和语音消息。即使频道禁止下载，也能一键保存媒体内容。

## 适用网站

- Telegram网页版

## 使用方法

1. 安装脚本后，打开Telegram网页版。
2. 进入含有受限媒体的频道或聊天。
3. 在媒体内容旁会出现下载按钮，点击即可保存对应文件。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-13

> 该脚本仅在 Telegram 官方 Web 站点下运行，功能为下载受限频道的媒体内容。未发现任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 滥用、供应链或 iframe 风险。整体实现安全，未发现安全隐患。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传（未发现问题）  
> 脚本通过 fetch 方式下载 Telegram 站内媒体资源，但未发现向第三方服务器发送数据的行为。  
> 位置：tel_download_video, fetchNextPart  
> 建议：保持现有实现，勿添加任何外部数据上报逻辑。

**⛔ CRITICAL** — 隐私采集（未发现问题）  
> 未发现读取 cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段、键盘输入等隐私相关数据。  
> 位置：全局  
> 建议：保持现有实现，勿添加隐私采集逻辑。

**🔴 HIGH** — 远程代码执行（未发现问题）  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string)、动态 script 标签、@require 远程 JS、document.write 等远程代码执行风险。  
> 位置：全局  
> 建议：保持现有实现，勿引入动态代码执行。

**🔴 HIGH** — 代码混淆（未发现问题）  
> 未发现代码混淆、base64 解码、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，勿混淆。

**🔴 HIGH** — DOM XSS/注入（未发现问题）  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未见 document.write 注入或 iframe src 操作。  
> 位置：全局  
> 建议：如需插入 HTML，务必转义用户输入。

**🟠 MEDIUM** — 权限滥用（未发现问题）  
> 未发现 @grant 权限声明，脚本未滥用高权限 API。  
> 位置：元数据  
> 建议：如需申请 GM_* 权限，仅申请必要权限。

**🟠 MEDIUM** — 敏感 API 调用（未发现问题）  
> 未发现敏感 API（如 geolocation、RTC、MediaDevices、Clipboard、Notification）调用。  
> 位置：全局  
> 建议：如需调用敏感 API，需征得用户同意。

**🟠 MEDIUM** — 供应链风险（未发现问题）  
> 未发现 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用可信官方 CDN 并锁定版本。

**🟡 LOW** — ClickJacking/iframe 风险（未发现问题）  
> 未发现修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局  
> 建议：如需操作 iframe，确保无 clickjacking 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/446342-telegram-media-downloader)*
