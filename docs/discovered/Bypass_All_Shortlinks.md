---
title: "旁路全部短链接"
---

# 旁路全部短链接

`短链接`  `广告屏蔽`  `自动跳转`  `去广告`  `下载增强`  `网页优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bypass_All_Shortlinks.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**96.7**　　发现时间：**2026-05-18**　　来源：[GreasyFork](https://greasyfork.org/scripts/431691-bypass-all-shortlinks) <Badge type="tip" text="GreasyFork" />　　安装量：**470,144**　　评分：👍581 / 👎89

## 功能介绍

本脚本可自动绕过各种短链接和跳转页面，直接跳转到目标网站，省去等待和广告。它还能跳过AdFly等广告页面，屏蔽烦人的弹窗和广告检测，并支持自动下载文件、图片和YouTube视频。让你访问短链接时更快捷省心。

## 适用网站

- 全网大部分网站（除知名大站如百度、谷歌、B站、淘宝、微信、支付宝等）

## 使用方法

1. 1. 安装脚本后，无需额外设置，自动生效。
2. 2. 当你访问短链接或跳转页面时，脚本会自动帮你跳过等待和广告。
3. 3. 如遇弹窗、广告检测等干扰，脚本会自动屏蔽。
4. 4. 支持自动下载部分文件、图片和YouTube视频。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于在脚本中保存自定义设置或状态。 |
| `GM_getValue` | 用于读取脚本保存的设置或状态。 |
| `GM_addStyle` | 用于动态修改网页样式，优化用户体验。 |
| `GM_openInTab` | 用于在新标签页打开链接，方便跳转。 |
| `GM_setClipboard` | 用于一键复制内容到剪贴板。 |
| `GM_xmlhttpRequest` | 用于发起跨域网络请求，获取目标链接或资源。 |
| `window.onurlchange` | 用于监听页面地址变化，适配单页应用跳转。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义功能按钮。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：84/100　　**分析时间**：2026-05-18

> 该脚本未发现明显的数据外传、隐私采集、远程代码执行、DOM XSS 或代码混淆行为。主要风险为供应链依赖未锁定版本和权限申请过多。建议锁定依赖版本并精简权限。

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
> 脚本通过 @require 加载了 https://update.greasyfork.org/scripts/528923/1588272/MonkeyConfig%20Mod.js，存在供应链风险。该 URL 来源为 GreasyFork，但未固定版本哈希，未来可能被篡改。  
> 位置：@require 元数据  
> 建议：建议使用官方 CDN 并固定版本哈希，或将依赖代码本地化。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 GM_openInTab、GM_setClipboard、GM_xmlhttpRequest 等高权限，但在提供的代码片段中未见实际使用，存在权限滥用的可能。  
> 位置：@grant 元数据  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/431691-bypass-all-shortlinks)*
