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

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-27

> 该脚本仅用于在 Telegram Web 客户端下载受限媒体内容，未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。安全评分为 100，属于安全脚本。建议持续保持代码透明与安全，避免引入高风险行为。

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
> 脚本未检测到任何网络请求向第三方服务器发送用户数据、页面内容或 Cookie。所有 fetch 请求仅用于下载 Telegram 媒体资源，未涉及外部数据传输。  
> 位置：tel_download_video() fetch 调用  
> 建议：保持现有行为，避免添加任何外部数据上报逻辑。

**⛔ CRITICAL** — 隐私采集  
> 脚本未监听键盘输入、未读取表单字段、未访问剪贴板、未读取 cookie/localStorage/sessionStorage/IndexedDB，也未调用指纹相关 API。  
> 位置：全局代码与事件处理  
> 建议：继续保持不采集用户隐私数据。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)，也未通过 innerHTML/outerHTML 插入外部脚本或动态加载远程 JS。  
> 位置：全局代码  
> 建议：避免引入远程代码执行相关危险用法。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到任何代码混淆行为，无 base64 解码、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：全局代码  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未检测到 DOM XSS 风险。  
> 位置：createProgressBar() 等 DOM 操作  
> 建议：如需插入用户输入，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> 脚本未申请任何 @grant 权限，未检测到权限滥用。  
> 位置：元数据与代码  
> 建议：仅申请必要权限，避免高权限滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局代码  
> 建议：如需调用敏感 API，需征得用户明确同意。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载任何第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局代码  
> 建议：避免 iframe 滥用，防止 ClickJacking。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/446342-telegram-media-downloader)*
