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

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-07-13

> The script adds a download button to supported video/music sites. When clicked, it opens a third-party downloader site/app with the current video/track URL as a parameter. This results in user data (the video/track URL) being sent to external servers. No evidence of keylogging, clipboard access, or DOM XSS was found. The script does not appear obfuscated or minified. The use of GM_openInTab is a medium risk due to its potential for abuse. No supply chain or sensitive API risks detected.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://chilldownloader.com, https://www.tool77.com, https://www.spotriff.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script opens external URLs (chilldownloader.com, tool77.com, spotriff.com) with the current video/track URL as a parameter when the user clicks the download button. This constitutes data transmission to third-party servers.  
> 位置：Main script logic (button click handler)  
> 建议：Warn users that their video/track URL will be sent to third-party services. Consider adding a confirmation dialog or privacy notice.

**🟠 MEDIUM** — Permission Overuse  
> The script requests GM_openInTab permission, which allows opening arbitrary URLs in new tabs. This is a high-privilege API and could be abused if the script is modified.  
> 位置：Metadata block (@grant GM_openInTab)  
> 建议：Only request GM_openInTab if strictly necessary. Review code to ensure it is not used for malicious redirects.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/583475-download-videos-from-any-site-youtube-tiktok-instagram-x-more)*
