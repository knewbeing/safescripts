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

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-07-27

> 该脚本通过第三方加速代理服务器实现 Github 文件高速下载，存在数据外传和间接隐私泄露风险。未发现远程代码执行、代码混淆、DOM XSS、权限滥用等高风险行为。建议用户仅用于公开仓库，避免下载敏感或私有内容。整体安全评分为 50，风险等级为 CRITICAL。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：gh.h233.eu.org, rapidgit.jjda.de5.net, gh.ddlc.top） |
| 隐私采集 | ❌ 检测到（通过下载代理服务器间接收集用户 Github 访问行为） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过构造下载链接，将用户请求重定向到第三方加速代理服务器（如 gh.h233.eu.org、gh-proxy.org 等），存在数据外传风险。虽然主要用于下载 Github 文件，但用户的请求、URL、可能的 Cookie 或 Referer 信息会被第三方服务器获取。  
> 位置：download_url_us 数组及相关下载逻辑  
> 建议：警告用户下载时数据会被第三方服务器获取，避免下载敏感或私有仓库内容。建议仅用于公开仓库。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到主动收集用户隐私数据（如 cookie、localStorage、表单、剪贴板等），但通过下载代理可能间接泄露用户的 Github 访问行为。  
> 位置：下载链接重定向  
> 建议：提醒用户代理服务器可能记录访问行为。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行方式，也未动态加载外部 JS。  
> 位置：全局代码  
> 建议：保持当前安全实践。

**🔴 HIGH** — 代码混淆  
> 脚本未发现明显代码混淆、base64 解码、字符串映射或高度压缩代码。  
> 位置：全局代码  
> 建议：保持代码可读性。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 或注入风险，未直接将用户输入插入 innerHTML/outerHTML。  
> 位置：全局代码  
> 建议：继续避免直接插入用户输入。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_notification、GM_setClipboard 等权限，但实际用途与功能相符，未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请必要权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API 读取、Notification API 滥用）。  
> 位置：全局代码  
> 建议：继续避免敏感 API 滥用。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，供应链风险较低。  
> 位置：元数据  
> 建议：如需加载第三方库，建议固定版本哈希。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局代码  
> 建议：继续避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/412245-github-enhancement-high-speed-download)*
