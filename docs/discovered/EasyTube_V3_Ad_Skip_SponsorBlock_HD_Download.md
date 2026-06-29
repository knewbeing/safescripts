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

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-06-29

> The script is generally well-structured and does not use obfuscation, eval, or dynamic code execution. It does not collect sensitive user data or listen to keyboard/clipboard events. However, it does transmit YouTube video IDs to third-party APIs (SponsorBlock and Cobalt instances) to provide its core features, which is a privacy consideration. No DOM XSS or injection risks were found. The supply chain risk is moderate due to reliance on external APIs. Overall, the script is safe for most users, but those with strict privacy requirements should be aware of the data sent to third parties.

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
> The script sends requests to third-party APIs (SponsorBlock and Cobalt instances) to fetch skip segments and video download links. These requests include the current YouTube video ID, which may be considered user activity data.  
> 位置：CFG.sbApi, CFG.cobaltInstances, code sections using GM_xmlhttpRequest/fetch to these endpoints  
> 建议：Clearly inform users about the data sent to third-party APIs. Limit data to only what is necessary (e.g., video ID, not full URL or user info).

**🟠 MEDIUM** — Privacy Collection  
> The script uses GM_setValue and GM_getValue to store user toggle settings (ad skip, SponsorBlock, quality). While this is local, it is persistent and could be privacy-relevant if misused.  
> 位置：Persistent state section (S object, save function)  
> 建议：Ensure only non-sensitive toggle states are stored. Do not store personal or sensitive data.

**🟠 MEDIUM** — Supply Chain Risk  
> The script requests GM_xmlhttpRequest permission and @connect to multiple third-party domains. This increases the attack surface if those endpoints are compromised.  
> 位置：@grant, @connect in metadata  
> 建议：Restrict @connect to only necessary domains. Monitor the security of third-party APIs.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download)*
