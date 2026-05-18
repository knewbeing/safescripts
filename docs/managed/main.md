---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面汉化`  `GitHub增强`  `自动翻译`  `开发者工具`  `多站点支持`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.4-2026-05-17**　　最后更新：**2026-05-18**

## 功能介绍

本脚本可将 GitHub 及其相关网站的部分菜单和界面内容汉化，提升中文用户的使用体验。安装后，常见的英文界面元素会自动显示为中文。支持多站点，部分内容可调用翻译引擎自动翻译。

## 适用网站

- GitHub
- GitHub Skills
- Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 1. 安装脚本后，访问 GitHub 及相关网站页面。
2. 2. 页面菜单和部分内容会自动显示为中文，无需手动操作。
3. 3. 如需调整设置，可通过油猴脚本菜单进行操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 允许脚本自定义和添加页面样式。 |
| `GM_xmlhttpRequest` | 用于向外部翻译服务发送请求，实现自动翻译功能。 |
| `GM_getValue` | 用于本地存储用户的设置或翻译缓存。 |
| `GM_setValue` | 用于保存用户的设置或翻译缓存。 |
| `GM_registerMenuCommand` | 在油猴菜单中添加自定义操作入口，方便用户手动操作。 |
| `GM_unregisterMenuCommand` | 允许移除自定义菜单命令。 |
| `GM_notification` | 用于在浏览器右下角弹出通知，提示用户操作结果或信息。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-05-18

> 该脚本主要功能为本地化 GitHub 页面，未发现明显的隐私采集、代码混淆或 DOM XSS 风险。主要安全隐患为通过 GM_xmlhttpRequest 将页面内容发送到第三方翻译服务（fanyi.iflyrec.com），存在数据外传风险。依赖的第三方库未锁定版本，存在一定供应链风险。总体风险等级为 HIGH，建议加强数据流向透明度并锁定依赖版本。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：fanyi.iflyrec.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 访问第三方翻译接口（fanyi.iflyrec.com），可能传递用户选中的文本内容。  
> 位置：函数 transTextByAPI / CONFIG.TRANS_ENGINES.iflyrec  
> 建议：仅允许翻译公开页面内容，避免传递敏感信息。明确告知用户数据流向。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的 locals.js 文件来源于 raw.githubusercontent.com，虽然为 GitHub 官方 CDN，但未锁定具体 commit 哈希，存在供应链污染风险。  
> 位置：@require https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals.js?v1.9.4-2026-05-17  
> 建议：建议使用带 commit hash 的 CDN 链接，确保依赖不可变。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但仅用于翻译接口调用，未发现其他高权限滥用。  
> 位置：@grant GM_xmlhttpRequest  
> 建议：如无其他用途，可考虑按需精简权限。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/main.user.js)*
