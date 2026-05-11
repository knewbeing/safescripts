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

**风险等级**：🟡 LOW　　**安全评分**：64/100　　**分析时间**：2026-05-11

> The script is generally safe and well-structured. It communicates with two third-party APIs (SponsorBlock and evdfrance.fr) as expected for its features, but does not transmit sensitive user data. No code obfuscation, XSS, or remote code execution risks were found. Permissions are appropriate. The main risk is the transmission of video IDs to third-party APIs, which is necessary for functionality but should be disclosed to users. Overall, the script is low risk for privacy and security.

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
> The script uses GM_xmlhttpRequest to communicate with sponsor.ajay.app (SponsorBlock API) and evdfrance.fr (for video download). These are third-party servers. However, only video IDs and segment categories are sent to SponsorBlock, and download requests are user-initiated. No evidence of user credentials, cookies, or sensitive data being sent.  
> 位置：CFG.sbApi, download logic (not fully shown in snippet)  
> 建议：Ensure only minimal, necessary data is sent. Do not send cookies or user-identifiable data.

**🟠 MEDIUM** — Privacy Collection  
> The script stores and retrieves user settings (ad skip, SponsorBlock, quality) using GM_setValue/GM_getValue. No evidence of sensitive data (passwords, cookies, form fields) being accessed or transmitted.  
> 位置：GM_setValue/GM_getValue usage  
> 建议：Continue to avoid collecting sensitive user data. Document all stored keys for transparency.

**🟠 MEDIUM** — Permission Usage  
> The script requests GM_xmlhttpRequest permission, which is necessary for SponsorBlock and download features. No evidence of unused high-privilege grants or permission overreach.  
> 位置：@grant metadata  
> 建议：Only request permissions actually used in code.

**🟠 MEDIUM** — Supply Chain Risk  
> The script loads no remote scripts via @require or dynamic script tags. All logic is contained in the script itself. No supply chain risk detected.  
> 位置：Metadata and code review  
> 建议：If adding @require in the future, use official CDNs and fixed versions.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v4-0-ad-skip-sponsorblock-hd-download-no-lag)*
