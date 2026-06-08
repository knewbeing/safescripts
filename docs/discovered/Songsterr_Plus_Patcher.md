---
title: "Songsterr Plus 解锁补丁"
---

# Songsterr Plus 解锁补丁

`音乐`  `会员破解`  `网站增强`  `Songsterr`  `高级功能`  `免费体验`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Songsterr_Plus_Patcher.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.2.2**　　发现时间：**2026-06-08**　　来源：[GreasyFork](https://greasyfork.org/scripts/500019-songsterr-plus-patcher) <Badge type="tip" text="GreasyFork" />　　安装量：**16,296**　　评分：👍14 / 👎3

## 功能介绍

此脚本可以让你在 Songsterr 网站上免费体验 Plus 会员功能，无需付费即可解锁高级特性。它通过模拟会员身份，绕过网站的会员检测。

## 适用网站

- Songsterr

## 使用方法

1. 安装 Tampermonkey 扩展。
2. 添加并启用此脚本。
3. 访问 Songsterr 网站，会员功能将自动解锁。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问并修改网站的全局对象，实现功能模拟。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：92/100　　**分析时间**：2026-06-08

> The script does not transmit data to third-party servers, does not collect sensitive user data, and does not use dangerous code execution patterns. It modifies the Songsterr site's JS state to unlock features, but does not introduce privacy or supply chain risks. The only notable issue is the use of @grant unsafeWindow, which is necessary for its function but increases the attack surface if the script is ever compromised.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — Permission Overuse  
> The script requests @grant unsafeWindow, which exposes the page's JS context and can be abused if the script is compromised.  
> 位置：Metadata block (@grant unsafeWindow)  
> 建议：Only use @grant unsafeWindow if strictly necessary and ensure the script is obtained from a trusted source.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/500019-songsterr-plus-patcher)*
