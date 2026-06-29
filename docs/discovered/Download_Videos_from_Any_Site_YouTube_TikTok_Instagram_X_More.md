---
title: "全站视频下载按钮"
---

# 全站视频下载按钮

`视频下载`  `社交媒体`  `短视频`  `播放器增强`  `多平台`  `实用工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Download_Videos_from_Any_Site_YouTube_TikTok_Instagram_X_More.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.2**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/583475-download-videos-from-any-site-youtube-tiktok-instagram-x-more) <Badge type="tip" text="GreasyFork" />　　安装量：**149**　　评分：👍2 / 👎0

## 功能介绍

在视频网站播放器控件旁添加一个简洁的下载按钮。用户点击即可通过 Chill Downloader 应用或网站快速保存视频。支持主流社交和短视频平台。

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

1. 安装脚本后，访问支持的网站如 YouTube、TikTok、Instagram 等。
2. 在视频播放器控件区（画质/设置旁）会出现下载按钮。
3. 点击下载按钮，选择通过 Chill Downloader 应用或网站保存视频。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_openInTab` | 用于在新标签页打开下载页面，方便保存视频。 |
| `GM_addStyle` | 用于为下载按钮和界面添加自定义样式，让按钮更美观。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-29

> The script does not collect or transmit user data automatically, nor does it perform network requests or use WebSockets. It adds a download button that, when clicked, opens external services with the current video URL as a parameter. No code obfuscation, DOM XSS, or supply chain risks detected. The main privacy concern is user-initiated sharing of URLs with third-party downloaders. Permissions are slightly over-provisioned but not dangerous.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — Potential privacy/data exposure  
> The script opens external URLs (including user video URLs as parameters) in new tabs or via custom protocol handlers, potentially exposing the current page's video URL to third-party services (chilldownloader.com, tool77.com, spotriff.com).  
> 位置：openTab() function and download button click handlers  
> 建议：Warn users that clicking the download button will send the video URL to external services. Consider adding user confirmation or documentation.

**🟠 MEDIUM** — Permission over-provision  
> The script requests the GM_openInTab permission, which allows opening arbitrary URLs in new tabs. This is not strictly necessary for basic DOM manipulation.  
> 位置：@grant GM_openInTab in metadata  
> 建议：Remove GM_openInTab if not strictly required, or document its necessity.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/583475-download-videos-from-any-site-youtube-tiktok-instagram-x-more)*
