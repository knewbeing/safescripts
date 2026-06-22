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

**风险等级**：🔴 HIGH　　**安全评分**：27/100　　**分析时间**：2026-06-22

> Picviewer CE+ 存在严重的数据外传风险，因 @connect * 允许任意外部域名的网络请求，且脚本申请了高危权限（GM_xmlhttpRequest、unsafeWindow 等）。虽然主代码未见明显隐私采集或 DOM XSS，但高权限和供应链风险依然显著。建议严格限制网络请求目标、精简权限申请，并锁定第三方依赖版本。当前不建议在敏感环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：www.google.com, www.google.com.hk, www.google.co.jp） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> @connect * 允许任意外部域名的网络请求，存在数据外传风险，且脚本功能涉及图片批量下载/识别，可能上传图片 URL 或内容到第三方。  
> 位置：元数据 @connect *  
> 建议：严格限制 @connect 域名，仅允许必要的目标，移除通配符。

**⛔ CRITICAL** — 数据外传  
> 脚本申请了 GM_xmlhttpRequest/GM.xmlHttpRequest 权限，并通过 @connect 多个第三方域名，具备外发任意数据能力。  
> 位置：元数据 @grant GM_xmlhttpRequest, GM.xmlHttpRequest  
> 建议：仅申请实际需要的权限，代码中应限制请求内容，避免敏感信息外传。

**🔴 HIGH** — 远程代码执行  
> 脚本申请了 unsafeWindow 权限，可能导致页面与脚本间的任意代码互操作，存在远程代码执行风险。  
> 位置：元数据 @grant unsafeWindow  
> 建议：如非必要，移除 unsafeWindow 权限，或严格限制其使用范围。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_download、GM_setClipboard、GM_notification 等高权限，但主代码未见全部实际使用，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际使用的权限，移除未用高权限。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @require 加载了第三方库（pvcep_rules.js、pvcep_lang.js），但未锁定版本哈希，存在供应链污染风险。  
> 位置：元数据 @require  
> 建议：使用可信 CDN 并锁定文件哈希或具体版本，避免被篡改。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/24204-picviewer-ce)*
