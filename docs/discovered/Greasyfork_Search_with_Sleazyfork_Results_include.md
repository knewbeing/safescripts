---
title: "大人的Greasyfork"
---

# 大人的Greasyfork

`脚本搜索`  `成人内容`  `Greasyfork`  `Sleazyfork`  `增强功能`  `自动跳转`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Greasyfork_Search_with_Sleazyfork_Results_include.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.6.6**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/23840-greasyfork-search-with-sleazyfork-results-include) <Badge type="tip" text="GreasyFork" />　　安装量：**906,988**　　评分：👍2749 / 👎2

## 功能介绍

在Greasyfork搜索时，自动显示Sleazyfork上的成人脚本结果，并为所有脚本增加评分和版本号。如果遇到匿名不可访问的脚本，会自动跳转到Sleazyfork对应页面。

## 适用网站

- Greasyfork
- Sleazyfork

## 使用方法

1. 安装脚本后，访问Greasyfork或Sleazyfork网站。
2. 在Greasyfork搜索脚本时，会自动显示Sleazyfork的相关成人脚本。
3. 脚本列表会显示评分和版本号。
4. 访问匿名不可用脚本时，会自动跳转到Sleazyfork页面。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本跨域请求数据，用于获取搜索结果和脚本信息。 |
| `GM_setValue` | 保存脚本设置或数据到本地。 |
| `GM_getValue` | 读取本地保存的脚本设置或数据。 |
| `GM_registerMenuCommand` | 在浏览器菜单中添加脚本相关操作按钮。 |
| `GM_notification` | 在浏览器中弹出通知消息。 |
| `GM.xmlHttpRequest` | 允许脚本跨域请求数据，用于获取搜索结果和脚本信息。 |
| `GM.setValue` | 保存脚本设置或数据到本地。 |
| `GM.getValue` | 读取本地保存的脚本设置或数据。 |
| `GM.registerMenuCommand` | 在浏览器菜单中添加脚本相关操作按钮。 |
| `GM.notification` | 在浏览器中弹出通知消息。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：64/100　　**分析时间**：2026-07-13

> 该脚本主要通过 GM_xmlhttpRequest 获取 greasyfork.org 和 sleazyfork.org 的搜索结果并合并显示，未发现向第三方服务器外传用户数据或敏感信息。存在部分权限冗余和 localStorage 访问，整体风险较低。未检测到代码混淆、远程代码执行或高危 DOM XSS。建议精简 @grant 权限，持续关注 HTML 注入风险。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：greasyfork.org, sleazyfork.org） |
| 隐私采集 | ❌ 检测到（localStorage 作为存储后备） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 访问 greasyfork.org 和 sleazyfork.org，获取搜索结果页面的 HTML 内容并插入当前页面。未发现向第三方域名发送用户数据或敏感信息。  
> 位置：_GM_xmlhttpRequest 调用  
> 建议：仅允许与目标站点通信，避免向不受信任的第三方发送数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本会读取和写入 localStorage 作为存储后备方案，但未发现读取 cookie、sessionStorage、IndexedDB、表单字段、剪贴板或监听键盘输入。  
> 位置：storage.getItem/setItem  
> 建议：如无必要，避免访问 localStorage，尤其是存储敏感信息时。

**🔴 HIGH** — DOM XSS  
> 脚本通过 innerHTML 方式插入由 greasyfork.org/sleazyfork.org 返回的 HTML，但未直接插入用户输入或 URL 参数。由于目标为可信站点，风险较低。  
> 位置：doc.documentElement.innerHTML = result.responseText  
> 建议：如未来插入不可信内容，需进行严格转义。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)、document.write、动态 script 标签等远程代码执行方式。  
> 位置：全局  
> 建议：保持当前实现，避免引入远程代码执行风险。

**🟠 MEDIUM** — 权限滥用  
> @grant 权限申请较多（GM_setValue, GM_getValue, GM_registerMenuCommand, GM_notification），但部分未在代码中实际使用，存在权限冗余。  
> 位置：元数据 @grant  
> 建议：仅申请实际使用的权限，减少潜在攻击面。

**🟠 MEDIUM** — 供应链风险  
> @require 未使用，未发现供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用官方 CDN 并锁定版本哈希。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/23840-greasyfork-search-with-sleazyfork-results-include)*
