---
title: "Blooket金币代币助手"
---

# Blooket金币代币助手

`Blooket`  `游戏辅助`  `虚拟货币`  `页面修改`  `娱乐`  `学生`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Blooket_Coin_and_Token_Hacker.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/516991-blooket-coin-and-token-hacker) <Badge type="tip" text="GreasyFork" />　　安装量：**11,952**　　评分：👍1 / 👎4

## 功能介绍

该脚本可以让用户在Blooket市场页面上，输入想要的金币和代币数量，并将其显示为已添加到账户。操作简单，主要用于页面展示，实际不会影响真实账户余额。

## 适用网站

- Blooket

## 使用方法

1. 安装脚本后，进入Blooket市场页面。
2. 页面加载时会弹出窗口，输入想添加的金币和代币数量。
3. 确认后，页面会显示你输入的金币和代币数。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本无需特殊权限，仅操作页面内容。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：97/100　　**分析时间**：2026-06-22

> This script does not perform any network requests, data exfiltration, or privacy-invasive actions. It only modifies the page's DOM based on user input and does not use dangerous APIs or obfuscation. The main risk is ethical/legal, as it encourages cheating. No critical or high-severity technical security issues detected.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟡 LOW** — DOM Manipulation  
> The script uses prompt() to collect user input and updates the DOM with user-supplied values, but does not insert them via innerHTML or other unsafe methods. The risk of DOM XSS is low.  
> 位置：updateBalanceDisplay function  
> 建议：Ensure that user input is not inserted into the DOM via innerHTML or other methods that interpret HTML.

**🟡 LOW** — Ethical/Legal  
> The script claims to 'hack' coins and tokens, which may violate the terms of service of the target website.  
> 位置：Script description and behavior  
> 建议：Do not use scripts that violate service terms or encourage cheating.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/516991-blooket-coin-and-token-hacker)*
