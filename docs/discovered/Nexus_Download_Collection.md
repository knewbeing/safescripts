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

**风险等级**：🟡 LOW　　**安全评分**：75/100　　**分析时间**：2026-07-06

> 脚本主要用于批量下载 Nexus Mods 集合中的 mod，未检测到隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险等问题。唯一风险为功能性的数据外传，目标均为官方域名，风险较低。整体安全性较高。

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
> 脚本通过 fetch 向 https://api-router.nexusmods.com/graphql 和 https://www.nexusmods.com/Core/Libs/Common/Managers/Downloads?GenerateDownloadUrl 发起网络请求，目标均为官方域名，未携带敏感用户数据，仅用于功能实现。  
> 位置：NDC.fetchMods() 方法  
> 建议：确认请求内容仅为功能所需，避免携带用户敏感信息。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/563176-nexus-download-collection)*
