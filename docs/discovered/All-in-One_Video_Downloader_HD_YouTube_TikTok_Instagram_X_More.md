---
title: "多合一视频下载器（支持：YouTube, TikTok, Instagram等）"
---

# 多合一视频下载器（支持：YouTube, TikTok, Instagram等）

`视频下载`  `社交平台`  `无水印`  `高清视频`  `多平台`  `便捷工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/All-in-One_Video_Downloader_HD_YouTube_TikTok_Instagram_X_More.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.15**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more) <Badge type="tip" text="GreasyFork" />　　安装量：**41,849**　　评分：👍21 / 👎10

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
- Spotify

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
| `GM_xmlhttpRequest` | 用于发送网络请求，获取视频资源。 |
| `GM_addStyle` | 用于为页面添加自定义样式，优化界面显示。 |
| `GM_setValue` | 用于保存用户设置或下载历史。 |
| `GM_getValue` | 用于读取用户设置或下载历史。 |
| `GM_download` | 用于直接下载视频文件到本地。 |
| `unsafeWindow` | 允许脚本访问网页的原始窗口对象，增强功能。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：47/100　　**分析时间**：2026-06-22

> 该脚本元数据声明了大量高权限和跨域访问，但缺少完整代码，无法判断是否存在隐私泄露、远程代码执行等高危行为。仅凭元数据，存在中等权限滥用和数据外传风险，且因代码缺失存在重大未知风险，安全性无法保证。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：googlevideo.com, tiktokcdn.com, snssdk.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 代码完整性/未知风险  
> 脚本未见代码主体，无法确认是否存在隐私采集、远程代码执行、混淆、XSS 等高危行为。  
> 位置：代码主体缺失  
> 建议：需补充完整代码进行全面审查。

**🟠 MEDIUM** — 数据外传权限  
> 脚本申请了 GM_xmlhttpRequest 权限并声明了大量 @connect 域名，允许跨域请求视频 CDN，但未见明显用户数据外传逻辑。  
> 位置：元数据 @grant/@connect  
> 建议：确保仅用于视频资源下载，不要上传用户敏感信息。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_download、GM_openInTab、unsafeWindow 等高权限，但代码未见实际使用逻辑（代码不完整，需完整代码确认）。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，避免权限滥用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more)*
