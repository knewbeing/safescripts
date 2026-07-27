---
title: "Sketchfab模型下载"
---

# Sketchfab模型下载

`3D模型下载`  `资源获取`  `Sketchfab`  `网页增强`  `一键下载`  `文件管理`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/sketchfab.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.1**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/492877-sketchfab) <Badge type="tip" text="GreasyFork" />　　安装量：**22,263**　　评分：👍15 / 👎6

## 功能介绍

本脚本为 Sketchfab 网站添加一个“DOWNLOAD”按钮，允许用户直接下载3D模型。下载的模型会被打包为压缩文件，方便保存和使用。无需复杂操作，一键即可获取模型资源。

## 适用网站

- Sketchfab

## 使用方法

1. 安装脚本后，访问 Sketchfab 网站的模型页面。
2. 页面顶部会出现“DOWNLOAD”按钮。
3. 点击按钮即可下载当前模型，文件会自动保存到本地。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和操作网页的全局变量，增强与页面的交互能力。 |
| `GM_download` | 用于下载模型文件，确保文件能被安全地保存到本地。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-07-27

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。仅存在权限申请略高于实际需求和第三方库供应链风险，整体安全性较高。建议移除未使用的高权限申请以进一步提升安全性。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> 申请了 unsafeWindow 权限，但实际用途仅为访问页面 window 对象，无明显滥用。  
> 位置：元数据 @grant unsafeWindow  
> 建议：如无必要可移除 unsafeWindow 权限，减少攻击面。

**🟠 MEDIUM** — 权限滥用  
> 申请了 GM_download 权限，但实际代码未直接调用 GM_download，仅用于文件保存（FileSaver.js）。  
> 位置：元数据 @grant GM_download  
> 建议：如无实际使用 GM_download，可移除该权限。

**🟠 MEDIUM** — 供应链风险  
> 通过 @require 加载第三方库（jszip、jszip-utils、FileSaver.js），均为官方 CDN 且固定版本。  
> 位置：元数据 @require  
> 建议：保持固定版本，避免使用未知域名或可变 URL。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/492877-sketchfab)*
