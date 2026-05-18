---
title: "多合一视频下载器（支持：YouTube, TikTok, Instagram等）"
---

# 多合一视频下载器（支持：YouTube, TikTok, Instagram等）

`视频下载`  `多平台`  `无水印`  `高清视频`  `社交媒体`  `便捷工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/All-in-One_Video_Downloader_HD_YouTube_TikTok_Instagram_X_More.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.10**　　发现时间：**2026-05-18**　　来源：[GreasyFork](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more) <Badge type="tip" text="GreasyFork" />　　安装量：**29,294**　　评分：👍16 / 👎7

## 功能介绍

本脚本是一款多合一的视频下载工具，支持在YouTube、TikTok、抖音、Instagram、Facebook、Threads、小红书、TED、X（原Twitter）等主流平台下载高清视频。下载过程快速、免费且无水印，方便用户保存喜欢的视频内容。

## 适用网站

- YouTube
- TikTok
- 抖音
- Instagram
- Threads
- 小红书
- TED
- Facebook
- X（原Twitter）

## 使用方法

1. 1. 安装脚本后，访问支持的视频网站（如YouTube、TikTok等）。
2. 2. 在视频页面会出现下载按钮或相关提示。
3. 3. 点击下载按钮，选择所需的视频清晰度，即可保存视频到本地。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_openInTab` | 用于在新标签页打开下载链接或页面。 |
| `GM.openInTab` | 与GM_openInTab类似，用于兼容不同脚本管理器。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取视频资源或相关数据。 |
| `GM_addStyle` | 用于为页面添加自定义样式，美化或突出下载按钮。 |
| `GM_setValue` | 用于本地保存设置或缓存数据。 |
| `GM_getValue` | 用于读取本地保存的设置或缓存数据。 |
| `GM_download` | 直接下载视频文件到本地。 |
| `unsafeWindow` | 允许脚本访问网页的原始窗口对象，实现更深层次的页面交互。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：27/100　　**分析时间**：2026-05-18

> 该脚本元数据区权限申请较高，声明了大量 @connect 域名，存在较大数据外传和隐私采集风险。由于缺少完整代码，无法对实际行为做出准确判断，建议补充完整代码进行详细审查。当前安全评分为 27，风险等级为 CRITICAL，不建议在生产环境或含敏感信息的环境中使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传风险  
> 脚本申请了 GM_xmlhttpRequest 权限并声明了大量 @connect 域名，但完整代码缺失，无法确认是否存在数据外传行为。  
> 位置：元数据区  
> 建议：补充完整代码，重点检查 GM_xmlhttpRequest、fetch、WebSocket 等网络请求是否向第三方服务器发送用户数据。

**⛔ CRITICAL** — 隐私采集风险  
> 脚本未见隐私采集相关 API 调用，但完整代码缺失，无法完全排除。  
> 位置：元数据区  
> 建议：补充完整代码，检查是否读取 cookie、localStorage、表单、剪贴板等敏感信息。

**🔴 HIGH** — 远程代码执行/混淆风险  
> 脚本未见代码混淆、eval、new Function、innerHTML 注入等高危特征，但完整代码缺失，无法完全排除。  
> 位置：元数据区  
> 建议：补充完整代码，检查是否存在远程代码执行或混淆行为。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_download、unsafeWindow 等高权限，但完整代码缺失，无法确认是否存在权限滥用。  
> 位置：元数据区  
> 建议：补充完整代码，核查高权限 API 的实际用途，避免滥用。

**🟡 LOW** — 供应链风险  
> 脚本未包含 @require 第三方库，供应链风险较低。  
> 位置：元数据区  
> 建议：如需引入第三方库，建议使用可信官方 CDN 并锁定版本哈希。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more)*
