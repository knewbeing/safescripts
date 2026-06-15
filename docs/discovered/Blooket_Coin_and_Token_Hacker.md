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

**风险等级**：🟢 SAFE　　**安全评分**：97/100　　**分析时间**：2026-06-15

> This UserScript does not transmit data externally, does not collect sensitive information, and does not execute remote code. It only updates the DOM based on user input and logs actions locally. No critical or high risks detected. Minor input validation and DOM update concerns, but overall the script is safe.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟡 LOW** — Input Handling  
> Uses prompt() to collect user input for coins and tokens, then updates DOM element with these values. No input validation beyond isNaN check; however, values are not inserted via innerHTML, only textContent.  
> 位置：addCoinsAndTokens() and updateBalanceDisplay()  
> 建议：Consider stricter input validation and ensure only numeric values are used. Using textContent mitigates XSS risk.

**🟡 LOW** — Functionality  
> Script attempts to simulate adding coins/tokens by updating the DOM. No actual interaction with Blooket API or server.  
> 位置：addCoinsAndTokens()  
> 建议：No sensitive actions detected. If future versions add network requests, review for data exfiltration.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/516991-blooket-coin-and-token-hacker)*
