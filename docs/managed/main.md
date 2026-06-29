---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`GitHub`  `界面翻译`  `中文化`  `开发者工具`  `提升体验`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.4.4-2026-06-21**　　最后更新：**2026-06-29**

## 功能介绍

本脚本将 GitHub 网站的部分菜单和内容翻译为中文，提升中文用户的使用体验。支持多种 GitHub 相关子站点，部分内容可自动调用翻译服务。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装 Tampermonkey 插件。
2. 在 Tampermonkey 中添加此脚本。
3. 访问 GitHub 及相关子站点，界面会自动显示中文菜单和内容。
4. 如需手动操作或设置，可通过浏览器的用户脚本菜单进行调整。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 允许脚本添加自定义样式，优化界面显示。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取翻译结果等功能。 |
| `GM_getValue` | 用于保存和读取用户设置或翻译缓存。 |
| `GM_setValue` | 用于保存用户设置或翻译缓存。 |
| `GM_registerMenuCommand` | 允许脚本在浏览器菜单中添加自定义命令，方便操作。 |
| `GM_unregisterMenuCommand` | 允许脚本移除自定义菜单命令。 |
| `GM_notification` | 用于弹出通知，提醒用户操作或翻译结果。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-06-29

> 该脚本主要功能为本地化 GitHub 页面，未发现隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。主要安全问题为将页面内容通过 GM_xmlhttpRequest 发送到第三方翻译服务（https://fanyi.iflyrec.com），存在数据外传风险。@require 加载的 locals.js 依赖未固定版本哈希，存在一定供应链风险。总体风险等级为 HIGH，不建议在敏感环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://fanyi.iflyrec.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向第三方翻译服务 https://fanyi.iflyrec.com 发送用户页面内容（如简介、菜单文本等）以实现翻译功能。  
> 位置：CONFIG.TRANS_ENGINES.iflyrec.url_api 及相关翻译函数  
> 建议：仅允许用户主动触发翻译时发送内容，明确告知用户数据将被发送到第三方服务器。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的第三方库 https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals.js?v1.9.4.4-2026-06-21 来源为 GitHub Pages，非官方 CDN，且未固定版本哈希，存在供应链污染风险。  
> 位置：@require 元数据  
> 建议：建议使用官方 CDN 或固定 commit hash 的 URL，确保依赖不可被篡改。

**🟡 LOW** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但仅用于翻译功能，未发现其他高权限滥用。  
> 位置：@grant 元数据  
> 建议：定期复查权限申请，确保无冗余高权限。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/main.user.js)*
