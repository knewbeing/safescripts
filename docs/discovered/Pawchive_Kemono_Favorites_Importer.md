---
title: "Pawchive Kemono收藏导入"
---

# Pawchive Kemono收藏导入

`收藏管理`  `内容迁移`  `批量操作`  `Pawchive`  `Kemono`  `数据导入`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Pawchive_Kemono_Favorites_Importer.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.1**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/582585-pawchive-kemono-favorites-importer) <Badge type="tip" text="GreasyFork" />　　安装量：**657**　　评分：👍2 / 👎0

## 功能介绍

本脚本可以将 Kemono 网站收藏的创作者和帖子导入到 Pawchive 网站的收藏列表中。它在 Pawchive 收藏页面添加导入按钮，方便用户批量迁移收藏内容。

## 适用网站

- Pawchive

## 使用方法

1. 安装脚本后，访问 Pawchive 网站。
2. 进入 Pawchive 的收藏页面。
3. 页面顶部会出现“Import Kemono Favorites”按钮。
4. 点击按钮，选择从 Kemono 导出的收藏 JSON 文件。
5. 等待导入完成，收藏内容会自动添加到 Pawchive。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，仅在 Pawchive 网站运行。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-27

> 该脚本仅在 pawchive.st 域名下运行，主要功能为导入 Kemono 收藏数据到 Pawchive，无第三方数据外传、无隐私采集、无远程代码执行、无混淆、无 DOM XSS、无权限滥用、无敏感 API 调用、无供应链风险。整体安全性高，适合公开使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> 使用 fetch 向 pawchive.st 域名的 API 发送 POST 请求，内容为收藏操作。未向第三方域名发送数据。  
> 位置：fetchWithRetry, startImport  
> 建议：确认 pawchive.st 为目标站点且用户知晓操作。无敏感数据外传。

**⛔ CRITICAL** — Privacy Collection  
> 脚本读取和写入 localStorage，用于记录已处理的收藏项。未采集其他隐私数据。  
> 位置：processedArtists, processedPosts, localStorage  
> 建议：仅用于本地状态管理，无隐私泄露风险。

**🔴 HIGH** — Remote Code Execution  
> 未使用 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行方式。  
> 位置：全局  
> 建议：保持当前实现，避免动态执行字符串。

**🔴 HIGH** — Code Obfuscation  
> 未检测到代码混淆、base64 解码、字符串映射或高度压缩代码。  
> 位置：全局  
> 建议：保持代码可读性。

**🔴 HIGH** — DOM XSS/Injection  
> 未检测到 DOM XSS 或注入风险。用户输入（文件导入）未直接插入 innerHTML。  
> 位置：handleFileSelected, UI Injection  
> 建议：继续避免直接插入用户输入到 DOM。

**🟠 MEDIUM** — Permission Abuse  
> 未申请任何 Tampermonkey/Greasemonkey权限（@grant none），无权限滥用风险。  
> 位置：元数据  
> 建议：仅申请必要权限。

**🟠 MEDIUM** — Sensitive API Usage  
> 未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：全局  
> 建议：继续避免敏感 API 调用。

**🟠 MEDIUM** — Supply Chain Risk  
> 未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking/Iframe Risk  
> 未检测到 ClickJacking 或 iframe 风险，未修改 frame 保护策略。  
> 位置：全局  
> 建议：继续避免隐藏 iframe 或 frame 操作。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/582585-pawchive-kemono-favorites-importer)*
