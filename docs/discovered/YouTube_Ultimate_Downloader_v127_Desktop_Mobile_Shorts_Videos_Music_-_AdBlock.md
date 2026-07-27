---
title: "YouTube终极下载器"
---

# YouTube终极下载器

`视频下载`  `音乐下载`  `广告拦截`  `YouTube增强`  `短视频`  `多平台支持`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_Ultimate_Downloader_v127_Desktop_Mobile_Shorts_Videos_Music_-_AdBlock.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**12.7 RTM**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/34613-youtube-ultimate-downloader-v12-7-desktop-mobile-shorts-videos-music-adblock) <Badge type="tip" text="GreasyFork" />　　安装量：**442,153**　　评分：👍420 / 👎47

## 功能介绍

本脚本为YouTube和YouTube音乐页面添加一个悬浮下载按钮，支持下载视频、短视频和音乐，提供高质量下载。自带广告拦截功能，并能绕过YouTube检测弹窗，让下载过程更顺畅。

## 适用网站

- YouTube
- YouTube音乐

## 使用方法

1. 安装脚本后，打开YouTube或YouTube音乐页面。
2. 在视频、短视频或音乐页面会出现悬浮下载按钮。
3. 点击按钮即可选择下载视频、短视频或音乐。
4. 下载过程中无需担心广告和检测弹窗干扰。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于为页面添加自定义样式，让悬浮按钮更美观。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：75/100　　**分析时间**：2026-07-27

> 该脚本主要风险在于将用户引导至第三方下载网站，存在数据外传和隐私泄露风险。未检测到代码混淆、远程代码执行、敏感 API 调用等高危行为。建议用户谨慎使用，警惕第三方下载服务的安全与隐私问题。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：y2mate.stream, africabazaar.co.za, saveanyyoutube.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过构造下载按钮，用户点击后会跳转到第三方下载网站（如 y2mate.stream、africabazaar.co.za、saveanyyoutube.com、scoozy.ca），这些网站可能会收集用户数据或页面信息。  
> 位置：MultiURL 数组与按钮点击事件  
> 建议：警告用户这些第三方网站可能存在隐私和安全风险，建议仅使用可信的下载服务。

**🟡 LOW** — 权限滥用  
> 脚本未申请高权限，仅使用 GM_addStyle，未检测到敏感 API 调用、远程代码执行、代码混淆、DOM XSS、供应链风险等问题。  
> 位置：元数据与主代码结构  
> 建议：保持最小权限原则，避免后续版本申请不必要的高权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/34613-youtube-ultimate-downloader-v12-7-desktop-mobile-shorts-videos-music-adblock)*
