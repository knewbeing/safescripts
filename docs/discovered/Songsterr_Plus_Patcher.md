---
title: "Songsterr Plus 功能解锁"
---

# Songsterr Plus 功能解锁

`音乐`  `会员破解`  `功能增强`  `Songsterr`  `免费体验`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Songsterr_Plus_Patcher.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.2.2**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/500019-songsterr-plus-patcher) <Badge type="tip" text="GreasyFork" />　　安装量：**15,460**　　评分：👍14 / 👎3

## 功能介绍

本脚本可以让用户在 Songsterr 网站上免费体验 Plus 会员功能，无需付费即可解锁高级功能。它通过模拟会员身份，绕过网站的会员检测。

## 适用网站

- Songsterr

## 使用方法

1. 1. 安装 Tampermonkey 扩展。
2. 2. 添加并启用此脚本。
3. 3. 打开 Songsterr 网站，自动解锁 Plus 功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改网站的全局窗口对象，以便拦截和伪造会员信息。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-05-25

> The script does not transmit data externally, does not collect privacy-sensitive information, and does not execute remote code or use obfuscation. The main risk is the use of @grant unsafeWindow, which is a medium-level concern. There is minor DOM manipulation risk, but no evidence of XSS or injection. Overall, the script is considered low risk.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — Permission Abuse  
> Uses @grant unsafeWindow, which exposes privileged script context to the page and may increase attack surface if the page is compromised.  
> 位置：Metadata (@grant unsafeWindow)  
> 建议：Avoid using unsafeWindow unless strictly necessary. Consider alternatives such as GM_* APIs or direct window access if possible.

**🟡 LOW** — DOM Manipulation  
> Modifies innerHTML of the #state element with JSON data. If the JSON is not properly sanitized or if user input is injected, this could theoretically lead to DOM XSS, but in this script the data is controlled.  
> 位置：window.addEventListener('DOMContentLoaded')  
> 建议：Ensure that only trusted data is written to innerHTML. Prefer textContent for JSON if possible.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/500019-songsterr-plus-patcher)*
