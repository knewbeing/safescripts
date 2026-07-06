---
title: "全站视频下载按钮"
---

# 全站视频下载按钮

`视频下载`  `社交媒体`  `一键操作`  `播放器增强`  `多平台支持`  `实用工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Download_Videos_from_Any_Site_YouTube_TikTok_Instagram_X_More.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.4**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/583475-download-videos-from-any-site-youtube-tiktok-instagram-x-more) <Badge type="tip" text="GreasyFork" />　　安装量：**816**　　评分：👍2 / 👎0

## 功能介绍

在各大视频网站播放器界面添加下载按钮，方便用户一键下载视频。支持通过 Chill Downloader 应用或网站快速保存视频。操作简单，无需复杂设置。

## 适用网站

- YouTube
- TikTok
- Instagram
- Facebook
- FB Watch
- Twitter
- X
- Threads
- 抖音
- 小红书
- Snapchat
- Pinterest
- TED
- Spotify

## 使用方法

1. 安装脚本后，访问支持的网站如YouTube、抖音等。
2. 在视频播放器控制栏看到新增下载按钮。
3. 点击下载按钮，选择通过 Chill Downloader 应用或网站保存视频。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_openInTab` | 用于在新标签页打开 Chill Downloader 网站或下载页面。 |
| `GM_addStyle` | 用于为下载按钮和界面添加自定义样式。 |
| `GM_setValue` | 用于保存用户偏好设置，如按钮显示状态。 |
| `GM_getValue` | 用于读取用户偏好设置，保持脚本个性化体验。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-07-06

> 该脚本存在严重的数据外传和隐私采集风险，因其会将当前页面的视频/音频 URL 发送到第三方服务（包括 chilldownloader.com、tool77.com、spotriff.com 等），可能泄露用户访问内容。未发现远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险等问题。建议移除未使用的 GM_openInTab 权限，并明确告知用户数据传递行为。整体安全评分为 50，风险等级为 CRITICAL。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：chilldownloader://download?url=, https://chilldownloader.com, https://www.tool77.com/it/v/downloader?url={url}） |
| 隐私采集 | ❌ 检测到（传递当前页面视频/音频 URL 到第三方服务，可能间接泄露用户访问内容） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 chilldownloader://download?url=、https://chilldownloader.com、https://www.tool77.com/it/v/downloader?url={url}、https://www.spotriff.com/en?url={raw} 等第三方服务传递当前页面视频/音频 URL，存在用户数据外传风险。  
> 位置：代码常量 APP_PROTOCOL, APP_SITE_URL, WEB_DOWNLOADER, SPOTIFY_DOWNLOADER 及相关点击事件  
> 建议：明确告知用户数据传递行为，避免传递敏感信息，建议仅在用户主动操作时触发。

**⛔ CRITICAL** — 隐私采集  
> 脚本未直接读取 cookie、localStorage、sessionStorage、IndexedDB、剪贴板或表单字段，但通过传递视频/音频 URL，可能间接泄露用户访问内容。  
> 位置：下载按钮点击事件，URL 拼接  
> 建议：限制传递内容，仅传递必要的公开资源链接，避免敏感参数。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML 执行 JS，也未动态加载远程 JS。  
> 位置：全局代码  
> 建议：保持当前实现，避免引入远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 脚本未发现明显代码混淆、base64 解码、字符串映射或高度压缩单行代码。  
> 位置：全局代码  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 DOM XSS 注入风险。  
> 位置：全局代码  
> 建议：继续避免直接插入不可信内容。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab 权限，但实际代码未使用该权限，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：移除未使用的高权限申请。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局代码  
> 建议：保持当前实现，避免敏感 API 滥用。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议固定版本哈希并使用可信 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局代码  
> 建议：继续避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/583475-download-videos-from-any-site-youtube-tiktok-instagram-x-more)*
