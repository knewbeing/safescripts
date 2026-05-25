---
title: "Nexus合集一键下载"
---

# Nexus合集一键下载

`Nexus Mods`  `模组下载`  `批量操作`  `游戏工具`  `效率提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Nexus_Download_Collection.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.9.10**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/483337-nexus-download-collection) <Badge type="tip" text="GreasyFork" />　　安装量：**19,214**　　评分：👍82 / 👎6

## 功能介绍

该脚本为 Nexus Mods 网站的合集页面添加“一键下载”功能，允许用户一次性下载合集中的所有模组。省去了逐个点击下载的繁琐操作，提升下载效率。

## 适用网站

- Nexus Mods

## 使用方法

1. 安装脚本后，访问 Nexus Mods 网站的合集页面。
2. 在合集页面会出现“一键下载”按钮。
3. 点击按钮即可自动下载该合集中的所有模组。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM.xmlHttpRequest` | 允许脚本发送跨域网络请求，用于批量下载模组数据。 |
| `GM_xmlhttpRequest` | 允许脚本发送跨域网络请求，用于批量下载模组数据。 |
| `GM_setValue` | 允许脚本保存设置或下载进度到本地浏览器。 |
| `GM_getValue` | 允许脚本读取本地保存的设置或下载进度。 |
| `GM.setValue` | 允许脚本保存设置或下载进度到本地浏览器。 |
| `GM.getValue` | 允许脚本读取本地保存的设置或下载进度。 |
| `GM_addStyle` | 允许脚本自定义页面样式，优化界面显示。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：64/100　　**分析时间**：2026-05-25

> 该脚本主要用于批量下载 Nexus Mods 集合中的所有 mod。所有网络请求均指向 NexusMods 官方域名，未发现数据外传至第三方或隐私采集行为。未检测到远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险或 iframe 风险。存在权限申请冗余，建议精简。整体安全风险较低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：api-router.nexusmods.com, www.nexusmods.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script uses fetch and GM_xmlhttpRequest to communicate with api-router.nexusmods.com and www.nexusmods.com. All requests are to first-party domains and do not transmit user data beyond what is required for mod download functionality.  
> 位置：fetchMods(), fetchDownloadLink()  
> 建议：Ensure only necessary data is sent and avoid transmitting sensitive information.

**🟠 MEDIUM** — Permission Abuse  
> Script requests multiple @grant permissions (GM.xmlHttpRequest, GM_xmlhttpRequest, GM_setValue, GM_getValue, GM.setValue, GM.getValue, GM_addStyle), but only uses GM_xmlhttpRequest, GM.getValue, GM.setValue, and GM_addStyle in code.  
> 位置：Metadata block  
> 建议：Remove unused permissions (GM.xmlHttpRequest, GM_setValue, GM_getValue) to minimize attack surface.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/483337-nexus-download-collection)*
