---
title: "东方永页机"
---

# 东方永页机

`自动翻页`  `无限滚动`  `网页增强`  `通用脚本`  `效率工具`  `内容加载`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Pagetual.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.37.132**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/438684-pagetual) <Badge type="tip" text="GreasyFork" />　　安装量：**460,477**　　评分：👍626 / 👎2

## 功能介绍

本脚本可自动检测网页的分页，自动加载并拼接下一页内容到当前页面底部，实现无限滚动浏览。无需额外配置，适用于绝大多数网站。

## 适用网站

- 所有网站

## 使用方法

1. 安装脚本后，访问任何支持分页的网站。
2. 向下滚动页面，脚本会自动加载下一页内容。
3. 无需手动翻页，内容会连续显示在当前页面底部。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于跨域请求网页数据，加载下一页内容。 |
| `GM_registerMenuCommand` | 在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_notification` | 在桌面弹出通知，提示脚本操作结果。 |
| `GM_getValue` | 保存用户设置或状态信息。 |
| `GM_setValue` | 存储用户设置或状态信息。 |
| `GM_addStyle` | 为网页添加自定义样式，优化显示效果。 |
| `GM_openInTab` | 在新标签页打开链接，方便查看内容。 |
| `GM_deleteValue` | 删除已保存的设置或状态信息。 |
| `GM_info` | 获取当前脚本的详细信息。 |
| `GM_setClipboard` | 将内容复制到剪贴板，方便用户操作。 |
| `GM.xmlHttpRequest` | 用于跨域请求网页数据，加载下一页内容（新版API）。 |
| `GM.registerMenuCommand` | 在脚本菜单中添加自定义命令（新版API）。 |
| `GM.notification` | 在桌面弹出通知（新版API）。 |
| `GM.getValue` | 保存用户设置或状态信息（新版API）。 |
| `GM.setValue` | 存储用户设置或状态信息（新版API）。 |
| `GM.addStyle` | 为网页添加自定义样式（新版API）。 |
| `GM.openInTab` | 在新标签页打开链接（新版API）。 |
| `GM.deleteValue` | 删除已保存的设置或状态信息（新版API）。 |
| `GM.info` | 获取当前脚本的详细信息（新版API）。 |
| `GM.setClipboard` | 将内容复制到剪贴板（新版API）。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：49/100　　**分析时间**：2026-07-27

> Pagetual 脚本存在较高安全风险，主要体现在数据外传（允许任意域名通信）、DOM XSS（远程内容插入未消毒）、权限滥用和供应链风险。未检测到隐私采集和代码混淆行为。建议严格限制网络请求目标、消毒插入内容、精简权限申请，并审查所有外部依赖来源。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：wedata.net, githubusercontent.com, ghproxy.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ❌ 存在风险 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 和 @connect * 允许对任意域名发起网络请求，存在数据外传风险。虽然主要用于自动翻页，但理论上可向任意第三方服务器发送数据。  
> 位置：元数据 @grant/@connect 和主逻辑  
> 建议：限制 @connect 域名范围，避免允许任意外部通信。审查所有网络请求代码，确保不携带敏感用户数据。

**🔴 HIGH** — DOM XSS/注入  
> 脚本通过 innerHTML/outerHTML 插入远程页面内容到当前页面，存在 DOM XSS 风险，尤其是目标页面内容未经过消毒。  
> 位置：主逻辑（自动翻页内容插入）  
> 建议：插入前对远程内容进行严格消毒，避免直接插入 HTML。

**🟠 MEDIUM** — 供应链风险  
> 脚本允许向任意域名发起请求，且可访问 wedata.net、githubusercontent.com 等第三方服务，存在供应链风险。  
> 位置：元数据 @connect/@require  
> 建议：仅允许可信 CDN 和固定版本哈希的第三方库，避免供应链污染。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了大量高权限（GM_openInTab、GM_setClipboard、GM_notification 等），部分权限实际未被使用，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/438684-pagetual)*
