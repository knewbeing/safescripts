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

**风险等级**：🟡 LOW　　**安全评分**：75/100　　**分析时间**：2026-07-13

> 该脚本主要与 nexusmods 官方 API 通信以获取集合 mod 列表，未检测到隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链或 iframe 风险。数据传输仅限官方域名，未发现敏感用户数据外传。整体安全风险较低，建议保持当前实现并持续关注后续更新。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://api-router.nexusmods.com/graphql） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 fetch 向 https://api-router.nexusmods.com/graphql 发送请求以获取集合 mod 列表。该请求为官方 API，未发现敏感用户数据外传。  
> 位置：NDC.fetchMods()  
> 建议：仅与官方域名通信，风险可接受。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等动态代码执行方式。  
> 位置：全局  
> 建议：保持当前实现，避免远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 未检测到代码混淆、base64 解码、字符串数组映射或高度压缩代码。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审查。

**🔴 HIGH** — DOM XSS  
> 未检测到 DOM XSS 风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：全局  
> 建议：如后续涉及用户输入，需严格转义。

**🟠 MEDIUM** — 权限滥用  
> 仅申请了 GM.setValue、GM.getValue、GM_addStyle 权限，未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 未检测到敏感 API（如 geolocation、WebRTC、剪贴板读取、通知等）调用。  
> 位置：全局  
> 建议：如需使用敏感 API，需明确告知用户。

**🟠 MEDIUM** — 供应链风险  
> 未检测到 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用官方 CDN 并锁定版本。

**🟡 LOW** — ClickJacking/iframe 风险  
> 未检测到脚本修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局  
> 建议：如需操作 iframe，需评估 ClickJacking 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/563176-nexus-download-collection)*
