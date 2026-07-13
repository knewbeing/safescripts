---
title: "YouTube终极下载器"
---

# YouTube终极下载器

`视频下载`  `音乐下载`  `无广告`  `SponsorBlock`  `YouTube增强`  `快捷工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_Ultimate_Downloader_v131_Shorts_Videos_Music_Ad-Free_SponsorBlock.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**13.1 GA**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/34613-youtube-ultimate-downloader-v13-1-shorts-videos-music-ad-free-sponsorblock) <Badge type="tip" text="GreasyFork" />　　安装量：**446,698**　　评分：👍428 / 👎47

## 功能介绍

本脚本为YouTube和YouTube音乐页面添加一个悬浮下载按钮，支持高质量下载视频、Shorts和音乐。集成SponsorBlock自动跳过赞助片段，并可绕过YouTube检测弹窗，提供无广告、流畅的下载体验。

## 适用网站

- YouTube
- YouTube音乐

## 使用方法

1. 安装Tampermonkey插件并添加本脚本。
2. 打开YouTube或YouTube音乐页面。
3. 在视频、Shorts或音乐页面点击悬浮下载按钮。
4. 按提示选择下载格式和质量，完成下载。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 允许脚本动态添加自定义样式，优化按钮显示效果。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：50/100　　**分析时间**：2026-07-13

> 该脚本集成 SponsorBlock 功能，会将当前 YouTube 视频 ID 发送到 SponsorBlock 官方服务器（https://sponsor.ajay.app），属于第三方数据外传和隐私采集。未发现远程代码执行、混淆、DOM XSS、权限滥用、敏感 API 滥用、供应链或 iframe 风险。SponsorBlock 为知名项目，但用户需知晓其行为数据会被外传。总体安全风险为 HIGH，建议用户权衡隐私风险后使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://sponsor.ajay.app） |
| 隐私采集 | ❌ 检测到（发送当前视频 ID 到 SponsorBlock 服务器） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 fetch 访问 SponsorBlock API（https://sponsor.ajay.app）以获取 sponsor 段信息。虽然 SponsorBlock 是知名项目，但属于第三方服务器，且可能传递当前视频 ID 等信息。  
> 位置：SB_fetchSegments 函数（未完全展示，但根据 SponsorBlock 集成描述和常见实现方式推断）  
> 建议：仅允许访问可信第三方 API，明确告知用户数据用途。

**⛔ CRITICAL** — 隐私采集  
> 脚本未展示完整实现，但 SponsorBlock 集成通常会将当前视频 ID 发送到 SponsorBlock 服务器。视频 ID 可视为用户行为数据（观看内容）。  
> 位置：SB_fetchSegments 函数及 SponsorBlock 相关逻辑  
> 建议：最小化外传数据，仅发送必要信息，并在文档中披露。

**🔴 HIGH** — 远程代码执行  
> 脚本未发现 eval、new Function、setTimeout(string) 等远程代码执行高危 API。  
> 位置：全局  
> 建议：保持此安全实践。

**🔴 HIGH** — 代码混淆  
> 脚本未发现混淆、base64 解码、字符串数组映射等混淆特征。  
> 位置：全局  
> 建议：保持代码可读性。

**🔴 HIGH** — DOM XSS  
> 脚本未发现 DOM XSS 风险（如直接插入 innerHTML/outerHTML）。  
> 位置：全局  
> 建议：继续避免不安全的 DOM 操作。

**🟠 MEDIUM** — 权限滥用  
> 仅申请了 GM_addStyle 权限，未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 未发现敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）调用。  
> 位置：全局  
> 建议：继续避免敏感 API 滥用。

**🟠 MEDIUM** — 供应链风险  
> 未使用 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，建议使用官方 CDN 并锁定版本。

**🟡 LOW** — ClickJacking/iframe  
> 未发现 ClickJacking 或 iframe 风险。  
> 位置：全局  
> 建议：继续避免相关风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/34613-youtube-ultimate-downloader-v13-1-shorts-videos-music-ad-free-sponsorblock)*
