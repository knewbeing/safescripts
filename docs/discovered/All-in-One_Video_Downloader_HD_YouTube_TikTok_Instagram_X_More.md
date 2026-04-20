---
title: "多平台高清视频下载器"
---

# 多平台高清视频下载器

`视频下载`  `多平台`  `无水印`  `高清视频`  `社交媒体`  `工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/All-in-One_Video_Downloader_HD_YouTube_TikTok_Instagram_X_More.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.7**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more) <Badge type="tip" text="GreasyFork" />　　安装量：**18,689**　　评分：👍6 / 👎5

## 功能介绍

本脚本是一款多合一高清视频下载工具，支持在YouTube、TikTok、抖音、Instagram、Threads、小红书、X（原Twitter）等主流平台直接下载无水印视频。操作简单，下载速度快，适合需要保存网络视频的用户。

## 适用网站

- YouTube
- X（原Twitter）
- Threads
- Instagram Reels
- TikTok
- 抖音
- 小红书
- Google视频
- TikTok CDN
- 抖音视频
- Facebook CDN
- Twitter视频
- ZJ CDN
- 字节跳动内容分发
- 抖音静态资源
- 小红书CDN
- 抖音短视频
- TikWM
- TikTok欧洲CDN

## 使用方法

1. 安装脚本后，访问支持的视频网站。
2. 在视频页面会自动显示下载按钮或入口。
3. 点击下载按钮，选择清晰度后即可保存视频。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_openInTab` | 用于在新标签页打开下载链接。 |
| `GM.openInTab` | 用于在新标签页打开下载链接（新版API）。 |
| `GM_xmlhttpRequest` | 用于跨域请求视频资源，获取下载地址。 |
| `GM_addStyle` | 用于为页面添加自定义样式，优化下载按钮显示。 |
| `GM_setValue` | 用于本地保存设置，如下载历史。 |
| `GM_getValue` | 用于读取本地保存的设置。 |
| `GM_download` | 用于直接下载视频文件到本地。 |
| `unsafeWindow` | 允许脚本访问网页的原始窗口对象，增强功能兼容性。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：37/100　　**分析时间**：2026-04-20

> 该脚本主要用于视频下载，申请了多个高权限（GM_xmlhttpRequest、GM_openInTab、GM_download、unsafeWindow），并允许与多个第三方视频 CDN 通信。虽然未发现隐私采集和代码混淆，但存在数据外传、远程代码执行和权限滥用风险。建议限制权限申请、明确数据传输范围，并完整公开代码以便进一步审查。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：googlevideo.com, tiktokcdn.com, snssdk.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本申请了 GM_xmlhttpRequest 权限，并通过 @connect 指定多个第三方视频 CDN，存在数据外传风险。虽然主要用于视频下载，但无法确认是否仅用于合法下载行为，且未限制请求内容。  
> 位置：元数据 @grant/@connect  
> 建议：限制 GM_xmlhttpRequest 的使用范围，确保仅用于视频下载且不携带用户敏感信息。建议代码层面增加数据校验。

**🔴 HIGH** — 远程代码执行  
> 脚本申请了 unsafeWindow 权限，允许访问页面原生 JS 环境，存在远程代码执行和供应链风险。  
> 位置：元数据 @grant  
> 建议：仅在必要时使用 unsafeWindow，避免与页面 JS 混用导致安全漏洞。

**🔴 HIGH** — 远程代码执行  
> 未发现代码混淆、eval、new Function、setTimeout(string) 等高危执行方式，但完整代码未提供，无法完全确认。  
> 位置：主代码段  
> 建议：建议完整公开代码，避免隐藏混淆或动态执行风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab 和 GM_download 权限，属于高权限操作，可能被滥用打开恶意页面或下载恶意文件。  
> 位置：元数据 @grant  
> 建议：仅在实际需要时申请高权限，避免权限滥用。建议代码层面限制打开和下载目标。

**🟡 LOW** — 敏感 API 调用  
> 脚本未申请敏感 API（如 geolocation、MediaDevices、Clipboard），未发现隐私采集行为。  
> 位置：元数据 @grant  
> 建议：保持现有状态，勿增加敏感 API 调用。

**🟡 LOW** — 供应链风险  
> 脚本未使用 @require 加载第三方库，供应链风险较低。  
> 位置：元数据 @require  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more)*
