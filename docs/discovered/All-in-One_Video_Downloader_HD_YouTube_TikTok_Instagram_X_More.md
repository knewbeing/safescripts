---
title: "多合一视频下载器（支持：YouTube, TikTok, Instagram等）"
---

# 多合一视频下载器（支持：YouTube, TikTok, Instagram等）

`视频下载`  `社交媒体`  `无水印`  `高清视频`  `多平台`  `便捷工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/All-in-One_Video_Downloader_HD_YouTube_TikTok_Instagram_X_More.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.12**　　发现时间：**2026-06-01**　　来源：[GreasyFork](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more) <Badge type="tip" text="GreasyFork" />　　安装量：**34,328**　　评分：👍20 / 👎9

## 功能介绍

多合一视频下载器，支持从主流社交和视频平台下载高清视频。操作简单，下载无水印，适用于YouTube、TikTok、抖音、Instagram、Facebook、X（Twitter）等。

## 适用网站

- YouTube
- TikTok
- 抖音
- Instagram
- Threads
- 小红书
- TED
- Facebook
- X（Twitter）
- Snapchat
- Pinterest

## 使用方法

1. 安装脚本后，访问支持的视频或社交网站。
2. 在视频页面会出现下载按钮或提示。
3. 点击下载按钮即可保存高清视频，无水印。
4. 如需设置或查看下载历史，可在页面相关区域操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_openInTab` | 用于在新标签页打开下载链接或页面。 |
| `GM.openInTab` | 用于在新标签页打开下载链接或页面（新版API）。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取视频下载地址。 |
| `GM_addStyle` | 用于添加自定义样式，优化界面显示。 |
| `GM_setValue` | 用于保存用户设置或下载历史。 |
| `GM_getValue` | 用于读取用户设置或下载历史。 |
| `GM_download` | 用于直接下载视频文件到本地。 |
| `unsafeWindow` | 允许脚本访问网页的原始窗口对象，增强功能。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-06-01

> 该脚本主要用于在主流视频网站下载视频，元数据中申请了大量第三方 CDN 域名的网络访问权限（@connect），存在一定的数据外传风险，尤其是如果后续代码实现中滥用 GM_xmlhttpRequest 可能导致用户数据泄露。脚本还申请了部分高权限但未见实际使用，建议最小化权限。未发现隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。整体安全风险为中等，建议仅在信任环境下使用。

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
> 脚本申请了 GM_xmlhttpRequest 权限并通过 @connect 允许访问多个第三方视频 CDN 域名，存在数据外传的潜在风险。  
> 位置：元数据 @grant/@connect  
> 建议：仅允许必要的域名，避免向非视频内容相关的第三方服务器发送用户数据。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_download、unsafeWindow 等高权限，但代码未见实际使用，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more)*
