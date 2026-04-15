---
title: YouTube视频下载助手
---

# YouTube视频下载助手

`视频下载`  `YouTube`  `高清视频`  `字幕下载`  `短视频下载`  `免费无广告`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_视频下载助手_多种清晰度HD2K4K_VideoAudio.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.1**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/521434-youtube-%E8%A7%86%E9%A2%91%E4%B8%8B%E8%BD%BD%E5%8A%A9%E6%89%8B-%E5%A4%9A%E7%A7%8D%E6%B8%85%E6%99%B0%E5%BA%A6hd-2k-4k-video-audio) <Badge type="tip" text="GreasyFork" />　　安装量：**36,726**　　评分：👍22 / 👎8

## 功能介绍

这是一款免费的YouTube视频下载助手，支持下载1080P、2K等多种高清画质的视频。它还能下载视频字幕，支持视频和音频分离下载，还能下载YouTube短视频（Shorts）。使用过程中无广告，操作简单方便。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后打开YouTube网站
2. 在视频播放页面会自动显示下载按钮
3. 点击下载按钮选择所需清晰度和格式
4. 选择是否下载字幕或分离音视频
5. 等待下载完成即可保存视频

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于向页面添加自定义样式，使下载按钮美观易用 |
| `GM_xmlhttpRequest` | 用于跨域请求，获取视频下载链接和相关数据 |
| `GM_getValue` | 用于存储和读取用户设置或缓存数据 |
| `GM_setValue` | 用于保存用户设置或缓存数据 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**分析时间**：2026-04-15

> The script adds download buttons on YouTube pages that open a new tab to a third-party domain for video downloading. It does not collect user cookies, form data, or use fingerprinting APIs. No remote code execution or code obfuscation detected. The use of GM_xmlhttpRequest permission is not evident in the code snippet, which may indicate permission overreach. Overall, the main risk is data transmission to a third-party domain.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：saveanyyoutube.com） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script opens a new window/tab to a third-party domain 'saveanyyoutube.com' by replacing 'youtube.com' in the current URL. This constitutes data transmission to a third-party server.  
> 位置：createDownloadButton function, click event listener  
> 建议：Ensure the third-party domain is trustworthy and does not collect or misuse user data. Inform users about this behavior in the description or privacy policy.

**🔴 HIGH** — Permission Misuse  
> The script uses GM_xmlhttpRequest permission but no evidence of actual network requests in the provided code snippet. Potentially unused or reserved for future use.  
> 位置：@grant GM_xmlhttpRequest and code  
> 建议：Verify if GM_xmlhttpRequest is actually used; if not, remove the permission to reduce attack surface.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/521434-youtube-%E8%A7%86%E9%A2%91%E4%B8%8B%E8%BD%BD%E5%8A%A9%E6%89%8B-%E5%A4%9A%E7%A7%8D%E6%B8%85%E6%99%B0%E5%BA%A6hd-2k-4k-video-audio)*
