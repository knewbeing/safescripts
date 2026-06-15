---
title: "Nexus合集一键下载"
---

# Nexus合集一键下载

`批量下载`  `模组管理`  `游戏工具`  `Nexus Mods`  `效率提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Nexus_Download_Collection.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.9.10**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/483337-nexus-download-collection) <Badge type="tip" text="GreasyFork" />　　安装量：**20,291**　　评分：👍83 / 👎6

## 功能介绍

该脚本可以让用户在 Nexus Mods 网站上，一键下载某个合集中的所有模组，无需逐个操作。适合需要批量下载模组的用户，提升下载效率。

## 适用网站

- Nexus Mods

## 使用方法

1. 1. 安装脚本后，访问 Nexus Mods 网站。
2. 2. 打开你想下载的模组合集页面。
3. 3. 页面会出现一键下载按钮，点击即可批量下载所有模组。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM.xmlHttpRequest` | 允许脚本通过浏览器发送网络请求，获取模组信息和下载链接。 |
| `GM_xmlhttpRequest` | 允许脚本通过浏览器发送网络请求，获取模组信息和下载链接。 |
| `GM_setValue` | 用于在本地存储脚本设置或下载进度。 |
| `GM_getValue` | 用于在本地读取脚本设置或下载进度。 |
| `GM.setValue` | 用于在本地存储脚本设置或下载进度。 |
| `GM.getValue` | 用于在本地读取脚本设置或下载进度。 |
| `GM_addStyle` | 允许脚本自定义页面样式，优化界面显示。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-06-15

> 该脚本仅与 Nexus Mods 官方 API 和页面进行通信，不存在隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。主要风险为数据外传（仅限官方域名）、权限滥用（申请未使用的高权限）和敏感 API（cookie 传递）。整体风险为中等，建议移除未使用权限并持续关注官方 API 的安全性。

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
> Script uses fetch and GM_xmlhttpRequest to communicate with api-router.nexusmods.com and www.nexusmods.com. All requests are to official Nexus Mods endpoints and do not transmit user data beyond what is required for mod download functionality.  
> 位置：fetchMods(), fetchDownloadLink()  
> 建议：Ensure only necessary data is sent and no sensitive user information is included in requests.

**🟠 MEDIUM** — Permission Abuse  
> Script requests multiple @grant permissions (GM.xmlHttpRequest, GM_xmlhttpRequest, GM_setValue, GM_getValue, GM.setValue, GM.getValue, GM_addStyle), but only uses GM_xmlhttpRequest, GM.getValue, GM.setValue, and GM_addStyle in the code.  
> 位置：Metadata block  
> 建议：Remove unused permissions (@grant GM.xmlHttpRequest, GM_setValue, GM_getValue) to minimize attack surface.

**🟠 MEDIUM** — Sensitive API Usage  
> Script uses fetch with credentials: 'include', which may transmit cookies to Nexus Mods endpoints.  
> 位置：fetchMods(), fetchDownloadLink()  
> 建议：Ensure cookies are only sent to trusted domains and not to third parties.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/483337-nexus-download-collection)*
