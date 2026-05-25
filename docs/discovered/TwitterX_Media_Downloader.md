---
title: "Twitter/X 媒体下载器"
---

# Twitter/X 媒体下载器

`下载工具`  `社交媒体`  `图片视频`  `Twitter`  `X`  `历史记录`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/TwitterX_Media_Downloader.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.3.1**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/571423-twitter-x-media-downloader) <Badge type="tip" text="GreasyFork" />　　安装量：**1,317**　　评分：👍11 / 👎0

## 功能介绍

本脚本可让用户在 Twitter 或 X 网站上一键下载图片和视频，支持自定义文件名，并记录下载历史。操作简单，方便保存社交媒体上的多媒体内容。

## 适用网站

- Twitter
- X

## 使用方法

1. 安装脚本后，访问 Twitter 或 X 网站。
2. 在推文的图片或视频旁会出现下载按钮。
3. 点击下载按钮即可保存媒体文件。
4. 可在设置中自定义文件名和查看下载历史。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于保存用户的设置和下载历史。 |
| `GM_getValue` | 用于读取用户的设置和下载历史。 |
| `GM_download` | 实现图片和视频的下载功能。 |
| `GM_addStyle` | 为页面添加自定义样式，优化界面显示。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-05-25

> 该脚本仅在 Twitter/X 页面上实现媒体下载功能，未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。安全评分为 100，属于安全脚本。

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
> 脚本未检测到任何外部数据传输行为（如 GM_xmlhttpRequest、fetch、WebSocket、sendBeacon 等），也未发现将用户数据发送到第三方服务器。  
> 位置：全局  
> 建议：保持现有状态，避免添加任何外部数据传输逻辑。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到任何隐私采集行为，如读取 cookie、localStorage、sessionStorage、IndexedDB、剪贴板、监听键盘输入等。  
> 位置：全局  
> 建议：保持现有状态，避免添加隐私采集逻辑。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等动态执行代码方式，也未通过 innerHTML/outerHTML 插入外部脚本。  
> 位置：全局  
> 建议：保持现有状态，避免引入远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到任何代码混淆特征，如 base64 解码执行、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未操作 iframe src 为 javascript: 协议。  
> 位置：全局  
> 建议：保持现有状态，确保所有插入 DOM 的内容均为可信数据。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请的 @grant 权限与实际代码使用相符，无权限滥用现象。  
> 位置：元数据与全局  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：全局  
> 建议：避免调用敏感 API，除非确有必要且需征得用户同意。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，建议使用官方 CDN 并固定版本哈希。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到 ClickJacking 或 iframe 风险，未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：保持现有状态，避免 iframe 滥用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/571423-twitter-x-media-downloader)*
