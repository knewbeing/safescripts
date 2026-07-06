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

**风险等级**：🟠 MEDIUM　　**安全评分**：75/100　　**分析时间**：2026-07-06

> The script is generally safe and transparent, with no evidence of code obfuscation, remote code execution, DOM XSS, or supply chain risk. The main concern is data transmission to third-party servers (SponsorBlock and evdfrance.fr), which is necessary for functionality but should be monitored for privacy. No sensitive user data or cookies are transmitted. Permissions are appropriate and not excessive.

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
> Script uses GM_xmlhttpRequest to communicate with sponsor.ajay.app (SponsorBlock API) and evdfrance.fr (HD download service). These are third-party servers. The transmitted data includes YouTube video IDs and possibly segment information, but not cookies or sensitive user data.  
> 位置：SponsorBlock integration and HD download logic  
> 建议：Ensure only minimal, non-sensitive data is sent. Review evdfrance.fr for privacy and security.

**🟡 LOW** — Privacy Collection  
> Script stores and retrieves settings using GM_setValue and GM_getValue, which are local to the user script and do not transmit data externally.  
> 位置：Settings management  
> 建议：No action needed; local storage is safe.

**🟡 LOW** — Remote Code Execution  
> No evidence of eval, new Function, setTimeout(string), setInterval(string), or dynamic script loading. No remote code execution risk detected.  
> 位置：Entire script  
> 建议：Maintain current practices; avoid dynamic code execution.

**🟡 LOW** — Code Obfuscation  
> No code obfuscation detected. Code is readable and not minified or encoded.  
> 位置：Entire script  
> 建议：Maintain transparency.

**🟡 LOW** — DOM XSS/Injection  
> No DOM XSS or injection risk detected. User input is not inserted into innerHTML/outerHTML, and document.write is not used.  
> 位置：Entire script  
> 建议：Continue to avoid unsafe DOM operations.

**🟡 LOW** — Permission Abuse  
> Script requests GM_xmlhttpRequest, GM_addStyle, GM_setValue, GM_getValue. All are used appropriately. No excessive or unused permissions.  
> 位置：Metadata block (@grant)  
> 建议：No action needed.

**🟡 LOW** — Sensitive API Usage  
> No sensitive browser APIs (geolocation, RTCPeerConnection, MediaDevices, Clipboard API, Notification API) are used.  
> 位置：Entire script  
> 建议：Maintain current practice.

**🟡 LOW** — Supply Chain Risk  
> No @require third-party libraries. All code is inline. No supply chain risk.  
> 位置：Metadata block (@require)  
> 建议：Continue to avoid external dependencies.

**🟡 LOW** — ClickJacking/Iframe Risk  
> No iframe manipulation or clickjacking detected.  
> 位置：Entire script  
> 建议：Maintain current practice.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v4-0-ad-skip-sponsorblock-hd-download-no-lag)*
