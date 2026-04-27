---
title: "多合一视频下载器（支持：YouTube, TikTok, Instagram等）"
---

# 多合一视频下载器（支持：YouTube, TikTok, Instagram等）

`视频下载`  `无水印`  `多平台`  `高清视频`  `社交媒体`  `便捷工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/All-in-One_Video_Downloader_HD_YouTube_TikTok_Instagram_X_More.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.8**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more) <Badge type="tip" text="GreasyFork" />　　安装量：**21,463**　　评分：👍7 / 👎6

## 功能介绍

多合一视频下载器，支持从主流平台如YouTube、TikTok、抖音、Instagram、Threads、小红书、X（Twitter）等下载高清视频。下载过程快速、无水印，操作便捷，适合需要保存网络视频的用户。

## 适用网站

- YouTube
- X（原Twitter）
- Threads
- Instagram
- TikTok
- 抖音
- 小红书
- Google视频
- TikTok CDN
- 抖音视频
- Facebook CDN
- Twitter视频
- ZJ CDN
- 今日头条
- TikTok国际版
- 抖音静态资源
- 小红书CDN
- 抖音短视频
- TikWM
- TikTok欧洲/美国CDN
- 抖音图片

## 使用方法

1. 1. 安装脚本后，访问支持的视频网站（如YouTube、TikTok等）。
2. 2. 在视频页面会自动显示下载按钮或选项。
3. 3. 点击下载按钮，选择清晰度后即可保存视频。
4. 4. 下载的视频无水印，直接保存到本地。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_openInTab` | 在新标签页打开下载链接或页面。 |
| `GM.openInTab` | 在新标签页打开下载链接或页面（新版API）。 |
| `GM_xmlhttpRequest` | 发送网络请求获取视频资源。 |
| `GM_addStyle` | 为页面添加自定义样式，优化下载按钮显示。 |
| `GM_setValue` | 保存用户设置或下载历史。 |
| `GM_getValue` | 读取用户设置或下载历史。 |
| `GM_download` | 直接下载视频文件到本地。 |
| `unsafeWindow` | 允许脚本访问网页的原始窗口对象，增强功能。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：64/100　　**分析时间**：2026-04-27

> 该脚本主要用于视频下载，网络请求目标均为视频 CDN，未见明显隐私采集、代码混淆、远程代码执行或 DOM XSS 风险。最大风险为数据外传（视频下载请求可能携带敏感信息）和权限滥用（申请了高权限但未展示实际用途）。建议进一步审查实际网络请求内容及权限使用情况。

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
> 建议：确保所有网络请求仅用于视频下载，不携带用户敏感信息、Cookie 或页面内容。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_download、unsafeWindow 等高权限，但代码未展示实际使用情况，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的最低权限，移除未使用或高风险权限。

**🟡 LOW** — 供应链风险  
> 未见 @require 加载第三方库，供应链风险较低，但 downloadURL/updateURL 指向 GreasyFork 官方，安全性较高。  
> 位置：元数据 @require/@downloadURL  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — 远程代码执行/混淆  
> 未见 eval/new Function/setTimeout(string) 等远程代码执行相关用法，代码混淆特征也未发现。  
> 位置：完整代码  
> 建议：保持代码可读性，避免动态执行字符串代码。

**🟡 LOW** — 隐私采集  
> 未见 document.cookie/localStorage/sessionStorage/IndexedDB/剪贴板读取/键盘监听等隐私采集行为。  
> 位置：完整代码  
> 建议：保持不采集用户隐私数据。

**🟡 LOW** — DOM XSS  
> 未见 DOM XSS 注入风险，未直接插入用户输入到 innerHTML/outerHTML。  
> 位置：完整代码  
> 建议：继续避免 DOM 注入风险。

**🟡 LOW** — WebSocket风险  
> 未见 WebSocket/EventSource 用法，暂无实时数据外传风险。  
> 位置：完整代码  
> 建议：如需使用 WebSocket，需严格限制数据类型和目的地。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more)*
