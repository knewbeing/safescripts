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

**风险等级**：🟠 MEDIUM　　**安全评分**：59/100　　**分析时间**：2026-06-15

> The script transmits YouTube video IDs and possibly metadata to third-party APIs (SponsorBlock and Cobalt instances) for ad skipping and video downloading. No evidence of sensitive user data collection, remote code execution, obfuscation, or DOM XSS. Supply chain risk exists due to reliance on external Cobalt endpoints. Overall, the script is reasonably safe for its purpose, but users should be aware of third-party data transmission and supply chain risks.

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
> 建议：Ensure only minimal, non-sensitive data is sent. Review SponsorBlock and Cobalt privacy policies.

**🔴 HIGH** — Remote Code Execution  
> No evidence of eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection. No @require of remote JS libraries.  
> 位置：Full script code  
> 建议：Continue to avoid remote code execution patterns.

**🔴 HIGH** — Code Obfuscation  
> No evidence of code obfuscation, base64 decoding, unicode escapes, or minified/obfuscated code.  
> 位置：Full script code  
> 建议：Maintain readable, non-obfuscated code.

**🔴 HIGH** — DOM XSS  
> No evidence of DOM XSS or injection. User input is not inserted into innerHTML/outerHTML, and document.write is not used.  
> 位置：Full script code  
> 建议：Continue to avoid unsafe DOM manipulation.

**🟠 MEDIUM** — Privacy Collection  
> Script stores and retrieves persistent state using GM_setValue and GM_getValue, including toggle settings and possibly video IDs. No evidence of sensitive user data (like cookies, passwords, or clipboard) being collected.  
> 位置：Persistent state section (S object)  
> 建议：Do not store sensitive information. Current usage appears safe.

**🟠 MEDIUM** — Permission Abuse  
> Script requests GM_xmlhttpRequest permission and @connect for multiple domains, but only uses these for SponsorBlock and Cobalt APIs. No evidence of excessive or unused high privileges.  
> 位置：@grant, @connect in metadata  
> 建议：Restrict @connect to only necessary domains. Remove unused @grant permissions if any.

**🟠 MEDIUM** — Sensitive API Usage  
> No evidence of WebSocket/EventSource usage.  
> 位置：Full script code  
> 建议：Avoid using WebSocket for user data transmission.

**🟠 MEDIUM** — Sensitive API Usage  
> No evidence of navigator.geolocation, RTCPeerConnection, MediaDevices, Clipboard API, or Notification API usage.  
> 位置：Full script code  
> 建议：Continue to avoid sensitive browser APIs.

**🟠 MEDIUM** — Supply Chain Risk  
> Cobalt instances are third-party video downloaders. Supply chain risk exists if these endpoints are compromised or change behavior.  
> 位置：CFG.cobaltInstances, @connect  
> 建议：Monitor Cobalt instance reputation and availability. Prefer official or well-known endpoints.

**🟡 LOW** — ClickJacking / iframe Risk  
> No evidence of clickjacking or iframe manipulation.  
> 位置：Full script code  
> 建议：Continue to avoid iframe risks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download)*
