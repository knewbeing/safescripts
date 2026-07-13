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

**风险等级**：⛔ CRITICAL　　**安全评分**：47/100　　**分析时间**：2026-07-13

> 该脚本仅提供了元数据区，未包含任何实际可审查的 JavaScript 代码逻辑，无法判断其真实行为。元数据中申请了大量高权限（如 GM_openInTab、GM_xmlhttpRequest、GM_download、unsafeWindow），但未见实际用途，存在权限滥用风险。未发现数据外传、隐私采集、远程代码执行、混淆、XSS 等直接证据，但由于缺乏代码，无法排除高危行为。安全风险极高，不建议在生产环境或主力浏览器中安装。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 代码缺失/不可审查  
> 脚本未展示任何实际代码逻辑，无法判断是否存在数据外传、隐私采集、远程代码执行、混淆、XSS 等高危行为。  
> 位置：整体代码  
> 建议：应提供完整可审查的脚本代码，避免仅有元数据。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM.openInTab、GM_xmlhttpRequest、GM_download、unsafeWindow 等高权限，但代码未展示实际用途，存在权限滥用风险。  
> 位置：@grant 元数据  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

**🟡 LOW** — 供应链风险  
> 脚本未 @require 任何第三方库，供应链风险较低。  
> 位置：@require 元数据  
> 建议：如需引入第三方库，建议使用可信官方 CDN 并锁定版本。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more)*
