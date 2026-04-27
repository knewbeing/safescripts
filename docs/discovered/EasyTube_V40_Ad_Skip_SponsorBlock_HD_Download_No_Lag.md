---
title: "EasyTube V4.0 — 广告跳过、SponsorBlock 和 HD 下载器（无卡顿）"
---

# EasyTube V4.0 — 广告跳过、SponsorBlock 和 HD 下载器（无卡顿）

`广告跳过`  `视频下载`  `SponsorBlock`  `画质提升`  `YouTube优化`  `设置记忆`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/EasyTube_V40_Ad_Skip_SponsorBlock_HD_Download_No_Lag.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**4.0.0**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/561432-easytube-v4-0-ad-skip-sponsorblock-hd-download-no-lag) <Badge type="tip" text="GreasyFork" />　　安装量：**5,856**　　评分：👍7 / 👎3

## 功能介绍

本脚本可自动跳过YouTube视频中的多层广告，支持SponsorBlock自动跳过赞助片段，强制提升视频画质至4K，并提供高清视频下载功能。它还能保存你的设置，绕过广告拦截检测，保证流畅无卡顿体验。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后，打开YouTube任意视频页面。
2. 广告会自动跳过，赞助片段自动屏蔽。
3. 视频画质自动提升至4K（如有）。
4. 页面会出现下载按钮，可一键下载高清视频。
5. 你的设置会自动保存，无需重复操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让界面更美观或突出功能按钮。 |
| `GM_xmlhttpRequest` | 用于跨域请求SponsorBlock和下载服务，获取跳过片段和下载链接。 |
| `GM_setValue` | 用于保存用户的脚本设置，记住你的偏好。 |
| `GM_getValue` | 用于读取已保存的设置，自动应用你的偏好。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-04-27

> The script transmits video-related data to two third-party servers (SponsorBlock and evdfrance.fr) for ad skipping and video downloading. No evidence of sensitive user data collection, code obfuscation, remote code execution, or DOM XSS. All granted permissions are used appropriately. The main risk is data transmission to external servers, which is necessary for the script's functionality but should be reviewed for privacy and security. Overall, the script is transparent and avoids most high-risk patterns, but the external data transmission lowers its security score.

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
> Script uses GM_xmlhttpRequest to communicate with sponsor.ajay.app for SponsorBlock functionality. This is a third-party API, but only video ID and category are sent, not sensitive user data.  
> 位置：CFG.sbApi and related SponsorBlock logic  
> 建议：Ensure only non-sensitive data (video ID, category) is sent. Review SponsorBlock privacy policy.

**⛔ CRITICAL** — Data Transmission  
> Script uses GM_xmlhttpRequest to communicate with evdfrance.fr for video download. This may transmit video ID or URL to a third-party server.  
> 位置：Download logic (not fully visible in provided code, but referenced in CFG and description)  
> 建议：Ensure only necessary data is sent. Review evdfrance.fr privacy and security practices.

**🔴 HIGH** — Remote Code Execution  
> No evidence of eval, new Function, setTimeout(string), setInterval(string), or dynamic script loading. No @require for remote JS.  
> 位置：Entire script  
> 建议：Continue to avoid unsafe code execution patterns.

**🔴 HIGH** — Code Obfuscation  
> No evidence of code obfuscation, base64 decoding, unicode encoding, or minified/obfuscated code.  
> 位置：Entire script  
> 建议：Maintain code readability and transparency.

**🔴 HIGH** — DOM XSS  
> No evidence of DOM XSS or injection. User input is not inserted into innerHTML/outerHTML. No document.write usage.  
> 位置：Entire script  
> 建议：Continue to sanitize any future user input.

**🟠 MEDIUM** — Privacy Collection  
> Script uses GM_getValue and GM_setValue to store user settings locally. No evidence of privacy-sensitive data collection (e.g., cookies, passwords, clipboard, keylogging).  
> 位置：STATE object and save() function  
> 建议：Do not store sensitive data. Only store settings relevant to script functionality.

**🟠 MEDIUM** — Permission Abuse  
> Script requests GM_xmlhttpRequest, GM_addStyle, GM_setValue, GM_getValue. All are used. No evidence of permission abuse.  
> 位置：Metadata block (@grant)  
> 建议：Only request permissions actually used.

**🟠 MEDIUM** — Sensitive API  
> No evidence of sensitive API usage (geolocation, RTCPeerConnection, MediaDevices, clipboard, notifications).  
> 位置：Entire script  
> 建议：Avoid using sensitive APIs unless strictly necessary.

**🟠 MEDIUM** — Supply Chain  
> No @require for third-party libraries. All code is inline. No supply chain risk detected.  
> 位置：Metadata block (@require)  
> 建议：If adding @require, use official CDN and fixed version.

**🟡 LOW** — ClickJacking  
> No evidence of clickjacking or iframe manipulation.  
> 位置：Entire script  
> 建议：Avoid creating hidden iframes or modifying frame protection.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v4-0-ad-skip-sponsorblock-hd-download-no-lag)*
