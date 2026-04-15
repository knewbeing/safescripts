---
title: EasyTube V3 — YouTube广告跳过与高清视频下载
---

# EasyTube V3 — YouTube广告跳过与高清视频下载

`视频广告跳过`  `SponsorBlock屏蔽`  `高清视频下载`  `YouTube优化`  `广告拦截绕过`  `Tampermonkey脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/EasyTube_V3_Ad_Skip_SponsorBlock_HD_Download.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.0.0**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download) <Badge type="tip" text="GreasyFork" />　　安装量：**4,339**　　评分：👍4 / 👎1

## 功能介绍

本脚本能自动跳过YouTube上的所有广告，支持SponsorBlock的9种广告类别屏蔽。它还能强制视频以4K、1440p或1080p高清画质播放，并通过Cobalt多节点实现视频下载。脚本会记住你的设置，且能绕过广告拦截检测，兼容Tampermonkey和Violentmonkey。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后打开YouTube网站。
2. 播放视频时，脚本会自动跳过广告并屏蔽赞助商片段。
3. 可在脚本设置中选择强制高清视频画质。
4. 点击下载按钮即可通过Cobalt多节点下载视频。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式美化界面 |
| `GM_xmlhttpRequest` | 用于跨域请求SponsorBlock和下载服务API |
| `GM_setValue` | 用于保存用户设置 |
| `GM_getValue` | 用于读取用户保存的设置 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**分析时间**：2026-04-15

> The script performs network requests to third-party servers for SponsorBlock API and video download services, which constitutes data transmission of usage-related information. It does not collect sensitive user data such as cookies, form inputs, or fingerprinting information. No remote code execution or permission abuse is detected. The external dependencies are limited to known service endpoints without dynamic script loading. Overall, the script poses a medium security risk primarily due to data transmission to third-party servers.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://sponsor.ajay.app/api/skipSegments, https://co.wuk.sh, https://cobalt.api.timelessnesses.me, https://api.cobalt.tools） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> The script uses GM_xmlhttpRequest to communicate with third-party servers including sponsor.ajay.app, co.wuk.sh, cobalt.api.timelessnesses.me, and api.cobalt.tools. These requests may involve user data such as video IDs or usage statistics for SponsorBlock and download features.  
> 位置：GM_xmlhttpRequest calls to @connect domains  
> 建议：Ensure that no sensitive personal data is sent and that the endpoints are trustworthy. Provide transparency about data usage to users.

**⛔ CRITICAL** — Privacy Collection  
> The script reads and writes persistent settings via GM_setValue and GM_getValue but does not access document.cookie, localStorage, sessionStorage, or listen to keyboard input events. It does not appear to collect form data or use browser fingerprinting APIs.  
> 位置：Code usage of GM_setValue/GM_getValue and absence of cookie/localStorage access  
> 建议：No action needed as no privacy-invasive data collection detected.

**🔴 HIGH** — Remote Code Execution  
> No use of eval(), new Function(), setTimeout(string), or dynamic script injection detected in the provided code snippet. No @require directives loading remote scripts found.  
> 位置：Script code  
> 建议：Continue to avoid dynamic code execution to maintain security.

**🔴 HIGH** — Permission Abuse  
> The script requests GM_xmlhttpRequest, GM_setValue, GM_getValue, and GM_addStyle permissions, all of which are used appropriately in the code. No excessive or unused permissions detected.  
> 位置：@grant directives and code usage  
> 建议：No action needed.

**🟠 MEDIUM** — Sensitive API Call  
> No usage of sensitive APIs such as navigator.geolocation, RTCPeerConnection, MediaDevices, or Clipboard API detected in the provided code snippet.  
> 位置：Script code  
> 建议：No action needed.

**🟠 MEDIUM** — Code Obfuscation  
> No evidence of code obfuscation, base64 decoding, or suspicious string concatenation for code execution found in the provided snippet.  
> 位置：Script code  
> 建议：Maintain code clarity and avoid obfuscation to facilitate audits.

**🟡 LOW** — External Dependency  
> The script does not use @require to load external libraries. The @connect domains are known services related to SponsorBlock and Cobalt download services, which appear to be legitimate and fixed URLs without version ambiguity.  
> 位置：@connect and @require directives  
> 建议：Verify the trustworthiness of these external services periodically.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download)*
