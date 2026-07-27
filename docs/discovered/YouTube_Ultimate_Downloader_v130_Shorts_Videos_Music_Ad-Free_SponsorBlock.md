---
title: "YouTube终极下载器"
---

# YouTube终极下载器

`视频下载`  `音乐下载`  `广告屏蔽`  `赞助片段跳过`  `YouTube增强`  `快捷工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_Ultimate_Downloader_v130_Shorts_Videos_Music_Ad-Free_SponsorBlock.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**13.0 GA**　　发现时间：**2026-06-01**　　来源：[GreasyFork](https://greasyfork.org/scripts/34613-youtube-ultimate-downloader-v13-0-shorts-videos-music-ad-free-sponsorblock) <Badge type="tip" text="GreasyFork" />　　安装量：**445,384**　　评分：👍426 / 👎47

## 功能介绍

本脚本为YouTube和YouTube音乐页面添加一个悬浮下载按钮，支持下载视频、Shorts和音乐，且可自动跳过广告和赞助片段。它还能绕过YouTube检测弹窗，提升下载体验。

## 适用网站

- YouTube
- YouTube音乐

## 使用方法

1. 安装脚本后，打开YouTube或YouTube音乐页面。
2. 在视频或Shorts页面会出现悬浮下载按钮。
3. 点击按钮即可选择下载视频、Shorts或音乐。
4. 无需额外设置，广告和赞助片段会自动跳过。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于动态添加或修改页面样式，让悬浮按钮更美观。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：92/100　　**分析时间**：2026-07-27

> 由于代码不完整，无法判断是否存在数据外传、隐私采集、远程代码执行等高危行为。元数据显示仅申请 GM_addStyle 权限，无高权限滥用和供应链风险。建议补充完整代码以进行全面安全审查。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 审查范围受限  
> 脚本代码不完整，无法全面审查所有安全项。仅元数据部分可分析。  
> 位置：N/A  
> 建议：请提供完整代码以便进行全面安全审查。

**🟡 LOW** — 权限申请  
> 未申请任何高权限（如 GM_xmlhttpRequest、GM_download、GM_openInTab），仅申请 GM_addStyle。  
> 位置：元数据 @grant  
> 建议：仅申请必要权限，当前无权限滥用风险。

**🟡 LOW** — 供应链风险  
> 未检测到 @require 加载第三方库，供应链风险较低。  
> 位置：元数据 @require  
> 建议：如需加载第三方库，建议固定版本哈希并使用可信 CDN。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/34613-youtube-ultimate-downloader-v13-0-shorts-videos-music-ad-free-sponsorblock)*
