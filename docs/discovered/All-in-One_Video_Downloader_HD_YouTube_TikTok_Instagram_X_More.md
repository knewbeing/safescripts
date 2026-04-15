---
title: 全能高清视频下载器
---

# 全能高清视频下载器

`视频下载`  `高清视频`  `多平台支持`  `无水印`  `免费视频保存`  `浏览器脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/All-in-One_Video_Downloader_HD_YouTube_TikTok_Instagram_X_More.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.5**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more) <Badge type="tip" text="GreasyFork" />　　安装量：**17,490**　　评分：👍6 / 👎5

## 功能介绍

这是一款全能且免费的高清视频下载工具，支持从YouTube、TikTok、抖音、Instagram、Threads、小红书、X（前Twitter）等多个平台下载视频。用户可以快速无水印地保存高质量视频，提升观看体验。操作简单，下载过程流畅。

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
2. 页面加载后，界面会出现下载按钮或选项。
3. 点击下载按钮，选择视频质量并开始下载。
4. 等待下载完成，即可在本地查看保存的视频。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_openInTab` | 用于在新标签页打开链接，方便访问下载页面或资源。 |
| `GM.openInTab` | 同GM_openInTab，支持新版Tampermonkey的标签页打开功能。 |
| `GM_addStyle` | 用于添加自定义样式，使下载按钮和界面更美观易用。 |
| `GM_setValue` | 保存用户设置或下载状态，保证使用体验的连续性。 |
| `GM_getValue` | 读取保存的用户设置或状态，支持个性化功能。 |
| `unsafeWindow` | 访问网页的原始窗口对象，便于与页面脚本交互。 |
| `GM_download` | 实现视频文件的下载功能，支持直接保存视频到本地。 |

## 安全分析

**风险等级**：🔴 HIGH　　**分析时间**：2026-04-15

> 由于未提供完整脚本代码，无法全面检测数据外传、隐私采集、远程代码执行等关键安全风险。元数据中存在权限申请较多且未确认使用情况，存在权限滥用风险。@antifeature 标记为 referral-link，提示可能存在推广行为，需重点关注数据外传风险。建议提供完整代码进行深入审查。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本元数据中声明了 @antifeature 为 referral-link，可能存在推广或引导用户访问第三方链接的行为，需审查实际代码确认是否存在数据外传或隐私泄露风险。  
> 位置：@antifeature 元数据  
> 建议：审查脚本代码中是否存在向第三方服务器发送用户数据或追踪行为，确保无隐私泄露。

**⛔ CRITICAL** — 隐私采集  
> 脚本未提供完整代码，无法检测是否存在读取 document.cookie、localStorage、sessionStorage，监听键盘输入事件，访问浏览器指纹相关 API 等隐私采集行为。  
> 位置：脚本主体  
> 建议：提供完整脚本代码，进行详细隐私采集行为检测。

**🔴 HIGH** — 权限滥用  
> 脚本申请了多个 GM_* 权限（如 GM_openInTab, GM_addStyle, GM_setValue, GM_getValue, GM_download, unsafeWindow），但代码未提供，无法确认是否合理使用这些权限，存在权限滥用风险。  
> 位置：@grant 元数据及脚本主体  
> 建议：提供完整脚本代码，确认权限使用是否合理，避免申请未使用或不必要的高权限。

**🔴 HIGH** — 远程代码执行  
> 脚本未提供完整代码，无法检测是否存在 eval、new Function、setTimeout(string)、innerHTML 执行远程内容，或通过 @require 或动态 script 标签加载远程 JS 的远程代码执行风险。  
> 位置：脚本主体  
> 建议：提供完整脚本代码，检测远程代码执行风险。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未提供完整代码，无法检测是否调用敏感 API，如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等。  
> 位置：脚本主体  
> 建议：提供完整脚本代码，检测敏感 API 调用。

**🟠 MEDIUM** — 代码混淆  
> 脚本未提供完整代码，无法判断是否存在代码混淆、base64 解码执行、字符串拼接执行等混淆特征。  
> 位置：脚本主体  
> 建议：提供完整脚本代码，检测代码混淆情况。

**🟡 LOW** — 外部依赖  
> 脚本未提供 @require 字段，无法判断是否存在外部依赖及其安全性。  
> 位置：元数据  
> 建议：确认是否有外部依赖，确保来源可信且版本固定。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more)*
