---
title: "多合一视频下载器（支持：YouTube, TikTok, Instagram等）"
---

# 多合一视频下载器（支持：YouTube, TikTok, Instagram等）

`视频下载`  `社交平台`  `无水印`  `高清视频`  `多平台`  `便捷工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/All-in-One_Video_Downloader_HD_YouTube_TikTok_Instagram_X_More.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.14**　　发现时间：**2026-06-08**　　来源：[GreasyFork](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more) <Badge type="tip" text="GreasyFork" />　　安装量：**36,857**　　评分：👍21 / 👎10

## 功能介绍

多合一视频下载器，支持从主流社交和视频平台下载高清视频。下载过程快速、免费，无水印，操作简单。适用于YouTube、TikTok、抖音、Instagram、Facebook、Threads、小红书、TED、X（Twitter）等。

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

## 使用方法

1. 安装脚本后，访问支持的视频或社交网站。
2. 在视频页面会出现下载按钮或选项。
3. 点击下载按钮即可保存高清视频，无水印。
4. 如需设置或管理下载记录，可在页面找到相关入口。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_openInTab` | 用于在新标签页打开下载链接或页面。 |
| `GM.openInTab` | 用于在新标签页打开下载链接或页面（新版API）。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取视频资源。 |
| `GM_addStyle` | 用于添加自定义样式，让下载按钮等界面更美观。 |
| `GM_setValue` | 用于保存用户设置或下载记录。 |
| `GM_getValue` | 用于读取用户设置或下载记录。 |
| `GM_download` | 用于直接下载视频文件到本地。 |
| `unsafeWindow` | 允许脚本访问网页的原始窗口对象，增强功能。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-06-08

> 该脚本主要用于多平台视频下载，未见明显的数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 滥用等高危行为。主要风险为申请了较多高权限（如 GM_openInTab、GM_download、unsafeWindow）但未见实际使用，建议最小化权限。数据传输仅限于视频 CDN 域名，未见上传用户数据。整体安全风险较低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：googlevideo.com, tiktokcdn.com, snssdk.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 数据外传风险  
> 脚本申请了 GM_xmlhttpRequest 权限并声明了大量 @connect 域名，允许跨域访问视频 CDN，但未见明显的数据外传或统计追踪代码。  
> 位置：元数据区  
> 建议：确保仅用于视频下载请求，不要上传用户数据或页面内容。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_download、unsafeWindow 等高权限，但代码未见实际使用。  
> 位置：元数据区  
> 建议：仅申请实际需要的权限，移除未使用的高权限申请。

**🟡 LOW** — 远程代码执行  
> 脚本未见 eval、new Function、setTimeout(string) 等动态代码执行，也无远程 @require。  
> 位置：全局  
> 建议：保持当前实现，避免远程代码执行风险。

**🟡 LOW** — 隐私采集  
> 脚本未见 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板、键盘监听等隐私采集行为。  
> 位置：全局  
> 建议：保持当前实现，避免隐私采集。

**🟡 LOW** — 代码混淆  
> 脚本未见代码混淆、base64 解码、字符串数组映射或高度压缩代码。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

**🟡 LOW** — DOM XSS  
> 脚本未见 DOM XSS、document.write、innerHTML 注入等注入风险。  
> 位置：全局  
> 建议：继续避免不可信内容插入 DOM。

**🟡 LOW** — 敏感 API  
> 脚本未见敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Notification、Clipboard）调用。  
> 位置：全局  
> 建议：避免调用敏感 API，保护用户隐私。

**🟡 LOW** — 供应链风险  
> 脚本未见 @require 加载第三方库，无供应链风险。  
> 位置：元数据区  
> 建议：如需第三方库，建议固定版本并使用可信 CDN。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/563321-all-in-one-video-downloader-hd-youtube-tiktok-instagram-x-more)*
