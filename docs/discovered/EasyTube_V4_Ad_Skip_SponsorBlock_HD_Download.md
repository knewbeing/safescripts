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

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-07-27

> The script communicates with two third-party servers (SponsorBlock and evdfrance.fr) for ad skipping and HD download functionality. No evidence of sensitive data collection, code obfuscation, remote code execution, or DOM XSS. Permissions are appropriate for the functionality. The main risk is data transmission to external servers, which may include video IDs or metadata. Overall, the script is reasonably safe for use, but users should be aware of the privacy implications of contacting third-party APIs.

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
> Script uses GM_xmlhttpRequest to communicate with sponsor.ajay.app (SponsorBlock API) and evdfrance.fr (HD download service). These are third-party servers and may receive video IDs or related metadata.  
> 位置：CFG.sbApi and download logic (likely further in code, but endpoints are defined)  
> 建议：Ensure only minimal, non-sensitive data is sent. Review SponsorBlock and evdfrance.fr privacy policies.

**🔴 HIGH** — Remote Code Execution  
> No evidence of eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection in the provided code.  
> 位置：Entire code (reviewed up to DOM helpers)  
> 建议：Avoid dynamic code execution. Use static, auditable code.

**🔴 HIGH** — Code Obfuscation  
> No evidence of code obfuscation, base64 encoding, unicode escapes, or minified/obfuscated code.  
> 位置：Entire code (reviewed up to DOM helpers)  
> 建议：Maintain readable, auditable code.

**🔴 HIGH** — DOM XSS  
> No evidence of DOM XSS or injection vulnerabilities. User input is not inserted into innerHTML/outerHTML.  
> 位置：Entire code (reviewed up to DOM helpers)  
> 建议：Always sanitize user input before DOM insertion.

**🟠 MEDIUM** — Privacy Collection  
> Script stores and retrieves settings using GM_setValue and GM_getValue. No evidence of sensitive data collection (cookies, form fields, clipboard, etc.) in the provided code.  
> 位置：STATE section and save() function  
> 建议：Do not store sensitive user data. Only store settings relevant to script functionality.

**🟠 MEDIUM** — Permission Usage  
> Script requests GM_xmlhttpRequest permission and @connect for two third-party domains. No evidence of excessive or unused permissions.  
> 位置：Metadata block (@grant, @connect)  
> 建议：Limit permissions to only those required. Remove unused grants.

**🟠 MEDIUM** — Supply Chain Risk  
> Script uses @require only for icons, not for third-party JS libraries. No supply chain risk detected.  
> 位置：Metadata block (@icon, @icon64)  
> 建议：If using @require for JS, ensure official CDN and fixed version.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v4-ad-skip-sponsorblock-hd-download)*
