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

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-04-27

> The script transmits YouTube video IDs and possibly other metadata to third-party servers (SponsorBlock and Cobalt instances) for ad skipping and video downloading. No evidence of sensitive data collection or code obfuscation. Supply chain risk exists due to reliance on unofficial Cobalt APIs. Overall, the script is readable and avoids dynamic code execution, but users should be aware of privacy and supply chain risks.

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
> 建议：Review transmitted data, ensure only non-sensitive info is sent. Warn users about potential privacy implications.

**🟠 MEDIUM** — Privacy Collection  
> Script stores and retrieves user toggle settings via GM_setValue/GM_getValue. No evidence of sensitive data collection (e.g., cookies, passwords, clipboard, keyboard input).  
> 位置：Persistent state section (GM_setValue, GM_getValue)  
> 建议：Ensure only non-sensitive preferences are stored. Do not expand to sensitive data collection.

**🟠 MEDIUM** — Supply Chain Risk  
> Script connects to multiple Cobalt instances for video download. These are not official YouTube APIs and may pose supply chain risks.  
> 位置：CFG.cobaltInstances, @connect  
> 建议：Warn users about supply chain risk. Prefer official or well-known APIs/CDNs.

**🟡 LOW** — Remote Code Execution  
> Script applies playbackRate tricks and DOM manipulation but does not use eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection.  
> 位置：Main logic  
> 建议：Maintain avoidance of dynamic code execution.

**🟡 LOW** — Code Obfuscation  
> No evidence of code obfuscation, base64 decoding, unicode string encoding, or minified/obfuscated code.  
> 位置：Entire script  
> 建议：Continue to publish readable, auditable code.

**🟡 LOW** — DOM XSS  
> No DOM XSS risk detected: user input and URL parameters are not inserted into innerHTML/outerHTML without sanitization.  
> 位置：DOM manipulation sections  
> 建议：Maintain safe DOM handling practices.

**🟡 LOW** — Permission Abuse  
> Script requests GM_xmlhttpRequest, GM_setValue, GM_getValue, GM_addStyle. All are used. No evidence of unused high-risk grants.  
> 位置：Metadata @grant section  
> 建议：Do not request unnecessary permissions.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download)*
