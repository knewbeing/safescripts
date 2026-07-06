---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面翻译`  `GitHub增强`  `中文化`  `开发者工具`  `多站点支持`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.4.4-2026-07-01**　　最后更新：**2026-07-06**

## 功能介绍

本脚本将 GitHub 网站的部分菜单和内容翻译为中文，提升中文用户的使用体验。支持多个 GitHub 相关站点，自动翻译界面文本。

## 适用网站

- GitHub
- GitHub Skills
- Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装脚本后，访问 GitHub 及相关网站。
2. 界面部分菜单和内容会自动显示为中文。
3. 如需调整设置，可通过油猴菜单进行操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让翻译内容显示更美观。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取翻译结果。 |
| `GM_getValue` | 用于读取用户设置，如语言选择等。 |
| `GM_setValue` | 用于保存用户设置，记住偏好。 |
| `GM_registerMenuCommand` | 用于在油猴菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除油猴菜单中的命令。 |
| `GM_notification` | 用于显示桌面通知，提醒用户翻译状态等信息。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-07-06

> 该脚本主要用于 GitHub 页面汉化，核心功能涉及页面文本翻译。存在数据外传风险（翻译请求可能包含页面内容），且 @require 的第三方库未固定版本哈希，存在一定供应链风险。未发现隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。整体安全评分为 67，建议关注数据外传和供应链风险。

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
> 脚本通过 GM_xmlhttpRequest 向 fanyi.iflyrec.com 发送翻译请求，可能包含页面内容（如菜单、描述等文本）。虽然未直接发送敏感数据，但存在数据外传行为。  
> 位置：TRANS_ENGINES.iflyrec 配置及后续翻译请求  
> 建议：限制请求内容仅为非敏感文本，避免发送用户输入或敏感信息。建议增加用户提示并允许用户关闭翻译功能。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的 locals.js 文件来自 raw.githubusercontent.com，虽然为官方仓库，但未固定版本哈希，存在供应链风险。  
> 位置：@require https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals.js?v1.9.4.4-2026-07-01  
> 建议：建议使用固定版本哈希或官方 CDN，避免供应链污染。

**🟡 LOW** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，仅用于翻译请求，未发现滥用。其他权限如 GM_notification、GM_registerMenuCommand 等均有实际用途。  
> 位置：元数据 @grant  
> 建议：无明显权限滥用，建议定期复查。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/main.user.js)*
