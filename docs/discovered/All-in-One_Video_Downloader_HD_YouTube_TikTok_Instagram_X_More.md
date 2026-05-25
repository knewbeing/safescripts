---
title: "多合一视频下载器（支持：YouTube, TikTok, Instagram等）"
---

# 多合一视频下载器（支持：YouTube, TikTok, Instagram等）

`视频下载`  `多平台`  `无水印`  `高清视频`  `社交媒体`  `便捷工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/All-in-One_Video_Downloader_HD_YouTube_TikTok_Instagram_X_More.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.11**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more) <Badge type="tip" text="GreasyFork" />　　安装量：**31,870**　　评分：👍18 / 👎9

## 功能介绍

多合一视频下载器，支持从主流视频平台（如YouTube、TikTok、抖音、Instagram、Facebook、Threads、TED、小红书、X等）下载高清视频。下载过程快速、免费，无水印，操作便捷。

## 适用网站

- YouTube
- TikTok
- 抖音
- Instagram
- Facebook
- Threads
- TED
- 小红书
- X（Twitter）

## 使用方法

1. 安装脚本后，访问支持的视频网站（如YouTube、TikTok等）。
2. 在视频页面会出现下载按钮或选项。
3. 点击下载按钮，选择视频质量后即可下载。
4. 下载的视频文件无水印，直接保存到本地。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_openInTab` | 允许在新标签页打开下载链接。 |
| `GM.openInTab` | 允许在新标签页打开下载链接（新版API）。 |
| `GM_xmlhttpRequest` | 允许脚本进行网络请求，获取视频资源。 |
| `GM_addStyle` | 允许脚本自定义页面样式。 |
| `GM_setValue` | 允许脚本保存设置或下载历史。 |
| `GM_getValue` | 允许脚本读取保存的数据。 |
| `GM_download` | 允许脚本直接下载文件到本地。 |
| `unsafeWindow` | 允许脚本访问网页的原始窗口对象，增强功能。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-05-25

> 脚本主要风险为数据外传（大量第三方 CDN 网络请求），并申请了高权限但未见实际用途，存在权限滥用隐患。未见隐私采集、代码混淆、远程代码执行、DOM XSS、供应链风险等问题。建议严格限制网络请求用途、精简权限申请。

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
> 脚本申请了 GM_xmlhttpRequest 权限，并通过 @connect 指定了多个第三方视频 CDN 域名，存在数据外传风险。  
> 位置：元数据 @grant/@connect  
> 建议：确保所有网络请求仅用于视频下载，不携带用户敏感信息、Cookie、页面内容等。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_download、unsafeWindow 等高权限，但代码未展示实际用途，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的最低权限，避免滥用高权限。

**🟡 LOW** — 远程代码执行  
> 未见代码混淆、eval、动态 script 加载等远程代码执行风险。  
> 位置：代码结构  
> 建议：保持代码透明，避免混淆和动态执行。

**🟡 LOW** — 隐私采集  
> 未见敏感隐私采集（如 document.cookie、localStorage、剪贴板、表单监听等）。  
> 位置：代码结构  
> 建议：继续保持不采集用户隐私。

**🟡 LOW** — DOM XSS  
> 未见 DOM XSS 注入风险（如 innerHTML/outerHTML 插入用户输入）。  
> 位置：代码结构  
> 建议：继续避免直接插入用户输入到 DOM。

**🟡 LOW** — 供应链风险  
> 未见供应链风险（无 @require 第三方库）。  
> 位置：元数据  
> 建议：如需引入第三方库，建议固定版本哈希并使用官方 CDN。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more)*
