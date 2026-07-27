---
title: "Twitter/X 媒体下载器"
---

# Twitter/X 媒体下载器

`下载`  `社交媒体`  `图片视频`  `Twitter`  `X`  `历史记录`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/TwitterX_Media_Downloader.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.3.1**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/571423-twitter-x-media-downloader) <Badge type="tip" text="GreasyFork" />　　安装量：**2,947**　　评分：👍14 / 👎0

## 功能介绍

本脚本可让用户在 Twitter 或 X 网站上一键下载图片和视频，支持自定义文件名，并记录下载历史。操作简单，方便保存和管理社交媒体上的多媒体内容。

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
| `GM_setValue` | 用于保存用户设置和下载历史。 |
| `GM_getValue` | 用于读取用户设置和下载历史。 |
| `GM_download` | 实现图片和视频的下载功能。 |
| `GM_addStyle` | 用于美化和调整脚本界面样式。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-27

> 该脚本仅在 Twitter/X 页面本地操作，未检测到任何数据外传、隐私采集、远程代码执行、混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。安全性极高，适合公开使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传（未发现）  
> 脚本未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource），也未向第三方服务器发送数据。  
> 位置：全局代码审查  
> 建议：保持现有设计，避免添加任何外部数据传输。

**⛔ CRITICAL** — 隐私采集（未发现）  
> 脚本未读取 cookie、localStorage、sessionStorage、IndexedDB，也未监听键盘输入或读取表单字段、剪贴板内容。  
> 位置：全局代码审查  
> 建议：继续避免隐私采集行为。

**🔴 HIGH** — 远程代码执行（未发现）  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)，也未通过 innerHTML/outerHTML 插入外部脚本或动态加载远程 JS。  
> 位置：全局代码审查  
> 建议：继续避免远程代码执行风险。

**🔴 HIGH** — 代码混淆（未发现）  
> 脚本未发现混淆、压缩、base64 解码、字符串数组映射等混淆特征。  
> 位置：全局代码审查  
> 建议：保持代码可读性。

**🔴 HIGH** — DOM XSS/注入（未发现）  
> 脚本未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 document.write 注入或 iframe src 操作。  
> 位置：全局代码审查  
> 建议：继续避免 DOM XSS 风险。

**🟠 MEDIUM** — 权限滥用（未发现）  
> 脚本申请的 @grant 权限与实际使用相符，无高权限滥用或未使用高权限。  
> 位置：元数据与代码对比  
> 建议：仅申请必要权限。

**🟠 MEDIUM** — 敏感 API 调用（未发现）  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局代码审查  
> 建议：继续避免敏感 API 滥用。

**🟠 MEDIUM** — 供应链风险（未发现）  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，请固定版本并使用可信源。

**🟡 LOW** — ClickJacking/iframe 风险（未发现）  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局代码审查  
> 建议：继续避免 ClickJacking/iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/571423-twitter-x-media-downloader)*
