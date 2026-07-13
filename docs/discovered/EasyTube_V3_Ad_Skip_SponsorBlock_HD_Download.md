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

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-07-13

> The script is generally well-structured and does not use obfuscation, dynamic code execution, or introduce DOM XSS. The main security concern is the transmission of YouTube video IDs and possibly other metadata to third-party APIs (SponsorBlock and Cobalt instances) for ad skipping and video downloading. No evidence of sensitive privacy data collection or supply chain risk. Permissions are appropriate for the functionality. Users should be aware of the privacy implications of using third-party APIs for SponsorBlock and video download.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：sponsor.ajay.app, co.wuk.sh, cobalt.api.timelessnesses.me） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script uses GM_xmlhttpRequest to communicate with third-party APIs (SponsorBlock and multiple Cobalt instances) for segment skipping and video downloading. These requests may include YouTube video IDs and possibly other metadata, which could be considered user data.  
> 位置：CFG.sbApi, CFG.cobaltInstances, and related logic (network requests to sponsor.ajay.app, co.wuk.sh, cobalt.api.timelessnesses.me, api.cobalt.tools)  
> 建议：Document all data sent to third-party APIs. Consider proxying requests or informing users about privacy implications. Limit data to only what is strictly necessary.

**🟠 MEDIUM** — Privacy Collection  
> The script stores and retrieves user toggle settings (ad skip, SponsorBlock, quality) using GM_setValue/GM_getValue. While this is local, it does not appear to collect sensitive data. No evidence of reading cookies, clipboard, or keylogging.  
> 位置：Persistent state section (GM_setValue/GM_getValue)  
> 建议：Ensure no sensitive user data is stored or transmitted. Document what is stored for transparency.

**🟠 MEDIUM** — Permission Usage  
> The script requests GM_xmlhttpRequest permission, which is necessary for cross-origin API calls, but does not request other high-risk permissions. No evidence of unused high-privilege grants.  
> 位置：@grant section in metadata  
> 建议：Keep permissions minimal and only request those strictly necessary.

**🟡 LOW** — Remote Code Execution  
> No evidence of eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection. No obfuscation or minified code detected.  
> 位置：Full script body  
> 建议：Maintain code clarity and avoid introducing dynamic code execution.

**🟡 LOW** — DOM XSS  
> The script does not appear to introduce DOM XSS or inject untrusted user input into the DOM. No use of innerHTML/outerHTML with untrusted data.  
> 位置：UI and toast functions  
> 建议：Continue to avoid inserting untrusted data into the DOM without sanitization.

**🟡 LOW** — Supply Chain Risk  
> @require is not used; all code is local. No supply chain risk from external libraries.  
> 位置：Metadata block  
> 建议：If adding @require in the future, use only official, version-pinned sources.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download)*
