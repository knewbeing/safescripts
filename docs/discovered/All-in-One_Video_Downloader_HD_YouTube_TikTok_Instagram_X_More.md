---
title: "多合一视频下载器（支持：YouTube, TikTok, Instagram等）"
---

# 多合一视频下载器（支持：YouTube, TikTok, Instagram等）

`视频下载`  `多平台`  `无水印`  `高清视频`  `社交媒体`  `实用工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/All-in-One_Video_Downloader_HD_YouTube_TikTok_Instagram_X_More.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.14**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more) <Badge type="tip" text="GreasyFork" />　　安装量：**39,364**　　评分：👍20 / 👎10

## 功能介绍

多合一视频下载器，支持从主流视频平台（如YouTube、TikTok、抖音、Instagram、Facebook、X等）下载高清视频。操作简单，下载无水印，适合需要保存网络视频的用户。

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

1. 安装脚本后，访问支持的视频网站（如YouTube、TikTok等）。
2. 在视频页面会自动出现下载按钮或提示。
3. 点击下载按钮即可保存高清视频，无需额外操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_openInTab` | 用于在新标签页打开下载链接或页面。 |
| `GM.openInTab` | 用于在新标签页打开下载链接或页面（新版API）。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取视频资源。 |
| `GM_addStyle` | 用于为页面添加自定义样式，优化界面显示。 |
| `GM_setValue` | 用于保存用户设置或下载历史。 |
| `GM_getValue` | 用于读取用户设置或下载历史。 |
| `GM_download` | 用于直接下载视频文件到本地。 |
| `unsafeWindow` | 用于访问和操作网页的原始窗口对象，增强脚本功能。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-06-15

> 脚本主要用于视频下载，声明了大量第三方 CDN 域名用于网络请求，存在数据外传风险。未发现隐私采集、代码混淆、DOM XSS 或供应链风险，但高权限申请存在滥用可能。建议进一步审查实际网络请求内容，确保不泄露用户敏感信息。

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
> 脚本申请了 GM_xmlhttpRequest 权限，并声明 @connect 多个第三方视频 CDN 域名，存在数据外传风险。  
> 位置：元数据 @grant/@connect  
> 建议：确保所有网络请求仅用于视频下载，不携带用户敏感数据、Cookie 或页面内容。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_download、unsafeWindow 等高权限，但代码未展示实际用途，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，移除未使用或高风险权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more)*
