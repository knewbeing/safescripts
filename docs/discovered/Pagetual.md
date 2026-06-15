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

**风险等级**：⛔ CRITICAL　　**安全评分**：34/100　　**分析时间**：2026-06-15

> Pagetual 脚本存在严重安全风险，主要由于申请了广泛的 @connect * 权限和 GM_xmlhttpRequest，理论上可向任意域名发送数据，存在数据外传风险。虽然当前代码未检测到隐私采集、远程代码执行、混淆、DOM XSS、敏感 API 调用等高风险行为，但权限申请过多且未实际使用，存在权限滥用风险。建议严格限制 @connect 域名范围，移除未使用的高权限申请，并持续关注后续代码更新。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：wedata.net, githubusercontent.com, ghproxy.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> 脚本申请了广泛的 @connect 权限，包括 *，允许向任意域名发起网络请求，存在数据外传风险。  
> 位置：元数据 @connect  
> 建议：限制 @connect 域名范围，仅允许必要的可信域名。

**⛔ CRITICAL** — Data Transmission  
> 脚本申请了 GM_xmlhttpRequest 和 GM.xmlHttpRequest 权限，并在代码中用于自动翻页功能，可能会向第三方网站请求页面内容。虽然主要用于目标网站分页，但由于 @connect * 存在，理论上可外传任意数据。  
> 位置：元数据 @grant, 代码自动翻页逻辑  
> 建议：移除 @connect *，并审查所有网络请求目的地和数据内容。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 GM_openInTab 权限，但代码中未发现实际使用，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：移除未使用的高权限申请。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 GM_setClipboard 权限，但代码中未发现实际使用，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：移除未使用的高权限申请。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 GM_notification 权限，但代码中未发现实际使用，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：移除未使用的高权限申请。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 GM_addStyle 权限，但代码中未发现实际使用，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：移除未使用的高权限申请。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 GM_info 权限，但代码中未发现实际使用，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：移除未使用的高权限申请。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 GM_getValue/GM_setValue/GM_deleteValue 权限，但代码中未发现实际使用，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：移除未使用的高权限申请。

**🟡 LOW** — Obfuscation  
> 脚本未使用混淆或压缩代码，代码结构清晰。  
> 位置：完整代码  
> 建议：无

**🟡 LOW** — DOM XSS  
> 脚本未检测到 DOM XSS 风险，未直接插入用户输入到 innerHTML/outerHTML。  
> 位置：完整代码  
> 建议：无

**🟡 LOW** — Privacy Collection  
> 脚本未检测到隐私采集行为，如读取 cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段或监听键盘输入。  
> 位置：完整代码  
> 建议：无

**🟡 LOW** — Remote Code Execution  
> 脚本未检测到远程代码执行风险，如 eval/new Function/setTimeout(string)/setInterval(string) 或动态加载外部 JS。  
> 位置：完整代码  
> 建议：无

**🟡 LOW** — WebSocket Usage  
> 脚本未检测到 WebSocket/EventSource(SSE) 使用。  
> 位置：完整代码  
> 建议：无

**🟡 LOW** — Sensitive API  
> 脚本未检测到敏感 API 调用，如 geolocation、RTCPeerConnection、MediaDevices、Notification、Clipboard。  
> 位置：完整代码  
> 建议：无

**🟡 LOW** — Supply Chain  
> 脚本未检测到供应链风险，未通过 @require 加载第三方库。  
> 位置：元数据  
> 建议：无

**🟡 LOW** — ClickJacking  
> 脚本未检测到 ClickJacking 或 iframe 风险，未修改 frame 保护策略或创建隐藏 iframe。  
> 位置：完整代码  
> 建议：无

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/438684-pagetual)*
