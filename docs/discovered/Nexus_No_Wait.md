---
title: "Nexus免等待增强版"
---

# Nexus免等待增强版

`下载加速`  `自动化`  `Nexus Mods`  `跳过等待`  `脚本工具`  `游戏模组`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Nexus_No_Wait.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.1.6**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/519037-nexus-no-wait) <Badge type="tip" text="GreasyFork" />　　安装量：**14,658**　　评分：👍30 / 👎2

## 功能介绍

本脚本可以自动跳过 Nexus Mods 网站的下载等待时间，自动开始下载，并支持多种下载方式。它还可以自动关闭下载页面、跳过下载前的要求提示，并隐藏会员推广内容。

## 适用网站

- Nexus Mods

## 使用方法

1. 安装脚本后，访问 Nexus Mods 网站。
2. 选择你想下载的模组，点击下载按钮。
3. 下载会自动开始，无需等待倒计时。
4. 下载完成后页面可自动关闭。
5. 如需调整功能，可在油猴菜单中找到脚本设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取脚本的配置设置。 |
| `GM_setValue` | 用于保存脚本的配置设置。 |
| `GM.xmlHttpRequest` | 用于在后台发起网络请求，获取文件或数据。 |
| `GM_xmlhttpRequest` | 用于在后台发起网络请求，获取文件或数据。 |
| `GM_info` | 用于获取当前脚本的信息，如版本号。 |
| `GM_addStyle` | 用于添加自定义样式，让页面显示更友好。 |
| `GM_registerMenuCommand` | 用于在油猴菜单中添加脚本设置入口。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-06-22

> 该脚本主要用于提升 Nexus Mods 下载体验，未发现数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 滥用、供应链风险或 iframe 风险。所有网络请求仅限于官方域名和 GitHub 静态资源，未见用户数据外传。整体安全性高，适合普通用户使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传检查  
> 脚本使用 GM.xmlHttpRequest/GM_xmlhttpRequest 访问 *.nexusmods.com 和 raw.githubusercontent.com 以获取下载链接和音频资源，但未发现向第三方域名或作者服务器发送用户数据、页面内容或 Cookie。  
> 位置：gmRequest, getDownloadUrl, setupAudio  
> 建议：确保仅访问受信任的官方域名，避免未来代码变更引入第三方数据外传。

**⛔ CRITICAL** — 隐私采集检查  
> 未发现对 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段、键盘输入等隐私数据的读取或外传行为。  
> 位置：全局  
> 建议：保持当前实现，避免未来引入隐私采集代码。

**🔴 HIGH** — 远程代码执行检查  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string)、动态 script 标签、document.write 插入 JS 等远程代码执行风险。  
> 位置：全局  
> 建议：避免引入动态代码执行逻辑。

**🔴 HIGH** — 代码混淆检查  
> 代码未混淆，无 base64 解码、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

**🔴 HIGH** — DOM XSS/注入检查  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未见 document.write 注入不可信内容。  
> 位置：全局  
> 建议：如需插入动态内容，务必进行转义。

**🟠 MEDIUM** — 权限滥用检查  
> @grant 申请了 GM_getValue、GM_setValue、GM.xmlHttpRequest、GM_xmlhttpRequest、GM_info、GM_addStyle、GM_registerMenuCommand，均有实际使用，无权限滥用。  
> 位置：元数据与代码比对  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 敏感 API 检查  
> 未发现 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API 等敏感 API 调用。  
> 位置：全局  
> 建议：避免引入敏感 API 调用。

**🟠 MEDIUM** — 供应链风险检查  
> @require 未使用，未见第三方库供应链风险。音频资源和图标均来自 raw.githubusercontent.com，可信度较高。  
> 位置：元数据与代码比对  
> 建议：如需引入第三方库，建议使用官方 CDN 并锁定版本。

**🟡 LOW** — ClickJacking/iframe 风险检查  
> 未见修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局  
> 建议：如需操作 iframe，注意 ClickJacking 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/519037-nexus-no-wait)*
