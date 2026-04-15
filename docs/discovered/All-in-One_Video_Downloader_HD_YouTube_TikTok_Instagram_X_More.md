---
title: 全能高清视频下载器
---

# 全能高清视频下载器

`视频下载`  `高清视频`  `多平台支持`  `无水印`  `下载工具`  `视频收藏`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/All-in-One_Video_Downloader_HD_YouTube_TikTok_Instagram_X_More.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.5**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more) <Badge type="tip" text="GreasyFork" />　　安装量：**17,490**　　评分：👍6 / 👎5

## 功能介绍

这是一款全能且免费的高清视频下载工具，支持从YouTube、TikTok、抖音、Instagram、Threads、小红书、X（前Twitter）等多个平台下载视频。用户可以轻松获取无水印的高清内容，提升观看体验。操作简单，下载快速，适合喜欢收藏视频的用户。

## 适用网站

- YouTube
- X（前Twitter）
- Threads
- Instagram短视频
- TikTok
- 抖音
- 小红书

## 使用方法

1. 安装脚本后，访问支持的视频网站页面。
2. 页面加载时，脚本自动检测视频并显示下载按钮。
3. 点击下载按钮选择清晰度和格式开始下载。
4. 下载完成后，可在本地查看高清无水印视频。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_openInTab` | 允许脚本在新标签页打开链接，方便访问下载页面。 |
| `GM.openInTab` | 同上，支持新版Tampermonkey的打开新标签页功能。 |
| `GM_addStyle` | 允许脚本添加自定义样式，优化界面显示。 |
| `GM_setValue` | 允许脚本保存数据，记住用户设置。 |
| `GM_getValue` | 允许脚本读取保存的数据，恢复用户设置。 |
| `unsafeWindow` | 允许脚本访问网页的原始窗口对象，增强功能实现。 |
| `GM_download` | 允许脚本直接下载文件，实现视频保存功能。 |

## 安全分析

**风险等级**：🔴 HIGH　　**分析时间**：2026-04-15

> 该脚本元数据中申请了较多高权限，但未见对应代码使用，存在权限滥用风险。声明了 referral-link 反特征，可能涉及推广或数据外传。由于缺少完整代码，无法确认是否存在数据外传、隐私采集或远程代码执行等严重安全问题。建议提供完整代码后重新审查。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本元数据中声明了 @antifeature 为 referral-link，可能存在推广或引导用户访问第三方链接的行为，需进一步确认是否涉及数据外传或隐私采集。  
> 位置：元数据 @antifeature 声明  
> 建议：审查脚本是否包含推广链接或数据上报行为，确保无用户隐私泄露。

**⛔ CRITICAL** — 代码缺失  
> 脚本元数据和代码片段未提供完整代码，无法全面检测是否存在数据外传、隐私采集、远程代码执行等安全风险。  
> 位置：脚本完整代码缺失  
> 建议：提供完整脚本代码以进行全面安全审查。

**🔴 HIGH** — 权限滥用  
> 脚本申请了多个 GM_* 权限（如 GM_openInTab, GM_addStyle, GM_setValue, GM_getValue, GM_download, unsafeWindow），但未见代码中实际使用这些权限的实现，存在权限滥用风险。  
> 位置：元数据 @grant 声明  
> 建议：确认脚本实际使用的权限，移除未使用的高权限申请，减少权限滥用风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more)*
