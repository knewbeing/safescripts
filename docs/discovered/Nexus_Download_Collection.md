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

**风险等级**：🟡 LOW　　**安全评分**：75/100　　**分析时间**：2026-06-01

> 该脚本仅与 nexusmods.com 官方域名通信，未发现隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链或 iframe 风险。主要风险为数据外传（仅限目标站点），整体安全性较高。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：nexusmods.com, api-router.nexusmods.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 fetch 向 nexusmods.com 及其子域名（api-router.nexusmods.com）发送请求以获取和下载 mod 信息。未发现向第三方域名或非官方服务器发送数据。  
> 位置：fetchMods, fetchDownloadLink, fetch  
> 建议：仅与目标站点通信，避免向未知服务器发送数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到对 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段、键盘事件的读取或监听。  
> 位置：全局  
> 建议：继续保持，不采集用户隐私数据。

**🔴 HIGH** — 远程代码执行  
> 未检测到 eval、new Function、setTimeout(string)、setInterval(string)、动态 script 标签、@require 远程 JS、document.write 等远程代码执行风险。  
> 位置：全局  
> 建议：避免动态执行字符串代码。

**🔴 HIGH** — 代码混淆  
> 未检测到代码混淆、base64 解码、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

**🔴 HIGH** — DOM XSS  
> 未检测到用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 DOM XSS 风险。  
> 位置：全局  
> 建议：插入 HTML 时始终进行转义。

**🟠 MEDIUM** — 权限滥用  
> @grant 权限与实际代码使用基本匹配，未发现高权限滥用。  
> 位置：元数据  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 未检测到敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）调用。  
> 位置：全局  
> 建议：避免调用敏感 API。

**🟠 MEDIUM** — 供应链风险  
> 未检测到 @require 加载第三方库，未发现供应链风险。  
> 位置：元数据  
> 建议：如需第三方库，建议固定版本哈希并使用可信 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未检测到脚本修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局  
> 建议：避免创建隐藏 iframe 进行数据提取。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/483337-nexus-download-collection)*
