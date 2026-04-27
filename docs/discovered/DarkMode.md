---
title: "护眼模式"
---

# 护眼模式

`护眼`  `暗黑模式`  `夜间模式`  `网页美化`  `全网通用`  `视觉保护`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/DarkMode.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.8**　　发现时间：**2026-04-27**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本可为所有网站自动切换为护眼模式（暗黑/夜间模式），减少屏幕蓝光，保护视力。适用于浏览网页时需要深色背景的用户。

## 适用网站

- 全网（所有网站）
- 不适用于B站直播

## 使用方法

1. 安装脚本后，网页会自动切换为护眼模式。
2. 如需关闭或调整护眼模式，可通过浏览器的脚本菜单进行操作。
3. 脚本设置会自动保存，无需手动配置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加脚本的功能入口。 |
| `GM_unregisterMenuCommand` | 用于移除脚本菜单中的功能入口。 |
| `GM_openInTab` | 用于在新标签页打开链接。 |
| `GM_getValue` | 用于保存脚本设置，如护眼模式开关状态。 |
| `GM_setValue` | 用于更改和存储脚本设置。 |
| `GM_notification` | 用于弹出通知提醒用户操作结果。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-04-27

> 该脚本仅用于页面暗色模式切换，未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险或 iframe 风险。权限申请合理，整体安全性极高。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、sendBeacon），不存在数据外传行为。  
> 位置：全局  
> 建议：保持现有状态，确保未来版本不引入外传代码。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到任何隐私采集行为（如读取 cookie、localStorage、sessionStorage、IndexedDB、监听键盘输入、读取表单字段、访问指纹 API、读取剪贴板）。  
> 位置：全局  
> 建议：保持现有状态，确保未来版本不引入隐私采集代码。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML/outerHTML 插入外部脚本、@require 或动态 script 标签加载远程 JS、document.write 插入脚本内容。  
> 位置：全局  
> 建议：保持现有状态，避免引入远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到任何代码混淆行为（如 base64 解码执行、字符串数组+索引映射、unicode 混淆、高度压缩单行代码）。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 或注入风险（未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未使用 document.write 插入不可信内容，未操作 iframe src 为 javascript: 协议）。  
> 位置：全局  
> 建议：保持现有状态，确保未来版本不引入 DOM XSS 风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_notification 等权限，但实际用途仅为菜单跳转和通知，未检测到滥用行为。权限申请与实际使用基本匹配。  
> 位置：元数据 @grant  
> 建议：定期审查权限申请，移除未使用的高权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API 除 GM_notification）。  
> 位置：全局  
> 建议：保持现有状态，避免引入敏感 API 调用。

**🟠 MEDIUM** — 供应链风险  
> 脚本未使用 @require 加载第三方库，无供应链风险。  
> 位置：元数据 @require  
> 建议：如需引入第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：保持现有状态，避免引入 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/34a53d6207ac534d42d443d9b951eeaa920c3cef/DarkMode.user.js)*
