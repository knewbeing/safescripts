---
title: "东方永页机"
---

# 东方永页机

`自动翻页`  `无限滚动`  `网页增强`  `通用脚本`  `效率提升`  `内容浏览`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Pagetual.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.37.131**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/438684-pagetual) <Badge type="tip" text="GreasyFork" />　　安装量：**458,655**　　评分：👍625 / 👎2

## 功能介绍

本脚本可自动检测网页的分页内容，自动加载并拼接下一页到当前页面底部，实现无限滚动浏览。无需手动翻页，适用于绝大多数网站，无需额外配置。

## 适用网站

- 所有网站

## 使用方法

1. 安装脚本后，访问任何分页网页。
2. 向下滚动页面，脚本会自动加载下一页内容。
3. 无需手动点击翻页按钮，内容会连续显示在页面底部。
4. 如需管理脚本功能，可在浏览器扩展菜单中找到相关入口。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于后台请求网页数据，实现自动加载下一页内容。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加脚本功能入口，方便用户操作。 |
| `GM_notification` | 用于弹出通知，提醒用户脚本状态或操作结果。 |
| `GM_getValue` | 用于读取脚本本地存储的数据，如设置或历史记录。 |
| `GM_setValue` | 用于保存脚本设置或数据到本地存储。 |
| `GM_addStyle` | 用于动态添加自定义样式，优化页面显示效果。 |
| `GM_openInTab` | 用于在新标签页打开链接，扩展脚本功能。 |
| `GM_deleteValue` | 用于删除本地存储的数据，管理脚本设置。 |
| `GM_info` | 用于获取脚本自身信息，便于调试或显示。 |
| `GM_setClipboard` | 用于将内容复制到剪贴板，方便用户操作。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：52/100　　**分析时间**：2026-05-25

> Pagetual 脚本主要用于自动翻页，未见明显隐私采集或代码混淆，但申请了广泛的网络请求权限（@connect *），存在数据外传风险。部分高权限（GM_openInTab、GM_setClipboard、GM_notification）未见实际使用，建议收紧权限申请。整体风险较高，建议仅在可信环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：wedata.net, githubusercontent.com, ghproxy.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> 脚本申请了广泛的网络请求权限（@connect *），允许向任意域名发送请求，存在数据外传风险。虽然主要用于自动翻页，但无法保证不会被滥用。  
> 位置：元数据 @connect *  
> 建议：限制 @connect 域名范围，仅允许必要的目标；审查所有网络请求代码，确保不携带敏感数据。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 GM_openInTab 权限，但代码中未见明显使用，属于高权限滥用风险。  
> 位置：元数据 @grant GM_openInTab  
> 建议：移除未使用的高权限申请，或确保使用场景安全。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 GM_setClipboard 权限，但代码中未见明显使用，属于高权限滥用风险。  
> 位置：元数据 @grant GM_setClipboard  
> 建议：移除未使用的高权限申请，或确保使用场景安全。

**🟠 MEDIUM** — Sensitive API Usage  
> 脚本申请了 GM_notification 权限，可能被滥用发送通知。  
> 位置：元数据 @grant GM_notification  
> 建议：仅在用户明确操作时使用通知功能。

**🟠 MEDIUM** — Supply Chain Risk  
> 脚本未见供应链风险（未 @require 第三方库），但网络请求目标包含 githubusercontent.com 等，需关注外部内容安全。  
> 位置：元数据 @connect githubusercontent.com  
> 建议：如需加载第三方库，固定版本哈希并使用官方 CDN。

**🟡 LOW** — Sensitive API Usage  
> 脚本申请了 GM_getValue/GM_setValue/GM_deleteValue 权限，涉及本地存储，但未见敏感数据采集。  
> 位置：元数据 @grant GM_getValue, GM_setValue, GM_deleteValue  
> 建议：确保存储内容不含敏感用户信息。

**🟡 LOW** — Remote Code Execution  
> 脚本未使用 eval/new Function/setTimeout(string)/setInterval(string) 等远程代码执行方式，未见明显混淆。  
> 位置：主代码段  
> 建议：保持代码透明，避免动态执行外部代码。

**🟡 LOW** — DOM XSS  
> 脚本未见 DOM XSS 注入风险，未直接插入用户输入到 innerHTML/outerHTML。  
> 位置：主代码段  
> 建议：继续保持安全的 DOM 操作方式。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/438684-pagetual)*
