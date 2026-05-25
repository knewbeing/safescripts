---
title: "Ping.Sx 增强"
---

# Ping.Sx 增强

`IP工具`  `批量复制`  `页面增强`  `Ping.Sx`  `效率提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Ping_Sx-Enhanced.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.3**　　发现时间：**2026-05-18**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为 Ping.Sx 网站提供增强功能，包括一键复制所有 IP 地址、点击 IP 链接直接复制而非跳转、以及通过右键点击页面两侧空白处快速返回顶部。让批量操作和页面浏览更加高效便捷。

## 适用网站

- Ping.Sx

## 使用方法

1. 安装脚本后，访问 Ping.Sx 网站的 ping、dig 或 check-port 页面。
2. 点击新增的“一键复制所有 IP”按钮，即可快速复制所有 IP 地址。
3. 点击 IP 链接时，自动复制 IP 而不是跳转。
4. 右键点击页面两侧空白区域，可快速返回页面顶部。
5. 如需切换 IP 复制的分隔方式，可在脚本菜单中设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setClipboard` | 用于将复制的 IP 地址内容写入剪贴板。 |
| `GM_registerMenuCommand` | 在脚本菜单中添加自定义命令，方便切换复制分隔方式。 |
| `GM_unregisterMenuCommand` | 移除已注册的菜单命令，避免重复。 |
| `GM_getValue` | 读取和保存用户设置（如复制分隔符）。 |
| `GM_setValue` | 保存用户自定义设置（如分隔符偏好）。 |
| `window.onurlchange` | 监听网页地址变化，确保功能在页面切换时依然可用。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-05-25

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。所有功能均在本地执行，权限申请合理，代码结构清晰。安全评分为 100，风险等级 SAFE，推荐使用。

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
> 脚本未检测到任何网络请求（GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、sendBeacon），不存在数据外传行为。  
> 位置：全局  
> 建议：保持现有状态，避免添加任何外部数据传输代码。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage、IndexedDB，也未监听键盘输入或读取表单字段、剪贴板内容，未采集任何隐私数据。  
> 位置：全局  
> 建议：保持现有状态，避免添加任何隐私采集代码。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)，也未通过 innerHTML/outerHTML 插入外部脚本或动态加载远程 JS。  
> 位置：全局  
> 建议：保持现有状态，避免引入远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到任何代码混淆、base64 解码、字符串映射或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未检测到 DOM XSS 或注入风险。  
> 位置：全局  
> 建议：如需插入用户数据，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请的 @grant 权限与实际代码使用相符，无高权限滥用或未使用的高权限申请。  
> 位置：元数据  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API 读取、Notification API）。  
> 位置：全局  
> 建议：避免调用敏感 API，除非确有必要且需征得用户同意。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载任何第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，务必使用官方 CDN 并固定版本哈希。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：避免 iframe 滥用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/de4fcb506ced59aa0c6637ab7c52a2594fa050ed/Ping.Sx-Enhanced.user.js)*
