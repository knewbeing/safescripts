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

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-07-13

> 该脚本主要功能为在 sketchfab.com 页面添加下载按钮，导出 3D 模型数据为 zip 文件。未检测到数据外传、隐私采集、远程代码执行、混淆、DOM XSS 等高危行为。仅存在申请了 unsafeWindow 权限（实际用途有限）和加载第三方库的供应链风险，但均为可信来源并锁定版本。整体安全风险较低。

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
> 申请了 @grant unsafeWindow 权限，但仅用于访问页面上下文对象，没有发现滥用。  
> 位置：@grant 元数据及脚本顶部  
> 建议：如无必要可移除 unsafeWindow 权限，降低潜在风险。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @require 加载第三方库（jszip、jszip-utils、FileSaver.js），但均来自官方 CDNJS，且指定了具体版本。  
> 位置：@require 元数据  
> 建议：继续保持使用可信 CDN 并锁定版本，防止供应链污染。

**🟡 LOW** — 数据外传  
> 脚本未检测到任何外部数据传输、统计、追踪或 WebSocket 行为。  
> 位置：全局  
> 建议：无。

**🟡 LOW** — 远程代码执行  
> 未检测到 eval、new Function、setTimeout(string) 等远程代码执行风险。  
> 位置：全局  
> 建议：无。

**🟡 LOW** — 代码混淆  
> 未检测到代码混淆、base64 解码、字符串数组映射或高度压缩代码。  
> 位置：全局  
> 建议：无。

**🟡 LOW** — DOM XSS  
> 未检测到 DOM XSS 风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：全局  
> 建议：无。

**🟡 LOW** — 隐私采集  
> 未检测到隐私采集行为（如读取 cookie、localStorage、表单、剪贴板、指纹等）。  
> 位置：全局  
> 建议：无。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/492877-sketchfab)*
