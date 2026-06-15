---
title: "Ping.Sx 增强"
---

# Ping.Sx 增强

`网络工具`  `IP管理`  `页面增强`  `快捷操作`  `Ping.Sx专用`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Ping_Sx-Enhanced.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.3**　　发现时间：**2026-06-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为 Ping.Sx 网站提供增强功能，包括一键复制所有 IP 地址、将 IP 链接改为点击复制而不是跳转、以及通过右键点击页面两侧空白处快速回到顶部。

## 适用网站

- Ping.Sx

## 使用方法

1. 安装脚本后，访问 Ping.Sx 网站的 ping、dig 或 check-port 页面。
2. 页面会新增一键复制所有 IP 的按钮。
3. 点击 IP 链接会直接复制 IP，而不是跳转。
4. 右键点击页面两侧空白处可快速回到顶部。
5. 可通过浏览器菜单切换 IP 复制的分隔方式。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setClipboard` | 允许脚本将内容复制到剪贴板，方便一键复制 IP。 |
| `GM_registerMenuCommand` | 允许脚本在浏览器菜单中添加自定义命令，便于切换功能选项。 |
| `GM_unregisterMenuCommand` | 允许脚本移除自定义菜单命令，管理菜单项。 |
| `GM_getValue` | 允许脚本读取本地存储的设置，如分隔方式。 |
| `GM_setValue` | 允许脚本保存设置到本地存储，如分隔方式。 |
| `window.onurlchange` | 允许脚本监听网址变化，确保功能在页面切换时正常。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-06-15

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 滥用行为。所有功能均在本地实现，安全性高。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> 脚本未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource），不存在数据外传风险。  
> 位置：全局  
> 建议：保持当前实现，避免添加任何外部数据传输逻辑。

**⛔ CRITICAL** — Privacy Collection  
> 脚本未读取 cookie、localStorage、sessionStorage、IndexedDB，也未监听键盘输入或读取表单字段、剪贴板内容，未涉及隐私采集。  
> 位置：全局  
> 建议：保持当前实现，避免添加任何隐私采集行为。

**🔴 HIGH** — Remote Code Execution  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)，也未通过 innerHTML/outerHTML 插入外部脚本或动态加载远程 JS。  
> 位置：全局  
> 建议：保持当前实现，避免引入远程代码执行风险。

**🔴 HIGH** — Code Obfuscation  
> 脚本未检测到任何代码混淆、base64 解码、字符串数组映射或高度压缩代码。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS/Injection  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未操作 iframe src，未检测到 DOM XSS 注入风险。  
> 位置：全局  
> 建议：如需插入用户输入，务必进行转义。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请的 @grant 权限与实际使用基本匹配，未申请高权限（如 GM_download、GM_openInTab），window.onurlchange 权限用于监听页面变化，未滥用。  
> 位置：元数据  
> 建议：定期复查权限申请，避免冗余或高权限滥用。

**🟠 MEDIUM** — Sensitive API Usage  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API 读取、Notification API）。仅使用 GM_setClipboard 写入剪贴板。  
> 位置：全局  
> 建议：避免调用敏感 API，确保用户隐私安全。

**🟠 MEDIUM** — Supply Chain Risk  
> 脚本未通过 @require 加载任何第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用官方 CDN 并固定版本哈希。

**🟡 LOW** — ClickJacking/Iframe Risk  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：保持当前实现，避免 iframe 滥用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/d8fcb017ba7108be3b9813667e63b7f28cbf6424/Ping.Sx-Enhanced.user.js)*
