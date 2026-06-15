---
title: "EasyTube V4 — 广告跳过、SponsorBlock 和 HD 下载器（无卡顿）"
---

# EasyTube V4 — 广告跳过、SponsorBlock 和 HD 下载器（无卡顿）

`广告跳过`  `视频下载`  `SponsorBlock`  `高清画质`  `YouTube增强`  `设置保存`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/EasyTube_V4_Ad_Skip_SponsorBlock_HD_Download.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**4.0.0**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/561432-easytube-v4-ad-skip-sponsorblock-hd-download) <Badge type="tip" text="GreasyFork" />　　安装量：**7,118**　　评分：👍10 / 👎3

## 功能介绍

本脚本可自动跳过YouTube视频中的多层广告，支持SponsorBlock自动跳过赞助片段，强制播放4K高清画质，并提供无卡顿的视频下载功能。还能保存用户设置，绕过广告拦截检测，提升观看体验。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后，打开YouTube任意视频页面。
2. 广告会自动跳过，赞助片段也会自动屏蔽。
3. 可在视频页面找到下载按钮，下载高清（4K）视频。
4. 脚本会自动保存你的设置，无需重复调整。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让界面更美观或突出功能按钮。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取SponsorBlock数据和下载视频信息。 |
| `GM_setValue` | 用于保存用户的脚本设置，如偏好选项。 |
| `GM_getValue` | 用于读取用户保存的脚本设置，自动应用偏好。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-06-15

> EasyTube V4 is generally safe, with clear code and minimal permissions. It communicates with sponsor.ajay.app and evdfrance.fr, sending only YouTube video IDs and segment categories for SponsorBlock and download functionality. No sensitive user data is collected or transmitted. No remote code execution, obfuscation, DOM XSS, or supply chain risks are present. The main risk is third-party data transmission, which is limited and transparent. Overall, the script is suitable for use, but users should be aware of the external API interactions.

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
> Script uses GM_xmlhttpRequest to communicate with sponsor.ajay.app (SponsorBlock API) and evdfrance.fr (HD download). These are third-party servers. However, only YouTube video IDs and segment categories are sent, not sensitive user data or cookies.  
> 位置：CFG.sbApi, download logic (not fully shown)  
> 建议：Ensure only minimal, non-sensitive data is sent. Review evdfrance.fr privacy and security.

**⛔ CRITICAL** — Privacy Collection  
> Script stores and retrieves settings using GM_setValue and GM_getValue. No evidence of sensitive data collection (cookies, localStorage, sessionStorage, IndexedDB, clipboard, keyboard, form fields).  
> 位置：S state object, save() function  
> 建议：Continue to avoid collecting sensitive user data.

**🔴 HIGH** — Remote Code Execution  
> No eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection detected. No @require or document.write usage.  
> 位置：Entire script  
> 建议：Maintain strict avoidance of remote code execution patterns.

**🔴 HIGH** — Code Obfuscation  
> No code obfuscation detected. Code is readable, not minified or obfuscated.  
> 位置：Entire script  
> 建议：Maintain transparency and readability.

**🔴 HIGH** — DOM XSS/Injection  
> No DOM XSS or injection risk detected. No user input or URL parameters are inserted into innerHTML/outerHTML.  
> 位置：Entire script  
> 建议：Continue to avoid unsafe DOM manipulation.

**🟠 MEDIUM** — Permission Abuse  
> Script requests GM_xmlhttpRequest, GM_addStyle, GM_setValue, GM_getValue. All are used. No excessive or unused permissions.  
> 位置：Metadata block (@grant)  
> 建议：Avoid requesting unnecessary permissions.

**🟠 MEDIUM** — Sensitive API Usage  
> No sensitive browser APIs (geolocation, RTCPeerConnection, MediaDevices, Clipboard, Notification) are used.  
> 位置：Entire script  
> 建议：Continue to avoid sensitive API usage.

**🟠 MEDIUM** — Supply Chain Risk  
> No @require third-party libraries. All code is inline. No supply chain risk.  
> 位置：Metadata block (@require)  
> 建议：If adding libraries, use official CDN and fixed version.

**🟡 LOW** — ClickJacking/Iframe Risk  
> No iframe manipulation or clickjacking detected.  
> 位置：Entire script  
> 建议：Continue to avoid iframe risks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v4-ad-skip-sponsorblock-hd-download)*
