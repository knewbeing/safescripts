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

**风险等级**：🔴 HIGH　　**安全评分**：60/100　　**分析时间**：2026-07-27

> 该脚本主要用于 GitHub 界面汉化，未发现隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。最大安全隐患为翻译功能的数据外传（可能发送页面内容到第三方服务器），以及 @require 未固定哈希带来的供应链风险。建议加强数据脱敏、固定依赖版本，并持续关注权限申请。整体风险等级为 HIGH，安全评分 60。

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
> 脚本通过 GM_xmlhttpRequest 向 fanyi.iflyrec.com 发送翻译请求，可能包含页面内容或用户输入。  
> 位置：翻译引擎配置与翻译功能实现（CONFIG.TRANS_ENGINES.iflyrec）  
> 建议：确保仅发送非敏感文本，避免传递用户隐私数据。建议增加用户提示和数据脱敏。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的 locals_zh-TW.js 文件来源为 raw.githubusercontent.com，虽然为官方仓库，但未固定版本哈希，存在供应链风险。  
> 位置：@require https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals_zh-TW.js?v1.9.4.4-2026-06-21  
> 建议：建议使用固定版本哈希或官方发布 CDN，避免供应链污染。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但仅用于翻译功能，未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：建议仅申请实际需要的权限，定期复查。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/23e7d5030c7a668e26f11a5b927a44b06adc6f6c/main_zh-TW.user.js)*
