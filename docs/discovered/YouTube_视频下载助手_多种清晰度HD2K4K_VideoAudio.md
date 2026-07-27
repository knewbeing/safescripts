---
title: "YouTube 视频下载助手"
---

# YouTube 视频下载助手

`视频下载`  `YouTube`  `高清`  `字幕下载`  `短视频`  `无广告`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_视频下载助手_多种清晰度HD2K4K_VideoAudio.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.1**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/521434-youtube-%E8%A7%86%E9%A2%91%E4%B8%8B%E8%BD%BD%E5%8A%A9%E6%89%8B-%E5%A4%9A%E7%A7%8D%E6%B8%85%E6%99%B0%E5%BA%A6hd-2k-4k-video-audio) <Badge type="tip" text="GreasyFork" />　　安装量：**41,469**　　评分：👍29 / 👎10

## 功能介绍

本脚本为YouTube视频下载助手，支持多种清晰度（包括1080P、2K、4K）的视频下载。可下载视频、音频、字幕及短视频，完全免费且无广告。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后，打开YouTube任意视频页面。
2. 在视频下方会出现“免费下载”按钮。
3. 点击按钮选择需要的清晰度、格式（视频/音频/字幕）。
4. 按提示下载所选内容到本地。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于为页面添加自定义样式，让下载按钮等界面更美观。 |
| `GM_xmlhttpRequest` | 用于跨域请求第三方服务，获取视频下载链接。 |
| `GM_getValue` | 用于读取脚本本地存储的数据，如用户设置。 |
| `GM_setValue` | 用于保存脚本本地数据，如下载历史或用户偏好。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-07-27

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。主要安全问题为申请了未使用的高权限（GM_xmlhttpRequest、@connect），以及供应链风险（第三方库加载但已固定版本）。整体风险较低，建议移除未使用权限以进一步提升安全性。

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
> 申请了 GM_xmlhttpRequest 权限，但代码未实际使用该 API进行任何网络请求。  
> 位置：UserScript 元数据 @grant 和代码主体  
> 建议：移除未使用的高权限申请，减少权限滥用风险。

**🟠 MEDIUM** — 权限滥用  
> 申请了 @connect www.ssyoutube.com，但代码未实际使用 GM_xmlhttpRequest 或 fetch 访问该域名。  
> 位置：UserScript 元数据 @connect  
> 建议：移除未使用的 @connect 域名声明，避免误导用户。

**🟠 MEDIUM** — 供应链风险  
> 通过 @require 加载 sweetalert2@11，使用官方 CDN（jsdelivr），版本号固定，供应链风险较低。  
> 位置：UserScript 元数据 @require  
> 建议：继续保持固定版本加载，避免使用可变 URL。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/521434-youtube-%E8%A7%86%E9%A2%91%E4%B8%8B%E8%BD%BD%E5%8A%A9%E6%89%8B-%E5%A4%9A%E7%A7%8D%E6%B8%85%E6%99%B0%E5%BA%A6hd-2k-4k-video-audio)*
