---
title: "IG小助手"
---

# IG小助手

`Instagram`  `下载`  `图片视频`  `快拍`  `Reels`  `实用工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/IG_Helper.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.19.2**　　发现时间：**2026-06-01**　　来源：[GreasyFork](https://greasyfork.org/scripts/404535-ig-helper) <Badge type="tip" text="GreasyFork" />　　安装量：**47,457**　　评分：👍122 / 👎6

## 功能介绍

IG小助手可以让你在Instagram上，一键下载帖子中的照片和视频，包括快拍（Stories）、Reels和头像。操作简单，无需额外工具，轻松保存你喜欢的内容。

## 适用网站

- Instagram

## 使用方法

1. 安装脚本后，打开Instagram网站。
2. 浏览帖子、快拍、Reels或个人主页。
3. 点击新增的下载按钮，即可保存照片或视频。
4. 下载内容会自动保存到你的设备。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于动态添加或修改页面的样式，让下载按钮更美观。 |
| `GM_getResourceText` | 用于获取脚本内置资源文本，如样式表和多语言文件。 |
| `GM_getValue` | 用于读取脚本存储的数据，比如用户设置。 |
| `GM_info` | 用于获取当前脚本的信息，如版本号和作者。 |
| `GM_notification` | 用于在页面上弹出通知，提示下载成功或失败。 |
| `GM_openInTab` | 用于在新标签页打开链接，比如下载资源。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加自定义命令，方便用户操作。 |
| `GM_setValue` | 用于保存脚本数据，比如用户偏好设置。 |
| `GM_unregisterMenuCommand` | 用于移除自定义菜单命令。 |
| `GM_xmlhttpRequest` | 用于发起跨域网络请求，下载图片或视频资源。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-08

> 该脚本主要用于 Instagram 媒体下载，未发现数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 等高危行为。所有 @require 资源均为可信 CDN 并锁定哈希，供应链风险低。部分权限（如 GM_xmlhttpRequest、GM_openInTab）申请较高，但未见滥用。整体安全性较高，建议定期复查依赖库更新及主代码变更。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 权限申请  
> 脚本申请了 GM_xmlhttpRequest 权限，并声明 @connect 到 cdn.jsdelivr.net、i.instagram.com、raw.githubusercontent.com，但主代码未发现向第三方服务器发送用户数据、页面内容或 Cookie 的行为。  
> 位置：元数据与主代码  
> 建议：确保 GM_xmlhttpRequest 仅用于资源下载，不要上传用户数据。

**🟠 MEDIUM** — 权限申请  
> 脚本申请了 GM_openInTab 权限，但主代码未见明显滥用。  
> 位置：元数据  
> 建议：仅在必要时使用 GM_openInTab，避免滥用。

**🟡 LOW** — 供应链安全  
> 脚本通过 @require 加载了 mediabunny 和 jQuery，均来自官方 CDN，并带有 sha256 哈希，降低了供应链风险。  
> 位置：元数据  
> 建议：继续保持哈希锁定，避免加载未锁定版本。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/404535-ig-helper)*
