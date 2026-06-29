---
title: "EasyTube V4 — 广告跳过、SponsorBlock 和 HD 下载器（无卡顿）"
---

# EasyTube V4 — 广告跳过、SponsorBlock 和 HD 下载器（无卡顿）

`广告跳过`  `视频下载`  `SponsorBlock`  `高清画质`  `YouTube增强`  `设置保存`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/EasyTube_V4_Ad_Skip_SponsorBlock_HD_Download.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**4.0.0**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/561432-easytube-v4-ad-skip-sponsorblock-hd-download) <Badge type="tip" text="GreasyFork" />　　安装量：**7,118**　　评分：👍10 / 👎3

## 功能介绍

本脚本可自动跳过YouTube视频中的多层广告，支持SponsorBlock自动跳过赞助片段，强制播放4K高清画质，并提供无卡顿的视频下载功能。还能保存用户设置，绕过广告拦截检测，提升观看体验。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后，打开YouTube任意视频页面。
2. 广告会自动跳过，赞助片段也会自动屏蔽。
3. 可在视频页面找到下载按钮，下载高清（4K）视频。
4. 脚本会自动保存你的设置，无需重复调整。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让界面更美观或突出功能按钮。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取SponsorBlock数据和下载视频信息。 |
| `GM_setValue` | 用于保存用户的脚本设置，如偏好选项。 |
| `GM_getValue` | 用于读取用户保存的脚本设置，自动应用偏好。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：67/100　　**分析时间**：2026-06-29

> The script is generally safe and well-structured. It communicates with two third-party APIs (SponsorBlock and a video download service) but does not transmit sensitive user data or cookies. No evidence of privacy-invasive behavior, code obfuscation, DOM XSS, or remote code execution. Permissions are appropriate for the features provided. Supply chain risk is present due to reliance on external APIs. Overall, the script is low risk for most users.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：sponsor.ajay.app, evdfrance.fr） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> The script uses GM_xmlhttpRequest to communicate with sponsor.ajay.app (SponsorBlock API) and evdfrance.fr (video download). These are third-party servers. However, only video IDs and segment categories are sent to SponsorBlock, and download requests are user-initiated. No evidence of sensitive user data or cookies being sent.  
> 位置：API calls in SponsorBlock and download logic  
> 建议：Ensure only necessary data (video IDs, categories) are sent. Do not transmit cookies or user-identifiable data.

**⛔ CRITICAL** — Privacy Collection  
> The script stores and retrieves user settings (ad skip, SponsorBlock, quality) using GM_setValue/GM_getValue. No evidence of sensitive data collection (cookies, form fields, clipboard, etc).  
> 位置：Settings logic  
> 建议：Continue to avoid collecting sensitive user data.

**🟠 MEDIUM** — Permission Usage  
> The script requests GM_xmlhttpRequest permission, which is necessary for SponsorBlock and download features. No evidence of unused high-privilege grants.  
> 位置：Metadata block  
> 建议：Limit @grant permissions to only those required.

**🟠 MEDIUM** — Supply Chain  
> The script connects to two third-party domains (sponsor.ajay.app, evdfrance.fr). Both are well-known in the context of SponsorBlock and video downloading, but supply chain risk exists if these endpoints are compromised.  
> 位置：@connect metadata  
> 建议：Monitor the reputation and security of these endpoints.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v4-ad-skip-sponsorblock-hd-download)*
