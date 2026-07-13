---
title: "YouTube™ Ultimate Downloader v12.8 👑🌍 — Desktop & Mobile | Shorts, Videos & Music - SponsorBlock 🛡️🚫"
---

# YouTube™ Ultimate Downloader v12.8 👑🌍 — Desktop & Mobile | Shorts, Videos & Music - SponsorBlock 🛡️🚫



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_Ultimate_Downloader_v128_Desktop_Mobile_Shorts_Videos_Music_-_SponsorBlo.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**12.8 RTM**　　发现时间：**2026-05-04**　　来源：[GreasyFork](https://greasyfork.org/scripts/34613-youtube-ultimate-downloader-v12-8-desktop-mobile-shorts-videos-music-sponsorblock) <Badge type="tip" text="GreasyFork" />　　安装量：**442,764**　　评分：👍423 / 👎47

## 功能介绍



## 适用网站

- 通用

## 使用方法

- 请参阅脚本说明

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-07-13

> This script exposes the user's currently watched YouTube video ID to multiple third-party download services when the download button is used. While it does not collect cookies, localStorage, or other sensitive browser data, and does not use dangerous APIs or code execution techniques, the privacy risk of sending video IDs to untrusted third-party sites is significant. No code obfuscation, supply chain, or XSS risks detected. The script is not recommended for privacy-sensitive users.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：y2mate.stream, giggity.co.za, saveanyyoutube.com） |
| 隐私采集 | ❌ 检测到（Current YouTube video ID is sent to third-party download services when user clicks download button.） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script constructs download URLs using third-party services (y2mate.stream, giggity.co.za, saveanyyoutube.com, scoozy.ca) and opens them with the current YouTube video ID. This may leak the user's currently watched video and potentially other data if the third-party site collects more information.  
> 位置：MultiURL array and button click handler (code section where download URLs are constructed and opened)  
> 建议：Warn users about privacy risks when sending video IDs to third-party downloaders. Consider using only trusted services and review their privacy policies.

**⛔ CRITICAL** — Privacy Collection  
> The script does not appear to collect cookies, localStorage, or other sensitive browser data, nor does it listen to keyboard or clipboard events. However, the act of sending the current video ID to third-party sites is a privacy risk.  
> 位置：MultiURL usage and window.open calls  
> 建议：Minimize data sent to third-party services and inform users of privacy implications.

**🔴 HIGH** — Remote Code Execution  
> The script does not use eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection. No remote code execution risk detected.  
> 位置：N/A  
> 建议：No action needed.

**🔴 HIGH** — Code Obfuscation  
> No code obfuscation detected. The code is readable and not minified or encoded.  
> 位置：N/A  
> 建议：No action needed.

**🔴 HIGH** — DOM XSS  
> No DOM XSS or injection risk detected. The script does not insert untrusted user input into the DOM via innerHTML or similar methods.  
> 位置：N/A  
> 建议：No action needed.

**🟠 MEDIUM** — Permission Abuse  
> The script only requests the GM_addStyle permission, which is appropriate for its functionality. No permission abuse detected.  
> 位置：@grant metadata  
> 建议：No action needed.

**🟠 MEDIUM** — Sensitive API  
> No sensitive browser APIs (geolocation, WebRTC, MediaDevices, Clipboard, Notification) are used.  
> 位置：N/A  
> 建议：No action needed.

**🟠 MEDIUM** — Supply Chain Risk  
> No @require directives or dynamic loading of third-party libraries detected. No supply chain risk from external JS libraries.  
> 位置：Metadata block  
> 建议：No action needed.

**🟡 LOW** — ClickJacking/iframe  
> No iframe manipulation or frame protection bypass detected.  
> 位置：N/A  
> 建议：No action needed.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/34613-youtube-ultimate-downloader-v12-8-desktop-mobile-shorts-videos-music-sponsorblock)*
