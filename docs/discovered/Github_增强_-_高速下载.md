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

**风险等级**：🟠 MEDIUM　　**安全评分**：75/100　　**分析时间**：2026-06-08

> 该脚本主要通过将 GitHub 下载请求重定向到多个第三方加速节点实现高速下载。未发现隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 滥用、供应链风险等问题。主要安全风险在于所有加速节点均为第三方服务器，存在数据外传（如下载的仓库、文件名、路径等信息会被第三方服务器知晓），不建议用于私有或敏感仓库。整体风险为中等，建议用户知情使用。

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
> 脚本通过构造第三方加速下载链接，将用户在 GitHub 上点击的下载请求重定向到多个第三方加速节点（如 gh.h233.eu.org、gh-proxy.org 等），这些节点为非官方第三方服务，存在一定的数据外传风险（如用户下载的仓库、文件名、路径等信息会被第三方服务器知晓）。  
> 位置：download_url_us 数组及相关下载逻辑  
> 建议：明确告知用户所有加速节点均为第三方，下载敏感/私有仓库时需谨慎。建议仅用于公开仓库。定期检查加速节点安全性。

**🟡 LOW** — 隐私采集  
> 脚本未发现主动收集用户隐私数据（如 cookie、localStorage、表单、指纹、剪贴板等）或监听键盘输入等行为。  
> 位置：全局  
> 建议：保持现状，勿添加隐私采集逻辑。

**🟡 LOW** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string) 或通过 innerHTML/outerHTML 执行远程代码的行为。  
> 位置：全局  
> 建议：保持现状，勿引入远程代码执行风险。

**🟡 LOW** — 代码混淆  
> 未发现代码混淆、base64 解码执行、字符串数组映射或高度压缩的单行代码。  
> 位置：全局  
> 建议：保持代码可读性，便于社区审计。

**🟡 LOW** — DOM XSS  
> 未发现 DOM XSS 风险（如未对用户输入或 URL 参数直接插入 innerHTML/outerHTML）。  
> 位置：全局  
> 建议：如后续涉及用户输入，需严格转义。

**🟡 LOW** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_setClipboard、GM_notification 等权限，均有实际用途（如打开新标签、复制下载链接、通知下载状态），未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，定期复查。

**🟡 LOW** — 敏感 API  
> 未发现敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API 读取、Notification 滥用）调用。  
> 位置：全局  
> 建议：如需使用敏感 API，需明确告知用户。

**🟡 LOW** — 供应链风险  
> 未发现 @require 加载第三方库，未发现供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用官方 CDN 并锁定版本。

**🟡 LOW** — ClickJacking/iframe  
> 未发现脚本修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：保持现状，勿引入 ClickJacking 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/412245-github-enhancement-high-speed-download)*
