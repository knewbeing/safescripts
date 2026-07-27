---
title: "Nexus模组集合批量下载"
---

# Nexus模组集合批量下载

`模组管理`  `批量下载`  `游戏工具`  `NexusMods`  `效率提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Nexus_Download_Collection.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.3.1**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/563176-nexus-download-collection) <Badge type="tip" text="GreasyFork" />　　安装量：**1,266**　　评分：👍6 / 👎1

## 功能介绍

此脚本为 NexusMods 网站的模组集合页面添加一个面板，允许用户一键批量下载集合中的所有模组，无需逐个点击下载。适合需要快速获取大量模组的用户。

## 适用网站

- NexusMods

## 使用方法

1. 安装脚本后，访问 NexusMods 网站的模组集合页面。
2. 页面会出现一个新的下载面板。
3. 点击面板上的按钮，即可批量下载集合内所有模组。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM.setValue` | 用于存储脚本设置或下载进度等信息。 |
| `GM.getValue` | 用于读取之前存储的设置或进度。 |
| `GM_addStyle` | 用于为页面添加自定义样式，让面板更美观。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：92/100　　**分析时间**：2026-07-27

> 该脚本主要用于批量下载 Nexus Mods 集合中的 mod，所有网络请求均指向官方域名且未携带敏感用户数据，未发现隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。整体安全性较高，建议持续关注后续更新。评分 92/100。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://api-router.nexusmods.com/graphql, https://www.nexusmods.com/Core/Libs/Common/Managers/Downloads?GenerateDownloadUrl） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 fetch 向 https://api-router.nexusmods.com/graphql 和 https://www.nexusmods.com/Core/Libs/Common/Managers/Downloads?GenerateDownloadUrl 发起网络请求，目标均为官方域名，未发现携带敏感用户数据或页面内容，仅用于获取 mod 列表和下载链接。  
> 位置：NDC.fetchMods() 方法及常量 API_URL_GRAPHQL、API_URL_DOWNLOAD_GEN  
> 建议：确保请求内容仅包含必要参数，避免携带敏感信息。目标为官方域名，风险较低。

**⛔ CRITICAL** — 隐私采集  
> 脚本未监听键盘输入、未读取表单字段、未访问剪贴板、未读取 cookie/localStorage/sessionStorage/IndexedDB，未发现隐私采集行为。  
> 位置：全局代码审查  
> 建议：保持现有设计，避免后续添加隐私采集代码。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML/outerHTML 插入脚本、@require 或动态 script 标签加载远程 JS，未发现远程代码执行风险。  
> 位置：全局代码审查  
> 建议：保持现有设计，避免后续添加动态代码执行相关函数。

**🔴 HIGH** — 代码混淆  
> 脚本未发现代码混淆、base64 解码、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：全局代码审查  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未使用 document.write()，未操作 iframe src 为 javascript: 协议，未发现 DOM XSS 风险。  
> 位置：NDC.init()、element.innerHTML 用于静态字符串  
> 建议：如需插入用户输入，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> 脚本仅申请 GM.setValue、GM.getValue、GM_addStyle 权限，均被实际使用，未发现权限滥用。  
> 位置：元数据 @grant 与实际代码  
> 建议：仅申请必要权限，避免高权限滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification），未发现敏感 API 调用风险。  
> 位置：全局代码审查  
> 建议：避免后续添加敏感 API 调用。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据 @require  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，未创建隐藏 iframe 用于数据提取，未发现 ClickJacking/iframe 风险。  
> 位置：全局代码审查  
> 建议：避免后续添加 iframe 操作。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/563176-nexus-download-collection)*
