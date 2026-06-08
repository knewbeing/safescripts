---
title: "🔥🔥🔥全能视频下载器 【2026】最新"
---

# 🔥🔥🔥全能视频下载器 【2026】最新

`视频下载`  `多平台`  `无水印`  `社交媒体`  `一键操作`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/All-in-One_Video_Downloader_YouTube_Twitter_TikTok_Instagram_Facebook_-_Tenzaa.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.1**　　发现时间：**2026-05-11**　　来源：[GreasyFork](https://greasyfork.org/scripts/574417-all-in-one-video-downloader-youtube-twitter-tiktok-instagram-facebook-tenzaa) <Badge type="tip" text="GreasyFork" />　　安装量：**3,574**　　评分：👍5 / 👎1

## 功能介绍

全能视频下载器，支持在YouTube、Twitter、TikTok、Instagram和Facebook等主流平台上一键下载视频。可选择4K、MP3、MP4等格式，下载内容无水印。只需鼠标悬停即可快速下载。

## 适用网站

- YouTube
- X（原Twitter）
- Twitter
- TikTok
- Instagram
- Facebook

## 使用方法

1. 1. 安装脚本后，访问YouTube、Twitter、TikTok、Instagram或Facebook。
2. 2. 在视频上方将鼠标悬停，会出现下载按钮。
3. 3. 点击按钮，选择需要的格式（如4K、MP3、MP4），即可下载视频或音频。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，直接在网页上运行。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-06-08

> 该脚本存在严重的数据外传和隐私采集风险，会将当前页面的视频 URL 发送到第三方服务器（tenzaa.com），可能涉及用户隐私。未发现代码混淆和 DOM XSS 问题，远程代码执行风险较低，但需关注接口返回内容的处理。建议仅在信任该服务的前提下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://tenzaa.com/api/download） |
| 隐私采集 | ❌ 检测到（收集当前页面的视频 URL 并发送到第三方服务器） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 fetch 向 https://tenzaa.com/api/download 发送当前页面的视频 URL，可能包含用户行为数据。  
> 位置：主逻辑函数（fetch 调用）  
> 建议：仅发送必要的视频标识符，避免发送多余的用户数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本会收集当前页面的视频 URL 并发送到第三方服务器（tenzaa.com），属于隐私采集。  
> 位置：主逻辑函数（fetch 调用）  
> 建议：应明确告知用户数据用途，并最小化采集范围。

**🔴 HIGH** — 远程代码执行  
> 未发现代码混淆，但脚本通过 fetch 动态请求第三方接口，存在远程代码执行的间接风险（如接口返回 JS 并 eval）。  
> 位置：fetch 响应处理  
> 建议：确保不对接口返回内容进行 eval 或 new Function 执行。

**🟠 MEDIUM** — 权限滥用  
> 脚本未使用 @grant，但通过 fetch 访问第三方 API，若未来升级为 GM_xmlhttpRequest 等高权限接口，需关注权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请必要权限，避免未来升级时滥用。

**🟡 LOW** — 供应链风险  
> @require 未使用，供应链风险较低，但如未来引入第三方库需固定版本和来源。  
> 位置：元数据 @require  
> 建议：如需引入第三方库，建议使用官方 CDN 并锁定版本。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/574417-all-in-one-video-downloader-youtube-twitter-tiktok-instagram-facebook-tenzaa)*
