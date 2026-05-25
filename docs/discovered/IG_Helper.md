---
title: "IG小助手"
---

# IG小助手

`Instagram`  `下载工具`  `图片视频保存`  `社交媒体`  `一键操作`  `浏览器脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/IG_Helper.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.19.2**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/404535-ig-helper) <Badge type="tip" text="GreasyFork" />　　安装量：**47,189**　　评分：👍121 / 👎6

## 功能介绍

本脚本可让你在 Instagram 上一键下载帖子中的照片和视频，包括快拍（Stories）、Reels 和头像。使用后，页面会出现下载按钮，方便保存你喜欢的内容。

## 适用网站

- Instagram

## 使用方法

1. 安装脚本后，打开 Instagram 网站。
2. 浏览帖子、快拍、Reels 或个人主页。
3. 在内容旁会出现下载按钮，点击即可保存图片或视频。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于动态添加或修改页面样式，让下载按钮更美观。 |
| `GM_getResourceText` | 用于读取脚本内置资源文件，如样式表和多语言配置。 |
| `GM_getValue` | 用于存储和读取用户设置或脚本状态。 |
| `GM_info` | 用于获取当前脚本的相关信息，如版本号。 |
| `GM_notification` | 用于在下载完成或出错时弹出通知提醒。 |
| `GM_openInTab` | 用于在新标签页打开下载的图片或视频。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加自定义命令，方便用户操作。 |
| `GM_setValue` | 用于保存用户设置或脚本状态。 |
| `GM_unregisterMenuCommand` | 用于移除自定义菜单命令。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取图片或视频资源。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-05-25

> IG Helper 用户脚本整体安全性较高，未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用等高风险行为。依赖库均为官方 CDN 且固定版本哈希，供应链风险较低。部分权限申请（如 GM_openInTab）建议持续关注。整体评分为 81，风险等级为 LOW，建议定期复审依赖库和权限使用情况。

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
> 脚本申请了 GM_xmlhttpRequest 权限，并声明 @connect 到 cdn.jsdelivr.net、i.instagram.com、raw.githubusercontent.com，但代码中仅用于资源加载和 Instagram API交互，未检测到用户数据或敏感信息外传到非官方或第三方服务器。  
> 位置：元数据与主代码  
> 建议：持续监控后续版本，确保 GM_xmlhttpRequest 仅用于资源和媒体下载，不用于数据上报。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板读取、键盘监听等隐私采集行为。  
> 位置：主代码  
> 建议：保持用户隐私保护，避免采集敏感信息。

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到 WebSocket、EventSource、navigator.sendBeacon 等实时数据外传行为。  
> 位置：主代码  
> 建议：持续监控，防止未来引入实时数据上报。

**🔴 HIGH** — 远程代码执行  
> 脚本未检测到 eval、new Function、setTimeout(string)、setInterval(string)等远程代码执行风险，也未动态加载未固定版本的 JS。  
> 位置：主代码  
> 建议：保持代码透明，避免动态执行外部代码。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到代码混淆（如 atob/btoa、字符串数组映射、unicode 混淆、大量单行压缩代码）。  
> 位置：主代码  
> 建议：保持代码可读性，便于社区审查。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 风险（如用户输入或 URL 参数直接插入 innerHTML/outerHTML、document.write 注入、iframe src 操作）。  
> 位置：主代码  
> 建议：继续避免直接插入不可信内容。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @require 加载 mediabunny 和 jQuery，均为官方 CDN 且固定了版本哈希，供应链风险较低。  
> 位置：元数据  
> 建议：建议定期检查依赖库安全性，防止 CDN 被污染。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab 权限，但实际代码仅用于打开新标签页下载资源，未发现滥用。  
> 位置：元数据与主代码  
> 建议：建议仅申请实际需要的权限，避免权限滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未检测到敏感 API 调用（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：主代码  
> 建议：避免调用敏感 API，保护用户隐私。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：主代码  
> 建议：继续避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/404535-ig-helper)*
