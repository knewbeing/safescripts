---
title: "EasyTube V4.0 — 广告跳过、SponsorBlock 和 HD 下载器（无卡顿）"
---

# EasyTube V4.0 — 广告跳过、SponsorBlock 和 HD 下载器（无卡顿）

`广告屏蔽`  `YouTube增强`  `视频下载`  `SponsorBlock`  `画质提升`  `自动化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/EasyTube_V40_Ad_Skip_SponsorBlock_HD_Download_No_Lag.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**4.0.0**　　发现时间：**2026-05-11**　　来源：[GreasyFork](https://greasyfork.org/scripts/561432-easytube-v4-0-ad-skip-sponsorblock-hd-download-no-lag) <Badge type="tip" text="GreasyFork" />　　安装量：**6,375**　　评分：👍8 / 👎3

## 功能介绍

本脚本可自动跳过YouTube上的所有广告，集成SponsorBlock自动跳过视频中的赞助内容，强制启用4K画质，并支持通过evdfrance.fr一键下载高清视频。还能记住你的设置，并绕过广告拦截检测，使用流畅不卡顿。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后，打开YouTube任意视频页面。
2. 广告会自动被跳过，赞助内容自动跳过。
3. 如需下载视频，页面会出现下载按钮，点击即可。
4. 脚本会自动记住你的偏好设置，无需重复操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于向页面添加自定义样式，美化脚本界面。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取SponsorBlock数据和下载功能支持。 |
| `GM_setValue` | 用于保存用户的脚本设置，实现个性化体验。 |
| `GM_getValue` | 用于读取用户已保存的脚本设置。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：75/100　　**分析时间**：2026-06-15

> The script transmits YouTube video IDs and metadata to third-party servers (SponsorBlock and evdfrance.fr) for ad skipping and HD download functionality. No evidence of sensitive data collection, code obfuscation, remote code execution, or DOM XSS. All granted permissions are used appropriately. The main risk is data transmission to external APIs, which is necessary for the script's features but should be monitored for privacy concerns.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：sponsor.ajay.app, evdfrance.fr） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script uses GM_xmlhttpRequest to send requests to sponsor.ajay.app (SponsorBlock API) and evdfrance.fr (HD download service). These are third-party servers. The requests may include YouTube video IDs and possibly other metadata, but do not appear to transmit cookies or sensitive user data.  
> 位置：CFG.sbApi, download logic (not fully shown)  
> 建议：Ensure only minimal, non-sensitive data is sent. Review SponsorBlock and evdfrance.fr privacy policies.

**🟠 MEDIUM** — Privacy Collection  
> Script reads and writes settings using GM_getValue and GM_setValue. No evidence of document.cookie, localStorage, sessionStorage, or IndexedDB access. No keylogger, clipboard, or form field reading detected.  
> 位置：S object, save() function  
> 建议：Continue to avoid unnecessary privacy collection.

**🟡 LOW** — Remote Code Execution  
> No eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection detected. No @require of remote JS libraries.  
> 位置：Entire script  
> 建议：Maintain strict avoidance of remote code execution.

**🟡 LOW** — Code Obfuscation  
> No evidence of code obfuscation, base64 decoding, unicode encoding, or minified/obfuscated code.  
> 位置：Entire script  
> 建议：Maintain code clarity and transparency.

**🟡 LOW** — DOM XSS  
> No DOM XSS risk detected. User input and URL parameters are not directly inserted into innerHTML/outerHTML.  
> 位置：Entire script  
> 建议：Continue to sanitize any future user input.

**🟡 LOW** — Permission Abuse  
> Script requests GM_xmlhttpRequest, GM_addStyle, GM_setValue, GM_getValue. All are used. No evidence of unused high privileges or GM_openInTab/GM_download.  
> 位置：Metadata block  
> 建议：Avoid requesting unnecessary permissions.

**🟡 LOW** — Sensitive API  
> No sensitive API calls (geolocation, RTCPeerConnection, MediaDevices, Clipboard API, Notification API) detected.  
> 位置：Entire script  
> 建议：Continue to avoid sensitive browser APIs.

**🟡 LOW** — Supply Chain  
> No @require of third-party libraries. All code is inline. No supply chain risk detected.  
> 位置：Metadata block  
> 建议：If adding @require, use official CDN and fixed version.

**🟡 LOW** — ClickJacking / iframe  
> No evidence of clickjacking or iframe manipulation.  
> 位置：Entire script  
> 建议：Avoid creating hidden iframes or modifying frame protection.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v4-0-ad-skip-sponsorblock-hd-download-no-lag)*
