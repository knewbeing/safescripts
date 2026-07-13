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

**风险等级**：🟠 MEDIUM　　**安全评分**：50/100　　**分析时间**：2026-07-13

> 该脚本主要用于增强 VGen 网站的用户体验，包括价格展示、排序、筛选等功能。安全审查发现：1）脚本会向 vgen.co 官方 API 请求汇率数据，未发现向第三方服务器外传用户数据。2）脚本会读取 document.cookie 以解析货币信息，但未发现将 cookie 内容外传。3）未发现远程代码执行、代码混淆、DOM XSS、权限滥用、供应链风险等问题。整体风险为中等，建议关注 cookie 读取行为，确保不会被滥用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://api.vgen.co/exchange-rate） |
| 隐私采集 | ❌ 检测到（读取 document.cookie 以解析 v-guest JWT） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本会向 https://api.vgen.co/exchange-rate 发起请求以获取汇率数据，但未发现向第三方或非官方服务器发送用户数据、页面内容或 Cookie。  
> 位置：fetchExchangeRates()  
> 建议：确认目标 API 为官方且可信，避免将敏感信息发送至第三方。

**⛔ CRITICAL** — 隐私采集  
> 脚本会读取 document.cookie 以尝试解析 v-guest JWT 并获取货币信息。  
> 位置：getSelectedCurrency()  
> 建议：避免读取 cookie 中的敏感信息，或确保不会外传。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/581400-vgenunlocked)*
