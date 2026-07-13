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

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-07-13

> The script is generally well-written and does not collect sensitive user data or use dangerous code execution patterns. However, it transmits video-related data to third-party servers (SponsorBlock and evdfrance.fr). While SponsorBlock is widely used, evdfrance.fr is less known and may pose a supply chain risk. No evidence of privacy-invasive behavior, code obfuscation, or DOM XSS. The main risk is third-party data transmission and reliance on a non-mainstream download service.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://sponsor.ajay.app/api/skipSegments, https://evdfrance.fr） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script uses GM_xmlhttpRequest to communicate with sponsor.ajay.app (SponsorBlock API) and evdfrance.fr (HD download). These are third-party servers. While SponsorBlock is a well-known public API, evdfrance.fr is less known and may pose a supply chain risk. The script may send YouTube video IDs and possibly other metadata to these endpoints.  
> 位置：Network requests for SponsorBlock and download features  
> 建议：Review the data sent to these endpoints and ensure no sensitive user data (cookies, tokens, personal info) is transmitted. Consider warning users about third-party data sharing.

**🟠 MEDIUM** — Supply Chain Risk  
> The script connects to sponsor.ajay.app (well-known) and evdfrance.fr (less known). The latter is a potential supply chain risk, especially for download functionality.  
> 位置：@connect section and download code  
> 建议：Vet third-party endpoints for trustworthiness. Consider using only reputable APIs for downloads.

**🟡 LOW** — Privacy Collection  
> The script stores and retrieves user settings (ad skip, SponsorBlock, quality) using GM_setValue and GM_getValue. No evidence of collecting sensitive data such as cookies, form fields, or clipboard.  
> 位置：GM_setValue / GM_getValue usage  
> 建议：No privacy-invasive collection detected. Continue to avoid collecting sensitive user data.

**🟡 LOW** — Remote Code Execution  
> The script does not use eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection. No remote code execution risk detected.  
> 位置：Global code  
> 建议：Maintain current practices and avoid introducing dynamic code execution.

**🟡 LOW** — Obfuscation  
> No code obfuscation detected. The code is readable, not minified, and does not use base64 or unicode obfuscation.  
> 位置：Global code  
> 建议：Maintain code transparency.

**🟡 LOW** — DOM XSS  
> No DOM XSS or injection risk detected. The script does not insert untrusted user input into the DOM via innerHTML or document.write.  
> 位置：Global code  
> 建议：Continue to avoid unsafe DOM manipulation.

**🟡 LOW** — Permission Usage  
> The script requests GM_xmlhttpRequest, GM_setValue, GM_getValue, and GM_addStyle. All are used in the code. No evidence of permission overreach.  
> 位置：@grant section  
> 建议：Only request permissions that are strictly necessary.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v4-0-ad-skip-sponsorblock-hd-download-no-lag)*
