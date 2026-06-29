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

**风险等级**：🟠 MEDIUM　　**安全评分**：75/100　　**分析时间**：2026-06-29

> 该脚本通过生成第三方加速节点的下载链接，将用户的 Github 资源请求重定向到多个公益 CDN 节点。此行为会导致用户访问的资源 URL 被第三方服务器知晓，存在一定的数据外传和隐私风险（尤其是用于私有仓库时）。未发现代码混淆、远程代码执行、隐私采集、XSS、权限滥用等高危问题。建议用户仅用于公开资源下载，避免下载敏感内容。

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
> 脚本通过生成加速下载链接，将用户的下载请求重定向到第三方公益加速节点（如 gh.h233.eu.org、gh-proxy.org 等），这些节点会收到用户请求的 Github 资源 URL。  
> 位置：download_url_us 数组及相关逻辑  
> 建议：提醒用户这些第三方加速节点可能记录访问日志，建议仅用于公开资源下载，避免下载敏感/私有仓库内容。

**🟡 LOW** — 隐私采集  
> 脚本未发现直接读取 cookie、localStorage、sessionStorage、IndexedDB、表单、剪贴板、键盘输入等隐私数据的行为。  
> 位置：全局  
> 建议：保持现状，勿添加隐私采集代码。

**🟡 LOW** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string) 或动态 script 标签加载远程 JS。  
> 位置：全局  
> 建议：保持现状，勿引入远程代码执行风险。

**🟡 LOW** — 代码混淆  
> 未发现明显的代码混淆、base64 解码、字符串数组混淆或高度压缩代码。  
> 位置：全局  
> 建议：保持代码可读性，便于社区审计。

**🟡 LOW** — 权限滥用  
> @grant 申请了 GM_openInTab、GM_notification、GM_setClipboard 等权限，但均有合理用途，未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，避免权限滥用。

**🟡 LOW** — 供应链风险  
> 未发现 @require 加载第三方库，供应链风险较低。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用官方 CDN 并锁定版本。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/412245-github-enhancement-high-speed-download)*
