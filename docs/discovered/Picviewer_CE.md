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

**风险等级**：⛔ CRITICAL　　**安全评分**：34/100　　**分析时间**：2026-05-25

> Picviewer CE+ 存在严重安全风险：@connect * 允许任意外部通信，结合 GM_xmlhttpRequest 权限，存在数据外传隐患；unsafeWindow 权限可能导致远程代码执行；部分高权限申请未见实际使用，存在权限滥用；@require 第三方库未固定版本哈希，存在供应链风险。建议严格限制网络权限、移除不必要高权限、固定第三方库版本。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：*, www.google.com, www.google.com.hk） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> @connect * 允许脚本向任意域名发起网络请求，存在数据外传风险，且部分功能可能涉及图片批量下载、反向搜索等，可能会上传图片 URL 或页面内容到第三方。  
> 位置：metadata (@connect *)  
> 建议：限制 @connect 域名范围，仅允许必要的第三方服务；审查所有 GM_xmlhttpRequest/fetch 调用，确保不上传敏感数据。

**⛔ CRITICAL** — Data Exfiltration  
> 脚本申请了 GM_xmlhttpRequest/GM.xmlHttpRequest 权限，结合 @connect *，存在任意外部通信能力。  
> 位置：metadata (@grant GM_xmlhttpRequest, GM.xmlHttpRequest)  
> 建议：移除不必要的全域网络权限，确保仅用于图片下载等安全用途。

**🔴 HIGH** — Remote Code Execution  
> 脚本申请了 unsafeWindow 权限，可能导致与页面脚本交互，存在远程代码执行风险。  
> 位置：metadata (@grant unsafeWindow)  
> 建议：移除 unsafeWindow 权限，或确保仅用于安全场景。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 GM_openInTab、GM_download、GM_notification 等高权限，但代码片段未见实际使用，存在权限滥用风险。  
> 位置：metadata (@grant GM_openInTab, GM_download, GM_notification)  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

**🟠 MEDIUM** — Supply Chain Risk  
> @require 加载的第三方库未固定版本哈希，存在供应链风险。  
> 位置：metadata (@require ...)  
> 建议：使用官方 CDN 并固定版本哈希，避免 update.greasyfork.org 变更导致供应链污染。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/24204-picviewer-ce)*
