---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面汉化`  `GitHub增强`  `翻译`  `开发者工具`  `多站点支持`  `用户体验提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.4.4-2026-07-26**　　最后更新：**2026-07-27**

## 功能介绍

本脚本将 GitHub 及其相关网站的界面部分菜单和内容翻译为中文，提升中文用户的使用体验。支持多站点，部分内容可自动调用翻译服务。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装 Tampermonkey 插件。
2. 在 Tampermonkey 中添加此脚本。
3. 打开 GitHub 或相关网站，界面会自动显示中文菜单和内容。
4. 如需调整设置，可通过 Tampermonkey 脚本菜单操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让翻译内容更美观。 |
| `GM_xmlhttpRequest` | 用于调用外部翻译接口，实现自动翻译功能。 |
| `GM_getValue` | 用于保存用户设置，如语言偏好等。 |
| `GM_setValue` | 用于存储用户设置，方便下次使用。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义命令，便于用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除自定义菜单命令，优化用户体验。 |
| `GM_notification` | 用于弹出通知提醒用户操作结果或状态。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-07-27

> 该脚本主要功能为界面汉化，未发现隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。最大风险为通过 GM_xmlhttpRequest 向第三方翻译服务发送页面内容，存在数据外传风险。@require 加载的 locals.js 未固定版本哈希，存在供应链风险。部分权限申请较多但未滥用。建议加强数据脱敏、固定依赖版本、精简权限。整体安全评分为 67，风险等级为 HIGH。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://fanyi.iflyrec.com/text-translate, https://fanyi.iflyrec.com/TJHZTranslationService/v2/textAutoTranslation） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 fanyi.iflyrec.com 发送翻译请求，可能包含页面内容或用户输入的文本。  
> 位置：函数 traverseNode、transDesc、翻译相关逻辑  
> 建议：确保仅发送非敏感文本，避免传递用户隐私数据。建议增加用户提示和数据脱敏。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的 locals.js 文件来源为 raw.githubusercontent.com，虽然为 GitHub 官方域名，但未固定版本哈希，存在供应链污染风险。  
> 位置：@require https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals.js?v1.9.4.4-2026-07-26  
> 建议：建议使用固定 commit hash 或官方 CDN，避免加载可变内容。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限并实际使用，未发现权限滥用，但 GM_notification、GM_registerMenuCommand、GM_unregisterMenuCommand 权限申请较多，部分未必必要。  
> 位置：元数据 @grant  
> 建议：建议仅申请实际需要的权限，减少攻击面。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/main.user.js)*
