---
title: "Picviewer CE+"
---

# Picviewer CE+

`图片浏览`  `批量下载`  `网页增强`  `图片管理`  `工具`  `自动化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Picviewer_CE.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2026.2.6.1**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/24204-picviewer-ce) <Badge type="tip" text="GreasyFork" />　　安装量：**306,404**　　评分：👍1378 / 👎1

## 功能介绍

Picviewer CE+ 是一款在线看图工具，支持图片弹出大图、旋转、缩放、翻转和批量保存。安装后可在网页上更方便地浏览和管理图片。适用于大多数网站，自动识别页面图片并提供增强功能。

## 适用网站

- 所有网站（部分网站除外，如Toodledo、Google地图、新标签页、Mega、OneDrive）

## 使用方法

1. 安装脚本后，浏览任意网页。
2. 鼠标悬停或点击图片，即可弹出大图查看。
3. 使用弹出窗口中的按钮进行旋转、缩放、翻转或批量保存操作。
4. 在脚本菜单中可调整设置或批量操作图片。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于保存和读取脚本的设置数据。 |
| `GM_setValue` | 用于保存和读取脚本的设置数据。 |
| `GM_deleteValue` | 用于删除脚本的设置数据。 |
| `GM_addStyle` | 用于添加自定义样式，让图片查看界面更美观。 |
| `GM_openInTab` | 用于在新标签页打开图片或相关链接。 |
| `GM_setClipboard` | 用于复制图片链接或信息到剪贴板。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取图片或相关数据。 |
| `GM_registerMenuCommand` | 用于在菜单中添加自定义命令，方便用户操作。 |
| `GM_notification` | 用于显示桌面通知，提醒图片操作结果。 |
| `GM_download` | 用于批量下载图片到本地。 |
| `GM.getValue` | 用于保存和读取脚本的设置数据（新版API）。 |
| `GM.setValue` | 用于保存和读取脚本的设置数据（新版API）。 |
| `GM.deleteValue` | 用于删除脚本的设置数据（新版API）。 |
| `GM.addStyle` | 用于添加自定义样式（新版API）。 |
| `GM.openInTab` | 用于在新标签页打开图片或相关链接（新版API）。 |
| `GM.setClipboard` | 用于复制图片链接或信息到剪贴板（新版API）。 |
| `GM.xmlHttpRequest` | 用于发送网络请求（新版API）。 |
| `GM.registerMenuCommand` | 用于在菜单中添加自定义命令（新版API）。 |
| `GM.notification` | 用于显示桌面通知（新版API）。 |
| `unsafeWindow` | 允许脚本访问网页的全部窗口对象，增强功能实现。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：52/100　　**分析时间**：2026-07-27

> Picviewer CE+ 用户脚本存在较高安全风险，主要由于 @connect * 允许任意外部通信（CRITICAL），高权限申请与供应链风险（MEDIUM）。当前代码片段未检测到隐私采集、远程代码执行、代码混淆或 DOM XSS，但完整功能需进一步审查。建议收紧 @connect 域名、精简权限申请、固定第三方库版本。未批准。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> @connect * 允许任意域名的网络请求，存在数据外传潜在风险，尤其是 GM_xmlhttpRequest 可用于任意第三方通信。  
> 位置：元数据 @connect *  
> 建议：限制 @connect 域名范围，仅允许必要的目标，避免任意外部通信。

**🟠 MEDIUM** — Permission Abuse  
> 申请了大量高权限（GM_download、GM_openInTab、unsafeWindow），部分未在当前代码片段中使用，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

**🟠 MEDIUM** — Supply Chain Risk  
> @require 加载的第三方库未固定版本哈希，存在供应链污染风险。  
> 位置：元数据 @require  
> 建议：使用官方 CDN 并固定版本哈希，避免加载可变内容。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/24204-picviewer-ce)*
