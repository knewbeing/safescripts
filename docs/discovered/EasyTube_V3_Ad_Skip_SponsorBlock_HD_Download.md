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

**风险等级**：🔴 HIGH　　**安全评分**：50/100　　**分析时间**：2026-07-27

> The script communicates with third-party APIs (SponsorBlock and Cobalt) to provide ad skipping and video downloading features. While no sensitive user data (cookies, passwords, clipboard, etc.) is collected, YouTube video IDs and possibly metadata are sent to external servers. No code execution, obfuscation, DOM XSS, or supply chain risks detected. Persistent settings are stored locally. Overall, the main risk is data transmission to third-party services, which warrants caution and transparency.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://sponsor.ajay.app/api/skipSegments, https://co.wuk.sh, https://cobalt.api.timelessnesses.me） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script uses GM_xmlhttpRequest to communicate with SponsorBlock API and multiple Cobalt instances for video download. These are third-party servers and may receive YouTube video IDs and possibly other metadata.  
> 位置：CFG.sbApi, CFG.cobaltInstances, GM_xmlhttpRequest usage  
> 建议：Ensure only minimal, non-sensitive data is sent. Review SponsorBlock and Cobalt privacy policies.

**🟠 MEDIUM** — Privacy Collection  
> Script stores and retrieves user toggle settings and state using GM_setValue/GM_getValue. No evidence of sensitive data collection (cookies, passwords, clipboard, etc.), but persistent storage is used.  
> 位置：GM_setValue, GM_getValue  
> 建议：Do not store sensitive information. Document what is stored for transparency.

**🟠 MEDIUM** — Permission Usage  
> Script requests GM_xmlhttpRequest permission and @connect for multiple domains, but only uses these for SponsorBlock and Cobalt APIs. No evidence of excessive or unused permissions.  
> 位置：@grant GM_xmlhttpRequest, @connect  
> 建议：Limit @connect domains to only those strictly necessary. Periodically review for unused permissions.

**🟡 LOW** — Remote Code Execution  
> No evidence of eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection. No remote code execution risk detected.  
> 位置：Full script review  
> 建议：Continue to avoid dynamic code execution.

**🟡 LOW** — Obfuscation  
> No code obfuscation detected. Code is readable and not minified or encoded.  
> 位置：Full script review  
> 建议：Maintain code transparency.

**🟡 LOW** — DOM XSS  
> No DOM XSS risk detected. User input and URL parameters are not inserted into innerHTML/outerHTML unsafely.  
> 位置：Full script review  
> 建议：Continue to sanitize any future user input.

**🟡 LOW** — Supply Chain  
> No supply chain risk detected. No @require or external library loading.  
> 位置：Metadata block  
> 建议：If adding @require, use official CDN and fixed version.

**🟡 LOW** — WebSocket Usage  
> No WebSocket/EventSource usage detected.  
> 位置：Full script review  
> 建议：Avoid real-time external connections unless necessary.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download)*
