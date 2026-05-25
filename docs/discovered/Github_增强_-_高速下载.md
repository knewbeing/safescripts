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

**风险等级**：🔴 HIGH　　**安全评分**：75/100　　**分析时间**：2026-05-25

> 该脚本通过第三方加速节点实现 Github 文件高速下载，存在数据外传风险（用户下载行为和请求内容可能被第三方记录）。未检测到隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等高危问题。建议用户仅下载公开内容，避免敏感数据泄露。整体安全评分为 75，主要风险为数据外传。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://gh.h233.eu.org, https://rapidgit.jjda.de5.net, https://gh.ddlc.top） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过构造下载链接，将用户请求重定向到第三方加速代理服务器（如 gh.h233.eu.org、gh-proxy.org 等），这些服务器可能会记录用户下载行为和请求内容。  
> 位置：download_url_us 数组及相关下载逻辑  
> 建议：警告用户：下载行为会被第三方加速节点记录，建议仅下载公开内容，避免敏感数据泄露。

**🟠 MEDIUM** — 隐私采集  
> 脚本未检测到主动采集用户隐私数据（如 cookie、表单、剪贴板等），但通过 GM_getValue/GM_setValue 存储用户配置。  
> 位置：GM_getValue/GM_setValue  
> 建议：确认存储内容仅为配置项，不含敏感信息。

**🟡 LOW** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等动态代码执行方式，也未通过 innerHTML 插入外部脚本。  
> 位置：全局代码  
> 建议：保持代码执行安全，避免后续引入动态执行。

**🟡 LOW** — 代码混淆  
> 脚本未检测到代码混淆、base64 解码、字符串映射或高度压缩代码。  
> 位置：全局代码  
> 建议：保持代码可读性，便于安全审查。

**🟡 LOW** — DOM XSS  
> 脚本未检测到 DOM XSS 风险，未将用户输入直接插入 innerHTML/outerHTML。  
> 位置：全局代码  
> 建议：继续避免直接插入用户输入。

**🟡 LOW** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_notification、GM_setClipboard 等权限，实际代码中有使用这些功能，未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限。

**🟡 LOW** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API 读取、Notification API 滥用）。  
> 位置：全局代码  
> 建议：继续避免敏感 API 滥用。

**🟡 LOW** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据 @require  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局代码  
> 建议：继续避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/412245-github-enhancement-high-speed-download)*
