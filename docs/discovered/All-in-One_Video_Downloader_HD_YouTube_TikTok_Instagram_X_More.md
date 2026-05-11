---
title: "多合一视频下载器（支持：YouTube, TikTok, Instagram等）"
---

# 多合一视频下载器（支持：YouTube, TikTok, Instagram等）

`视频下载`  `多平台`  `无水印`  `高清视频`  `社交媒体`  `便捷工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/All-in-One_Video_Downloader_HD_YouTube_TikTok_Instagram_X_More.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.10**　　发现时间：**2026-05-11**　　来源：[GreasyFork](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more) <Badge type="tip" text="GreasyFork" />　　安装量：**26,710**　　评分：👍13 / 👎7

## 功能介绍

这是一款多合一、快速且免费的高清视频下载工具。支持从YouTube、TikTok、抖音、Instagram、Facebook、Threads、小红书、TED、X（原Twitter）等主流平台下载视频。下载的视频无水印，操作简单，适合需要保存网络视频的用户。

## 适用网站

- YouTube
- TikTok
- 抖音
- Instagram
- Threads
- 小红书
- TED
- Facebook
- X（原Twitter）

## 使用方法

1. 1. 安装脚本后，访问支持的视频网站（如YouTube、TikTok等）。
2. 2. 在视频页面会出现下载按钮或相关提示。
3. 3. 点击下载按钮，选择需要的清晰度或格式，即可保存视频到本地。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_openInTab` | 用于在新标签页打开下载链接或页面。 |
| `GM.openInTab` | 用于在新标签页打开下载链接或页面（新版API）。 |
| `GM_xmlhttpRequest` | 用于发送跨域网络请求，获取视频资源。 |
| `GM_addStyle` | 用于为页面添加自定义样式，优化界面显示。 |
| `GM_setValue` | 用于本地保存脚本设置或用户数据。 |
| `GM_getValue` | 用于读取本地保存的脚本设置或用户数据。 |
| `GM_download` | 用于直接下载视频文件到本地。 |
| `unsafeWindow` | 允许脚本访问网页的原始window对象，增强功能兼容性。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-05-11

> 该脚本主要风险在于广泛的第三方域名数据传输权限（@connect），理论上可外传用户数据，属于 CRITICAL 级别。未发现隐私采集、代码混淆、远程代码执行等高危行为。部分高权限申请存在滥用空间。建议收紧 @connect 和 @grant 权限。

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
> 脚本申请了 GM_xmlhttpRequest 权限，并通过 @connect 允许与多个第三方视频 CDN 域名通信，存在数据外传的可能性。  
> 位置：元数据 @grant/@connect  
> 建议：限制 @connect 目标域名，仅允许必要的官方视频 CDN，避免向非官方或未知域名传输数据。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_download、unsafeWindow 等高权限，但未见实际代码使用情况，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，移除未使用的高权限申请。

**🟡 LOW** — 供应链风险  
> 脚本未使用 @require 加载第三方库，降低了供应链风险。  
> 位置：元数据 @require  
> 建议：保持当前状态，避免动态加载未知来源的第三方库。

**🟡 LOW** — 远程代码执行  
> 脚本未检测到代码混淆、eval、new Function、setTimeout(string) 等远程代码执行高危用法。  
> 位置：主代码区  
> 建议：保持当前状态，避免引入动态代码执行。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more)*
