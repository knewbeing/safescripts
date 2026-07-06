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

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-07-06

> 该脚本通过第三方加速节点实现 Github 文件高速下载，存在数据外传和间接隐私泄露风险。未检测到代码混淆、远程代码执行、DOM XSS、敏感 API 调用或供应链风险。建议用户仅用于公开内容下载，避免下载敏感或私有仓库。整体安全性中等，主要风险在于第三方节点可能记录用户行为。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://gh.h233.eu.org/https://github.com, https://rapidgit.jjda.de5.net/https://github.com, https://gh.ddlc.top/https://github.com） |
| 隐私采集 | ❌ 检测到（通过加速节点间接暴露用户下载行为和目标仓库信息） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过构造下载链接，将用户请求重定向到第三方加速代理服务器（如 gh.h233.eu.org、gh-proxy.org 等），这些服务器可能会记录用户下载行为和请求内容。  
> 位置：download_url_us 数组及相关下载逻辑  
> 建议：警告用户这些加速节点为第三方，下载时注意隐私风险。建议只用于公开内容下载，避免下载敏感或私有仓库。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到主动采集用户隐私数据（如 cookie、表单、剪贴板等），但通过下载加速节点间接暴露用户的下载行为和目标仓库信息。  
> 位置：下载链接生成与跳转  
> 建议：提醒用户加速节点可能记录访问日志，避免下载敏感内容。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等动态代码执行方式，也未通过 innerHTML/outerHTML 插入外部脚本。  
> 位置：主逻辑  
> 建议：保持当前安全实践，避免未来引入动态代码执行。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到代码混淆、base64 解码、字符串映射或高度压缩代码。  
> 位置：主逻辑  
> 建议：保持代码可读性，便于社区审查。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：主逻辑  
> 建议：继续避免直接插入用户输入到 DOM。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_notification、GM_setClipboard 等权限，但实际使用与功能相符，无权限滥用。  
> 位置：元数据 @grant  
> 建议：定期复查权限申请，避免冗余高权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API 读取、Notification API 滥用）。  
> 位置：主逻辑  
> 建议：继续避免敏感 API 滥用。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，未检测到供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：主逻辑  
> 建议：继续避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/412245-github-enhancement-high-speed-download)*
