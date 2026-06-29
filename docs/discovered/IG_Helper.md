---
title: "IG小助手"
---

# IG小助手

`Instagram`  `下载`  `图片视频`  `快拍`  `Reels`  `头像`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/IG_Helper.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**4.0.3**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/404535-ig-helper) <Badge type="tip" text="GreasyFork" />　　安装量：**48,845**　　评分：👍125 / 👎6

## 功能介绍

本脚本可让你在 Instagram 上一键下载帖子中的照片和视频，包括快拍（Stories）、Reels 和头像。操作简单，无需额外工具，直接在网页上即可保存内容。

## 适用网站

- Instagram

## 使用方法

1. 安装脚本后，打开 Instagram 网站。
2. 浏览帖子、快拍、Reels 或个人主页。
3. 点击新增的下载按钮即可保存照片或视频。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让下载按钮等界面更美观。 |
| `GM_getResourceText` | 获取脚本内置资源文本，如样式或语言文件。 |
| `GM_getValue` | 读取脚本保存的设置或数据。 |
| `GM_info` | 获取当前脚本的相关信息。 |
| `GM_notification` | 在下载完成等情况下弹出桌面通知提醒。 |
| `GM_openInTab` | 在新标签页打开链接，方便预览或下载内容。 |
| `GM_registerMenuCommand` | 在油猴菜单中添加自定义命令，方便用户操作。 |
| `GM_setValue` | 保存用户设置或数据到本地。 |
| `GM_unregisterMenuCommand` | 移除油猴菜单中的自定义命令。 |
| `GM_xmlhttpRequest` | 进行跨域网络请求，获取图片或视频资源。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：97/100　　**分析时间**：2026-06-29

> IG Helper 用户脚本整体安全性较高。未发现用户数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 等高危行为。所有第三方依赖均带有哈希校验，降低供应链风险。@grant 权限申请合理，无滥用。建议持续关注依赖库安全和后续版本变更。

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
> 脚本申请了 GM_xmlhttpRequest 权限，并允许连接 cdn.jsdelivr.net、i.instagram.com、raw.githubusercontent.com，但代码中仅用于下载 Instagram 媒体内容和加载资源，无用户数据外传行为。  
> 位置：@grant/@connect 元数据及主代码  
> 建议：继续监控后续版本，确保无新增外传逻辑。

**⛔ CRITICAL** — 隐私采集检查  
> 脚本未监听键盘输入、未读取表单字段、未访问指纹 API、未读取剪贴板内容。仅使用 GM_getValue/GM_setValue 存储设置，无隐私采集行为。  
> 位置：主代码  
> 建议：保持现状，勿添加隐私采集逻辑。

**🔴 HIGH** — 远程代码执行检查  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string) 等动态执行代码方式。@require 的第三方库均带有 sha256 哈希，降低远程代码执行风险。  
> 位置：主代码及元数据  
> 建议：如需动态加载代码，务必校验来源和内容。

**🔴 HIGH** — 代码混淆检查  
> 未发现代码混淆、base64 解码、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：主代码  
> 建议：保持代码可读性，便于社区审计。

**🔴 HIGH** — DOM XSS/注入检查  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未见 document.write 注入，未操作 iframe src。  
> 位置：主代码  
> 建议：如需插入动态内容，务必进行转义。

**🟠 MEDIUM** — 权限滥用检查  
> 脚本申请了多项 @grant 权限（如 GM_openInTab、GM_notification），但均有实际用途（如新标签页打开媒体、通知下载完成等），无权限滥用。  
> 位置：@grant 元数据及主代码  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 供应链风险检查  
> @require 的第三方库（mediabunny、jquery）均来自官方 CDN 且带有 sha256 哈希，供应链风险较低。  
> 位置：@require 元数据  
> 建议：持续关注依赖库安全公告。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/404535-ig-helper)*
