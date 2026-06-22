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

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-06-22

> The script is generally well-structured and does not use obfuscation, eval, or dangerous DOM injection. However, it makes cross-origin requests to third-party APIs (SponsorBlock and Cobalt downloaders), which may transmit user video viewing data. It also requests high-privilege permissions (GM_xmlhttpRequest, @connect) and stores user settings locally. There is no evidence of keylogging, clipboard access, or fingerprinting. The main risks are data exfiltration to third-party APIs and supply chain exposure via multiple Cobalt endpoints.

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
> The script makes network requests to third-party APIs (SponsorBlock and multiple Cobalt instances) using GM_xmlhttpRequest. These requests may include the current YouTube video ID and possibly other metadata, which could be considered user data.  
> 位置：CFG.sbApi, CFG.cobaltInstances, usage of GM_xmlhttpRequest  
> 建议：Clearly document what data is sent to these endpoints. Consider proxying requests or minimizing data sent. Warn users about third-party API usage.

**🟠 MEDIUM** — Permission Usage  
> The script requests GM_xmlhttpRequest permission, which is necessary for cross-origin API calls but is a high-privilege grant.  
> 位置：@grant GM_xmlhttpRequest  
> 建议：Only request this permission if strictly necessary. Limit usage to trusted domains.

**🟠 MEDIUM** — Supply Chain  
> The script requests @connect permissions for multiple third-party domains. This increases supply chain risk if any of these endpoints are compromised.  
> 位置：@connect sponsor.ajay.app, @connect co.wuk.sh, @connect cobalt.api.timelessnesses.me, @connect api.cobalt.tools  
> 建议：Limit @connect to only necessary, trusted domains. Monitor for endpoint changes.

**🟡 LOW** — Privacy  
> The script stores user toggle settings (ad skip, SponsorBlock, quality) using GM_setValue/GM_getValue. While this is local, it is persistent and could be privacy-relevant if misused.  
> 位置：GM_setValue, GM_getValue  
> 建议：Ensure only non-sensitive, minimal data is stored. Document what is stored.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download)*
