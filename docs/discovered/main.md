---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面翻译`  `GitHub增强`  `中文本地化`  `开发者工具`  `自动翻译`  `网页优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.4.4-2026-06-21**　　发现时间：**2026-07-06**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将 GitHub 及其相关网站的部分菜单和界面内容翻译为中文，提升中文用户的使用体验。支持自动翻译和界面本地化。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装脚本后，打开 GitHub 或相关网站。
2. 页面菜单和部分内容会自动显示为中文。
3. 如需切换或调整翻译设置，可通过浏览器脚本菜单操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加或修改页面的自定义样式。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取翻译内容。 |
| `GM_getValue` | 用于读取用户设置或脚本数据。 |
| `GM_setValue` | 用于保存用户设置或脚本数据。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除自定义菜单命令。 |
| `GM_notification` | 用于在浏览器中弹出通知，提示用户操作结果。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-07-13

> 该脚本主要功能为本地化 GitHub 界面，未发现隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。主要安全问题为：1）通过 GM_xmlhttpRequest 将页面内容发送至第三方翻译服务，存在数据外传风险；2）@require 加载的 locals.js 词库文件来源为 GitHub Pages，未固定哈希，存在一定供应链风险。建议加强用户告知、限制自动数据传输，并固定依赖库版本。

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
> 脚本通过 GM_xmlhttpRequest 访问第三方翻译接口 https://fanyi.iflyrec.com，可能传递页面内容（如简介、描述等）进行翻译。  
> 位置：CONFIG.TRANS_ENGINES.iflyrec.url_api 及相关翻译函数（未完整展示，但配置已明确）  
> 建议：仅允许用户主动触发翻译请求，明确告知用户数据将发送至第三方服务器。避免自动传递敏感内容。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的第三方库 https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals.js?v1.9.4.4-2026-06-21 来源为 GitHub Pages，非官方 CDN，且未固定哈希，存在供应链污染风险。  
> 位置：@require 元数据  
> 建议：建议使用可信 CDN 并固定版本哈希，或对加载内容进行完整性校验。

**🟡 LOW** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但仅用于翻译接口调用，未发现其他高权限滥用。  
> 位置：@grant 元数据  
> 建议：定期复查权限申请，确保无冗余高权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/23e7d5030c7a668e26f11a5b927a44b06adc6f6c/main.user.js)*
