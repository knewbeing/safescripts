---
title: "Magic Userscript+ ：显示站点所有 UserJS"
---

# Magic Userscript+ ：显示站点所有 UserJS

`用户脚本管理`  `脚本推荐`  `网页增强`  `自动发现`  `效率工具`  `浏览器插件`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/Magic_20Userscript_2B_20_3A_20Show_20Site_20All_20UserJS.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**7.6.8**　　最后更新：**2026-04-20**

## 功能介绍

本脚本可自动为你当前访问的网页查找并展示可用的用户脚本，帮助你快速发现适用于该网站的增强脚本。无需手动搜索，即可一键获取推荐的脚本资源。适合想要提升网页体验的用户使用。

## 适用网站

- 所有HTTPS网站

## 使用方法

1. 1. 安装脚本后，访问任意HTTPS网站。
2. 2. 页面上会自动显示可用的用户脚本推荐列表。
3. 3. 点击推荐脚本即可查看详情或安装。
4. 4. 可通过菜单命令手动刷新或设置脚本选项。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addElement` | 允许脚本向页面中添加新的元素（如按钮、面板等）。 |
| `GM_info` | 获取当前脚本的相关信息，如版本号和作者。 |
| `GM_getValue` | 从本地存储中读取脚本保存的数据。 |
| `GM_openInTab` | 在新标签页中打开链接，方便访问脚本详情页。 |
| `GM_setValue` | 将数据保存到本地存储，用于记住设置或状态。 |
| `GM_registerMenuCommand` | 在用户脚本管理器菜单中添加自定义命令，便于手动操作。 |
| `GM_xmlhttpRequest` | 允许脚本跨域发送网络请求，获取脚本资源信息。 |
| `GM.addElement` | 与 GM_addElement 类似，向页面添加元素。 |
| `GM.info` | 与 GM_info 类似，获取脚本信息。 |
| `GM.getValue` | 与 GM_getValue 类似，读取本地存储数据。 |
| `GM.openInTab` | 与 GM_openInTab 类似，在新标签页打开链接。 |
| `GM.setValue` | 与 GM_setValue 类似，保存数据到本地。 |
| `GM.registerMenuCommand` | 与 GM_registerMenuCommand 类似，添加菜单命令。 |
| `GM.xmlHttpRequest` | 与 GM_xmlhttpRequest 类似，跨域请求网络资源。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-04-20

> 脚本主要功能为查询当前页面可用的用户脚本，通过 GM_xmlhttpRequest 向公开用户脚本平台发起请求，未检测到隐私采集、远程代码执行、混淆、DOM XSS、敏感 API 调用、供应链风险等高危行为。唯一的 CRITICAL 风险为数据外传，但仅限于当前页面 URL，未携带敏感信息。整体安全性较高，建议关注未来版本权限申请与数据传输内容。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：greasyfork.org, sleazyfork.org, github.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 greasyfork.org、sleazyfork.org、github.com、githubusercontent.com、openuserjs.org 发起网络请求，查询当前页面可用的用户脚本。请求目标均为公开用户脚本平台，无携带敏感用户数据，仅包含当前页面 URL。  
> 位置：多处 GM_xmlhttpRequest 调用  
> 建议：确保请求内容仅包含必要信息（如当前页面 URL），避免携带 cookie、敏感数据。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab 权限，但实际代码中仅用于打开用户脚本详情页，无滥用行为。  
> 位置：@grant GM_openInTab  
> 建议：建议仅申请实际需要的权限，避免权限滥用。

**🟡 LOW** — 权限申请  
> 脚本申请了 GM_getValue、GM_setValue、GM_info 等权限，用于本地存储和脚本信息，无敏感操作。  
> 位置：@grant GM_getValue, GM_setValue, GM_info  
> 建议：无风险，合理使用。

**🟡 LOW** — 远程代码执行  
> 未检测到 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险。  
> 位置：全局代码  
> 建议：保持当前安全实践。

**🟡 LOW** — 代码混淆  
> 未检测到代码混淆、字符串数组映射、base64 解码、unicode 混淆等混淆特征。  
> 位置：全局代码  
> 建议：保持代码可读性。

**🟡 LOW** — DOM XSS  
> 未检测到 DOM XSS、用户输入直接插入 innerHTML/outerHTML、document.write 注入等风险。  
> 位置：全局代码  
> 建议：保持当前安全实践。

**🟡 LOW** — 敏感 API 调用  
> 未检测到敏感 API 调用（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：全局代码  
> 建议：保持当前安全实践。

**🟡 LOW** — 供应链风险  
> 未检测到供应链风险，未通过 @require 加载第三方库。  
> 位置：元数据与代码  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking/iframe 风险  
> 未检测到 iframe 风险、frame 保护策略修改、隐藏 iframe 数据提取等行为。  
> 位置：全局代码  
> 建议：保持当前安全实践。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://update.greasyfork.org/scripts/421603/Magic%20Userscript%2B%20%3A%20Show%20Site%20All%20UserJS.user.js)*
