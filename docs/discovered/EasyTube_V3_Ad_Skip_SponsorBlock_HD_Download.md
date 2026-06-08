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

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-06-08

> The script is generally well-structured and does not exhibit code obfuscation, remote code execution, or DOM XSS risks. The main security concern is the transmission of YouTube video IDs and possibly other metadata to third-party APIs (SponsorBlock and Cobalt downloaders). No evidence of sensitive privacy data collection or excessive permissions. Supply chain risk is present due to reliance on external APIs. Overall, the script is medium risk, primarily due to third-party data transmission.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：sponsor.ajay.app, co.wuk.sh, cobalt.api.timelessnesses.me） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script makes network requests to third-party APIs (SponsorBlock and multiple Cobalt instances) using GM_xmlhttpRequest. These requests may include the current YouTube video ID and possibly other metadata, which could be considered user data.  
> 位置：CFG.sbApi, CFG.cobaltInstances, functions using GM_xmlhttpRequest  
> 建议：Document all data sent to third-party APIs. Consider adding user consent and clear privacy notice. Limit data to only what is strictly necessary.

**🟠 MEDIUM** — Supply Chain Risk  
> The script connects to multiple third-party APIs for SponsorBlock and Cobalt download functionality. These are public APIs, but supply chain risk exists if these endpoints are compromised or change behavior.  
> 位置：@connect metadata, CFG.sbApi, CFG.cobaltInstances  
> 建议：Monitor third-party API trustworthiness. Consider allowing users to configure endpoints.

**🟡 LOW** — Privacy Collection  
> The script stores user toggle settings (ad skip, SponsorBlock, quality) using GM_setValue/GM_getValue. While this is local, it does not appear to collect or transmit sensitive user data such as cookies, form fields, or clipboard contents.  
> 位置：Persistent state section (S object, save function)  
> 建议：No action needed unless future versions add sensitive data collection.

**🟡 LOW** — Remote Code Execution  
> The script does not use eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection. No remote code execution risk detected.  
> 位置：Full script  
> 建议：Continue to avoid dynamic code execution patterns.

**🟡 LOW** — Obfuscation  
> No code obfuscation or minification detected. Code is readable and not packed.  
> 位置：Full script  
> 建议：Maintain code transparency for user trust.

**🟡 LOW** — DOM XSS  
> No direct DOM XSS risk detected. The script does not insert untrusted user input into innerHTML/outerHTML or document.write.  
> 位置：UI and toast functions  
> 建议：Continue to sanitize any future user input if used in DOM.

**🟡 LOW** — Permission Usage  
> The script requests GM_xmlhttpRequest, GM_setValue, GM_getValue, and GM_addStyle. All are used appropriately. No excessive or unused permissions detected.  
> 位置：@grant metadata and usage in code  
> 建议：Keep permissions minimal and only as needed.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download)*
