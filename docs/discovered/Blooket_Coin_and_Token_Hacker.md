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

**风险等级**：🟢 SAFE　　**安全评分**：97/100　　**分析时间**：2026-05-18

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、供应链风险或高危 DOM 注入行为。仅通过 prompt 获取用户输入并本地修改页面显示，不涉及网络请求或敏感 API。整体安全性高。

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
> Uses prompt() to collect user input, but does not sanitize or escape the input before inserting into the DOM via textContent. However, textContent is safe from XSS.  
> 位置：updateBalanceDisplay function  
> 建议：No action needed for textContent, but avoid using innerHTML with unsanitized input.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/516991-blooket-coin-and-token-hacker)*
