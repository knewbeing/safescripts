---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`界面翻译`  `GitHub增强`  `中文化`  `开发者工具`  `自动翻译`  `多站点支持`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.4-2026-05-21**　　最后更新：**2026-05-25**

## 功能介绍

本脚本将 GitHub 及其相关网站界面部分菜单和内容翻译为中文，提升中文用户的使用体验。支持多站点，自动翻译页面元素，部分内容可调用在线翻译服务。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装 Tampermonkey 插件并添加本脚本。
2. 打开 GitHub 或相关网站，页面会自动显示中文菜单和内容。
3. 如需切换翻译引擎或手动操作，可在浏览器脚本菜单中找到相关选项。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让翻译内容更美观。 |
| `GM_xmlhttpRequest` | 用于调用在线翻译接口，实现自动翻译功能。 |
| `GM_getValue` | 用于保存用户设置，如语言偏好等。 |
| `GM_setValue` | 用于存储用户设置，如翻译引擎选择等。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义操作按钮，方便用户手动操作。 |
| `GM_unregisterMenuCommand` | 用于移除脚本菜单中的自定义操作按钮。 |
| `GM_notification` | 用于弹出通知，提醒用户翻译结果或操作提示。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：52/100　　**分析时间**：2026-05-25

> 该脚本主要用于 GitHub 页面汉化，未检测到隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用等高风险行为。唯一的 CRITICAL 风险为通过 GM_xmlhttpRequest 向第三方翻译接口发送页面内容，存在数据外传风险。供应链风险为 MEDIUM，因 @require 未固定版本哈希。总体安全评分为 52，建议关注数据外传内容及供应链固定版本。

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
> 脚本通过 GM_xmlhttpRequest 向 fanyi.iflyrec.com 发送翻译请求，可能包含页面内容（如菜单、描述等文本）。  
> 位置：函数 transDesc、transBySelector、翻译相关逻辑  
> 建议：确保发送内容仅为非敏感页面文本，不包含用户隐私或敏感数据。建议在请求前过滤敏感信息。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的 locals.js 文件来自 raw.githubusercontent.com，属于可信官方仓库，但未固定版本哈希，仅通过 query 参数标识版本。  
> 位置：@require https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals.js?v1.9.4-2026-05-21  
> 建议：建议使用固定 commit hash 或 release 版本，避免供应链污染风险。

**🟡 LOW** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，并实际用于翻译接口调用，权限使用合理。  
> 位置：元数据 @grant  
> 建议：无风险，权限申请与实际用途一致。

**🟡 LOW** — 远程代码执行  
> 脚本未检测到 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险。  
> 位置：主脚本代码  
> 建议：保持当前安全实践，避免动态执行字符串代码。

**🟡 LOW** — 隐私采集  
> 脚本未检测到 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板读取等隐私采集行为。  
> 位置：主脚本代码  
> 建议：保持当前安全实践，避免采集用户隐私数据。

**🟡 LOW** — 代码混淆  
> 未检测到代码混淆、base64 解码、字符串数组映射、unicode 混淆等特征。  
> 位置：主脚本代码  
> 建议：保持代码可读性，避免混淆。

**🟡 LOW** — DOM XSS / 注入  
> 未检测到 DOM XSS 风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：主脚本代码  
> 建议：保持当前安全实践，避免 XSS 注入。

**🟡 LOW** — 敏感 API 调用  
> 未检测到敏感 API 调用（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：主脚本代码  
> 建议：保持当前安全实践，避免调用敏感 API。

**🟡 LOW** — 数据外传  
> 未检测到 WebSocket、EventSource、navigator.sendBeacon 等网络请求。  
> 位置：主脚本代码  
> 建议：保持当前安全实践，避免使用实时数据外传通道。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未检测到 ClickJacking 或 iframe 风险，未修改 frame 保护策略或创建隐藏 iframe。  
> 位置：主脚本代码  
> 建议：保持当前安全实践，避免 iframe 滥用。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/main.user.js)*
