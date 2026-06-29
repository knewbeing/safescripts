---
title: "多合一视频下载器（支持：YouTube, TikTok, Instagram等）"
---

# 多合一视频下载器（支持：YouTube, TikTok, Instagram等）

`视频下载`  `多平台`  `无水印`  `高清视频`  `社交媒体`  `便捷工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/All-in-One_Video_Downloader_HD_YouTube_TikTok_Instagram_X_More.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.15**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more) <Badge type="tip" text="GreasyFork" />　　安装量：**44,223**　　评分：👍22 / 👎11

## 功能介绍

多合一视频下载器，支持从多个主流平台（如YouTube、TikTok、抖音、Instagram、Facebook、Threads、小红书、TED、X等）下载高清视频。下载过程快速、免费，无水印，操作便捷。

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

1. 安装脚本后，访问支持的视频网站（如YouTube、TikTok等）。
2. 在视频页面会自动显示下载按钮或界面。
3. 点击下载按钮即可保存高清视频，无水印。
4. 如需设置或查看下载历史，可在界面中操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_openInTab` | 用于在新标签页打开下载链接或页面。 |
| `GM.openInTab` | 用于在新标签页打开下载链接或页面（新版API）。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取视频资源。 |
| `GM_addStyle` | 用于添加自定义样式，让下载按钮或界面更美观。 |
| `GM_setValue` | 用于保存用户设置或下载历史。 |
| `GM_getValue` | 用于读取用户设置或下载历史。 |
| `GM_download` | 用于直接下载视频文件到本地。 |
| `unsafeWindow` | 允许脚本访问网页的原始窗口对象，增强功能兼容性。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-06-29

> 脚本元数据未发现明显恶意行为，但由于缺少完整实现代码，无法排查数据外传、隐私采集、远程代码执行等关键风险。已发现权限申请过高问题。建议补充完整代码并最小化权限申请。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 代码不完整  
> 脚本未展示完整实现代码，无法确认是否存在数据外传、隐私采集、远程代码执行等高危行为。  
> 位置：代码主体缺失  
> 建议：请补充完整实现代码以进行全面安全审查。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM.openInTab、GM_download、unsafeWindow 等高权限，但代码未展示实际使用情况，存在权限滥用风险。  
> 位置：@grant 元数据  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

**🟠 MEDIUM** — 供应链风险  
> 脚本未包含任何第三方库的 @require，但如后续引入应注意供应链安全。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用官方 CDN 并锁定版本哈希。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more)*
