---
title: "Krunker Cheat v2"
---

# Krunker Cheat v2



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Krunker_Cheat_v2.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.0**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/551530-krunker-cheat-v2) <Badge type="tip" text="GreasyFork" />　　安装量：**1,319**　　评分：👍1 / 👎0

## 功能介绍



## 适用网站

- 通用

## 使用方法

- 请参阅脚本说明

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：81/100　　**分析时间**：2026-06-15

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用等高危行为。主要风险为 unsafeWindow 权限滥用和 @require 未固定版本哈希的供应链风险。整体安全评分为 81，风险等级为 MEDIUM。建议移除不必要的高权限申请，并固定依赖库版本哈希。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何网络请求（GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、sendBeacon），不存在数据外传行为。  
> 位置：全局代码审查  
> 建议：保持无数据外传，避免后续版本引入相关风险。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到任何隐私采集行为（未读取 cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段、键盘输入等）。  
> 位置：全局代码审查  
> 建议：保持无隐私采集，避免后续版本引入相关风险。

**🔴 HIGH** — 远程代码执行  
> 未检测到 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML/outerHTML 执行 JS、document.write 插入脚本等远程代码执行风险。  
> 位置：全局代码审查  
> 建议：保持无远程代码执行风险，避免后续版本引入相关风险。

**🔴 HIGH** — 代码混淆  
> 未检测到代码混淆（无 base64 解码、字符串数组映射、unicode 混淆、高度压缩单行代码等）。  
> 位置：全局代码审查  
> 建议：保持代码可读性，避免混淆。

**🟠 MEDIUM** — 权限滥用  
> 申请了 unsafeWindow 权限，允许脚本访问和修改页面的全局对象，可能被滥用或引发安全风险。  
> 位置：UserScript 元数据 @grant unsafeWindow  
> 建议：仅在确实需要时申请 unsafeWindow，避免滥用。建议移除或限制使用。

**🟠 MEDIUM** — 供应链风险  
> 通过 @require 加载了第三方库 three.js，虽然来源为 unpkg 官方 CDN，但未固定版本哈希，存在供应链污染风险。  
> 位置：UserScript 元数据 @require https://unpkg.com/three@0.150.0/build/three.min.js  
> 建议：建议使用固定版本哈希或官方 CDN，并定期审查依赖库安全。

**🟠 MEDIUM** — 敏感 API 调用  
> 未检测到敏感 API 调用（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局代码审查  
> 建议：保持无敏感 API 调用，避免后续版本引入相关风险。

**🟡 LOW** — DOM XSS 风险  
> 脚本通过 innerHTML 插入自定义 GUI 元素，但内容为静态字符串，未直接插入用户输入或 URL 参数，XSS 风险较低。  
> 位置：el.innerHTML = `<style>...</style>`  
> 建议：确保所有插入 innerHTML 的内容均为可信静态字符串，避免插入动态或用户输入内容。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未检测到 ClickJacking 或 iframe 风险（未修改 frame 保护策略，未创建隐藏 iframe）。  
> 位置：全局代码审查  
> 建议：保持无 iframe 风险，避免后续版本引入相关风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/551530-krunker-cheat-v2)*
