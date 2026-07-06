---
title: "GOG增强工具"
---

# GOG增强工具

`游戏库管理`  `数据导出`  `页面增强`  `GOG`  `视图优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/GOG_com_enhancement_tools.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.0.1**　　发现时间：**2026-06-22**　　来源：[mmarcincin/userscripts](https://github.com/mmarcincin/userscripts) <Badge type="tip" text="GitHub" />

## 功能介绍

此脚本为GOG.com账户页面提供增强功能，包括根据排序导出游戏库列表，以及切换紧凑视图，方便用户管理和备份自己的游戏库。

## 适用网站

- GOG游戏平台

## 使用方法

1. 安装脚本后，访问GOG.com的账户页面。
2. 页面会新增一个“Create gamelist”按钮和文本框。
3. 点击按钮即可生成当前排序下的游戏列表，并显示在文本框中。
4. 可复制文本框内容进行备份或分享。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本无需特殊权限，仅操作页面内容。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-06

> 该脚本未检测到任何安全风险：无数据外传、无隐私采集、无远程代码执行、无代码混淆、无 DOM XSS、无权限滥用、无敏感 API 调用、无供应链风险、无 iframe 风险。代码结构清晰，权限申请合理，安全评分为 100。适合公开使用。

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
> 建议：保持无外部数据传输，确保用户数据安全。

**⛔ CRITICAL** — Privacy Collection  
> 脚本未访问 document.cookie、localStorage、sessionStorage、IndexedDB，也未监听键盘输入或读取表单字段，未采集隐私数据。  
> 位置：全局  
> 建议：继续避免隐私数据采集。

**🔴 HIGH** — Remote Code Execution  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)，也未通过 innerHTML/outerHTML 插入外部脚本或动态加载远程 JS。  
> 位置：全局  
> 建议：保持无远程代码执行风险。

**🔴 HIGH** — Code Obfuscation  
> 脚本未检测到代码混淆（无 base64 解码、字符串数组映射、unicode 混淆、高度压缩单行代码）。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审查。

**🔴 HIGH** — DOM XSS/Injection  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未检测到 DOM XSS 风险。  
> 位置：全局  
> 建议：继续避免直接插入不可信内容。

**🟠 MEDIUM** — Permission Abuse  
> 脚本未申请任何 @grant 权限（@grant none），不存在权限滥用风险。  
> 位置：元数据  
> 建议：仅申请必要权限，避免权限滥用。

**🟠 MEDIUM** — Sensitive API Usage  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：全局  
> 建议：继续避免敏感 API 调用。

**🟠 MEDIUM** — Supply Chain Risk  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe Risk  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：继续避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/mmarcincin/userscripts/c70bfec8a55f6a48f24c169d0dcd3ffec120835d/GOG.com%20enhancement%20tools.user.js)*
