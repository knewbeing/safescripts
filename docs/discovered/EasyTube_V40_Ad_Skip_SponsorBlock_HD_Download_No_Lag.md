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

**风险等级**：🔴 HIGH　　**安全评分**：24/100　　**分析时间**：2026-05-25

> The script is generally well-written and avoids code obfuscation, dynamic code execution, DOM XSS, and sensitive API usage. However, it communicates with two third-party servers (sponsor.ajay.app and evdfrance.fr) for SponsorBlock and video download features, which introduces CRITICAL data transmission risks. No evidence of privacy collection or exfiltration beyond necessary video metadata. Supply chain risk is moderate due to reliance on evdfrance.fr. Overall, the script is functional but carries high risk due to external data transmission.

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
> Script uses GM_xmlhttpRequest to communicate with sponsor.ajay.app for SponsorBlock functionality. This is a third-party API, but only video ID and category data are sent, not sensitive user data.  
> 位置：CFG.sbApi and related SponsorBlock logic  
> 建议：Ensure only minimal, non-sensitive data is sent. Review SponsorBlock privacy policy.

**⛔ CRITICAL** — Data Transmission  
> Script uses GM_xmlhttpRequest to communicate with evdfrance.fr for video download functionality. This may transmit video IDs and possibly other metadata.  
> 位置：evdfrance.fr download logic  
> 建议：Ensure only necessary data is sent. Review evdfrance.fr privacy and security.

**🔴 HIGH** — Remote Code Execution  
> No evidence of eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection.  
> 位置：Full script review  
> 建议：Maintain strict avoidance of dynamic code execution.

**🔴 HIGH** — Code Obfuscation  
> No evidence of code obfuscation, base64 decoding, unicode encoding, or minified/obfuscated code.  
> 位置：Full script review  
> 建议：Maintain code clarity and transparency.

**🔴 HIGH** — DOM XSS/Injection  
> No evidence of DOM XSS or injection vulnerabilities. User input is not inserted into innerHTML/outerHTML.  
> 位置：Full script review  
> 建议：Continue to avoid unsafe DOM manipulation.

**🟠 MEDIUM** — Privacy Collection  
> Script uses GM_getValue and GM_setValue to store user settings locally. No evidence of sensitive data collection or exfiltration.  
> 位置：S object and save() function  
> 建议：Do not store sensitive information. Current usage is acceptable.

**🟠 MEDIUM** — Permission Abuse  
> Script requests GM_xmlhttpRequest, GM_addStyle, GM_setValue, GM_getValue. All are used appropriately. No evidence of unused high privileges.  
> 位置：Metadata block (@grant)  
> 建议：Do not request unnecessary permissions.

**🟠 MEDIUM** — Sensitive API Usage  
> No evidence of sensitive API usage (geolocation, RTCPeerConnection, MediaDevices, Clipboard API, Notification API).  
> 位置：Full script review  
> 建议：Avoid introducing sensitive API calls.

**🟠 MEDIUM** — Supply Chain Risk  
> Third-party APIs used: sponsor.ajay.app (SponsorBlock, widely trusted), evdfrance.fr (video download, less known). No @require third-party JS libraries.  
> 位置：Metadata block (@connect)  
> 建议：Monitor evdfrance.fr for supply chain risks.

**🟡 LOW** — ClickJacking/Iframe Risk  
> No evidence of clickjacking or iframe manipulation.  
> 位置：Full script review  
> 建议：Continue to avoid iframe risks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v4-0-ad-skip-sponsorblock-hd-download-no-lag)*
