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

> The script performs network requests to several third-party endpoints to fetch SponsorBlock data and enable video downloads. It stores user preferences persistently but does not collect sensitive user data such as cookies or form inputs. No dynamic code execution or sensitive API usage detected. Permissions requested are appropriate and used. External endpoints should be verified for trustworthiness. Overall, the script poses a medium security risk primarily due to data transmission to third-party servers.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://sponsor.ajay.app/api/skipSegments, https://co.wuk.sh, https://cobalt.api.timelessnesses.me, https://api.cobalt.tools） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script uses GM_xmlhttpRequest to send requests to third-party servers including sponsor.ajay.app, co.wuk.sh, cobalt.api.timelessnesses.me, and api.cobalt.tools. These requests are used to fetch SponsorBlock segments and to download videos via Cobalt instances. The script does not appear to send sensitive user data but does communicate with external APIs for functionality.  
> 位置：GM_xmlhttpRequest usage in main script  
> 建议：Ensure that the external endpoints are trustworthy and do not collect or misuse user data. Consider documenting what data is sent and received.

**⛔ CRITICAL** — Privacy Collection  
> Script reads and writes persistent settings via GM_getValue and GM_setValue but does not access document.cookie, localStorage, or sessionStorage. It does not listen to keyboard events or read form inputs. No evidence of browser fingerprinting APIs usage.  
> 位置：Persistent state management and event listeners  
> 建议：No action needed, privacy collection is minimal and limited to user preferences stored via GM storage.

**🔴 HIGH** — Remote Code Execution  
> No use of eval(), new Function(), setTimeout(string), or innerHTML to execute remote code detected in the provided code snippet. No @require directives or dynamic script tag injections found.  
> 位置：Script code  
> 建议：Maintain current practice of avoiding dynamic code execution to reduce risk of remote code execution.

**🔴 HIGH** — Permission Abuse  
> @grant directives (GM_addStyle, GM_xmlhttpRequest, GM_setValue, GM_getValue) are all used appropriately in the script. No unused high privilege grants detected.  
> 位置：@grant metadata and script usage  
> 建议：No action needed, permissions are properly scoped and used.

**🟠 MEDIUM** — Sensitive API Call  
> No usage of sensitive APIs such as navigator.geolocation, RTCPeerConnection, MediaDevices, or Clipboard API detected in the provided code snippet.  
> 位置：Script code  
> 建议：No action needed, no sensitive API usage detected.

**🟠 MEDIUM** — Code Obfuscation  
> No evidence of code obfuscation, base64 decoding, or suspicious string concatenation for code execution found in the provided code snippet.  
> 位置：Script code  
> 建议：Maintain code clarity and avoid obfuscation to facilitate security audits.

**🟡 LOW** — External Dependency  
> @connect URLs point to sponsor.ajay.app, co.wuk.sh, cobalt.api.timelessnesses.me, and api.cobalt.tools which are not standard CDNs but appear to be related to the script's functionality. No @require directives for external libraries found. Version is fixed at 3.0.0. External dependencies are limited and appear intentional.  
> 位置：@connect metadata and external endpoints  
> 建议：Verify trustworthiness of these external endpoints and monitor for supply chain risks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download)*
