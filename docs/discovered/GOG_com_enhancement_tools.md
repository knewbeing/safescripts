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

**风险等级**：🟢 SAFE　　**安全评分**：97/100　　**分析时间**：2026-07-27

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。所有功能均在本地页面操作，未涉及用户敏感数据或网络传输。安全评分为97，属于安全脚本。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟡 LOW** — Clipboard Usage  
> 脚本通过 document.execCommand('copy') 实现复制功能，但未使用 Clipboard API，且未读取剪贴板内容。  
> 位置：copySelectionText() 函数  
> 建议：无需调整，当前实现安全。

**🟡 LOW** — Download Usage  
> 脚本通过 Blob 和 download 链接实现本地文件保存，未涉及网络传输。  
> 位置：saveTextAsFile() 函数  
> 建议：无需调整，当前实现安全。

**🟡 LOW** — Permission Usage  
> 脚本未申请任何 @grant 权限，实际代码也未使用 GM_* API，权限申请与使用一致。  
> 位置：元数据 @grant none  
> 建议：无需调整。

**🟡 LOW** — Remote Code Execution  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等动态代码执行方式。  
> 位置：全局代码审查  
> 建议：无需调整。

**🟡 LOW** — Supply Chain Risk  
> 脚本未加载任何第三方库，无 @require，无供应链风险。  
> 位置：元数据与代码  
> 建议：无需调整。

**🟡 LOW** — Privacy Collection  
> 脚本未监听键盘输入、未读取表单字段、未访问浏览器指纹 API、未读取剪贴板内容。  
> 位置：全局代码审查  
> 建议：无需调整。

**🟡 LOW** — Data Transmission  
> 脚本未检测到任何网络请求（GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、sendBeacon）。  
> 位置：全局代码审查  
> 建议：无需调整。

**🟡 LOW** — Obfuscation  
> 脚本未检测到代码混淆、压缩、base64 解码、字符串映射等混淆特征。  
> 位置：全局代码审查  
> 建议：无需调整。

**🟡 LOW** — DOM XSS  
> 脚本未检测到 DOM XSS 风险，未将用户输入或 URL 参数插入 innerHTML。  
> 位置：全局代码审查  
> 建议：无需调整。

**🟡 LOW** — Sensitive API Usage  
> 脚本未检测到敏感 API 调用（地理位置、摄像头、麦克风、通知等）。  
> 位置：全局代码审查  
> 建议：无需调整。

**🟡 LOW** — ClickJacking / iframe Risk  
> 脚本未检测到 iframe 操作、frame 保护策略修改。  
> 位置：全局代码审查  
> 建议：无需调整。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/mmarcincin/userscripts/c70bfec8a55f6a48f24c169d0dcd3ffec120835d/GOG.com%20enhancement%20tools.user.js)*
