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

**风险等级**：🔴 HIGH　　**安全评分**：50/100　　**分析时间**：2026-06-01

> The script provides ad skipping, SponsorBlock, and HD download features for YouTube. It communicates with two third-party servers: sponsor.ajay.app (SponsorBlock API, widely used) and evdfrance.fr (for video downloads, less known). No evidence of sensitive data collection, code obfuscation, or remote code execution. The main risk is data transmission to third-party endpoints, especially evdfrance.fr, which may receive video URLs or identifiers. Users should be aware of this external data sharing. Overall, the script is well-written and transparent, but the third-party data transmission is a significant privacy consideration.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：sponsor.ajay.app, evdfrance.fr） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script uses GM_xmlhttpRequest to communicate with sponsor.ajay.app (SponsorBlock API) and evdfrance.fr (video download service). These are third-party servers. While SponsorBlock is a well-known public API, evdfrance.fr is less known and may pose a privacy risk if user data is sent.  
> 位置：Network requests for SponsorBlock and download features  
> 建议：Review the data sent to these endpoints. Ensure no sensitive user data, cookies, or identifiers are transmitted. Consider warning users about third-party data sharing.

**🟡 LOW** — Privacy Collection  
> The script stores and retrieves user settings using GM_setValue and GM_getValue. No evidence of sensitive data (like cookies, passwords, or form data) being collected or transmitted.  
> 位置：Settings persistence logic  
> 建议：Continue to avoid collecting sensitive information. Document what is stored for transparency.

**🟡 LOW** — Permission Usage  
> The script requests GM_xmlhttpRequest permission, which is necessary for SponsorBlock and download features, but does not appear to request unnecessary high-privilege grants.  
> 位置：UserScript metadata block  
> 建议：Limit @grant permissions to only those required. No action needed unless new permissions are added.

**🟡 LOW** — Remote Code Execution  
> The script does not use eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection. No evidence of remote code execution.  
> 位置：Full script review  
> 建议：Maintain this practice. Avoid introducing dynamic code execution.

**🟡 LOW** — Code Obfuscation  
> The script does not use obfuscation, base64 encoding, or minified code. Code is readable and maintainable.  
> 位置：Full script review  
> 建议：Continue to publish unobfuscated code for transparency.

**🟡 LOW** — ClickJacking / iframe Risk  
> The script does not manipulate iframe src, frame protection, or create hidden iframes.  
> 位置：Full script review  
> 建议：Maintain this practice.

**🟡 LOW** — Supply Chain Risk  
> The script uses @require only for its own code (no external libraries).  
> 位置：UserScript metadata block  
> 建议：If adding external libraries, use official CDNs and fixed versions.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v4-0-ad-skip-sponsorblock-hd-download-no-lag)*
