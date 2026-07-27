---
title: "Telegram图片视频下载器"
---

# Telegram图片视频下载器

`下载工具`  `Telegram`  `图片视频`  `突破限制`  `私密频道`  `多媒体`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Telegram_Media_Downloader_Improved.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.4**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/525471-telegram-media-downloader-improved) <Badge type="tip" text="GreasyFork" />　　安装量：**31,048**　　评分：👍7 / 👎4

## 功能介绍

该脚本允许用户在Telegram网页版中下载图片、视频、GIF和语音消息，即使频道禁止下载和保存内容。适用于私密频道和群组，突破官方限制，方便保存多媒体文件。

## 适用网站

- Telegram网页版

## 使用方法

1. 安装脚本后，打开Telegram网页版。
2. 进入含有图片、视频或语音消息的频道或聊天。
3. 在消息旁会出现下载按钮，点击即可保存对应媒体文件。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-27

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。代码结构清晰，未申请任何高权限，未加载第三方库，整体安全性极高。建议持续保持现有安全设计，避免引入外部数据传输或敏感 API 调用。

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
> 脚本未检测到任何外部数据传输行为（如 GM_xmlhttpRequest、fetch、WebSocket、EventSource、navigator.sendBeacon），也未向第三方服务器发送用户数据或页面内容。  
> 位置：全局代码  
> 建议：保持现有设计，避免添加任何外部数据传输逻辑。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到任何隐私采集行为（如读取 cookie、localStorage、sessionStorage、IndexedDB、监听键盘输入、读取表单字段、访问指纹 API、读取剪贴板内容）。  
> 位置：全局代码  
> 建议：保持现有设计，避免添加任何隐私采集逻辑。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)，也未通过 innerHTML/outerHTML 插入外部脚本或动态加载远程 JS。  
> 位置：全局代码  
> 建议：保持现有设计，避免引入远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到任何代码混淆行为（无 base64 解码执行、无字符串数组映射、无大量 unicode 编码、无高度压缩单行代码）。  
> 位置：全局代码  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 或注入风险（未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未操作 iframe src 为 javascript: 协议）。  
> 位置：全局代码  
> 建议：保持现有安全设计，避免插入不可信内容。

**🟠 MEDIUM** — 权限滥用  
> 脚本未申请任何 @grant 权限，未滥用高权限 API。  
> 位置：元数据  
> 建议：仅申请必要权限，避免权限滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局代码  
> 建议：避免调用敏感 API，保护用户隐私。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载任何第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局代码  
> 建议：避免 iframe 滥用，防止 ClickJacking。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/525471-telegram-media-downloader-improved)*
