---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`GitHub`  `界面翻译`  `中文化`  `开发者工具`  `自动翻译`  `提升体验`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.4.4-2026-07-26**　　发现时间：**2026-07-27**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将 GitHub 及其相关页面的部分菜单和内容翻译为中文，提升中文用户的使用体验。支持多种 GitHub 子站点，部分内容可自动调用翻译服务。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装 Tampermonkey 后添加此脚本。
2. 访问 GitHub 及相关页面，界面会自动显示中文菜单和内容。
3. 如需切换翻译引擎或设置，点击浏览器脚本菜单进行操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让翻译内容更美观。 |
| `GM_xmlhttpRequest` | 用于调用外部翻译接口，实现自动翻译功能。 |
| `GM_getValue` | 用于保存用户设置，如语言偏好等。 |
| `GM_setValue` | 用于存储用户设置，如翻译引擎选择等。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除脚本菜单中的命令。 |
| `GM_notification` | 用于弹出通知提醒用户操作结果或状态。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：52/100　　**分析时间**：2026-07-27

> 该脚本主要用于 GitHub 页面汉化，核心功能涉及页面文本翻译。存在数据外传风险（页面内容通过 GM_xmlhttpRequest 发送至第三方翻译服务 fanyi.iflyrec.com），且 @require 加载的 locals.js 未固定版本哈希，存在供应链风险。未检测到隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用等高风险行为。建议加强数据传输透明度、供应链安全，并定期复查权限申请。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://fanyi.iflyrec.com/TJHZTranslationService/v2/textAutoTranslation） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 fanyi.iflyrec.com 发送翻译请求，可能包含页面内容（如简介、菜单文本等），存在数据外传风险。  
> 位置：翻译引擎配置 (CONFIG.TRANS_ENGINES.iflyrec) 及后续翻译功能调用  
> 建议：明确告知用户数据传输范围，避免发送敏感信息。建议仅发送必要文本，避免携带用户隐私数据。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的 locals.js 文件来源于 raw.githubusercontent.com，虽然为 GitHub 官方托管，但未固定版本哈希，存在供应链风险。  
> 位置：@require https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals.js?v1.9.4.4-2026-07-26  
> 建议：建议使用固定版本哈希或官方 CDN，避免供应链污染。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限用于翻译功能，但未检测到其他高权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，定期复查权限申请。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/1c891198ddf0965752c53a311e1fa21cf2cff7e6/main.user.js)*
