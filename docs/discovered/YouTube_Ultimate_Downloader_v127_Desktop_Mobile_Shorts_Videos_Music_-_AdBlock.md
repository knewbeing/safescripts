---
title: "YouTube终极下载器"
---

# YouTube终极下载器

`视频下载`  `音乐下载`  `广告拦截`  `YouTube增强`  `短视频`  `多平台支持`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_Ultimate_Downloader_v127_Desktop_Mobile_Shorts_Videos_Music_-_AdBlock.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**12.7 RTM**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/34613-youtube-ultimate-downloader-v12-7-desktop-mobile-shorts-videos-music-adblock) <Badge type="tip" text="GreasyFork" />　　安装量：**442,153**　　评分：👍420 / 👎47

## 功能介绍

本脚本为YouTube和YouTube音乐页面添加一个悬浮下载按钮，支持下载视频、短视频和音乐，提供高质量下载。自带广告拦截功能，并能绕过YouTube检测弹窗，让下载过程更顺畅。

## 适用网站

- YouTube
- YouTube音乐

## 使用方法

1. 安装脚本后，打开YouTube或YouTube音乐页面。
2. 在视频、短视频或音乐页面会出现悬浮下载按钮。
3. 点击按钮即可选择下载视频、短视频或音乐。
4. 下载过程中无需担心广告和检测弹窗干扰。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于为页面添加自定义样式，让悬浮按钮更美观。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：75/100　　**分析时间**：2026-07-13

> This script adds a floating download button to YouTube, which sends the current video ID to several third-party download services. This constitutes a privacy risk, as user activity (video IDs, possibly referrer) is leaked to external servers. No other critical or high-risk behaviors (such as code execution, obfuscation, or sensitive data collection) were detected. The script requests minimal permissions and does not use dangerous APIs. The main risk is data exfiltration to untrusted third-party sites.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：y2mate.stream, africabazaar.co.za, saveanyyoutube.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script constructs download URLs using third-party services (y2mate.stream, africabazaar.co.za, saveanyyoutube.com, scoozy.ca) and opens them with the current YouTube video ID. This may leak user activity (video IDs, possibly referrer) to external servers.  
> 位置：MultiURL array and button click handler (not fully shown, but implied by code structure)  
> 建议：Warn users about privacy risks. Only use trusted download services. Avoid sending sensitive data to third parties.

**🟡 LOW** — Privacy Collection  
> The script does not appear to collect cookies, localStorage, or other sensitive browser data, nor does it listen to keyboard or clipboard events.  
> 位置：Global scope and main logic  
> 建议：No action needed.

**🟡 LOW** — Remote Code Execution  
> No use of eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection detected in the visible code.  
> 位置：Global scope and main logic  
> 建议：No action needed.

**🟡 LOW** — Obfuscation  
> No code obfuscation detected in the visible code. Code is readable and not minified/obfuscated.  
> 位置：Global scope and main logic  
> 建议：No action needed.

**🟡 LOW** — DOM XSS  
> No DOM XSS or injection risk detected in the visible code. No user input is inserted into the DOM via innerHTML/outerHTML/document.write.  
> 位置：Global scope and main logic  
> 建议：No action needed.

**🟡 LOW** — Permission Abuse  
> The script only requests GM_addStyle, which is appropriate for its functionality. No excessive permissions requested.  
> 位置：@grant metadata  
> 建议：No action needed.

**🟡 LOW** — Sensitive API  
> No use of sensitive APIs (geolocation, WebRTC, MediaDevices, Clipboard, Notification) detected.  
> 位置：Global scope and main logic  
> 建议：No action needed.

**🟡 LOW** — Supply Chain Risk  
> No @require or dynamic loading of third-party libraries detected. All code is inline.  
> 位置：Metadata and code  
> 建议：No action needed.

**🟡 LOW** — ClickJacking/iframe  
> No iframe manipulation or frame protection bypass detected.  
> 位置：Global scope and main logic  
> 建议：No action needed.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/34613-youtube-ultimate-downloader-v12-7-desktop-mobile-shorts-videos-music-adblock)*
