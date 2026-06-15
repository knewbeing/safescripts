---
title: "IG小助手"
---

# IG小助手

`下载`  `Instagram`  `图片视频`  `社交媒体`  `一键操作`  `快拍Reels`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/IG_Helper.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**4.0.2**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/404535-ig-helper) <Badge type="tip" text="GreasyFork" />　　安装量：**48,070**　　评分：👍124 / 👎6

## 功能介绍

IG小助手可以让你一键下载Instagram上的照片和视频，包括帖子、快拍（Stories）、Reels和头像。操作简单，无需额外工具，轻松保存你喜欢的内容。

## 适用网站

- Instagram

## 使用方法

1. 安装脚本后，打开Instagram网站。
2. 浏览帖子、快拍、Reels或个人主页。
3. 点击新增的下载按钮即可保存照片或视频。
4. 下载内容会自动保存到你的设备。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让下载按钮等界面更美观。 |
| `GM_getResourceText` | 获取脚本内置资源文本，如样式或多语言配置。 |
| `GM_getValue` | 读取脚本保存的设置或数据。 |
| `GM_info` | 获取当前脚本的相关信息。 |
| `GM_notification` | 在桌面弹出通知，提示下载完成等信息。 |
| `GM_openInTab` | 在新标签页打开链接，方便预览或下载。 |
| `GM_registerMenuCommand` | 注册菜单命令，方便用户在扩展菜单中操作。 |
| `GM_setValue` | 保存用户设置或数据。 |
| `GM_unregisterMenuCommand` | 注销菜单命令，管理扩展菜单项。 |
| `GM_xmlhttpRequest` | 进行网络请求，获取图片或视频资源。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：100/100　　**分析时间**：2026-06-15

> IG Helper 脚本安全性较高，无数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等关键安全问题。所有第三方依赖均为固定哈希版本，权限申请合理。建议持续关注依赖库安全和权限最小化原则。

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
> 脚本申请了 GM_xmlhttpRequest 权限，并声明 @connect 到 cdn.jsdelivr.net、i.instagram.com、raw.githubusercontent.com，但代码仅用于下载 Instagram 媒体资源和加载资源文件，无用户数据外传行为。  
> 位置：元数据与主代码  
> 建议：确保 GM_xmlhttpRequest 仅用于媒体下载，不用于发送用户敏感信息。

**⛔ CRITICAL** — 隐私采集  
> 脚本未监听键盘输入、未读取表单字段、未访问剪贴板、未读取 cookie/localStorage/IndexedDB，仅使用 GM_getValue/GM_setValue 存储自身配置。  
> 位置：主代码  
> 建议：保持现有行为，避免采集用户隐私数据。

**🔴 HIGH** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险。@require 的第三方库均为固定哈希版本。  
> 位置：主代码与元数据  
> 建议：继续使用固定哈希版本的第三方库，避免动态加载未知代码。

**🔴 HIGH** — 代码混淆  
> 未发现代码混淆、base64 解码、字符串数组映射或高度压缩单行代码。代码结构清晰。  
> 位置：主代码  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 document.write 注入风险。  
> 位置：主代码  
> 建议：如需插入动态内容，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab 权限，但实际用于打开 Instagram 媒体资源新标签页，未滥用高权限。  
> 位置：元数据与主代码  
> 建议：仅申请实际需要的权限，避免权限滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：主代码  
> 建议：避免调用敏感 API，除非有明确用途且需征得用户同意。

**🟠 MEDIUM** — 供应链风险  
> @require 加载 mediabunny 和 jQuery 均为官方 CDN 且固定哈希版本，无供应链污染风险。  
> 位置：元数据  
> 建议：继续使用可信 CDN 并固定版本哈希。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未修改 frame 保护策略，未创建隐藏 iframe 用于数据提取。  
> 位置：主代码  
> 建议：如需使用 iframe，需明确用途并防范 ClickJacking。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/404535-ig-helper)*
