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

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-04-27

> 该脚本通过多个第三方加速节点实现 Github 文件高速下载，存在数据外传和间接隐私泄露风险。未检测到远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险等高危问题。建议用户仅用于公开资源下载，避免下载敏感或私有仓库内容。整体安全评分为 50，风险等级为 CRITICAL。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：gh.h233.eu.org, rapidgit.jjda.de5.net, gh.ddlc.top） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过构造下载链接，将用户请求重定向到多个第三方加速代理服务器（如 gh.h233.eu.org、gh-proxy.org 等），这些服务器属于非官方第三方，存在数据外传风险。  
> 位置：download_url_us 数组及相关下载逻辑  
> 建议：警告用户这些加速节点为第三方，下载敏感内容时需谨慎。建议仅用于公开资源下载。

**⛔ CRITICAL** — 隐私采集（间接）  
> 脚本未检测到主动采集用户隐私数据（如 cookie、localStorage、表单、剪贴板等），但通过加速节点下载时，可能间接暴露用户的下载行为和目标资源。  
> 位置：下载链接生成与跳转  
> 建议：提醒用户加速节点可记录下载行为，避免下载敏感或私有仓库内容。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行方式，也未动态加载远程 JS。  
> 位置：全局代码  
> 建议：保持现有安全实践，避免未来引入动态执行代码。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到代码混淆、base64 解码、字符串映射或高度压缩代码。  
> 位置：全局代码  
> 建议：保持代码可读性，便于社区审查。

**🔴 HIGH** — DOM XSS  
> 脚本未检测到 DOM XSS 风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：全局代码  
> 建议：继续避免直接插入不可信内容。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_notification、GM_setClipboard 等权限，但实际用途与功能相符，未检测到权限滥用。  
> 位置：元数据 @grant  
> 建议：定期审查权限申请，避免冗余高权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API 读取、Notification API 滥用）。  
> 位置：全局代码  
> 建议：继续避免敏感 API 滥用。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，供应链风险较低。  
> 位置：元数据  
> 建议：如需引入第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：全局代码  
> 建议：继续避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/412245-github-enhancement-high-speed-download)*
