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

**风险等级**：🟡 LOW　　**安全评分**：49/100　　**分析时间**：2026-07-06

> 脚本功能明确，仅请求 greasyfork.org 和 sleazyfork.org 合并搜索结果，未发现敏感数据外传、隐私采集、远程代码执行、混淆、XSS、供应链风险等高危行为。主要风险为权限申请过多，建议精简 @grant。整体安全性较高，适合公开使用。

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
> 脚本通过 GM_xmlhttpRequest 请求 greasyfork.org 和 sleazyfork.org，获取页面内容并合并搜索结果。未发现向第三方服务器发送用户数据或页面内容，仅用于功能实现。  
> 位置：GM_xmlhttpRequest 调用  
> 建议：确保仅请求官方域名，避免未来代码变更导致数据外传。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取和写入 localStorage、GM_setValue/GM_getValue，用于存储脚本配置。未发现敏感数据采集（如 cookie、表单、剪贴板、指纹等）。  
> 位置：storage.setItem/getItem  
> 建议：避免存储敏感信息，当前实现安全。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等动态执行代码，也未通过 innerHTML 插入外部脚本。  
> 位置：全局代码审查  
> 建议：保持当前安全实践，避免未来引入远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 脚本未发现代码混淆、base64 解码、字符串数组映射或高度压缩单行代码。  
> 位置：全局代码审查  
> 建议：保持代码可读性，便于安全审查。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 DOM XSS 风险。  
> 位置：全局代码审查  
> 建议：继续避免不可信内容插入 DOM。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_notification、GM_registerMenuCommand 等权限，但实际代码仅使用 GM_xmlhttpRequest、GM_setValue、GM_getValue。存在未使用的高权限申请。  
> 位置：元数据 @grant  
> 建议：移除未使用的权限，减少攻击面。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局代码审查  
> 建议：保持当前安全实践。

**🟠 MEDIUM** — 供应链风险  
> 未使用 @require 加载第三方库，无供应链风险。  
> 位置：元数据 @require  
> 建议：如需引入第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局代码审查  
> 建议：继续避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/23840-greasyfork-search-with-sleazyfork-results-include)*
