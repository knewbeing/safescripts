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

**风险等级**：🔴 HIGH　　**安全评分**：52/100　　**分析时间**：2026-05-25

> The script transmits YouTube video IDs and possibly other metadata to third-party servers (SponsorBlock and multiple Cobalt instances) for ad skipping and video downloading. No evidence of sensitive privacy collection or code execution risks. Supply chain risk exists due to reliance on unofficial Cobalt APIs. Users should be aware of potential privacy implications and supply chain risks.

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
> 建议：Review privacy policy of SponsorBlock and Cobalt instances. Limit data sent to only necessary video IDs. Warn users about potential privacy implications.

**🟠 MEDIUM** — Privacy Collection  
> Script stores toggle settings and state using GM_setValue/GM_getValue. No evidence of sensitive data collection (cookies, form fields, clipboard, etc.), but persistent storage is used.  
> 位置：GM_setValue, GM_getValue  
> 建议：Ensure only non-sensitive preferences are stored. Do not store user credentials or personal information.

**🟠 MEDIUM** — Supply Chain Risk  
> Script connects to multiple Cobalt instances for video download. These are not official YouTube APIs and may pose supply chain risks.  
> 位置：@connect cobalt.api.timelessnesses.me, @connect api.cobalt.tools, @connect co.wuk.sh  
> 建议：Warn users about potential supply chain risks. Prefer official or well-known APIs when possible.

**🟡 LOW** — Remote Code Execution  
> No evidence of eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection. No @require of remote JS libraries.  
> 位置：Full script review  
> 建议：Continue to avoid remote code execution patterns.

**🟡 LOW** — Code Obfuscation  
> No evidence of code obfuscation, base64 decoding, unicode encoding, or minified single-line code.  
> 位置：Full script review  
> 建议：Maintain readable, non-obfuscated code.

**🟡 LOW** — DOM XSS  
> No evidence of DOM XSS or injection. User input is not inserted into innerHTML/outerHTML, nor is document.write used.  
> 位置：Full script review  
> 建议：Continue to sanitize any future user input before DOM insertion.

**🟡 LOW** — Permission Abuse  
> Script requests GM_xmlhttpRequest, GM_setValue, GM_getValue, GM_addStyle. All are used in code. No evidence of unused high-privilege grants.  
> 位置：Metadata block  
> 建议：Do not request unnecessary permissions.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download)*
