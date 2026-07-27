---
title: "全站视频下载按钮"
---

# 全站视频下载按钮

`视频下载`  `社交媒体`  `一键操作`  `播放器增强`  `多平台支持`  `实用工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Download_Videos_from_Any_Site_YouTube_TikTok_Instagram_X_More.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.4**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/583475-download-videos-from-any-site-youtube-tiktok-instagram-x-more) <Badge type="tip" text="GreasyFork" />　　安装量：**816**　　评分：👍2 / 👎0

## 功能介绍

在各大视频网站播放器界面添加下载按钮，方便用户一键下载视频。支持通过 Chill Downloader 应用或网站快速保存视频。操作简单，无需复杂设置。

## 适用网站

- YouTube
- TikTok
- Instagram
- Facebook
- FB Watch
- Twitter
- X
- Threads
- 抖音
- 小红书
- Snapchat
- Pinterest
- TED
- Spotify

## 使用方法

1. 安装脚本后，访问支持的网站如YouTube、抖音等。
2. 在视频播放器控制栏看到新增下载按钮。
3. 点击下载按钮，选择通过 Chill Downloader 应用或网站保存视频。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_openInTab` | 用于在新标签页打开 Chill Downloader 网站或下载页面。 |
| `GM_addStyle` | 用于为下载按钮和界面添加自定义样式。 |
| `GM_setValue` | 用于保存用户偏好设置，如按钮显示状态。 |
| `GM_getValue` | 用于读取用户偏好设置，保持脚本个性化体验。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：75/100　　**分析时间**：2026-07-27

> 该脚本通过下载按钮将视频 URL 发送到第三方服务（chilldownloader.com、tool77.com、spotriff.com），存在数据外传和隐私风险。未检测到代码混淆、远程代码执行、DOM XSS、敏感 API 调用或供应链风险。建议警告用户并允许手动操作，移除未使用的高权限申请。整体安全评分为 75，风险等级为 CRITICAL。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：chilldownloader://download?url=, https://chilldownloader.com, https://www.tool77.com/it/v/downloader?url={url}） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script sends video URLs to third-party services (chilldownloader.com, tool77.com, spotriff.com) for download processing. This constitutes data transmission to external servers.  
> 位置：APP_SITE_URL, WEB_DOWNLOADER, SPOTIFY_DOWNLOADER usage in download button logic  
> 建议：Warn users about privacy risks and allow manual URL copy instead of automatic transmission. Consider local download logic.

**🟠 MEDIUM** — Permission Abuse  
> Script requests GM_openInTab, GM_addStyle, GM_setValue, GM_getValue. Only GM_openInTab is used for opening download links. No evidence of privilege abuse.  
> 位置：Metadata and download logic  
> 建议：Remove unused GM_setValue and GM_getValue grants if not used.

**🟡 LOW** — Privacy Collection  
> No evidence of privacy collection such as reading cookies, localStorage, sessionStorage, or clipboard. No keylogger behavior detected.  
> 位置：Entire script  
> 建议：Maintain current practice; do not add privacy collection.

**🟡 LOW** — Remote Code Execution  
> No eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection detected.  
> 位置：Entire script  
> 建议：Maintain current practice; avoid remote code execution vectors.

**🟡 LOW** — Code Obfuscation  
> No code obfuscation detected. Code is readable and not minified or encoded.  
> 位置：Entire script  
> 建议：Maintain transparency; avoid obfuscation.

**🟡 LOW** — DOM XSS  
> No DOM XSS or injection risk detected. User input is not inserted into innerHTML/outerHTML.  
> 位置：Entire script  
> 建议：Maintain current practice; sanitize any future user input.

**🟡 LOW** — Sensitive API  
> No sensitive API calls (geolocation, RTCPeerConnection, MediaDevices, Clipboard API, Notification API) detected.  
> 位置：Entire script  
> 建议：Maintain current practice; avoid sensitive API usage.

**🟡 LOW** — Supply Chain  
> No @require third-party libraries used. All code is inline.  
> 位置：Metadata  
> 建议：Maintain current practice; avoid supply chain risk.

**🟡 LOW** — ClickJacking  
> No iframe manipulation or clickjacking detected.  
> 位置：Entire script  
> 建议：Maintain current practice; avoid iframe risks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/583475-download-videos-from-any-site-youtube-tiktok-instagram-x-more)*
