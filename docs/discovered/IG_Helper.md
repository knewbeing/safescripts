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

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-07-13

> 该脚本主要功能为一键下载 Instagram 媒体资源，未检测到数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。依赖的第三方库均为可信 CDN 且固定哈希，供应链风险较低。存在部分权限冗余（如 GM_openInTab），建议最小化权限。整体安全风险较低，适合一般用户使用。

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
> 申请了 GM_xmlhttpRequest 权限，并允许连接 cdn.jsdelivr.net、i.instagram.com、raw.githubusercontent.com，但代码中仅用于加载资源和 Instagram API，无发现用户数据外传或统计追踪行为。  
> 位置：元数据 @grant/@connect 及主代码  
> 建议：继续关注后续版本，确保无新增外传逻辑。

**🟠 MEDIUM** — 供应链依赖  
> 通过 @require 加载 mediabunny 和 jQuery，均为知名 CDN 并固定了 sha256 哈希，供应链风险较低。  
> 位置：元数据 @require  
> 建议：定期检查依赖哈希，防止 CDN 污染。

**🟠 MEDIUM** — 权限冗余  
> 申请了 GM_openInTab 权限，但主代码片段未见明显使用，存在一定权限冗余。  
> 位置：元数据 @grant  
> 建议：如未使用 GM_openInTab，建议移除。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/404535-ig-helper)*
