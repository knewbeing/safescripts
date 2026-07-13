---
title: "Universal Media Pro Toolkit | Video Download, URL Extract, Play"
---

# Universal Media Pro Toolkit | Video Download, URL Extract, Play



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Universal_Media_Pro_Toolkit_Video_Download_URL_Extract_Play.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.1**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/573660-universal-media-pro-toolkit-video-download-url-extract-play) <Badge type="tip" text="GreasyFork" />　　安装量：**132**　　评分：👍0 / 👎0

## 功能介绍



## 适用网站

- 通用

## 使用方法

- 请参阅脚本说明

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-07-13

> 该脚本主要功能为提取视频直链、下载媒体和悬浮播放。未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 等高危行为。唯一中等风险为第三方库依赖（hls.js），但已锁定版本且来源可信。权限申请合理，仅 GM_setClipboard。整体安全性较高，建议定期关注第三方库安全更新。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @require 加载了 hls.js 第三方库，来源为 jsdelivr 官方 CDN，且指定了明确版本号。  
> 位置：@require 元数据  
> 建议：保持使用官方 CDN 并锁定版本，避免使用未知来源或可变 URL。

**🟡 LOW** — 权限滥用  
> 脚本申请了 GM_setClipboard 权限，但未发现其他高权限申请。  
> 位置：@grant 元数据  
> 建议：仅申请实际需要的权限，避免权限滥用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/573660-universal-media-pro-toolkit-video-download-url-extract-play)*
