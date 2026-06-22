---
title: "东方永页机"
---

# 东方永页机

`自动翻页`  `无限滚动`  `网页增强`  `通用脚本`  `浏览优化`  `智能适配`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Pagetual.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.37.131**　　发现时间：**2026-06-01**　　来源：[GreasyFork](https://greasyfork.org/scripts/438684-pagetual) <Badge type="tip" text="GreasyFork" />　　安装量：**458,961**　　评分：👍625 / 👎2

## 功能介绍

东方永页机是一款终极自动翻页脚本，能自动加载并拼接下一页内容到当前页面底部，实现无限滚动。它智能适配几乎所有网页，无需额外规则配置。适合浏览论坛、新闻、搜索结果等分页内容。

## 适用网站

- 所有网站

## 使用方法

1. 安装脚本后，访问任何分页网页。
2. 向下滚动页面，脚本会自动加载下一页内容。
3. 无需手动点击“下一页”，内容会自动拼接到底部。
4. 如需设置或关闭功能，可在浏览器脚本菜单中操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于在后台请求并加载下一页内容。 |
| `GM_registerMenuCommand` | 允许在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_notification` | 用于弹出通知提醒用户操作或状态。 |
| `GM_getValue` | 用于读取脚本的本地存储数据。 |
| `GM_setValue` | 用于保存脚本的本地设置或数据。 |
| `GM_addStyle` | 用于动态添加自定义样式到网页。 |
| `GM_openInTab` | 用于在新标签页打开链接。 |
| `GM_deleteValue` | 用于删除脚本保存的本地数据。 |
| `GM_info` | 用于获取当前脚本的相关信息。 |
| `GM_setClipboard` | 用于将内容复制到剪贴板。 |
| `GM.xmlHttpRequest` | 同 GM_xmlhttpRequest，后台请求网页数据。 |
| `GM.registerMenuCommand` | 同 GM_registerMenuCommand，添加菜单命令。 |
| `GM.notification` | 同 GM_notification，弹出通知。 |
| `GM.getValue` | 同 GM_getValue，读取本地数据。 |
| `GM.setValue` | 同 GM_setValue，保存本地数据。 |
| `GM.addStyle` | 同 GM_addStyle，添加网页样式。 |
| `GM.openInTab` | 同 GM_openInTab，打开新标签页。 |
| `GM.deleteValue` | 同 GM_deleteValue，删除本地数据。 |
| `GM.info` | 同 GM_info，获取脚本信息。 |
| `GM.setClipboard` | 同 GM_setClipboard，复制内容到剪贴板。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-06-22

> Pagetual 主要功能为自动翻页，通过 GM_xmlhttpRequest 抓取下一页内容并插入当前页面。脚本本身未发现明显的隐私采集、代码混淆、远程代码执行或 DOM XSS 风险。但由于 @connect * 允许任意域名网络请求，存在较高的数据外传风险，且高权限申请和供应链风险需关注。建议限制网络请求目标、精简权限申请，并定期审查依赖来源。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：wedata.net, githubusercontent.com, ghproxy.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 @connect * 允许向任意域名发起网络请求，且实际代码中使用 GM_xmlhttpRequest 进行页面内容抓取（自动翻页功能），存在数据外传的可能性。  
> 位置：元数据 @connect, 代码中 GM_xmlhttpRequest 调用  
> 建议：限制 @connect 域名范围，避免向不受信任的第三方服务器发送请求。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了大量高权限（如 GM_openInTab、GM_setClipboard、GM_notification），但部分权限在代码中未必全部使用，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

**🟠 MEDIUM** — 供应链风险  
> 脚本允许加载 wedata.net、githubusercontent.com、ghproxy.com、ghp.ci、hoothin.github.io 等第三方内容，存在一定供应链风险，尤其是未固定版本哈希。  
> 位置：元数据 @connect  
> 建议：仅允许可信的第三方域名，并固定依赖版本。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/438684-pagetual)*
