---
title: "Telegram图片视频下载器 (Improved)"
---

# Telegram图片视频下载器 (Improved)

`Telegram`  `下载`  `图片视频`  `私密频道`  `网页增强`  `媒体保存`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Telegram_Media_Downloader_Improved.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.4**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/525471-telegram-media-downloader-improved) <Badge type="tip" text="GreasyFork" />　　安装量：**29,801**　　评分：👍7 / 👎4

## 功能介绍

该脚本可以让你在Telegram网页版中下载原本无法保存的图片、视频、GIF和语音消息，尤其适用于禁止下载内容的私密频道。

## 适用网站

- Telegram网页版

## 使用方法

1. 1. 安装脚本后，打开Telegram网页版。
2. 2. 进入包含图片、视频或语音消息的频道或聊天。
3. 3. 在消息旁会出现下载按钮，点击即可保存媒体文件。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-06-15

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。代码结构清晰，未申请任何高权限，未加载第三方库，整体安全性极高。建议继续保持现有安全实践。若后续更新涉及网络请求或敏感数据操作，需重新审查。当前安全评分为100分。

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
> 未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource）向第三方服务器发送数据，也未发现数据上报、统计、追踪或推送行为。  
> 位置：全局代码  
> 建议：保持现有状态，避免添加任何外部数据传输逻辑。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage、IndexedDB，也未监听键盘输入或读取表单字段、剪贴板内容，未访问浏览器指纹相关 API。  
> 位置：全局代码  
> 建议：继续避免任何隐私数据采集行为。

**🔴 HIGH** — 远程代码执行  
> 未使用 eval、new Function、setTimeout(string)、setInterval(string)，也未通过 innerHTML/outerHTML 插入外部脚本或动态加载远程 JS。  
> 位置：全局代码  
> 建议：保持现有安全实践，避免远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 代码未混淆，无 base64 解码、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：全局代码  
> 建议：保持代码可读性，便于社区审查。

**🔴 HIGH** — DOM XSS / 注入  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未操作 iframe src 为 javascript: 协议，也未通过 document.write() 插入不可信内容。  
> 位置：全局代码  
> 建议：继续避免 DOM XSS 和注入风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本未申请任何 @grant 权限，也未使用 GM_openInTab、GM_download 等高权限 API。  
> 位置：元数据  
> 建议：仅申请必要权限，避免权限滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局代码  
> 建议：继续避免敏感 API 滥用。

**🟠 MEDIUM** — 供应链风险  
> 未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用官方 CDN 并固定版本哈希。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局代码  
> 建议：继续避免 ClickJacking 和 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/525471-telegram-media-downloader-improved)*
