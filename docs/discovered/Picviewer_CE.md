---
title: "Picviewer CE+"
---

# Picviewer CE+

`图片浏览`  `批量下载`  `网页工具`  `图片旋转`  `图片弹出`  `效率提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Picviewer_CE.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2026.2.6.1**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/24204-picviewer-ce) <Badge type="tip" text="GreasyFork" />　　安装量：**306,117**　　评分：👍1376 / 👎1

## 功能介绍

Picviewer CE+ 是一款在线看图工具，支持图片弹出大图、缩放、旋转、翻转和批量保存。安装后，浏览网页时可快速查看和操作图片，提升图片浏览体验。适用于大多数网站。

## 适用网站

- 所有网站（除特定排除项，如谷歌地图、Mega、OneDrive等）

## 使用方法

1. 安装脚本后，浏览网页时鼠标悬停或点击图片即可弹出大图。
2. 弹出的图片窗口可进行缩放、旋转、翻转等操作。
3. 可通过脚本菜单批量保存网页上的图片。
4. 如需设置或自定义功能，可在浏览器的油猴菜单中调整脚本配置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取用户设置和数据。 |
| `GM_setValue` | 用于保存用户设置和数据。 |
| `GM_deleteValue` | 用于删除用户设置和数据。 |
| `GM_addStyle` | 用于添加自定义样式，优化图片查看界面。 |
| `GM_openInTab` | 用于在新标签页打开图片或相关链接。 |
| `GM_setClipboard` | 用于复制图片链接或信息到剪贴板。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取图片或相关数据。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加功能入口。 |
| `GM_notification` | 用于弹出通知，提示操作结果。 |
| `GM_download` | 用于批量下载图片。 |
| `unsafeWindow` | 用于访问网页的原生窗口对象，增强功能。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：52/100　　**分析时间**：2026-06-29

> Picviewer CE+ 申请了广泛的网络访问权限（@connect *），并使用 GM_xmlhttpRequest 等高权限 API，理论上可外传任意数据，属于严重安全隐患。部分高权限未见实际使用，存在权限滥用和供应链风险。未发现明显隐私采集、远程代码执行、代码混淆或 DOM XSS 问题。建议收紧 @connect 域名范围、精简权限、锁定依赖版本。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：* (wildcard, any domain), www.google.com, www.google.com.hk） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> @connect * 允许脚本通过 GM_xmlhttpRequest 等 API 访问任意外部服务器，存在数据外传风险。  
> 位置：元数据 @connect  
> 建议：将 @connect 范围限制为实际需要的域名，避免使用通配符 *。

**⛔ CRITICAL** — 数据外传  
> 脚本申请了 GM_xmlhttpRequest/GM.xmlHttpRequest 权限，并结合 @connect *，理论上可外传任意数据。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，并限制 @connect 域名。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_download、GM_openInTab、GM_notification、unsafeWindow 等高权限，但部分权限在当前代码片段未见实际使用，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际使用的权限，移除未用高权限。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的第三方库（pvcep_rules.js、pvcep_lang.js）未锁定版本哈希，存在供应链风险。  
> 位置：元数据 @require  
> 建议：使用可信源并锁定具体版本或哈希。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/24204-picviewer-ce)*
