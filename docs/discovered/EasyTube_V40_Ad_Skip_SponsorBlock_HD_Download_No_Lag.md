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

**风险等级**：🟡 LOW　　**安全评分**：64/100　　**分析时间**：2026-06-22

> The script is generally safe and well-structured. It communicates with two third-party APIs (SponsorBlock and evdfrance.fr) for its core features, but does not transmit sensitive user data or cookies. No evidence of privacy-invasive behavior, remote code execution, code obfuscation, DOM XSS, or supply chain risk. Permissions are minimal and appropriate. Overall, the script poses a LOW security risk, with the main consideration being transparency about third-party API usage.

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
> Script uses GM_xmlhttpRequest to communicate with sponsor.ajay.app (SponsorBlock API) and evdfrance.fr (video download). These are third-party servers. However, only video IDs and category selections are sent, not sensitive user data or cookies.  
> 位置：CFG.sbApi, download logic (partial code)  
> 建议：Review payloads to ensure no user-identifiable data is sent. Document API usage for transparency.

**🔴 HIGH** — Remote Code Execution  
> No use of eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection. No @require of remote scripts. No document.write usage.  
> 位置：Full script review  
> 建议：Maintain current practice; avoid introducing dynamic code execution.

**🔴 HIGH** — Code Obfuscation  
> No evidence of code obfuscation, base64 decoding, or minified/obfuscated code patterns.  
> 位置：Full script review  
> 建议：Maintain code clarity for auditability.

**🔴 HIGH** — DOM XSS  
> No direct insertion of user input or URL parameters into innerHTML/outerHTML. No document.write with untrusted content. No iframe src manipulation detected.  
> 位置：Full script review  
> 建议：Continue to sanitize any future user input if DOM manipulation is added.

**🟠 MEDIUM** — Permission Usage  
> @grant permissions are limited to GM_addStyle, GM_xmlhttpRequest, GM_setValue, GM_getValue. All are used appropriately. No evidence of unused or excessive permissions.  
> 位置：Metadata block  
> 建议：Only request permissions actually used.

**🟠 MEDIUM** — Permission Usage  
> @connect permissions are limited to sponsor.ajay.app and evdfrance.fr, matching actual network usage.  
> 位置：Metadata block  
> 建议：Maintain minimal @connect scope.

**🟠 MEDIUM** — Sensitive API  
> No use of geolocation, RTCPeerConnection, MediaDevices, Clipboard API, or Notification API.  
> 位置：Full script review  
> 建议：Avoid adding sensitive API usage unless strictly necessary.

**🟠 MEDIUM** — Supply Chain  
> No @require of third-party libraries. All code is inline. No supply chain risk detected.  
> 位置：Metadata block  
> 建议：If adding @require, use official CDNs and fixed versions.

**🟡 LOW** — Privacy Collection  
> Script stores user settings (ad skip, SponsorBlock, quality) via GM_setValue/GM_getValue. No evidence of sensitive data collection (cookies, form fields, clipboard, etc).  
> 位置：S object, save() function  
> 建议：Continue to avoid collecting sensitive data. Document what is stored for user awareness.

**🟡 LOW** — Clickjacking/Iframe  
> No evidence of clickjacking or iframe manipulation. No frame policy changes.  
> 位置：Full script review  
> 建议：Maintain current practice.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v4-0-ad-skip-sponsorblock-hd-download-no-lag)*
