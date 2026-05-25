---
title: "Songsterr高级功能解锁"
---

# Songsterr高级功能解锁

`音乐`  `乐谱`  `高级解锁`  `导出功能`  `Songsterr`  `实用工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Songsterr_Ultimate_Premium_Unlocked.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**5.0.0**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/564818-songsterr-ultimate-premium-unlocked) <Badge type="tip" text="GreasyFork" />　　安装量：**2,890**　　评分：👍3 / 👎1

## 功能介绍

此脚本可在 Songsterr 网站上解锁所有高级（Plus）功能，包括速度调节、循环播放、独奏、静音和无暂停，并支持将乐谱导出为 .gp 和 .midi 格式。用户无需付费即可体验完整的高级功能。

## 适用网站

- Songsterr

## 使用方法

1. 安装脚本后，访问 Songsterr 网站。
2. 打开任意乐谱页面，即可使用所有高级功能。
3. 在乐谱页面可直接导出 .gp 或 .midi 文件。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改网页的全局窗口对象，便于功能实现。 |
| `GM_xmlhttpRequest` | 用于在后台请求和下载乐谱文件，实现导出功能。 |
| `GM_addStyle` | 可为网页添加自定义样式，优化界面显示。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-05-25

> The script does not transmit user data externally, does not collect sensitive information, and does not use eval or obfuscated code. It requests some high privileges (unsafeWindow, GM_xmlhttpRequest, @connect) that are not fully utilized, which is a minor risk. Supply chain risk is mitigated by fixed version @require. No DOM XSS or injection risks detected. Overall, the script is safe for use with minor permission and supply chain concerns.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — Supply Chain Risk  
> Script requests @require for alphaTab library from jsdelivr CDN. The CDN is reputable, but version is fixed to 1.8.1, reducing supply chain risk.  
> 位置：@require https://cdn.jsdelivr.net/npm/@coderline/alphatab@1.8.1/dist/alphaTab.min.js  
> 建议：Monitor for upstream vulnerabilities in alphaTab. Prefer SRI hash if possible.

**🟠 MEDIUM** — Permission Abuse  
> Script requests @connect permissions for two CloudFront endpoints, but no actual GM_xmlhttpRequest or fetch calls are present in the visible code. No evidence of data exfiltration.  
> 位置：@connect dqsljvtekg760.cloudfront.net, @connect d3d3l6a6rcgkaf.cloudfront.net  
> 建议：Remove unused @connect permissions if not required.

**🟠 MEDIUM** — Permission Abuse  
> Script grants unsafeWindow, which allows access to the page context. No evidence of malicious use, but this is a high-privilege grant.  
> 位置：@grant unsafeWindow  
> 建议：Remove unsafeWindow if not strictly required.

**🟠 MEDIUM** — Permission Abuse  
> Script grants GM_xmlhttpRequest, but no usage is found in the code. Unused high privilege.  
> 位置：@grant GM_xmlhttpRequest  
> 建议：Remove GM_xmlhttpRequest if not used.

**🟡 LOW** — Privacy Collection  
> Script uses localStorage to store logging and YouTube audio-only mode preferences. No sensitive data is stored.  
> 位置：localStorage.getItem/setItem(LOG_KEY), localStorage.getItem/setItem('songsterr_yt_audio_only')  
> 建议：No action needed unless sensitive data is stored.

**🟡 LOW** — Permission Usage  
> Script grants GM_addStyle, which is used for style injection. This is a standard privilege.  
> 位置：@grant GM_addStyle  
> 建议：No action needed.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/564818-songsterr-ultimate-premium-unlocked)*
