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

**风险等级**：🟡 LOW　　**安全评分**：75/100　　**分析时间**：2026-05-18

> The script is well-structured and does not exhibit code obfuscation, remote code execution, or DOM XSS risks. It transmits video IDs and segment categories to SponsorBlock and uses evdfrance.fr for downloads, but does not send sensitive user data. User settings are stored locally via GM_setValue/GM_getValue. No evidence of privacy-invasive behavior, permission abuse, or supply chain risk. Overall, the script is considered low risk, with the main concern being third-party API usage for SponsorBlock and downloads. Users should be aware of the privacy policy of these third-party services.

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
> The script sends requests to sponsor.ajay.app (SponsorBlock API) and evdfrance.fr (for video download). These are third-party servers. However, only video IDs and segment categories are sent to SponsorBlock, and download requests are user-initiated. No evidence of user credentials, cookies, or sensitive data being sent.  
> 位置：GM_xmlhttpRequest usage for SponsorBlock and download feature  
> 建议：Ensure only necessary data (video IDs, categories) are sent. Do not transmit user credentials or cookies. Document privacy policy for users.

**⛔ CRITICAL** — Privacy Collection  
> The script uses GM_getValue and GM_setValue to store user settings (ad skip, SponsorBlock, quality). No evidence of reading cookies, localStorage, or sessionStorage directly. No keylogger or clipboard access detected.  
> 位置：Settings management section  
> 建议：Continue to avoid collecting sensitive user data. Make privacy practices transparent.

**🔴 HIGH** — Remote Code Execution  
> No use of eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection detected. No @require of remote scripts. No document.write usage.  
> 位置：Full script  
> 建议：Maintain current practice of avoiding dynamic code execution.

**🔴 HIGH** — Obfuscation  
> No code obfuscation detected. Code is readable, not minified, and does not use base64 or unicode obfuscation.  
> 位置：Full script  
> 建议：Maintain code transparency for user trust.

**🔴 HIGH** — DOM XSS  
> No direct DOM XSS risk found. No user input or URL parameters are inserted into innerHTML/outerHTML without sanitization. No document.write with untrusted content.  
> 位置：DOM manipulation sections  
> 建议：Continue to avoid inserting untrusted data into the DOM.

**🟠 MEDIUM** — Permission Usage  
> @grant permissions match actual usage (GM_addStyle, GM_xmlhttpRequest, GM_setValue, GM_getValue). No unused high-risk permissions. No use of GM_download or GM_openInTab.  
> 位置：Metadata block and code  
> 建议：Only request permissions actually used by the script.

**🟠 MEDIUM** — Sensitive API  
> No use of sensitive APIs such as geolocation, RTCPeerConnection, MediaDevices, or Notification API. No clipboard read access.  
> 位置：Full script  
> 建议：Continue to avoid unnecessary sensitive API usage.

**🟠 MEDIUM** — Supply Chain  
> No @require of third-party libraries. All code is local to the script. No supply chain risk from external dependencies.  
> 位置：Metadata block  
> 建议：If adding dependencies in the future, use official CDNs and fixed versions.

**🟡 LOW** — Clickjacking/Iframe  
> No iframe manipulation or frame protection bypass detected. No hidden iframes created.  
> 位置：Full script  
> 建议：Maintain current practice to avoid clickjacking risks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v4-0-ad-skip-sponsorblock-hd-download-no-lag)*
