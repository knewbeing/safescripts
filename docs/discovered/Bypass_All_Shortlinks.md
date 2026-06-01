---
title: "旁路全部短链接"
---

# 旁路全部短链接

`短链接跳过`  `广告屏蔽`  `自动跳转`  `弹窗拦截`  `自动下载`  `浏览体验提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bypass_All_Shortlinks.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**96.7**　　发现时间：**2026-06-01**　　来源：[GreasyFork](https://greasyfork.org/scripts/431691-bypass-all-shortlinks) <Badge type="tip" text="GreasyFork" />　　安装量：**472,659**　　评分：👍584 / 👎89

## 功能介绍

本脚本可自动跳过各种短链接和跳转页面，让你直接访问目标网站。它还能绕过 AdFly 等广告页面，屏蔽烦人的弹窗和广告检测，并支持自动下载文件、图片和视频。适用于大多数网站，提升浏览体验。

## 适用网站

- 全网（除部分主流网站如百度、谷歌、微博、B站、淘宝、亚马逊、支付宝、Facebook、Twitter、抖音等）

## 使用方法

1. 1. 安装脚本后，访问任何包含短链接或跳转页面的网站。
2. 2. 脚本会自动跳过短链接和广告页面，无需手动操作。
3. 3. 如遇弹窗、广告检测等烦人提示，脚本会自动屏蔽。
4. 4. 部分资源（如文件、图片、视频）可自动下载，无需额外操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于保存脚本设置和数据。 |
| `GM_getValue` | 用于读取脚本保存的数据。 |
| `GM_addStyle` | 用于动态添加自定义样式，优化页面显示。 |
| `GM_openInTab` | 用于在新标签页打开链接，方便跳转。 |
| `GM_setClipboard` | 用于复制目标链接到剪贴板。 |
| `GM_xmlhttpRequest` | 用于发起网络请求，自动获取目标链接或资源。 |
| `window.onurlchange` | 用于监听页面地址变化，自动处理跳转。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加脚本功能入口。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-06-01

> 该脚本通过 GM_xmlhttpRequest 动态访问第三方短链服务，存在数据外传风险，尤其是在未限制目标域名和请求内容的情况下。未发现明显隐私采集、代码混淆或 DOM XSS 风险。@require 依赖未锁定版本，存在一定供应链风险。部分高权限申请可能未被实际使用，建议精简权限。总体安全风险较高，不建议在敏感环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：Third-party shortlink services (dynamic, based on visited URLs)） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用 GM_xmlhttpRequest 进行网络请求，目标为动态短链服务，可能会携带当前页面 URL、Referer、部分页面内容等信息。  
> 位置：主逻辑代码（未完全展示，但根据功能和 grant 权限推断）  
> 建议：仅允许请求已知可信短链 API，避免发送敏感信息到第三方，增加用户确认。

**🟠 MEDIUM** — 供应链风险  
> @require 加载了 https://update.greasyfork.org/scripts/528923/1588272/MonkeyConfig%20Mod.js，来源为 GreasyFork，但未锁定版本哈希，存在供应链污染风险。  
> 位置：元数据 @require  
> 建议：建议使用固定哈希或官方 CDN，定期核查依赖安全性。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_setClipboard、GM_xmlhttpRequest 等高权限，但部分权限可能未被实际使用，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/431691-bypass-all-shortlinks)*
