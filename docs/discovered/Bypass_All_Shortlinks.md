---
title: "旁路全部短链接"
---

# 旁路全部短链接

`短链接绕过`  `广告屏蔽`  `自动跳转`  `下载增强`  `弹窗拦截`  `网页优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bypass_All_Shortlinks.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**96.7**　　发现时间：**2026-05-11**　　来源：[GreasyFork](https://greasyfork.org/scripts/431691-bypass-all-shortlinks) <Badge type="tip" text="GreasyFork" />　　安装量：**468,910**　　评分：👍580 / 👎89

## 功能介绍

本脚本可自动绕过各种短链接和跳转页面，直接跳转到目标网站，省去等待和广告。它还能跳过AdFly等广告页面，屏蔽烦人的弹窗和广告检测，并支持自动下载文件、图片和视频。让你上网更顺畅，无需手动关闭广告或等待倒计时。

## 适用网站

- 全网（除部分主流网站如百度、谷歌、B站、淘宝、微信、支付宝、银行等）

## 使用方法

1. 1. 安装脚本后，访问包含短链接或跳转页面的网站。
2. 2. 脚本会自动识别并跳转到目标页面，无需手动操作。
3. 3. 如遇广告、弹窗或下载页面，脚本会自动为你跳过或屏蔽。
4. 4. 可通过油猴菜单自定义部分脚本设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于在脚本中保存设置或数据。 |
| `GM_getValue` | 用于读取脚本保存的设置或数据。 |
| `GM_addStyle` | 用于动态添加自定义样式，优化页面显示。 |
| `GM_openInTab` | 用于在新标签页打开链接。 |
| `GM_setClipboard` | 用于将内容复制到剪贴板，方便用户操作。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取或提交数据。 |
| `window.onurlchange` | 用于监听网址变化，适配单页应用。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义命令，便于用户操作。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：84/100　　**分析时间**：2026-05-11

> 该脚本主代码未见明显的数据外传、隐私采集、远程代码执行、混淆或 DOM XSS 风险。但存在供应链风险（@require 外部库未锁定版本）和权限滥用（申请了未使用的高权限）。建议仅使用可信第三方库并锁定版本，移除未使用的高权限。整体风险为中等，建议谨慎使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — Supply Chain Risk  
> @require 加载了 https://update.greasyfork.org/scripts/528923/1588272/MonkeyConfig%20Mod.js，存在供应链风险，且未锁定哈希/版本。  
> 位置：@require 元数据  
> 建议：仅使用可信官方 CDN 并锁定具体版本或哈希，避免供应链污染。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 GM_openInTab、GM_setClipboard、GM_xmlhttpRequest 等高权限，但主代码未见实际使用，存在权限滥用风险。  
> 位置：@grant 元数据  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/431691-bypass-all-shortlinks)*
