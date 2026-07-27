---
title: "IG小助手"
---

# IG小助手

`Instagram`  `下载`  `图片视频保存`  `快拍`  `Reels`  `社交媒体助手`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/IG_Helper.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**4.0.3**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/404535-ig-helper) <Badge type="tip" text="GreasyFork" />　　安装量：**49,268**　　评分：👍125 / 👎6

## 功能介绍

本脚本可以一键下载 Instagram 帖子中的照片和视频，包括快拍（Stories）、Reels 和头像。安装后，用户无需复杂操作即可保存喜欢的内容到本地。

## 适用网站

- Instagram

## 使用方法

1. 安装脚本后，打开 Instagram 网站。
2. 浏览帖子、快拍、Reels 或个人主页。
3. 在内容旁会出现下载按钮，点击即可保存照片或视频。
4. 下载完成后会有通知提示。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让下载按钮等界面更美观。 |
| `GM_getResourceText` | 用于读取脚本内置资源文本，如界面样式或多语言文件。 |
| `GM_getValue` | 用于保存和获取用户的设置或状态信息。 |
| `GM_info` | 用于获取当前脚本的相关信息。 |
| `GM_notification` | 用于弹出通知，提示下载完成或错误信息。 |
| `GM_openInTab` | 用于在新标签页打开链接，比如下载内容。 |
| `GM_registerMenuCommand` | 用于注册菜单命令，方便用户在扩展菜单中操作脚本。 |
| `GM_setValue` | 用于保存用户设置或状态信息。 |
| `GM_unregisterMenuCommand` | 用于注销菜单命令，管理扩展菜单。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取图片或视频资源。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：100/100　　**分析时间**：2026-07-27

> IG Helper 用户脚本主要用于下载 Instagram 媒体资源，未检测到用户数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用、WebSocket 或 iframe 风险。所有第三方依赖均为官方 CDN 且固定版本哈希，供应链风险较低。整体安全性高，建议持续关注依赖库安全和权限最小化原则。

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
> 使用 GM_xmlhttpRequest 访问 i.instagram.com、cdn.jsdelivr.net、raw.githubusercontent.com，但仅用于媒体下载和资源加载，无用户数据外传。  
> 位置：网络请求相关代码  
> 建议：确保 GM_xmlhttpRequest 仅用于下载媒体和资源，不携带敏感用户数据。

**⛔ CRITICAL** — 隐私采集  
> 未检测到 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板读取、键盘监听等隐私采集行为。  
> 位置：主脚本代码  
> 建议：继续避免任何隐私数据采集。

**⛔ CRITICAL** — 数据外传  
> 未检测到 WebSocket、EventSource、navigator.sendBeacon 等实时数据外传行为。  
> 位置：主脚本代码  
> 建议：继续避免实时数据外传。

**🔴 HIGH** — 远程代码执行  
> 未检测到 eval、new Function、字符串 setTimeout/setInterval、动态 script 标签等远程代码执行风险。  
> 位置：主脚本代码  
> 建议：保持代码透明，避免动态执行外部代码。

**🔴 HIGH** — 代码混淆  
> 未检测到代码混淆、base64 解码、字符串数组映射、unicode 混淆或高度压缩代码。  
> 位置：主脚本代码  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 未检测到 DOM XSS 风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：主脚本代码  
> 建议：继续避免任何未转义的用户输入插入 DOM。

**🟠 MEDIUM** — 权限滥用  
> 申请了 GM_openInTab 权限，但实际代码仅用于打开媒体资源新标签页，未滥用。  
> 位置：权限申请与使用  
> 建议：如无必要可移除 GM_openInTab 权限，或限制其用途。

**🟠 MEDIUM** — 供应链风险  
> 通过 @require 加载 mediabunny 和 jQuery，均为官方 CDN 且固定版本哈希，供应链风险较低。  
> 位置：元数据 @require  
> 建议：持续监控 CDN 供应链安全，确保哈希与版本一致。

**🟠 MEDIUM** — 敏感 API 调用  
> 未检测到敏感 API 调用（地理位置、RTCPeerConnection、MediaDevices、剪贴板、通知等）。  
> 位置：主脚本代码  
> 建议：避免调用敏感 API，除非有明确用途。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未检测到修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：主脚本代码  
> 建议：避免任何 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/404535-ig-helper)*
