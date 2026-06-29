---
title: "东方永页机"
---

# 东方永页机

`自动翻页`  `无限滚动`  `网页增强`  `通用脚本`  `效率提升`  `内容阅读`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Pagetual.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.37.132**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/438684-pagetual) <Badge type="tip" text="GreasyFork" />　　安装量：**460,166**　　评分：👍626 / 👎2

## 功能介绍

本脚本可自动检测网页的分页内容，自动加载并拼接下一页到当前页面底部，实现无限滚动。无需手动翻页，适配绝大多数网站，无需额外设置。

## 适用网站

- 所有网站

## 使用方法

1. 安装脚本后，访问任何支持分页的网页。
2. 向下滚动页面，脚本会自动加载下一页内容。
3. 无需手动点击“下一页”，内容会自动拼接到底部。
4. 如需设置或关闭功能，可在油猴菜单中操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于跨域请求下一页内容，实现自动翻页。 |
| `GM_registerMenuCommand` | 在用户脚本菜单中添加自定义命令，方便操作脚本功能。 |
| `GM_notification` | 弹出通知提醒用户脚本状态或操作结果。 |
| `GM_getValue` | 读取脚本存储的数据，如用户设置。 |
| `GM_setValue` | 保存脚本数据或用户设置。 |
| `GM_addStyle` | 为网页添加自定义样式，优化拼接效果。 |
| `GM_openInTab` | 在新标签页打开链接，辅助脚本功能。 |
| `GM_deleteValue` | 删除脚本存储的数据，清理设置。 |
| `GM_info` | 获取当前脚本信息，便于调试和显示。 |
| `GM_setClipboard` | 将内容复制到剪贴板，方便用户操作。 |
| `GM.xmlHttpRequest` | 同 GM_xmlhttpRequest，部分环境兼容写法。 |
| `GM.registerMenuCommand` | 同 GM_registerMenuCommand，部分环境兼容写法。 |
| `GM.notification` | 同 GM_notification，部分环境兼容写法。 |
| `GM.getValue` | 同 GM_getValue，部分环境兼容写法。 |
| `GM.setValue` | 同 GM_setValue，部分环境兼容写法。 |
| `GM.addStyle` | 同 GM_addStyle，部分环境兼容写法。 |
| `GM.openInTab` | 同 GM_openInTab，部分环境兼容写法。 |
| `GM.deleteValue` | 同 GM_deleteValue，部分环境兼容写法。 |
| `GM.info` | 同 GM_info，部分环境兼容写法。 |
| `GM.setClipboard` | 同 GM_setClipboard，部分环境兼容写法。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：49/100　　**分析时间**：2026-06-29

> Pagetual 脚本实现自动翻页功能，涉及跨域网络请求和动态插入外部页面内容。存在数据外传、DOM XSS、权限滥用和供应链风险等安全隐患。建议限制网络请求目标、净化插入内容、精简权限申请，并加强对第三方依赖的管理。

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
> 脚本通过 @connect * 允许任意域名的网络请求，且实际代码中使用 GM_xmlhttpRequest 进行跨域请求，可能导致数据外传风险。  
> 位置：元数据 @connect, 代码中 GM_xmlhttpRequest 调用  
> 建议：限制 @connect 域名范围，避免向不受信任的第三方服务器发送请求。

**🔴 HIGH** — DOM XSS  
> 脚本会将外部页面内容通过 innerHTML/outerHTML 方式插入当前页面，存在 DOM XSS 风险，尤其是在未对内容进行严格过滤/转义时。  
> 位置：主逻辑（自动翻页内容插入）  
> 建议：插入 HTML 前应进行内容净化，避免执行潜在恶意脚本。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了大量高权限（如 GM_openInTab、GM_setClipboard、GM_notification），部分权限在主流程中未实际使用，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，移除未用高权限。

**🟠 MEDIUM** — 供应链风险  
> 脚本允许从多个第三方域名加载数据（如 wedata.net、ghproxy.com、githubusercontent.com），存在供应链风险，且未固定版本哈希。  
> 位置：元数据 @connect  
> 建议：仅允许可信域名，固定第三方资源版本，避免供应链污染。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/438684-pagetual)*
