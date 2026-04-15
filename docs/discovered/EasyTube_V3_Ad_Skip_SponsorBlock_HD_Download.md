---
title: EasyTube V3 — YouTube广告跳过与高清视频下载
---

# EasyTube V3 — YouTube广告跳过与高清视频下载

`广告跳过`  `视频下载`  `高清画质`  `YouTube`  `SponsorBlock`  `广告拦截绕过`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/EasyTube_V3_Ad_Skip_SponsorBlock_HD_Download.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.0.0**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download) <Badge type="tip" text="GreasyFork" />　　安装量：**4,339**　　评分：👍4 / 👎1

## 功能介绍

本脚本自动跳过YouTube上的所有广告，支持SponsorBlock的9种广告类别屏蔽。它还能强制视频以4K、1440p或1080p高清画质播放，并通过Cobalt多节点实现视频下载。脚本会记忆你的设置，且能绕过广告拦截检测，兼容Tampermonkey和Violentmonkey。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后打开YouTube网站。
2. 播放视频时，广告会自动跳过，无需手动操作。
3. 可在脚本设置中选择想要屏蔽的SponsorBlock广告类别。
4. 支持强制切换到4K或其他高清画质，并可下载视频。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式美化页面或界面 |
| `GM_xmlhttpRequest` | 允许跨域请求SponsorBlock和Cobalt等API获取数据 |
| `GM_setValue` | 保存用户的设置和偏好 |
| `GM_getValue` | 读取用户保存的设置和偏好 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**分析时间**：2026-04-15

> The script performs network requests to third-party servers for SponsorBlock API and video download services, which constitutes data transmission risk. However, it does not collect sensitive user data such as cookies, form inputs, or keyboard events. No remote code execution or permission abuse detected. Overall, the script poses a medium security risk primarily due to data transmission to external servers.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://sponsor.ajay.app/api/skipSegments, https://co.wuk.sh, https://cobalt.api.timelessnesses.me, https://api.cobalt.tools） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> The script uses GM_xmlhttpRequest to send requests to third-party servers including sponsor.ajay.app, co.wuk.sh, cobalt.api.timelessnesses.me, and api.cobalt.tools. These requests may include user data or usage statistics related to SponsorBlock segments and video downloads.  
> 位置：GM_xmlhttpRequest calls to @connect domains  
> 建议：Ensure that no sensitive personal data is sent in requests. Provide transparency about data usage and obtain user consent if necessary.

**⛔ CRITICAL** — Privacy Collection  
> The script reads and writes persistent settings using GM_setValue and GM_getValue but does not appear to access document.cookie, localStorage, or sessionStorage, nor does it listen to keyboard events or access form inputs.  
> 位置：Code analysis of storage and event listeners  
> 建议：No action needed as no privacy-invasive data collection detected.

**🔴 HIGH** — Remote Code Execution  
> No use of eval(), new Function(), setTimeout(string), or dynamic script injection detected in the provided code snippet. No @require directives loading remote scripts found.  
> 位置：Code analysis  
> 建议：Continue to avoid dynamic code execution from untrusted sources.

**🔴 HIGH** — Permission Abuse  
> The script requests GM_xmlhttpRequest, GM_setValue, GM_getValue, and GM_addStyle permissions, all of which are used appropriately in the code. No excessive or unused permissions detected.  
> 位置：@grant directives vs code usage  
> 建议：No action needed.

**🟠 MEDIUM** — Sensitive API Call  
> No usage of sensitive APIs such as navigator.geolocation, RTCPeerConnection, MediaDevices, or Clipboard API detected in the provided code snippet.  
> 位置：Code analysis  
> 建议：No action needed.

**🟠 MEDIUM** — Code Obfuscation  
> No evidence of code obfuscation, base64 decoding, or suspicious string concatenation detected in the provided code snippet.  
> 位置：Code analysis  
> 建议：Maintain code transparency for security and maintainability.

**🟡 LOW** — External Dependencies  
> The script does not use @require to load external libraries; all external dependencies are accessed via GM_xmlhttpRequest to known domains. The domains appear to be related to the script author or known services. No version pinning applies as no external libraries are loaded via @require.  
> 位置：@require and @connect directives  
> 建议：Verify the trustworthiness of connected domains and monitor for supply chain risks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download)*
