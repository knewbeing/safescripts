---
title: 全能高清视频下载器
---

# 全能高清视频下载器

`视频下载`  `高清视频`  `多平台支持`  `无水印`  `浏览器脚本`  `免费视频保存`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/All-in-One_Video_Downloader_HD_YouTube_TikTok_Instagram_X_More.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.5**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more) <Badge type="tip" text="GreasyFork" />　　安装量：**17,477**　　评分：👍6 / 👎5

## 功能介绍

这是一款全能且免费的高清视频下载工具，支持从YouTube、TikTok、抖音、Instagram、Threads、小红书、X（前Twitter）等多个平台下载视频。用户可以轻松获取无水印的高质量视频，下载过程快速流畅。无需复杂操作，即可享受便捷的视频保存体验。

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
2. 页面加载后，界面会显示下载按钮或选项。
3. 点击下载按钮，选择视频质量和保存位置。
4. 等待下载完成，即可离线观看视频。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_openInTab` | 允许脚本在新标签页打开链接，方便下载或跳转。 |
| `GM.openInTab` | 同上，支持新版API打开新标签页。 |
| `GM_addStyle` | 允许脚本添加自定义样式，优化界面显示。 |
| `GM_setValue` | 允许脚本保存数据，记录用户设置或状态。 |
| `GM_getValue` | 允许脚本读取保存的数据，保持用户设置。 |
| `unsafeWindow` | 允许脚本访问网页的原生JavaScript环境，增强功能实现。 |
| `GM_download` | 允许脚本直接下载文件，支持视频保存。 |

## 安全分析

**风险等级**：🔴 HIGH　　**分析时间**：2026-04-15

> 由于提供的代码不完整，无法全面检测脚本的网络请求、隐私采集和远程代码执行行为。元数据中存在权限滥用和潜在的推荐链接风险，建议补充完整代码并核实权限使用情况，谨慎使用该脚本。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本元数据中声明了 @antifeature 为 referral-link，可能存在通过推荐链接引导用户访问第三方，存在潜在的数据外传风险。  
> 位置：元数据 @antifeature 声明  
> 建议：建议检查脚本是否在请求中携带用户数据或进行推荐链接跳转，确保无隐私泄露。

**⛔ CRITICAL** — 隐私采集  
> 脚本元数据和代码未提供完整内容，无法判断是否存在隐私采集行为（如读取 cookie、localStorage，监听键盘输入等）。  
> 位置：代码完整性  
> 建议：建议提供完整代码以进行全面安全审查。

**🔴 HIGH** — 权限滥用  
> 脚本申请了多个 GM_* 权限（如 GM_openInTab, GM_addStyle, GM_setValue, GM_getValue, GM_download, unsafeWindow），但未检测到代码中实际使用这些权限的实现，存在权限滥用风险。  
> 位置：元数据 @grant 声明  
> 建议：建议核实代码中是否真正使用了所有申请的权限，未使用的权限应移除以降低风险。

**🔴 HIGH** — 远程代码执行  
> 脚本元数据和代码未提供完整内容，无法全面分析是否存在远程代码执行风险（如 eval、new Function、动态加载远程脚本等）。  
> 位置：代码完整性  
> 建议：建议提供完整代码以进行全面安全审查。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more)*
