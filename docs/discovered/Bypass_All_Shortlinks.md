---
title: "旁路全部短链接"
---

# 旁路全部短链接

`短链接跳过`  `广告屏蔽`  `自动跳转`  `自动下载`  `弹窗拦截`  `网页优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bypass_All_Shortlinks.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**96.7**　　发现时间：**2026-06-08**　　来源：[GreasyFork](https://greasyfork.org/scripts/431691-bypass-all-shortlinks) <Badge type="tip" text="GreasyFork" />　　安装量：**473,968**　　评分：👍584 / 👎89

## 功能介绍

本脚本可自动跳过各种短链接和跳转页面，直接进入目标网站或下载内容。它能绕过AdFly等广告页面、屏蔽广告检测、阻止烦人的弹窗和提示，并支持自动下载文件、图片和视频。让你访问短链接时更快捷，无需手动等待或关闭广告。

## 适用网站

- 全网（除部分主流网站如百度、谷歌、B站、淘宝、抖音、微信、支付宝等）

## 使用方法

1. 1. 安装脚本后，访问任何短链接或跳转页面。
2. 2. 脚本会自动跳过广告和等待，直接进入目标页面或下载内容。
3. 3. 如遇弹窗或提示，脚本会自动屏蔽，无需手动关闭。
4. 4. 可在浏览器菜单中找到脚本设置入口，调整相关功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于保存脚本设置和临时数据。 |
| `GM_getValue` | 用于读取脚本保存的数据。 |
| `GM_addStyle` | 用于动态添加自定义样式，优化页面显示。 |
| `GM_openInTab` | 用于在新标签页打开目标链接。 |
| `GM_setClipboard` | 用于复制目标链接到剪贴板。 |
| `GM_xmlhttpRequest` | 用于发起网络请求，自动获取跳转目标或下载内容。 |
| `window.onurlchange` | 用于监听网址变化，自动处理跳转。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加脚本功能入口。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-06-08

> 本脚本元数据部分未发现数据外传、隐私采集、远程代码执行、混淆、DOM XSS 等高危行为。存在权限滥用和供应链风险（@require 未锁定版本），但整体风险较低。建议仅保留实际需要的权限，并锁定第三方依赖版本。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_setClipboard、GM_xmlhttpRequest 等高权限，但主代码未见实际调用（仅元数据和 @require）。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，避免权限滥用。

**🟠 MEDIUM** — 供应链风险  
> 通过 @require 加载了第三方库 MonkeyConfig Mod.js，来源为 greasyfork 官方 CDN，未锁定具体版本哈希。  
> 位置：@require https://update.greasyfork.org/scripts/528923/1588272/MonkeyConfig%20Mod.js  
> 建议：建议锁定具体版本或哈希，防止供应链污染。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/431691-bypass-all-shortlinks)*
