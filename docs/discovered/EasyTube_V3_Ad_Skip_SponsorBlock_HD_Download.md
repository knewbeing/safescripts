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

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-05-11

> The script transmits YouTube video IDs and possibly user interaction data to third-party APIs (SponsorBlock and Cobalt downloaders) using GM_xmlhttpRequest. No evidence of sensitive data collection, code obfuscation, or XSS risk. Supply chain risk exists due to reliance on non-official endpoints. Overall, the script is transparent and focused on its stated purpose, but users should be aware of the data sent to external services.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：sponsor.ajay.app, co.wuk.sh, cobalt.api.timelessnesses.me） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script uses GM_xmlhttpRequest to interact with SponsorBlock and Cobalt APIs. These requests may include YouTube video IDs and possibly user interaction data (e.g., which segments are skipped, download requests).  
> 位置：CFG.sbApi, CFG.cobaltInstances, code using GM_xmlhttpRequest  
> 建议：Ensure only minimal, non-personal data is sent. Document exactly what is transmitted. Consider proxying or anonymizing requests if possible.

**🟠 MEDIUM** — Supply Chain Risk  
> Script connects to multiple third-party APIs (SponsorBlock, Cobalt instances). These are well-known in the YouTube enhancement community, but not official. There is a supply chain risk if these endpoints are compromised or change behavior.  
> 位置：@connect section and CFG.cobaltInstances  
> 建议：Monitor the reputation and security of these endpoints. Consider allowing users to configure endpoints.

**🟡 LOW** — Privacy Collection  
> Script stores user toggle settings (ad skip, SponsorBlock, quality) using GM_setValue/GM_getValue. No evidence of reading cookies, localStorage, or sessionStorage directly. No evidence of keylogging or clipboard access.  
> 位置：Persistent state section (GM_setValue/GM_getValue)  
> 建议：No privacy issue detected, but document what is stored for transparency.

**🟡 LOW** — Remote Code Execution  
> No use of eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection detected in the provided code. No @require of remote scripts.  
> 位置：Full script  
> 建议：Continue to avoid dynamic code execution and remote script loading.

**🟡 LOW** — Obfuscation  
> No code obfuscation detected. Code is readable and not minified or encoded.  
> 位置：Full script  
> 建议：Maintain code transparency for user trust.

**🟡 LOW** — DOM XSS  
> No evidence of DOM XSS or unsafe innerHTML/outerHTML usage in the provided code. No document.write() or iframe src manipulation.  
> 位置：Full script  
> 建议：Continue to avoid inserting untrusted content into the DOM.

**🟡 LOW** — Permission Usage  
> Script requests GM_xmlhttpRequest, GM_setValue, GM_getValue, and GM_addStyle. All are used appropriately. No evidence of unused or excessive permissions.  
> 位置：@grant section and code usage  
> 建议：No action needed.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download)*
