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

**风险等级**：🔴 HIGH　　**安全评分**：52/100　　**分析时间**：2026-07-13

> Pagetual 主要功能为自动翻页，自动抓取下一页内容并插入当前页面。脚本通过 GM_xmlhttpRequest 访问外部页面，@connect * 允许向任意域名发起请求，存在数据外传和供应链风险。未发现明显隐私采集或代码混淆行为，但高权限申请和外部内容插入带来一定安全隐患。建议限制 @connect 范围、最小化权限申请，并对插入内容进行严格过滤。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：wedata.net, githubusercontent.com, ghproxy.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 @connect * 允许向任意域名发起网络请求，且实际代码中存在 GM_xmlhttpRequest 用于自动翻页抓取下一页内容。虽然主要用于功能实现，但理论上可外传数据。  
> 位置：元数据与主逻辑  
> 建议：限制 @connect 范围，避免向不受信任的第三方域名发送敏感数据。

**🔴 HIGH** — DOM XSS/注入  
> 脚本通过 GM_xmlhttpRequest/GM.xmlHttpRequest 抓取外部页面内容并插入当前页面，若目标页面内容包含恶意脚本，可能导致 XSS 风险。  
> 位置：主逻辑  
> 建议：插入外部内容前应进行严格的内容过滤和转义，避免执行恶意脚本。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了大量 GM_* 权限，包括 GM_openInTab、GM_setClipboard、GM_notification 等高权限，但部分权限在代码中未必全部使用，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的最小权限，移除未使用的高权限。

**🟠 MEDIUM** — 供应链风险  
> @require 未见使用，但如后续引入第三方库应锁定版本并使用可信 CDN。  
> 位置：元数据  
> 建议：如需引入第三方库，务必锁定版本并使用官方 CDN。

**🟡 LOW** — 代码混淆  
> 脚本未见明显混淆，但代码片段不完整，需完整代码进一步确认。  
> 位置：主逻辑  
> 建议：保持代码开源透明，避免混淆。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/438684-pagetual)*
