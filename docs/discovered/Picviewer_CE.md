---
title: "Picviewer CE+"
---

# Picviewer CE+



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Picviewer_CE.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2026.2.6.1**　　发现时间：**2026-05-04**　　来源：[GreasyFork](https://greasyfork.org/scripts/24204-picviewer-ce) <Badge type="tip" text="GreasyFork" />　　安装量：**304,098**　　评分：👍1370 / 👎1

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

**风险等级**：🔴 HIGH　　**安全评分**：52/100　　**分析时间**：2026-06-15

> Picviewer CE+ 申请了广泛的网络访问权限（@connect *），允许任意域名通信，存在严重数据外传风险。虽然当前代码片段未发现实际数据外传和隐私采集行为，但高权限申请和供应链风险降低了整体安全性。建议收紧 @connect 域名、精简 @grant 权限、固定第三方库版本。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> @connect * 允许任意域名的网络请求，存在数据外传潜在风险，尤其是 GM_xmlhttpRequest 可用于任意第三方通信。  
> 位置：元数据 @connect  
> 建议：限制 @connect 域名范围，仅允许必要的目标，避免 wildcard。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了大量高权限，包括 GM_download、GM_openInTab、GM_setClipboard、unsafeWindow 等，部分权限未在当前代码片段中实际使用，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

**🟠 MEDIUM** — Supply Chain Risk  
> @require 加载的第三方库未固定版本哈希，来源为 greasyfork update CDN，虽然较可信，但仍有供应链污染风险。  
> 位置：元数据 @require  
> 建议：建议使用官方 CDN 并固定版本哈希，避免供应链风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/24204-picviewer-ce)*
