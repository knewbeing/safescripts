---
title: "Nexus Mods下载加速增强"
---

# Nexus Mods下载加速增强

`下载加速`  `自动化`  `Nexus Mods`  `跳过等待`  `页面优化`  `工具增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Nexus_No_Wait.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.1.6**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/519037-nexus-no-wait) <Badge type="tip" text="GreasyFork" />　　安装量：**12,570**　　评分：👍27 / 👎2

## 功能介绍

本脚本可以自动跳过 Nexus Mods 网站的下载等待倒计时，自动开始下载，并支持多种下载方式（手动、Vortex、MO2、NMM）。还可自动关闭下载页面、跳过下载要求、隐藏会员推广等，提升下载体验。

## 适用网站

- Nexus Mods

## 使用方法

1. 安装脚本后，访问 Nexus Mods 网站。
2. 在下载页面无需等待，下载会自动开始。
3. 下载完成后页面可自动关闭。
4. 如需调整功能，可在油猴菜单中设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取用户的脚本设置。 |
| `GM_setValue` | 用于保存用户的脚本设置。 |
| `GM.xmlHttpRequest` | 用于发送网络请求，获取文件或数据。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取文件或数据（兼容不同环境）。 |
| `GM_info` | 用于获取当前脚本的信息，如版本号。 |
| `GM_addStyle` | 用于添加自定义样式，优化页面显示。 |
| `GM_registerMenuCommand` | 用于在菜单中注册自定义命令，方便用户操作。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-05-25

> 该脚本仅与 NexusMods 官方域和 raw.githubusercontent.com 通信，无用户数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。安全评分为 100，风险极低。

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
> 使用 GM.xmlHttpRequest 和 fetch 进行网络请求，仅向 *.nexusmods.com 和 raw.githubusercontent.com 发起请求，未检测到用户数据、页面内容或 Cookie 外传。  
> 位置：gmRequest, getDownloadUrl, normalizeDownloadUrl, startDownloadFlow  
> 建议：确保请求仅用于功能所需，避免携带敏感用户数据。

**⛔ CRITICAL** — 隐私采集  
> 未检测到隐私采集行为，如读取 cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段或监听键盘输入。  
> 位置：全局  
> 建议：保持现状，勿添加隐私采集代码。

**🔴 HIGH** — 远程代码执行  
> 未检测到远程代码执行风险，如 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML 插入脚本、@require 加载远程 JS。  
> 位置：全局  
> 建议：保持现状，勿添加动态代码执行。

**🔴 HIGH** — 代码混淆  
> 未检测到代码混淆行为，代码结构清晰，无 base64/unicode 混淆，无高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性。

**🔴 HIGH** — DOM XSS / 注入  
> 未检测到 DOM XSS 或注入风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：全局  
> 建议：如需插入内容，务必转义。

**🟠 MEDIUM** — 权限滥用  
> 申请了 GM.xmlHttpRequest、GM_xmlhttpRequest、GM_getValue、GM_setValue、GM_info、GM_addStyle、GM_registerMenuCommand 权限，均有实际使用，无权限滥用。  
> 位置：元数据与实际代码  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 未检测到敏感 API 调用，如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API。  
> 位置：全局  
> 建议：保持现状，勿调用敏感 API。

**🟠 MEDIUM** — 供应链风险  
> 未使用 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未检测到修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局  
> 建议：如需使用 iframe，确保安全。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/519037-nexus-no-wait)*
