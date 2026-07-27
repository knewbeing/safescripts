---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面翻译`  `GitHub优化`  `中文化`  `开发者工具`  `网页增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main_greasyfork.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.2.4-2026-06-21**　　发现时间：**2026-07-06**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将 GitHub 网站的部分菜单和内容翻译为中文，提升中文用户的使用体验。安装后，界面会自动显示中文，无需手动切换。支持多种 GitHub 相关页面。

## 适用网站

- GitHub
- GitHub Skills
- Gist
- GitHub Status

## 使用方法

1. 1. 安装 Tampermonkey 扩展。
2. 2. 在 Tampermonkey 中添加本脚本。
3. 3. 打开 GitHub 及相关页面，界面会自动显示中文。
4. 4. 可通过脚本菜单调整部分设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于发送网络请求，获取翻译词库或相关数据。 |
| `GM_getValue` | 用于读取用户设置，如是否启用正则翻译等。 |
| `GM_setValue` | 用于保存用户设置，记住翻译偏好。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义功能按钮，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除脚本菜单中的自定义按钮。 |
| `GM_notification` | 用于弹出通知提醒用户脚本相关信息。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-07-27

> 该脚本主要用于 GitHub 页面本地化，未检测到数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。存在部分权限滥用和供应链风险，整体安全性较高。建议优化权限申请和第三方库版本管理。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但实际代码未使用该 API进行任何网络请求。@connect 仅允许 www.iflyrec.com，但未见实际数据外传。  
> 位置：元数据 @grant/@connect  
> 建议：如无实际用途，建议移除 GM_xmlhttpRequest 权限和 @connect 域名。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的第三方库来自 greasyfork.org，属于可信源，但未固定版本哈希，仅通过 v1.9.2.4-2026-06-21 参数控制版本，存在一定供应链风险。  
> 位置：元数据 @require  
> 建议：建议采用官方 CDN 或固定哈希版本，避免供应链污染。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_notification 权限，但实际代码未见调用 GM_notification。  
> 位置：元数据 @grant  
> 建议：建议移除未使用的 GM_notification 权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/23e7d5030c7a668e26f11a5b927a44b06adc6f6c/main(greasyfork).user.js)*
