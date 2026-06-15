---
title: "Songsterr高级功能解锁"
---

# Songsterr高级功能解锁

`音乐`  `乐谱`  `网站增强`  `高级功能解锁`  `导出工具`  `Songsterr`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Songsterr_Ultimate_Premium_Unlocked.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**5.0.0**　　发现时间：**2026-06-01**　　来源：[GreasyFork](https://greasyfork.org/scripts/564818-songsterr-ultimate-premium-unlocked) <Badge type="tip" text="GreasyFork" />　　安装量：**3,184**　　评分：👍3 / 👎1

## 功能介绍

此脚本可在 Songsterr 网站上解锁所有 Plus（高级）功能，包括速度调节、循环播放、独奏、静音和无暂停，并支持原生导出乐谱为 .gp 和 .midi 文件。用户无需付费即可体验高级功能。

## 适用网站

- Songsterr

## 使用方法

1. 安装 Tampermonkey 插件。
2. 在 Tampermonkey 中添加此脚本。
3. 打开 Songsterr 网站，自动解锁高级功能。
4. 在乐谱页面使用速度、循环、独奏、静音等功能，并可导出 .gp/.midi 文件。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改网页的全局对象，便于解锁功能。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，下载乐谱等资源。 |
| `GM_addStyle` | 用于添加自定义样式，优化界面显示。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-06-15

> The script does not transmit user data externally, does not collect sensitive information, and does not execute remote code or use obfuscation. Supply chain risk is mitigated by fixed library version. Permissions are slightly overgranted but not abused. Overall, the script is safe with minor improvements recommended.

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
> 建议：Monitor for upstream vulnerabilities in alphaTab. Prefer integrity hashes if possible.

**🟠 MEDIUM** — Permission Overgrant  
> Script requests GM_xmlhttpRequest and @connect permissions for two CloudFront endpoints, but no actual network requests are present in the visible code.  
> 位置：Metadata block (@grant GM_xmlhttpRequest, @connect ...)  
> 建议：Remove unused permissions if not required. Monitor for future code changes that may use these endpoints.

**🟠 MEDIUM** — Permission Overgrant  
> Script uses unsafeWindow grant, which can expose privileged script context to the page. No evidence of abuse in current code.  
> 位置：@grant unsafeWindow  
> 建议：Avoid unsafeWindow unless strictly necessary. Monitor for future code changes.

**🟡 LOW** — Privacy Collection  
> Script uses localStorage to store logging and YouTube audio-only mode preferences. No sensitive data is stored.  
> 位置：window.toggleSgdLogging, window.toggleYtAudioOnly  
> 建议：Ensure only non-sensitive preferences are stored.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/564818-songsterr-ultimate-premium-unlocked)*
