---
title: "EasyTube V3 — Ad Skip, SponsorBlock & HD Download⬇️🚀"
---

# EasyTube V3 — Ad Skip, SponsorBlock & HD Download⬇️🚀



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/EasyTube_V3_Ad_Skip_SponsorBlock_HD_Download.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.0.0**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download) <Badge type="tip" text="GreasyFork" />　　安装量：**4,970**　　评分：👍5 / 👎2

## 功能介绍



## 适用网站

- 通用

## 使用方法

- 请参阅脚本说明

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：52/100　　**分析时间**：2026-07-06

> The script transmits YouTube video IDs and possibly metadata to third-party endpoints (SponsorBlock and Cobalt instances) for ad skipping and video downloading. No evidence of sensitive data collection, remote code execution, code obfuscation, or DOM XSS. Permissions are appropriate and no sensitive browser APIs are used. Supply chain risk exists due to reliance on non-official Cobalt instances. Overall, the script is functional but carries high risk due to third-party data transmission.

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
> Script uses GM_xmlhttpRequest to access SponsorBlock API and multiple Cobalt instances for video download. These are third-party servers and may receive YouTube video IDs and possibly other metadata.  
> 位置：CFG.sbApi, CFG.cobaltInstances, GM_xmlhttpRequest usage  
> 建议：Review transmitted data, ensure only minimal and non-sensitive information is sent. Document privacy policy for SponsorBlock and Cobalt endpoints.

**🔴 HIGH** — Remote Code Execution  
> No evidence of eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection. No @require of remote JS.  
> 位置：Full script review  
> 建议：Maintain strict avoidance of remote code execution patterns.

**🔴 HIGH** — Code Obfuscation  
> No code obfuscation detected. Code is readable, not minified or encoded.  
> 位置：Full script review  
> 建议：Maintain transparency and readability.

**🔴 HIGH** — DOM XSS/Injection  
> No evidence of DOM XSS or injection. User input is not inserted into innerHTML/outerHTML.  
> 位置：Full script review  
> 建议：Continue to avoid unsafe DOM manipulation.

**🟠 MEDIUM** — Privacy Collection  
> Script stores toggle settings and state using GM_setValue/GM_getValue, but does not appear to collect or transmit user credentials, cookies, or sensitive input.  
> 位置：Persistent State (GM_setValue/getValue)  
> 建议：Ensure no sensitive user data is stored or transmitted. Document what is stored for transparency.

**🟠 MEDIUM** — Permission Abuse  
> Script requests GM_xmlhttpRequest, GM_setValue, GM_getValue, GM_addStyle. All are used in code. No excessive or unused permissions.  
> 位置：Metadata block (@grant)  
> 建议：Keep permissions minimal and only as needed.

**🟠 MEDIUM** — Sensitive API Usage  
> No sensitive browser APIs (geolocation, RTCPeerConnection, MediaDevices, Clipboard API, Notification API) are used.  
> 位置：Full script review  
> 建议：Continue to avoid sensitive browser APIs.

**🟠 MEDIUM** — Supply Chain Risk  
> Third-party endpoints (SponsorBlock, Cobalt) are used for data transmission. These are well-known but not official YouTube APIs. No @require of third-party JS libraries.  
> 位置：CFG.sbApi, CFG.cobaltInstances, @connect  
> 建议：Monitor supply chain risk for Cobalt instances. Prefer official or well-audited endpoints.

**🟡 LOW** — ClickJacking/Iframe Risk  
> No evidence of clickjacking or iframe manipulation.  
> 位置：Full script review  
> 建议：Continue to avoid iframe risks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download)*
