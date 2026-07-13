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

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-07-13

> The script is generally well-structured and does not appear to collect or exfiltrate sensitive user data. It communicates with the SponsorBlock API and a video download endpoint, but only for the stated functionality. No evidence of privacy-invasive behavior, code obfuscation, or DOM XSS. Permissions are appropriate for the features, but network requests to third-party servers always carry some risk. Review payloads and endpoints regularly.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://sponsor.ajay.app/api/skipSegments, https://evdfrance.fr） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> The script uses GM_xmlhttpRequest to communicate with sponsor.ajay.app (SponsorBlock API) and evdfrance.fr (likely for video download functionality). These are third-party servers, but only video IDs and segment categories are sent, not user credentials or cookies.  
> 位置：CFG.sbApi, @connect evdfrance.fr, GM_xmlhttpRequest usage (likely in full code)  
> 建议：Review the exact payload sent to these endpoints. Ensure no sensitive user data (e.g., cookies, tokens, personal info) is transmitted. Document all data flows.

**🟠 MEDIUM** — Permission Usage  
> The script requests GM_xmlhttpRequest permission, which is high privilege and can be abused if not strictly limited to trusted endpoints.  
> 位置：@grant GM_xmlhttpRequest  
> 建议：Restrict network requests to only the necessary endpoints and validate all URLs. Avoid dynamic or user-controlled endpoints.

**🟡 LOW** — Permission Usage  
> The script requests GM_setValue and GM_getValue, which are used for storing user settings. No evidence of sensitive data storage or exfiltration, but these APIs should be used carefully.  
> 位置：@grant GM_setValue, GM_getValue  
> 建议：Ensure only non-sensitive settings are stored. Do not store credentials or personal data.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v5-youtube-ad-skip-sponsorblock-force-4k-hd-downloader)*
