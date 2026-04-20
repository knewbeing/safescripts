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

**风险等级**：🟢 SAFE　　**安全评分**：97/100　　**分析时间**：2026-04-20

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用或供应链风险。仅通过 prompt 收集用户输入并更新页面显示，没有与外部服务器通信，也未申请任何高权限。整体安全风险极低，安全评分为97分。

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
> Uses prompt to collect user input and directly updates DOM element with user-provided values. However, the values are parsed as integers and not inserted as HTML, mitigating XSS risk.  
> 位置：addCoinsAndTokens() and updateBalanceDisplay()  
> 建议：Ensure that only numbers are used for DOM updates and avoid inserting untrusted input as HTML.

**🟡 LOW** — Data Transmission  
> The script attempts to simulate adding coins/tokens by updating the page display, but does not interact with backend or perform any network requests.  
> 位置：Entire script  
> 建议：No sensitive actions detected. If future versions add network requests, review for data exfiltration.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/516991-blooket-coin-and-token-hacker)*
