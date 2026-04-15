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

> 由于未提供完整脚本代码，无法全面检测数据外传、隐私采集、远程代码执行等关键安全风险。元数据中存在权限申请较多且未确认使用情况，存在权限滥用风险。@antifeature 标记为 referral-link，提示可能存在推广或追踪行为，需重点关注。建议提供完整代码进行深入分析。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本元数据中声明了 @antifeature 为 referral-link，可能存在推广或追踪行为。  
> 位置：@antifeature 元数据  
> 建议：审查脚本是否包含推广链接或追踪代码，确保用户隐私安全。

**⛔ CRITICAL** — 数据外传  
> 脚本代码未提供，无法检测是否存在数据外传行为（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、navigator.sendBeacon 等）。  
> 位置：脚本主体  
> 建议：提供完整代码以便检测是否有数据外传行为。

**⛔ CRITICAL** — 隐私采集  
> 脚本代码未提供，无法检测是否存在隐私采集行为（如读取 cookie、localStorage，监听键盘输入，访问浏览器指纹 API 等）。  
> 位置：脚本主体  
> 建议：提供完整代码以便检测是否有隐私采集行为。

**🔴 HIGH** — 权限滥用  
> 脚本申请了多个 GM_* 权限（如 GM_openInTab, GM_addStyle, GM_setValue, GM_getValue, GM_download, unsafeWindow），但代码未提供，无法确认是否合理使用，存在权限滥用风险。  
> 位置：@grant 元数据  
> 建议：确认脚本实际代码中是否使用了所有申请的权限，避免申请未使用的高权限。

**🔴 HIGH** — 远程代码执行  
> 脚本代码未提供，无法检测是否存在远程代码执行风险（如 eval、new Function、动态加载远程脚本等）。  
> 位置：脚本主体  
> 建议：提供完整代码以便检测远程代码执行风险。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本代码未提供，无法检测是否调用敏感 API（如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等）。  
> 位置：脚本主体  
> 建议：提供完整代码以便检测敏感 API 调用。

**🟠 MEDIUM** — 代码混淆  
> 脚本代码未提供，无法检测是否存在代码混淆或动态解码执行行为。  
> 位置：脚本主体  
> 建议：提供完整代码以便检测代码混淆情况。

**🟡 LOW** — 外部依赖  
> 脚本元数据未显示 @require 字段，未检测到外部依赖。  
> 位置：元数据  
> 建议：无

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more)*
