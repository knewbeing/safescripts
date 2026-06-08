---
title: "Nexus合集一键下载"
---

# Nexus合集一键下载

`模组下载`  `批量操作`  `游戏工具`  `Nexus Mods`  `效率提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Nexus_Download_Collection.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.9.10**　　发现时间：**2026-06-08**　　来源：[GreasyFork](https://greasyfork.org/scripts/483337-nexus-download-collection) <Badge type="tip" text="GreasyFork" />　　安装量：**19,882**　　评分：👍82 / 👎6

## 功能介绍

该脚本可以让用户在 Nexus Mods 网站上，一键下载某个合集中的所有模组，无需逐个操作。适合需要批量下载模组的用户，提升下载效率。

## 适用网站

- Nexus Mods

## 使用方法

1. 1. 安装脚本后，访问 Nexus Mods 网站。
2. 2. 打开你想下载的模组合集页面。
3. 3. 页面会出现“一键下载合集”按钮。
4. 4. 点击按钮即可批量下载所有模组。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM.xmlHttpRequest` | 允许脚本发送跨域网络请求，用于批量下载模组数据。 |
| `GM_xmlhttpRequest` | 允许脚本发送跨域网络请求，用于批量下载模组数据。 |
| `GM_setValue` | 允许脚本保存设置或下载进度到本地。 |
| `GM_getValue` | 允许脚本读取本地保存的设置或下载进度。 |
| `GM.setValue` | 允许脚本保存设置或下载进度到本地。 |
| `GM.getValue` | 允许脚本读取本地保存的设置或下载进度。 |
| `GM_addStyle` | 允许脚本自定义页面样式，优化界面显示。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：97/100　　**分析时间**：2026-06-08

> 该脚本仅与 nexusmods.com 官方域名通信，未发现隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。整体安全性高，风险极低。

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
> 脚本通过 fetch 向 nexusmods.com 和 api-router.nexusmods.com 发送请求以获取和下载 mod 信息。所有请求均为官方域名，未发现向第三方服务器或未知域名传输数据。  
> 位置：fetchMods, fetchDownloadLink 等函数  
> 建议：仅允许与受信任的官方域名通信，避免将用户数据发送到第三方。

**⛔ CRITICAL** — 隐私采集  
> 脚本未发现读取 cookie/localStorage/sessionStorage/IndexedDB、监听键盘输入、读取表单字段、访问指纹 API 或读取剪贴板内容的行为。  
> 位置：全局  
> 建议：保持当前实现，避免添加隐私采集代码。

**🔴 HIGH** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string)、动态 script 标签、@require 加载远程 JS 或 document.write 插入脚本内容。  
> 位置：全局  
> 建议：避免远程代码执行相关 API。

**🔴 HIGH** — 代码混淆  
> 未发现明显的代码混淆、base64 解码、字符串数组混淆或高度压缩代码。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未见 document.write 注入或 iframe src 操作。  
> 位置：全局  
> 建议：插入 HTML 时应始终进行转义。

**🟠 MEDIUM** — 权限滥用  
> @grant 权限与实际代码使用基本匹配，未发现高权限滥用。  
> 位置：元数据与全局  
> 建议：如未使用部分 GM API，可移除对应 @grant。

**🟠 MEDIUM** — 敏感 API 调用  
> 未发现敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）调用。  
> 位置：全局  
> 建议：避免调用敏感 API。

**🟠 MEDIUM** — 供应链风险  
> 未使用 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，请使用官方 CDN 并锁定版本。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未发现修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局  
> 建议：避免通过 iframe 进行数据提取。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/483337-nexus-download-collection)*
