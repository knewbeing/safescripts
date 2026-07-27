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

**风险等级**：🟡 LOW　　**安全评分**：97/100　　**分析时间**：2026-07-27

> 脚本仅与 greasyfork.org 和 sleazyfork.org 通信，未发现敏感数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等严重安全问题。权限申请合理，未滥用敏感 API。整体安全风险极低，建议移除未使用的权限以进一步提升安全性。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：greasyfork.org, sleazyfork.org） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 发起网络请求，目标仅限 greasyfork.org 和 sleazyfork.org，未发现向第三方服务器发送用户数据或页面内容。  
> 位置：GM_xmlhttpRequest 调用  
> 建议：保持 @connect 域名限制，避免添加第三方域名。

**🔴 HIGH** — 隐私采集  
> 脚本读取和写入 localStorage 作为存储方案之一，但未发现敏感数据采集（如 cookie、表单、剪贴板、键盘输入等）。  
> 位置：storage.getItem/setItem  
> 建议：避免存储敏感信息，定期审查存储内容。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等动态代码执行方式，也未通过 innerHTML/outerHTML 插入外部脚本。  
> 位置：全局代码审查  
> 建议：继续避免动态代码执行。

**🔴 HIGH** — 代码混淆  
> 脚本未发现代码混淆、base64 解码、字符串映射或高度压缩单行代码。  
> 位置：全局代码审查  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 DOM XSS 风险。  
> 位置：innerHTML 用法  
> 建议：如需插入用户输入，务必转义。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了多项 GM_* 权限，但实际只用到 GM_xmlhttpRequest、GM_setValue、GM_getValue、GM_registerMenuCommand、GM_notification，未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：移除未使用的高权限申请，最小化权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification），仅使用 GM_notification。  
> 位置：GM_notification  
> 建议：避免调用敏感 API，尤其是可泄露隐私的接口。

**🟠 MEDIUM** — 供应链风险  
> @require 未使用，未发现供应链风险。所有网络请求和资源加载均指向官方域名。  
> 位置：元数据 @require  
> 建议：如需加载第三方库，务必固定版本哈希并使用可信 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局代码审查  
> 建议：避免 iframe 滥用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/23840-greasyfork-search-with-sleazyfork-results-include)*
