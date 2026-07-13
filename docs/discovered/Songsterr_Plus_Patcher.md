---
title: "Songsterr Plus 解锁补丁"
---

# Songsterr Plus 解锁补丁

`音乐`  `会员破解`  `网站增强`  `Songsterr`  `功能解锁`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Songsterr_Plus_Patcher.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.2.2**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/500019-songsterr-plus-patcher) <Badge type="tip" text="GreasyFork" />　　安装量：**18,090**　　评分：👍14 / 👎3

## 功能介绍

本脚本可让用户在 Songsterr 网站上免费体验 Plus 会员功能，无需付费即可解锁高级内容。通过模拟会员身份，访问时自动获得 Plus 权限。

## 适用网站

- Songsterr

## 使用方法

1. 安装 Tampermonkey 扩展。
2. 添加并启用此脚本。
3. 访问 Songsterr 网站，即可自动体验 Plus 会员功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改网站的全局窗口对象，以便拦截和伪造会员信息。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：92/100　　**分析时间**：2026-07-13

> The script does not transmit data to third-party servers, does not collect sensitive user data, and does not execute remote or obfuscated code. It only intercepts fetch requests to the site's own /auth/profile endpoint to modify the user's plan status locally and manipulates the DOM to unlock features. The only notable risk is the use of @grant unsafeWindow, which is necessary for its function but should be monitored. No critical or high-severity issues were found.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — Permission Usage  
> The script uses the @grant unsafeWindow permission, which exposes the script to the page context and can increase the risk of privilege escalation or interference between page and script.  
> 位置：Metadata block (@grant unsafeWindow)  
> 建议：Only use unsafeWindow if strictly necessary. Monitor for any future code that may leverage this for malicious purposes.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/500019-songsterr-plus-patcher)*
