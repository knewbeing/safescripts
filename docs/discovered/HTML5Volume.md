---
title: "HTML5 视频音频默认音量"
---

# HTML5 视频音频默认音量

`音量管理`  `视频优化`  `音频优化`  `网页增强`  `个性化设置`  `自动化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/HTML5Volume.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.5**　　发现时间：**2026-04-27**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本自动将网页中的 HTML5 视频和音频的默认音量调整为较低值，避免因100%音量被吓到。每个网站的音量设置会被单独记忆，方便个性化管理。

## 适用网站

- 所有网站

## 使用方法

1. 安装脚本后，访问任意包含视频或音频的网页。
2. 视频或音频播放时，默认音量会自动调整为较低值。
3. 如需更改默认音量，可通过浏览器菜单按钮进行设置。
4. 每个网站的音量设置会自动保存，无需重复操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加自定义操作按钮，方便用户设置音量。 |
| `GM_unregisterMenuCommand` | 用于移除之前添加的菜单按钮，保持菜单整洁。 |
| `GM_openInTab` | 用于在新标签页打开相关页面或帮助文档。 |
| `GM_getValue` | 用于读取每个网站保存的音量设置，实现记忆功能。 |
| `GM_setValue` | 用于保存用户在每个网站设置的音量值。 |
| `GM_notification` | 用于在调整音量或保存设置时弹出通知提醒用户。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：92/100　　**分析时间**：2026-04-27

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险或 iframe 风险。唯一中等风险为 GM_openInTab 权限申请，但实际用途安全。整体安全性高，适合公开使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> 申请了 GM_openInTab 权限，但仅用于打开反馈页面（github/greasyfork），未被滥用。  
> 位置：GM_openInTab 调用  
> 建议：如无必要可移除 GM_openInTab 权限，但当前用途安全。

**🟡 LOW** — 隐私采集  
> 脚本使用 localStorage 和 GM_getValue/GM_setValue 存储音量设置，但未采集敏感隐私数据。  
> 位置：localStorage/GM_getValue/GM_setValue  
> 建议：确保仅存储必要的非敏感数据。

**🟡 LOW** — 远程代码执行  
> 脚本未使用 eval、Function、动态 script 标签等远程代码执行风险操作。  
> 位置：全局代码审查  
> 建议：保持当前安全实践。

**🟡 LOW** — 数据外传  
> 未检测到任何网络请求（GM_xmlhttpRequest、fetch、WebSocket、sendBeacon、EventSource）。  
> 位置：全局代码审查  
> 建议：保持当前安全实践。

**🟡 LOW** — 代码混淆  
> 未检测到代码混淆、压缩或 base64/unicode 混淆特征。  
> 位置：全局代码审查  
> 建议：保持代码可读性。

**🟡 LOW** — DOM XSS  
> 未检测到 DOM XSS 或注入风险，未直接插入用户输入到 innerHTML/outerHTML。  
> 位置：全局代码审查  
> 建议：保持当前安全实践。

**🟡 LOW** — 敏感 API  
> 未检测到敏感 API 调用（地理位置、摄像头、剪贴板等）。  
> 位置：全局代码审查  
> 建议：保持当前安全实践。

**🟡 LOW** — 供应链风险  
> 未检测到供应链风险，未使用 @require 加载第三方库。  
> 位置：元数据  
> 建议：保持当前安全实践。

**🟡 LOW** — ClickJacking/iframe  
> 未检测到 ClickJacking 或 iframe 风险。  
> 位置：全局代码审查  
> 建议：保持当前安全实践。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/34a53d6207ac534d42d443d9b951eeaa920c3cef/HTML5Volume.user.js)*
