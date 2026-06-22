---
title: "Nexus合集一键下载"
---

# Nexus合集一键下载

`模组下载`  `批量操作`  `游戏工具`  `效率提升`  `Nexus Mods`  `一键下载`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Nexus_Download_Collection.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.9.10**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/483337-nexus-download-collection) <Badge type="tip" text="GreasyFork" />　　安装量：**20,729**　　评分：👍83 / 👎6

## 功能介绍

该脚本可以让用户在 Nexus Mods 网站上，一键下载某个合集中的所有模组，无需逐个点击。适合需要批量下载模组的用户，提升下载效率。

## 适用网站

- Nexus Mods

## 使用方法

1. 安装脚本后，访问 Nexus Mods 网站。
2. 进入你想下载的模组合集页面。
3. 页面会出现“一键下载合集”按钮，点击即可批量下载所有模组。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM.xmlHttpRequest` | 允许脚本通过浏览器发起网络请求，获取模组数据和下载链接。 |
| `GM_xmlhttpRequest` | 允许脚本通过浏览器发起网络请求，获取模组数据和下载链接。 |
| `GM_setValue` | 允许脚本保存用户设置或下载状态。 |
| `GM_getValue` | 允许脚本读取用户设置或下载状态。 |
| `GM.setValue` | 允许脚本保存用户设置或下载状态。 |
| `GM.getValue` | 允许脚本读取用户设置或下载状态。 |
| `GM_addStyle` | 允许脚本自定义页面样式，优化界面显示。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-22

> 该脚本仅与 nexusmods.com 官方 API 通信，无第三方数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等高危行为。部分 @grant 权限可能未被实际使用，建议精简。整体安全风险低，适合普通用户使用。

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
> 脚本通过 fetch 向 nexusmods.com 和 api-router.nexusmods.com 发送请求以获取和下载 mod 信息。所有请求均指向官方域名，无第三方数据外传。  
> 位置：fetchMods, fetchDownloadLink, 相关 fetch 调用  
> 建议：确认请求内容仅限于必要的 mod 信息，不包含用户敏感数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到对 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段、键盘事件等隐私相关 API 的访问。  
> 位置：全局  
> 建议：保持现状，勿添加隐私采集行为。

**🔴 HIGH** — 远程代码执行  
> 未检测到 eval、new Function、setTimeout(string)、setInterval(string)、动态 script 标签、@require 远程 JS、document.write 等远程代码执行风险。  
> 位置：全局  
> 建议：保持现状，勿引入动态代码执行。

**🔴 HIGH** — 代码混淆  
> 未检测到代码混淆、base64 解码、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审查。

**🔴 HIGH** — DOM XSS  
> 未检测到 DOM XSS 风险。脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：全局  
> 建议：如需插入动态内容，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> @grant 权限与实际代码使用基本匹配。部分 GM_setValue/GM_getValue 旧版 API 可能未被实际调用。  
> 位置：元数据与全局  
> 建议：可移除未使用的 grant 权限，减少权限面。

**🟠 MEDIUM** — 敏感 API 调用  
> 未检测到敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）调用。  
> 位置：全局  
> 建议：保持现状，勿添加敏感 API 调用。

**🟠 MEDIUM** — 供应链风险  
> 未检测到 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用官方 CDN 并锁定版本哈希。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未检测到对 frame 保护策略的修改或隐藏 iframe 的创建。  
> 位置：全局  
> 建议：如需使用 iframe，确保来源可信且无数据提取行为。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/483337-nexus-download-collection)*
