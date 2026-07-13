---
title: "Nexus免等待下载增强"
---

# Nexus免等待下载增强

`下载加速`  `自动化`  `Nexus Mods`  `跳过等待`  `工具增强`  `游戏模组`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Nexus_No_Wait.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.1.8**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/519037-nexus-no-wait) <Badge type="tip" text="GreasyFork" />　　安装量：**15,899**　　评分：👍31 / 👎2

## 功能介绍

本脚本可自动跳过 Nexus Mods 网站的下载等待时间，自动开始下载文件，并支持多种下载方式（手动、Vortex、MO2、NMM）。还可自动关闭下载页面、跳过下载前的要求提示，并隐藏会员推广信息。

## 适用网站

- Nexus Mods

## 使用方法

1. 安装脚本后，访问 Nexus Mods 网站。
2. 选择你需要下载的模组，点击下载按钮。
3. 下载会自动开始，无需等待倒计时。
4. 下载完成后页面可自动关闭，无需手动操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取用户配置，记住脚本设置。 |
| `GM_setValue` | 用于保存用户配置，存储脚本设置。 |
| `GM.xmlHttpRequest` | 用于发送网络请求，获取文件或数据。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取文件或数据。 |
| `GM_info` | 用于获取脚本自身信息，如版本号。 |
| `GM_addStyle` | 用于添加自定义样式，优化页面显示。 |
| `GM_registerMenuCommand` | 用于在菜单中添加脚本功能入口，方便用户操作。 |
| `GM_download` | 用于直接下载文件，提升下载体验。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：97/100　　**分析时间**：2026-07-13

> 该脚本主要通过与 Nexus Mods 官方相关域名通信，实现自动跳过倒计时和自动下载等功能。未发现隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、供应链风险、敏感 API 滥用等问题。网络请求仅限于官方域名，未发现数据外传至作者或第三方服务器。整体安全风险极低，建议定期复查以防未来代码变更引入新风险。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：*.nexusmods.com, files.nexus-cdn.com, *.nexus-cdn.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 和 fetch 向 *.nexusmods.com、*.nexus-cdn.com、raw.githubusercontent.com 发起网络请求，但仅用于下载链接解析和功能实现，未发现向第三方域名或作者服务器发送用户数据、页面内容或 Cookie。  
> 位置：gmRequest, getDownloadUrl, normalizeDownloadUrl, fetch  
> 建议：确保仅与必要的官方域名通信，避免未来代码变更引入外传风险。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 cookie、localStorage、sessionStorage、IndexedDB，也未监听键盘/表单/剪贴板等敏感信息。  
> 位置：全局  
> 建议：保持当前实现，避免未来引入隐私采集代码。

**🔴 HIGH** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险。未动态加载远程 JS。  
> 位置：全局  
> 建议：保持当前实现，避免引入动态代码执行。

**🔴 HIGH** — 代码混淆  
> 未发现代码混淆、base64 解码、字符串数组映射或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，便于社区审计。

**🔴 HIGH** — DOM XSS  
> 未发现 DOM XSS 风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：全局  
> 建议：如需插入动态内容，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> @grant 申请了 GM_download、GM_xmlhttpRequest、GM_getValue、GM_setValue、GM_info、GM_addStyle、GM_registerMenuCommand，均有实际使用，无权限滥用。  
> 位置：元数据与全局  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 供应链风险  
> @require 未使用，未发现供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议固定版本并使用可信 CDN。

**🟠 MEDIUM** — 敏感 API 调用  
> 未发现敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）调用。  
> 位置：全局  
> 建议：避免引入敏感 API 调用。

**🟡 LOW** — ClickJacking/iframe 风险  
> 未发现修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局  
> 建议：如需操作 iframe，需评估 clickjacking 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/519037-nexus-no-wait)*
