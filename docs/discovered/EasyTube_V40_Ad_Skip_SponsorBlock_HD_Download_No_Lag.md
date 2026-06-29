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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-29

> The script is generally safe. It communicates with two third-party APIs (SponsorBlock and evdfrance.fr) as expected for its features, but does not transmit cookies, credentials, or sensitive user data. No evidence of privacy-invasive behavior, code obfuscation, DOM XSS, or supply chain risk. Permissions are appropriate and not excessive. Overall, the script is low risk for privacy and security.

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
> Script uses GM_xmlhttpRequest to communicate with sponsor.ajay.app (SponsorBlock API) and evdfrance.fr (for video download). These are third-party servers, but the endpoints are documented and expected for the stated features. No evidence of sending cookies, user credentials, or sensitive user data; only video IDs and segment categories are sent for SponsorBlock, and download requests are user-initiated.  
> 位置：CFG.sbApi, download logic (not fully shown)  
> 建议：Ensure only minimal, necessary data (e.g., video ID) is sent. Do not send cookies or user credentials. Document all data flows.

**⛔ CRITICAL** — Privacy Collection  
> Script stores and retrieves user settings (ad skip, SponsorBlock, quality) via GM_setValue/GM_getValue. No evidence of collecting or exfiltrating cookies, localStorage, sessionStorage, or other sensitive data. No keylogger or clipboard access detected.  
> 位置：GM_setValue/GM_getValue usage  
> 建议：Continue to avoid collecting sensitive data. Do not expand to collect cookies, passwords, or input fields.

**🟠 MEDIUM** — Permission Usage  
> @grant includes GM_xmlhttpRequest, GM_setValue, GM_getValue, GM_addStyle. All are used in the script. No evidence of requesting excessive or unused permissions.  
> 位置：@grant in metadata  
> 建议：Keep permissions minimal and only as needed.

**🟠 MEDIUM** — Supply Chain Risk  
> @connect includes only sponsor.ajay.app and evdfrance.fr, matching the script's network usage. No evidence of supply chain risk from @require or dynamic script loading.  
> 位置：@connect in metadata  
> 建议：If adding @require in the future, use official CDNs and fixed versions.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v4-0-ad-skip-sponsorblock-hd-download-no-lag)*
