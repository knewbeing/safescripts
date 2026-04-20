---
title: "EasyTube V3 — YouTube广告跳过、SponsorBlock和HD下载器"
---

# EasyTube V3 — YouTube广告跳过、SponsorBlock和HD下载器

`广告屏蔽`  `视频下载`  `YouTube增强`  `SponsorBlock`  `高清视频`  `自动化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/EasyTube_V3_Ad_Skip_SponsorBlock_HD_Download.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.0.0**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download) <Badge type="tip" text="GreasyFork" />　　安装量：**4,964**　　评分：👍5 / 👎2

## 功能介绍

本脚本可自动跳过YouTube所有广告，支持SponsorBlock自动跳过片头片尾等内容，强制高清视频播放，并提供多节点视频下载功能。还能记住你的设置，并绕过广告拦截检测。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后，打开YouTube即可自动跳过广告和SponsorBlock片段。
2. 在视频页面可选择下载高清视频。
3. 如需调整设置，可在页面上的脚本界面进行切换。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 允许脚本自定义页面样式。 |
| `GM_xmlhttpRequest` | 让脚本能跨域请求数据，如获取SponsorBlock信息或下载链接。 |
| `GM_setValue` | 用于保存你的脚本设置。 |
| `GM_getValue` | 用于读取你保存的脚本设置。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-04-20

> Script transmits YouTube video IDs and possibly metadata to third-party APIs (SponsorBlock and Cobalt instances) for ad skipping and video downloading. No evidence of sensitive data collection or code execution risks. Supply chain risk exists due to reliance on non-official endpoints. Overall, script is readable and permissions are appropriate, but users should be aware of privacy implications and supply chain risks.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://sponsor.ajay.app/api/skipSegments, https://co.wuk.sh, https://cobalt.api.timelessnesses.me） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script uses GM_xmlhttpRequest to communicate with SponsorBlock API and multiple Cobalt instances for video download. These are third-party servers and may receive YouTube video IDs and possibly other metadata.  
> 位置：CFG.sbApi, CFG.cobaltInstances, GM_xmlhttpRequest usage  
> 建议：Ensure only minimal, non-sensitive data is sent. Review SponsorBlock and Cobalt privacy policies. Warn users about potential privacy implications.

**🟠 MEDIUM** — Supply Chain Risk  
> Script connects to multiple third-party APIs (SponsorBlock, Cobalt instances). These are not official YouTube APIs and pose supply chain risk if endpoints are compromised.  
> 位置：@connect sponsor.ajay.app, co.wuk.sh, cobalt.api.timelessnesses.me, api.cobalt.tools  
> 建议：Prefer official APIs or well-known, audited endpoints. Monitor for endpoint changes or compromise.

**🟡 LOW** — Privacy Collection  
> Script stores user toggle settings and state using GM_setValue/GM_getValue, but does not appear to collect or transmit sensitive user data (e.g., cookies, form values, clipboard, or keyboard input).  
> 位置：GM_setValue, GM_getValue usage  
> 建议：Continue to avoid collecting sensitive data. Periodically review for privacy leaks.

**🟡 LOW** — Remote Code Execution  
> No evidence of eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection. No @require or document.write usage.  
> 位置：Full script review  
> 建议：Maintain strict avoidance of remote code execution patterns.

**🟡 LOW** — Code Obfuscation  
> No code obfuscation detected. Script is readable, not minified or obfuscated.  
> 位置：Full script review  
> 建议：Maintain transparency and readability.

**🟡 LOW** — DOM XSS  
> No DOM XSS risk detected. User input and URL parameters are not directly inserted into innerHTML/outerHTML.  
> 位置：Full script review  
> 建议：Continue to sanitize any future user input handling.

**🟡 LOW** — Permission Abuse  
> Script requests GM_xmlhttpRequest, GM_setValue, GM_getValue, GM_addStyle. All are used in code. No evidence of unused high-risk grants.  
> 位置：Metadata block (@grant)  
> 建议：Avoid requesting unnecessary permissions.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download)*
