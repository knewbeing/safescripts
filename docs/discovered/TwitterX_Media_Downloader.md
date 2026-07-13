---
title: "Twitter/X 媒体下载器"
---

# Twitter/X 媒体下载器

`下载`  `社交媒体`  `图片视频`  `Twitter`  `X`  `历史记录`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/TwitterX_Media_Downloader.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.3.1**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/571423-twitter-x-media-downloader) <Badge type="tip" text="GreasyFork" />　　安装量：**2,947**　　评分：👍14 / 👎0

## 功能介绍

本脚本可让用户在 Twitter 或 X 网站上一键下载图片和视频，支持自定义文件名，并记录下载历史。操作简单，方便保存和管理社交媒体上的多媒体内容。

## 适用网站

- Twitter
- X

## 使用方法

1. 安装脚本后，访问 Twitter 或 X 网站。
2. 在推文的图片或视频旁会出现下载按钮。
3. 点击下载按钮即可保存媒体文件。
4. 可在设置中自定义文件名和查看下载历史。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于保存用户设置和下载历史。 |
| `GM_getValue` | 用于读取用户设置和下载历史。 |
| `GM_download` | 实现图片和视频的下载功能。 |
| `GM_addStyle` | 用于美化和调整脚本界面样式。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-13

> 该脚本仅在 Twitter/X 页面上运行，主要功能为一键下载图片和视频。未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 滥用或供应链风险。所有 @grant 权限均为本地存储、样式注入和下载，未发现滥用。代码结构清晰，无混淆和压缩。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 未发现安全问题 ✅

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/571423-twitter-x-media-downloader)*
