---
title: "Github Enhancement - High Speed Download"
---

# Github Enhancement - High Speed Download



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Github_增强_-_高速下载.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.6.37**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/412245-github-enhancement-high-speed-download) <Badge type="tip" text="GreasyFork" />　　安装量：**893,309**　　评分：👍1416 / 👎0

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

**风险等级**：⛔ CRITICAL　　**安全评分**：27/100　　**分析时间**：2026-06-15

> 该脚本通过重定向 Github 文件下载到多个第三方加速节点，存在严重的数据外传和间接隐私泄露风险。未检测到代码混淆、远程代码执行、DOM XSS、敏感 API 调用等高危行为。建议用户仅用于公开仓库和文件下载，避免下载敏感或私有内容。加速节点的供应链风险需关注。整体安全评分为 27，风险等级为 CRITICAL。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：gh.h233.eu.org, rapidgit.jjda.de5.net, gh.ddlc.top） |
| 隐私采集 | ❌ 检测到（未主动采集 cookie、localStorage、sessionStorage、IndexedDB、表单、剪贴板等隐私数据, 下载行为可能间接暴露 Github 访问记录给第三方节点） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过构造下载链接，将 Github 文件请求重定向到第三方加速节点（如 gh.h233.eu.org、gh-proxy.org 等），涉及大量第三方数据传输。  
> 位置：download_url_us 数组及相关下载逻辑  
> 建议：警告用户：下载行为涉及第三方节点，需关注节点安全与隐私政策。建议仅用于公开文件下载，避免敏感数据泄露。

**⛔ CRITICAL** — 隐私采集（间接风险）  
> 未检测到脚本主动采集用户隐私数据（如 cookie、localStorage、表单、剪贴板等），但下载行为可能间接暴露 Github 访问记录给第三方节点。  
> 位置：下载链接重定向逻辑  
> 建议：提醒用户：加速节点可记录访问行为。建议仅用于公开仓库和文件。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等动态代码执行方式。  
> 位置：全局代码审查  
> 建议：保持当前实现，避免引入动态代码执行。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到代码混淆、base64 解码、字符串映射或高度压缩单行代码。  
> 位置：全局代码审查  
> 建议：保持代码可读性，便于社区审查。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 风险（未直接将用户输入或 URL 参数插入 innerHTML/outerHTML）。  
> 位置：全局代码审查  
> 建议：继续避免直接插入不可信内容。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_notification、GM_setClipboard 等权限，但实际用途与功能相符，未检测到权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请必要权限，定期复查。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API 读取、Notification API 滥用）。  
> 位置：全局代码审查  
> 建议：继续避免敏感 API 滥用。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，所有加速节点均为直接下载链接，存在节点供应链风险（节点可能被劫持或污染）。  
> 位置：download_url_us 数组  
> 建议：建议用户优先选择知名、可信节点，避免下载敏感或私有内容。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：全局代码审查  
> 建议：继续避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/412245-github-enhancement-high-speed-download)*
