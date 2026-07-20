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

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-07-20

> 由于缺少完整代码，无法对核心安全项进行有效检测。元数据显示脚本可能涉及第三方数据交互和高权限申请，存在一定安全风险。建议补充完整代码以便进行详细审查。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 代码缺失  
> 脚本未提供完整代码，仅有元数据，无法检测实际的数据外传、隐私采集、远程代码执行等行为。  
> 位置：N/A  
> 建议：请补充完整代码以便进行全面安全审查。

**🟠 MEDIUM** — 权限滥用  
> @grant 申请了 GM_openInTab 等高权限，但未能确认实际使用情况。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，避免权限滥用。

**🟠 MEDIUM** — 数据外传  
> @connect 指定了多个第三方域名，存在数据外传潜在风险。  
> 位置：元数据 @connect  
> 建议：确保仅向可信域名发送必要数据，避免敏感信息泄露。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://update.greasyfork.org/scripts/421603/Magic%20Userscript%2B%20%3A%20Show%20Site%20All%20UserJS.user.js)*
