---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面翻译`  `GitHub增强`  `中文化`  `开发者工具`  `多站点支持`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.4-2026-06-10**　　最后更新：**2026-06-15**

## 功能介绍

本脚本可以将 GitHub 及其相关网站的部分菜单和内容翻译为中文，提升中文用户的使用体验。支持多站点，自动翻译界面元素。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装 Tampermonkey 插件。
2. 在 Tampermonkey 中添加本脚本。
3. 打开 GitHub 或相关网站，界面会自动显示中文。
4. 如需调整设置，可通过浏览器脚本菜单操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让翻译内容显示更美观。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取翻译结果。 |
| `GM_getValue` | 用于保存用户设置，如语言偏好。 |
| `GM_setValue` | 用于存储用户设置，如语言偏好。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除脚本菜单中的自定义命令。 |
| `GM_notification` | 用于弹出通知，提醒用户脚本相关信息。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-06-15

> 该脚本主要用于 GitHub 页面汉化，核心安全风险为通过 GM_xmlhttpRequest 向第三方翻译服务发送页面文本，存在数据外传风险。未发现隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用等高危行为。@require 的第三方库未固定哈希，存在一定供应链风险。整体安全评分为 67，建议加强数据外传告知与供应链安全。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://fanyi.iflyrec.com/TJHZTranslationService/v2/textAutoTranslation） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 fanyi.iflyrec.com 发送翻译请求，内容包括页面文本（如简介、菜单等）。  
> 位置：翻译引擎配置与调用 GM_xmlhttpRequest  
> 建议：明确告知用户数据会被发送至第三方翻译服务，避免发送敏感信息。

**⛔ CRITICAL** — 隐私采集  
> 脚本未发现 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板读取、键盘监听等隐私采集行为。  
> 位置：主代码逻辑  
> 建议：继续保持对用户隐私的保护。

**⛔ CRITICAL** — 数据外传  
> 未发现 WebSocket、EventSource、navigator.sendBeacon 等实时数据外传行为。  
> 位置：主代码逻辑  
> 建议：继续避免实时数据外传。

**🔴 HIGH** — 远程代码执行  
> 脚本未发现 eval、new Function、字符串 setTimeout/setInterval、动态 script 标签等远程代码执行风险。  
> 位置：主代码逻辑  
> 建议：保持代码安全，避免动态执行外部代码。

**🔴 HIGH** — 代码混淆  
> 未发现代码混淆、base64 解码、字符串数组映射、unicode 混淆等特征。  
> 位置：主代码逻辑  
> 建议：保持代码可读性。

**🔴 HIGH** — DOM XSS / 注入  
> 未发现 DOM XSS 风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：主代码逻辑  
> 建议：继续避免 XSS 注入风险。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的 locals.js 来自 raw.githubusercontent.com，属于可信官方仓库，但未固定版本哈希，仅通过 query 参数标识版本。  
> 位置：@require https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals.js?v1.9.4-2026-06-10  
> 建议：建议使用固定版本哈希或官方 CDN，避免供应链污染风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，仅用于翻译接口调用，未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：如无其他用途，建议仅申请必要权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 未发现敏感 API 调用（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：主代码逻辑  
> 建议：避免调用敏感 API，除非必要且告知用户。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未发现修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：主代码逻辑  
> 建议：继续避免 ClickJacking/iframe 风险。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/main.user.js)*
