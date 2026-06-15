---
title: "Songsterr Plus 解锁补丁"
---

# Songsterr Plus 解锁补丁

`音乐`  `会员破解`  `功能增强`  `Songsterr`  `乐谱`  `免费体验`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Songsterr_Plus_Patcher.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.2.2**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/500019-songsterr-plus-patcher) <Badge type="tip" text="GreasyFork" />　　安装量：**16,722**　　评分：👍14 / 👎3

## 功能介绍

此脚本可以让您在 Songsterr 网站上免费体验 Plus 会员功能，无需付费即可解锁高级内容。它通过模拟您的账户为 Plus 会员，绕过部分限制。

## 适用网站

- Songsterr

## 使用方法

1. 安装脚本后，访问 Songsterr 网站。
2. 无需额外操作，Plus 功能会自动解锁。
3. 如遇异常弹窗，按提示反馈或禁用脚本。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改网站的全局窗口对象，以便拦截和伪造会员信息。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-15

> The script does not transmit data externally, does not collect privacy-sensitive information, and does not execute remote code or use obfuscation. The main risk is the use of @grant unsafeWindow, which is a medium-level concern. No critical or high risks detected. Overall, the script is safe for use, but users should be aware of the increased attack surface due to unsafeWindow.

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
> 位置：UserScript metadata (@grant unsafeWindow)  
> 建议：Avoid using unsafeWindow unless strictly necessary. Consider using safer alternatives or limiting exposure.

**🟡 LOW** — DOM Manipulation  
> Modifies DOM element innerHTML with JSON data from the page, but does not insert untrusted user input. Risk is low, but should be monitored if future changes allow user-controlled data.  
> 位置：window.addEventListener('DOMContentLoaded') -> stateElement.innerHTML  
> 建议：Ensure only trusted data is inserted into innerHTML. If user input is ever used, sanitize appropriately.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/500019-songsterr-plus-patcher)*
