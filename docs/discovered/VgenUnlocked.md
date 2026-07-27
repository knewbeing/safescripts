---
title: "VGen解锁增强"
---

# VGen解锁增强

`价格筛选`  `排序增强`  `内容预览`  `界面优化`  `成人内容解锁`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/VgenUnlocked.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0**　　发现时间：**2026-06-08**　　来源：[GreasyFork](https://greasyfork.org/scripts/581400-vgenunlocked) <Badge type="tip" text="GreasyFork" />　　安装量：**159**　　评分：👍0 / 👎0

## 功能介绍

本脚本为VGen平台的服务列表页面增强功能。它会显示最低价格标签，提供高级排序和价格筛选，支持快速预览弹窗、帮助提示，以及让成人内容在鼠标悬停时自动去除模糊。

## 适用网站

- VGen平台

## 使用方法

1. 安装脚本后，访问VGen平台服务列表页面。
2. 页面会自动显示最低价格标签和筛选、排序选项。
3. 可通过筛选框输入价格范围，或选择排序方式。
4. 鼠标悬停在成人内容图片上可自动去除模糊。
5. 点击服务可快速预览详情弹窗。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本无需特殊权限，所有功能均在网页内实现。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-07-27

> The script does not transmit user data externally, does not collect sensitive information beyond reading a cookie for currency detection, does not execute remote code, and does not use obfuscation. No DOM XSS or supply chain risks are present. Overall, the script is safe with minor privacy collection.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（Reads document.cookie to extract v-guest JWT for currency detection） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — Privacy Collection  
> The script reads document.cookie to extract the v-guest JWT for currency detection. No cookie data is transmitted externally.  
> 位置：getSelectedCurrency() function  
> 建议：Avoid reading cookies unless strictly necessary; do not transmit cookie data.

**🟡 LOW** — Network Request  
> The script intercepts fetch requests and makes a request to https://api.vgen.co/exchange-rate to retrieve exchange rates. This is a first-party API and does not transmit user data or sensitive information.  
> 位置：fetchExchangeRates() function  
> 建议：Ensure only necessary data is requested and no user data is sent.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/581400-vgenunlocked)*
