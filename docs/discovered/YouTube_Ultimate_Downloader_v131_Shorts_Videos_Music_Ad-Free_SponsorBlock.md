---
title: "YouTube终极下载器"
---

# YouTube终极下载器

`视频下载`  `音乐下载`  `无广告`  `SponsorBlock`  `YouTube增强`  `快捷工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_Ultimate_Downloader_v131_Shorts_Videos_Music_Ad-Free_SponsorBlock.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**13.1 GA**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/34613-youtube-ultimate-downloader-v13-1-shorts-videos-music-ad-free-sponsorblock) <Badge type="tip" text="GreasyFork" />　　安装量：**446,698**　　评分：👍428 / 👎47

## 功能介绍

本脚本为YouTube和YouTube音乐页面添加一个悬浮下载按钮，支持高质量下载视频、Shorts和音乐。集成SponsorBlock自动跳过赞助片段，并可绕过YouTube检测弹窗，提供无广告、流畅的下载体验。

## 适用网站

- YouTube
- YouTube音乐

## 使用方法

1. 安装Tampermonkey插件并添加本脚本。
2. 打开YouTube或YouTube音乐页面。
3. 在视频、Shorts或音乐页面点击悬浮下载按钮。
4. 按提示选择下载格式和质量，完成下载。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 允许脚本动态添加自定义样式，优化按钮显示效果。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：75/100　　**分析时间**：2026-07-27

> 该脚本主要风险在于通过 SponsorBlock API（https://sponsor.ajay.app/api/skipSegments）向第三方服务器发送用户正在观看的视频 ID，可能泄露用户的观看行为。除此之外，未检测到隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。建议用户知晓 SponsorBlock 数据外传风险，其他方面安全性较高。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://sponsor.ajay.app/api/skipSegments, YouTube internal APIs (for video info)） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script uses fetch to request SponsorBlock segments from https://sponsor.ajay.app/api/skipSegments, sending YouTube video IDs. This is a third-party API and may expose user video viewing activity.  
> 位置：SB_fetchSegments function (fetch call)  
> 建议：Warn users about SponsorBlock API usage and potential privacy implications. Consider anonymizing requests if possible.

**🟡 LOW** — Privacy Collection  
> No evidence of privacy collection such as reading cookies, localStorage, sessionStorage, or clipboard. No keylogger behavior detected.  
> 位置：Global script scope  
> 建议：Maintain current privacy practices.

**🟡 LOW** — Remote Code Execution  
> No eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection detected. No @require or document.write usage.  
> 位置：Global script scope  
> 建议：Maintain current code execution practices.

**🟡 LOW** — Code Obfuscation  
> No code obfuscation detected. Code is readable and not minified or encoded.  
> 位置：Global script scope  
> 建议：Maintain code transparency.

**🟡 LOW** — DOM XSS  
> No DOM XSS or injection risk detected. User input is not inserted into innerHTML/outerHTML.  
> 位置：Global script scope  
> 建议：Maintain current DOM handling.

**🟡 LOW** — Permission Abuse  
> Only GM_addStyle is granted, which is appropriate for styling. No excessive or unused permissions.  
> 位置：UserScript metadata  
> 建议：Maintain minimal permission usage.

**🟡 LOW** — Sensitive API  
> No sensitive API calls (geolocation, RTCPeerConnection, MediaDevices, Clipboard, Notification) detected.  
> 位置：Global script scope  
> 建议：Maintain current API usage.

**🟡 LOW** — Supply Chain Risk  
> No @require or external library loading detected. All code is local.  
> 位置：UserScript metadata  
> 建议：Maintain supply chain safety.

**🟡 LOW** — ClickJacking / iframe Risk  
> No iframe manipulation or clickjacking detected.  
> 位置：Global script scope  
> 建议：Maintain current iframe handling.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/34613-youtube-ultimate-downloader-v13-1-shorts-videos-music-ad-free-sponsorblock)*
