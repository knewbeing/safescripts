---
title: "Songsterr Plus 解锁补丁"
---

# Songsterr Plus 解锁补丁

`音乐`  `会员破解`  `网站增强`  `Songsterr`  `高级功能`  `免费体验`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Songsterr_Plus_Patcher.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.2.2**　　发现时间：**2026-06-01**　　来源：[GreasyFork](https://greasyfork.org/scripts/500019-songsterr-plus-patcher) <Badge type="tip" text="GreasyFork" />　　安装量：**15,894**　　评分：👍14 / 👎3

## 功能介绍

此脚本可让用户在 Songsterr 网站上免费体验 Plus 会员功能，无需付费即可解锁高级内容。通过模拟会员身份，访问时自动获得 Plus 权限。

## 适用网站

- Songsterr

## 使用方法

1. 安装 Tampermonkey 插件。
2. 添加此脚本到 Tampermonkey。
3. 访问 Songsterr 网站，会员功能自动解锁。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改网站的全局变量，实现功能模拟。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-01

> The script does not transmit data to third-party servers, does not collect sensitive user data, and does not execute remote code. It modifies the page state and intercepts fetch requests to unlock features, but does not introduce critical security risks. The use of 'unsafeWindow' is a moderate concern but is justified by the script's purpose. No obfuscation, XSS, or supply chain risks detected.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — Permission Risk  
> The script grants 'unsafeWindow', which allows access to the page's JavaScript context. While necessary for this use case, it increases the attack surface if the script is compromised.  
> 位置：Metadata (@grant unsafeWindow)  
> 建议：Limit use of 'unsafeWindow' and ensure the script is only installed from trusted sources.

**🟡 LOW** — Function Override  
> The script overrides the global fetch function to intercept requests to '/auth/profile' and modify the response. This could potentially break site functionality if not carefully maintained.  
> 位置：Object.defineProperty(fetchParent, 'fetch', ...)  
> 建议：Monitor for site changes that could cause unexpected behavior. Consider scoping the override more narrowly if possible.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/500019-songsterr-plus-patcher)*
