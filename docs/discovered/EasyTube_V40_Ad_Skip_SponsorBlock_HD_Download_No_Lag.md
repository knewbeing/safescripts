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

**风险等级**：🟡 LOW　　**安全评分**：72/100　　**分析时间**：2026-06-08

> The script is generally safe and focused on its stated purpose: skipping ads, integrating SponsorBlock, and enabling HD downloads on YouTube. It communicates with two third-party endpoints (SponsorBlock and evdfrance.fr) as expected for its features. No evidence of privacy-invasive behavior, code obfuscation, or XSS risk is found. Permissions are appropriate and supply chain risk is low. Users should be aware that video IDs are sent to SponsorBlock and evdfrance.fr, but no sensitive user data is transmitted. Overall, the script is low risk.

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
> The script uses GM_xmlhttpRequest to communicate with sponsor.ajay.app (SponsorBlock API) and evdfrance.fr (video download). These are third-party servers, but the endpoints are expected for the script's stated functionality. No evidence of sending cookies, user credentials, or sensitive user data is found in the visible code.  
> 位置：API calls for SponsorBlock and download feature  
> 建议：Ensure only necessary video IDs or minimal data are sent. Do not transmit cookies or user credentials. Document data flows in README.

**🟠 MEDIUM** — Privacy Collection  
> The script stores and retrieves user settings (ad skip, SponsorBlock, quality) using GM_setValue/GM_getValue. No evidence of collecting or exfiltrating cookies, form data, or other privacy-sensitive information.  
> 位置：Settings storage logic  
> 建议：Continue to avoid collecting sensitive data. Document all stored keys and values.

**🟡 LOW** — Permission Usage  
> The script requests GM_xmlhttpRequest permission, which is necessary for SponsorBlock and download features. No evidence of requesting unnecessary or unused high-privilege grants.  
> 位置：UserScript metadata block  
> 建议：Keep permissions minimal and only as needed.

**🟡 LOW** — Supply Chain  
> The script uses only official SponsorBlock and evdfrance.fr endpoints. No @require is used, so supply chain risk is low.  
> 位置：UserScript metadata block  
> 建议：If adding @require in the future, pin versions and use official CDNs.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v4-0-ad-skip-sponsorblock-hd-download-no-lag)*
