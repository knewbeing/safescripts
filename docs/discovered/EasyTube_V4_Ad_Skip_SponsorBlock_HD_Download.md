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

**风险等级**：🟡 LOW　　**安全评分**：72/100　　**分析时间**：2026-07-13

> The script is generally safe and well-structured. It communicates with two third-party APIs (SponsorBlock and evdfrance.fr) to provide its features, but does not transmit sensitive user data or cookies. No code obfuscation, DOM XSS, or dangerous dynamic code execution is present. Permissions are appropriate for the functionality. Users should be aware of the third-party API usage for transparency.

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
> The script uses GM_xmlhttpRequest to communicate with sponsor.ajay.app (SponsorBlock API) and evdfrance.fr (video download). These are third-party servers. However, only video IDs and category data are sent, not sensitive user data or cookies.  
> 位置：SponsorBlock and download logic (CFG.sbApi, evdfrance.fr)  
> 建议：Review the endpoints' privacy policies and ensure only minimal, non-sensitive data is sent. Consider warning users about third-party API usage.

**🟠 MEDIUM** — Permission Usage  
> The script requests GM_xmlhttpRequest permission, which allows arbitrary cross-origin requests. However, usage is limited to the two whitelisted domains.  
> 位置：Metadata block (@grant GM_xmlhttpRequest, @connect)  
> 建议：Limit @connect domains strictly and document all external requests in user documentation.

**🟡 LOW** — Privacy  
> The script stores and retrieves user settings using GM_setValue and GM_getValue. No sensitive data is stored, only feature toggles.  
> 位置：Settings logic (S, save(), GM_setValue/GM_getValue)  
> 建议：Ensure no sensitive or personal data is stored or transmitted.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v4-ad-skip-sponsorblock-hd-download)*
