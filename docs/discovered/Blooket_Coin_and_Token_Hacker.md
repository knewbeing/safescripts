---
title: "Blooket Coin and Token Hacker"
---

# Blooket Coin and Token Hacker



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Blooket_Coin_and_Token_Hacker.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/516991-blooket-coin-and-token-hacker) <Badge type="tip" text="GreasyFork" />　　安装量：**10,504**　　评分：👍1 / 👎0

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

**风险等级**：🟢 SAFE　　**安全评分**：97/100　　**分析时间**：2026-04-27

> This UserScript does not transmit data externally, does not collect sensitive information, and does not use dangerous APIs or obfuscated code. It only modifies the DOM based on user input via prompt, and updates a page element's textContent. No supply chain or iframe risks detected. Overall, the script is safe, but as it manipulates game values, it may violate site terms of service.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟡 LOW** — User Input Handling  
> Uses prompt to collect user input for coins and tokens, then updates DOM element with these values. No network requests or external data transmission detected.  
> 位置：addCoinsAndTokens function  
> 建议：Ensure user input is validated and not used in unsafe DOM operations. Currently, only textContent is updated, which is safe.

**🟡 LOW** — Permission Usage  
> No permissions (@grant none) requested, which is appropriate for the script's functionality.  
> 位置：Metadata block  
> 建议：Maintain minimal permissions for best security.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/516991-blooket-coin-and-token-hacker)*
