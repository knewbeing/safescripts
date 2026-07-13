---
title: "GitHub 中文化插件（繁體版）"
---

# GitHub 中文化插件（繁體版）

`界面翻译`  `GitHub优化`  `繁体中文`  `开发者工具`  `多站点支持`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main_zh-TW.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.4.4-2026-06-21**　　发现时间：**2026-07-06**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将 GitHub 网站界面部分菜单和内容翻译为繁体中文，提升中文用户的使用体验。支持多个 GitHub 相关子站点，自动翻译主要页面元素。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装脚本后，访问 GitHub 及其相关网站。
2. 页面菜单和部分内容会自动显示为繁体中文。
3. 如需切换语言或调整设置，可通过脚本菜单操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让翻译内容更美观。 |
| `GM_xmlhttpRequest` | 允许脚本发送网络请求，获取翻译数据。 |
| `GM_getValue` | 用于保存用户设置，如语言偏好。 |
| `GM_setValue` | 用于存储用户设置，如语言选择。 |
| `GM_registerMenuCommand` | 在脚本菜单中添加自定义操作，方便用户切换功能。 |
| `GM_unregisterMenuCommand` | 移除脚本菜单中的自定义操作。 |
| `GM_notification` | 弹出通知提醒用户操作结果或更新信息。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：50/100　　**分析时间**：2026-07-13

> 该脚本主要功能为 GitHub 界面本地化，未发现明显的隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。主要安全隐患为通过第三方翻译接口外传页面内容（如描述文本），以及 @require 依赖未锁定哈希存在供应链风险。建议加强用户告知、限制依赖来源，并确保所有外传内容均为用户主动触发。

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
> 脚本通过 GM_xmlhttpRequest 访问第三方翻译接口 https://fanyi.iflyrec.com，可能传输用户页面内容（如描述文本），存在数据外传风险。  
> 位置：CONFIG.TRANS_ENGINES.iflyrec.url_api 及相关翻译逻辑  
> 建议：仅允许用户主动触发翻译时发送内容，明确告知用户外传内容范围。避免自动批量传输页面内容。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的第三方库（locals_zh-TW.js）来自 raw.githubusercontent.com，未锁定具体 commit 哈希，存在供应链污染风险。  
> 位置：@require https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals_zh-TW.js?v1.9.4.4-2026-06-21  
> 建议：建议使用特定 commit 哈希锁定依赖，避免依赖内容被篡改。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但仅用于翻译接口，未发现其他高权限滥用。  
> 位置：@grant GM_xmlhttpRequest  
> 建议：如无其他用途，建议限制 @connect 仅允许必要域名。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/23e7d5030c7a668e26f11a5b927a44b06adc6f6c/main_zh-TW.user.js)*
