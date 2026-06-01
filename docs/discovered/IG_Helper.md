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

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-06-01

> IG Helper 用户脚本主要用于在 Instagram 上下载图片和视频。代码未检测到数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。所有网络请求均指向 Instagram 官方 API 或知名 CDN，且未发现用户数据被外传。@require 的第三方库均锁定了哈希，供应链风险较低。存在部分未使用的高权限申请（如 GM_openInTab），建议精简权限。整体安全风险较低，安全评分为 84 分。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> @grant 申请了 GM_openInTab 权限，但代码中未见明显使用，存在权限冗余风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际使用的权限，移除未使用的高权限申请。

**🟠 MEDIUM** — 供应链风险  
> @require 加载了 mediabunny 和 jQuery，均为知名 CDN 并锁定了 sha256 哈希，供应链风险较低。  
> 位置：元数据 @require  
> 建议：继续保持哈希锁定，避免加载未锁定版本的第三方库。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/404535-ig-helper)*
