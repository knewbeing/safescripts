---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`GitHub`  `界面翻译`  `中文化`  `开发者工具`  `网页优化`  `辅助工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.4.4-2026-07-18**　　最后更新：**2026-07-20**

## 功能介绍

本脚本可以将 GitHub 网站的部分菜单和内容翻译为中文，提升中文用户的使用体验。支持多个 GitHub 相关子站点，自动翻译界面元素。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装 Tampermonkey 插件。
2. 在 Tampermonkey 中添加本脚本。
3. 打开 GitHub 或相关子站点，页面菜单和内容会自动显示中文。
4. 如需切换翻译设置，可通过 Tampermonkey 脚本菜单操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让翻译内容更美观。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，调用翻译接口获取中文内容。 |
| `GM_getValue` | 用于保存用户设置，如语言偏好等。 |
| `GM_setValue` | 用于存储用户设置，如翻译引擎选择。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除脚本菜单中的命令。 |
| `GM_notification` | 用于显示通知，提醒用户翻译完成或操作结果。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-07-20

> 脚本主要用于界面汉化，核心风险在于翻译功能会将页面部分文本（如菜单、描述等）发送到第三方翻译服务（fanyi.iflyrec.com），存在数据外传风险，但未涉及敏感用户数据、cookie、表单、剪贴板等隐私采集。未检测到远程代码执行、代码混淆、DOM XSS、敏感 API 滥用等高风险行为。供应链风险主要在于 @require 未固定 commit hash。整体安全性中等，建议加强数据外传透明度和供应链安全。

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
> 脚本通过 GM_xmlhttpRequest 向 fanyi.iflyrec.com 发送翻译请求，可能包含页面内容（如菜单、描述等文本）。  
> 位置：翻译引擎配置 (CONFIG.TRANS_ENGINES.iflyrec) 和实际翻译调用  
> 建议：明确告知用户数据会被发送至第三方翻译服务，并限制仅发送非敏感文本。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的 locals.js 文件来源于 raw.githubusercontent.com，属于可信官方仓库，但未固定版本哈希，仅通过 query 参数标识版本。  
> 位置：@require https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals.js?v1.9.4.4-2026-07-18  
> 建议：建议使用具体 commit hash 固定版本，避免供应链污染风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限用于翻译请求，GM_notification 用于通知，GM_getValue/GM_setValue 用于本地存储，GM_addStyle 用于样式注入，GM_registerMenuCommand/GM_unregisterMenuCommand 用于菜单。权限申请与实际用途基本匹配，无明显滥用。  
> 位置：元数据 @grant  
> 建议：定期审查权限申请，移除未使用的高权限。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/main.user.js)*
