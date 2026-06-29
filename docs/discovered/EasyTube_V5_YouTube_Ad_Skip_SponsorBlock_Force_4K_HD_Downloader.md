---
title: "EasyTube V5 — YouTube 广告跳过、SponsorBlock、强制 4K 和 HD 下载"
---

# EasyTube V5 — YouTube 广告跳过、SponsorBlock、强制 4K 和 HD 下载

`广告拦截`  `视频下载`  `清晰度增强`  `SponsorBlock`  `YouTube优化`  `自动跳过`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/EasyTube_V5_YouTube_Ad_Skip_SponsorBlock_Force_4K_HD_Downloader.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**5.1.0**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/561432-easytube-v5-youtube-ad-skip-sponsorblock-force-4k-hd-downloader) <Badge type="tip" text="GreasyFork" />　　安装量：**7,781**　　评分：👍11 / 👎3

## 功能介绍

本脚本可自动跳过和屏蔽 YouTube 广告，集成 SponsorBlock 自动跳过视频中的赞助片段，强制播放 4K 清晰度，并支持下载高清视频。还能保存用户设置并绕过广告拦截检测，使用流畅不卡顿。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后，打开 YouTube 网站。
2. 观看视频时广告会自动跳过或屏蔽。
3. 赞助片段会自动跳过，无需手动操作。
4. 可在视频页面找到下载按钮，下载高清视频。
5. 脚本会自动保存你的偏好设置，无需重复配置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于动态添加自定义样式，让界面更美观或突出功能按钮。 |
| `GM_xmlhttpRequest` | 用于跨域请求 SponsorBlock 和下载服务，获取跳过片段和下载链接。 |
| `GM_setValue` | 用于保存用户的脚本设置，如偏好和功能开关。 |
| `GM_getValue` | 用于读取用户保存的脚本设置，保证个性化体验。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：72/100　　**分析时间**：2026-06-29

> The script is generally safe and transparent. It communicates with two third-party APIs (SponsorBlock and a video download service), but does not transmit sensitive user data or credentials. No evidence of privacy-invasive behavior, code obfuscation, or XSS risk. Permissions are appropriate for the stated features. Supply chain risk is low as no external libraries are loaded. Overall, the script is suitable for use with a low security risk profile.

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
> The script uses GM_xmlhttpRequest to communicate with sponsor.ajay.app (SponsorBlock API) and evdfrance.fr (likely for video download functionality). These are third-party servers, but only video IDs and category data are sent, not user credentials or cookies.  
> 位置：SponsorBlock API call and video download logic (CFG.sbApi, @connect)  
> 建议：Review the data sent to ensure no sensitive user information is transmitted. Limit data to only what is necessary for SponsorBlock and download features.

**🟠 MEDIUM** — Permission Usage  
> The script requests GM_xmlhttpRequest permission, which is necessary for SponsorBlock and download features, but also increases the attack surface if misused.  
> 位置：@grant GM_xmlhttpRequest  
> 建议：Ensure all network requests are strictly limited to the declared @connect domains and do not transmit sensitive user data.

**🟡 LOW** — Privacy Collection  
> The script stores and retrieves user settings using GM_setValue and GM_getValue. No evidence of sensitive data (like cookies, passwords, or clipboard) being accessed or transmitted.  
> 位置：GM_setValue / GM_getValue usage  
> 建议：Continue to avoid storing sensitive information. Document what is stored for transparency.

**🟡 LOW** — Obfuscation  
> No code obfuscation, eval, new Function, or dynamic script loading detected. Code is readable and maintainable.  
> 位置：Entire script  
> 建议：Maintain code transparency for user trust.

**🟡 LOW** — DOM XSS  
> No DOM XSS or injection risks detected. The script does not insert untrusted user input into the DOM via innerHTML/outerHTML/document.write.  
> 位置：DOM manipulation logic  
> 建议：Continue to sanitize any future user input if DOM insertion is required.

**🟡 LOW** — Supply Chain  
> No supply chain risk detected. The script does not use @require to load external libraries.  
> 位置：Metadata block  
> 建议：If adding @require in the future, use official CDNs and fixed versions.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v5-youtube-ad-skip-sponsorblock-force-4k-hd-downloader)*
