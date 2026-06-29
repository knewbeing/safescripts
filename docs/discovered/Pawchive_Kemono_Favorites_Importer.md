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

**风险等级**：🟡 LOW　　**安全评分**：97/100　　**分析时间**：2026-06-29

> The script is well-structured, does not transmit data to third-party servers, and does not collect sensitive user data. All network requests are to the same origin as the page (pawchive.st). No code execution, obfuscation, XSS, or supply chain risks are present. The only minor issue is the use of localStorage for storing import progress, which does not involve sensitive data. Overall, the script is safe for use.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://pawchive.st） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> The script sends POST requests to https://pawchive.st API endpoints to import favorites. All network requests are to the same origin as the page (pawchive.st), and no third-party transmission is present.  
> 位置：fetchWithRetry, startImport  
> 建议：Ensure the API endpoints are trusted and HTTPS is used. No user data is sent to third-party servers.

**⛔ CRITICAL** — Privacy Collection  
> The script uses localStorage to persist import progress (lists of processed artists and posts). No sensitive data (like cookies or passwords) is accessed or stored.  
> 位置：processedArtists, processedPosts, localStorage usage  
> 建议：No action needed. Only non-sensitive import state is stored.

**🔴 HIGH** — Remote Code Execution  
> No use of eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection detected. No @require directives in metadata.  
> 位置：N/A  
> 建议：N/A

**🔴 HIGH** — Code Obfuscation  
> No code obfuscation detected. Code is readable, not minified or obfuscated.  
> 位置：N/A  
> 建议：N/A

**🔴 HIGH** — DOM XSS  
> No DOM XSS risk detected. User input (imported JSON) is not inserted into the DOM via innerHTML/outerHTML. UI is created via DOM methods.  
> 位置：initUI, createProgressUI  
> 建议：N/A

**🟠 MEDIUM** — Permission Abuse  
> No excessive or unused permissions. @grant none is used, which is minimal privilege.  
> 位置：Metadata block  
> 建议：N/A

**🟠 MEDIUM** — Sensitive API  
> No sensitive browser APIs (geolocation, camera, microphone, clipboard read, notifications, WebRTC) are used.  
> 位置：N/A  
> 建议：N/A

**🟠 MEDIUM** — Supply Chain  
> No @require directives or external libraries are loaded. No supply chain risk detected.  
> 位置：Metadata block  
> 建议：N/A

**🟡 LOW** — ClickJacking/iframe  
> No iframe manipulation or frame protection bypass detected.  
> 位置：N/A  
> 建议：N/A

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/582585-pawchive-kemono-favorites-importer)*
