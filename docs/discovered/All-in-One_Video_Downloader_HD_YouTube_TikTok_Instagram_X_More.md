---
title: "多合一视频下载器（支持：YouTube, TikTok, Instagram等）"
---

# 多合一视频下载器（支持：YouTube, TikTok, Instagram等）

`视频下载`  `社交平台`  `无水印`  `多平台`  `高清视频`  `工具脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/All-in-One_Video_Downloader_HD_YouTube_TikTok_Instagram_X_More.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.15**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more) <Badge type="tip" text="GreasyFork" />　　安装量：**46,519**　　评分：👍24 / 👎11

## 功能介绍

多合一视频下载器，支持从主流社交和视频平台下载高清视频。操作简单，下载无水印，适用于多种网站。免费且快速，满足多平台视频保存需求。

## 适用网站

- YouTube
- TikTok
- 抖音
- Instagram
- Facebook
- Threads
- 小红书
- TED
- X（Twitter）
- Snapchat
- Pinterest
- Spotify

## 使用方法

1. 安装脚本后，访问支持的视频网站，如YouTube、TikTok等。
2. 在视频页面会出现下载按钮或提示。
3. 点击下载按钮即可保存高清视频，无水印。
4. 如需设置或管理下载记录，可在脚本界面操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_openInTab` | 用于在新标签页打开下载链接或页面。 |
| `GM.openInTab` | 用于在新标签页打开下载链接或页面（新版API）。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取视频资源。 |
| `GM_addStyle` | 用于为页面添加自定义样式，优化界面显示。 |
| `GM_setValue` | 用于保存脚本设置或下载记录。 |
| `GM_getValue` | 用于读取脚本保存的设置或记录。 |
| `GM_download` | 用于直接下载视频文件到本地。 |
| `unsafeWindow` | 允许脚本访问网页的原生窗口对象，增强功能。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：47/100　　**分析时间**：2026-07-06

> 该脚本主要风险在于大量第三方域名的网络连接权限，可能导致数据外传。未见隐私采集、代码混淆、远程代码执行、DOM XSS、供应链风险等问题，但高权限申请存在滥用风险。建议收紧 @connect/@grant 权限，确保仅用于视频下载且不泄露用户敏感数据。

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
> 建议：仅允许必要的域名连接，避免向第三方发送用户敏感数据。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_download、unsafeWindow 等高权限，但代码未展示实际用途，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，移除未使用或高风险权限。

**🟡 LOW** — 远程代码执行  
> 未见代码混淆、eval、动态 script 加载等远程代码执行风险。  
> 位置：主代码段  
> 建议：保持代码透明，避免混淆和动态加载。

**🟡 LOW** — 隐私采集  
> 未见敏感隐私采集（如 cookie、localStorage、剪贴板、表单、指纹 API）行为。  
> 位置：主代码段  
> 建议：保持不采集用户隐私数据。

**🟡 LOW** — DOM XSS  
> 未见 DOM XSS 注入风险。  
> 位置：主代码段  
> 建议：继续避免直接插入用户输入到 DOM。

**🟡 LOW** — 供应链风险  
> 未见供应链风险（未使用 @require 加载第三方库）。  
> 位置：元数据  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more)*
