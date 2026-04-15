---
title: EasyTube V3 — YouTube广告跳过与高清下载
---

# EasyTube V3 — YouTube广告跳过与高清下载

`视频广告跳过`  `SponsorBlock`  `高清视频下载`  `YouTube优化`  `广告拦截绕过`  `Tampermonkey脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/EasyTube_V3_Ad_Skip_SponsorBlock_HD_Download.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.0.0**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download) <Badge type="tip" text="GreasyFork" />　　安装量：**4,335**　　评分：👍4 / 👎1

## 功能介绍

本脚本自动跳过YouTube上的所有广告，支持SponsorBlock的9种广告类别屏蔽。它还能强制视频以4K、1440p或1080p高清画质播放，并通过多节点Cobalt服务实现视频下载。脚本会记住你的设置，且能绕过广告拦截检测，兼容Tampermonkey和Violentmonkey。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后打开YouTube网站。
2. 播放视频时，广告会自动跳过，无需手动操作。
3. 可通过脚本界面设置视频画质和下载选项。
4. 设置会自动保存，下次访问时生效。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式美化界面 |
| `GM_xmlhttpRequest` | 用于跨域请求SponsorBlock和Cobalt等API获取数据 |
| `GM_setValue` | 用于保存用户的设置和偏好 |
| `GM_getValue` | 用于读取保存的用户设置 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**分析时间**：2026-04-15

> The script performs network requests to several third-party endpoints to fetch SponsorBlock segments and download video content via Cobalt instances. It stores user toggle settings persistently but does not collect sensitive user input or browser fingerprinting data. No remote code execution or permission abuse detected. Overall, the main risk is data transmission to external servers, which is expected for its functionality but requires user awareness.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://sponsor.ajay.app/api/skipSegments, https://co.wuk.sh, https://cobalt.api.timelessnesses.me, https://api.cobalt.tools） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> The script uses GM_xmlhttpRequest to communicate with third-party servers including sponsor.ajay.app, co.wuk.sh, cobalt.api.timelessnesses.me, and api.cobalt.tools. These requests may transmit user-related data such as video IDs or usage statistics to these external endpoints.  
> 位置：GM_xmlhttpRequest calls to @connect domains  
> 建议：Ensure that no sensitive or personally identifiable information is sent. Review privacy policies of these endpoints and inform users about data transmission.

**⛔ CRITICAL** — Privacy Collection  
> The script reads and writes persistent settings using GM_setValue and GM_getValue but does not explicitly access document.cookie, localStorage, or sessionStorage. No event listeners for keyboard input or form data reading were found. No browser fingerprinting APIs usage detected.  
> 位置：Script code analysis  
> 建议：No immediate action needed, but maintain transparency about stored settings and ensure no sensitive data is stored without user consent.

**🔴 HIGH** — Remote Code Execution  
> No usage of eval(), new Function(), setTimeout(string), or innerHTML with dynamic content was detected. No @require directives or dynamic script tag injections for remote code loading found.  
> 位置：Script code analysis  
> 建议：Continue to avoid dynamic code execution from untrusted sources to maintain security.

**🔴 HIGH** — Permission Abuse  
> The script requests GM_xmlhttpRequest, GM_setValue, GM_getValue, and GM_addStyle permissions, all of which are used appropriately in the code. No unused or excessive permissions detected.  
> 位置：@grant directives and script usage  
> 建议：No action needed.

**🟠 MEDIUM** — Sensitive API Call  
> No usage of sensitive APIs such as navigator.geolocation, RTCPeerConnection, MediaDevices, or Clipboard API was found in the script.  
> 位置：Script code analysis  
> 建议：No action needed.

**🟠 MEDIUM** — Code Obfuscation  
> No evidence of code obfuscation, base64 decoding, or suspicious string concatenation for code execution was found.  
> 位置：Script code analysis  
> 建议：Maintain code clarity and avoid obfuscation to facilitate security audits.

**🟡 LOW** — External Dependency  
> The script does not use @require to load external libraries. The @connect domains are known public endpoints related to the script's functionality. No version pinning applies as no external libraries are loaded.  
> 位置：@require and @connect directives  
> 建议：Ensure the external endpoints remain trustworthy and monitor for any supply chain risks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download)*
