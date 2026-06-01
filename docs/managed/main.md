---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面翻译`  `GitHub增强`  `中文本地化`  `开发者工具`  `自动翻译`  `网页优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.4-2026-05-21**　　最后更新：**2026-06-01**

## 功能介绍

本脚本将 GitHub 及其相关网站的部分菜单和界面内容翻译为中文，提升中文用户的使用体验。支持自动翻译和界面本地化，部分内容可自定义。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装 Tampermonkey 插件。
2. 在 Tampermonkey 中添加本脚本。
3. 访问 GitHub 及相关网站，界面会自动显示中文。
4. 如需自定义或反馈问题，可通过脚本菜单操作或访问支持页面。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加或修改页面样式，让翻译内容显示更美观。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取翻译结果。 |
| `GM_getValue` | 用于保存用户设置或翻译缓存。 |
| `GM_setValue` | 用于存储用户设置或翻译缓存。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义操作按钮。 |
| `GM_unregisterMenuCommand` | 用于移除脚本菜单中的自定义操作按钮。 |
| `GM_notification` | 用于弹出通知，提醒用户翻译或设置结果。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：42/100　　**分析时间**：2026-06-01

> 该脚本主要功能为本地化 GitHub 界面，未发现明显的隐私采集、代码混淆或 DOM XSS 风险。主要安全隐患为通过 GM_xmlhttpRequest 将页面内容发送到第三方翻译接口（fanyi.iflyrec.com），存在数据外传风险。@require 依赖未锁定 commit 哈希，存在一定供应链风险。部分申请的权限未见实际使用，建议精简。总体风险等级为 HIGH，不建议在敏感环境下直接使用。

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
> 脚本通过 GM_xmlhttpRequest 访问第三方翻译接口 https://fanyi.iflyrec.com，可能传递页面内容进行翻译。  
> 位置：TRANS_ENGINES 配置与后续网络请求逻辑  
> 建议：仅允许用户主动触发翻译请求，明确告知用户数据将被发送到第三方服务器。避免自动上传页面内容。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的 locals.js 文件来自 raw.githubusercontent.com，虽然为 GitHub 官方 CDN，但未锁定具体 commit 哈希，存在一定供应链风险。  
> 位置：@require https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals.js?v1.9.4-2026-05-21  
> 建议：建议使用特定 commit 哈希锁定依赖，防止上游代码被篡改。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest、GM_getValue、GM_setValue、GM_registerMenuCommand、GM_unregisterMenuCommand、GM_notification 等多项权限，但部分权限如 GM_notification 在当前代码片段未见实际使用。  
> 位置：元数据 @grant 字段  
> 建议：仅申请实际使用的权限，减少权限滥用风险。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/main.user.js)*
