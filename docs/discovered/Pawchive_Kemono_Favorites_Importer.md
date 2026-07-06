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

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-06

> 该脚本仅在 pawchive.st 域下运行，主要功能为导入 Kemono 收藏数据到 Pawchive，无第三方数据外传、隐私采集、远程代码执行、混淆、DOM XSS、权限滥用、敏感 API 调用、供应链或 iframe 风险。整体安全性高，适合公开使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 fetch 向 pawchive.st 的 API 发送 POST 请求以导入收藏，但未向第三方服务器发送数据，也未携带敏感用户数据或 Cookie。  
> 位置：fetchWithRetry, startImport  
> 建议：确保 API 仅用于预期功能，且 pawchive.st 为受信任目标。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取和写入 localStorage 以存储导入进度，但未采集页面 cookie、表单、剪贴板或键盘输入等隐私数据。  
> 位置：processedArtists, processedPosts, localStorage  
> 建议：仅存储必要的导入状态数据，避免存储敏感信息。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 或动态 script 标签加载远程代码。  
> 位置：全局  
> 建议：保持当前安全实践，避免远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 脚本无混淆、压缩、base64 解码或字符串映射特征，代码可读性良好。  
> 位置：全局  
> 建议：保持代码透明，便于审计。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未使用 document.write，未操作 iframe src。  
> 位置：UI Injection, createProgressUI  
> 建议：继续避免 DOM XSS 风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本未申请任何 GM_* 权限，@grant 为 none，权限申请合理。  
> 位置：元数据  
> 建议：仅申请必要权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局  
> 建议：继续避免敏感 API 滥用。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需依赖第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe。  
> 位置：全局  
> 建议：继续避免 ClickJacking/iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/582585-pawchive-kemono-favorites-importer)*
