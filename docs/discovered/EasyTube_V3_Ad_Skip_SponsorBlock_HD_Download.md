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

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-05-18

> The script transmits YouTube video IDs to third-party APIs (SponsorBlock and Cobalt downloaders) to provide its core features. No evidence of sensitive data (cookies, credentials, clipboard, or keylogging) collection or transmission. No code obfuscation, remote code execution, or DOM XSS risks detected. Permissions are appropriate for the functionality. Supply chain risk is moderate due to reliance on public Cobalt instances. Overall, the script is safe for most users, but privacy-conscious users should be aware of the data sent to external services.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://sponsor.ajay.app/api/skipSegments, https://co.wuk.sh, https://cobalt.api.timelessnesses.me） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script sends requests to third-party APIs (SponsorBlock and multiple Cobalt instances) using GM_xmlhttpRequest. These requests include the current YouTube video ID, which may be considered user activity data.  
> 位置：CFG.sbApi, CFG.cobaltInstances, SponsorBlock and download logic  
> 建议：Clearly inform users about data transmission. Consider proxying requests or minimizing data sent if privacy is a concern.

**🟠 MEDIUM** — Supply Chain Risk  
> All third-party endpoints are hardcoded and well-known (SponsorBlock and Cobalt public instances). No dynamic code loading or @require from untrusted sources.  
> 位置：CFG.sbApi, CFG.cobaltInstances  
> 建议：Continue to monitor the trustworthiness of these endpoints.

**🟡 LOW** — Privacy Collection  
> Script stores and retrieves user settings (ad, sponsorblock, quality toggles) using GM_setValue/GM_getValue. No sensitive data (like cookies or passwords) is accessed.  
> 位置：Persistent state section (S object, save function)  
> 建议：No action needed unless sensitive data is stored in the future.

**🟡 LOW** — Permission Usage  
> The script requests GM_xmlhttpRequest permission, which is necessary for cross-origin API calls, but does not request unnecessary high-privilege grants.  
> 位置：UserScript metadata block (@grant)  
> 建议：Maintain least privilege. No excessive permissions detected.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download)*
