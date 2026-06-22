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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-22

> The script does not automatically transmit user data or page content to third-party servers. All external navigation occurs only when the user clicks the download button, which opens the current page's URL in a third-party downloader service. No privacy-invasive data collection, code obfuscation, or remote code execution is present. The only elevated permission is GM_openInTab, which is used appropriately. Overall, the script is low risk, but users should be aware that clicking the download button will send the current page URL to an external service.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — Permission usage  
> The script requests the GM_openInTab permission, which is used to open external URLs in new tabs. This is a medium-risk permission if misused, but in this script, usage is appropriate and limited to user interaction.  
> 位置：@grant GM_openInTab and openTab() function  
> 建议：No action needed unless the permission is used for background or automatic tab opening. Monitor for future code changes.

**🟡 LOW** — User-initiated data transmission  
> The script opens external URLs (chilldownloader.com, tool77.com, spotriff.com) with the current page's video URL as a parameter when the user clicks the download button. This is not automatic data exfiltration, but user-initiated navigation.  
> 位置：openTab() function and download button click handlers  
> 建议：Clearly inform users that clicking the button will send the current page URL to a third-party service. No automatic data transmission detected.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/583475-download-videos-from-any-site-youtube-tiktok-instagram-x-more)*
