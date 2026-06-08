---
title: "Telegram受限图片视频下载器"
---

# Telegram受限图片视频下载器

`Telegram`  `下载工具`  `图片视频保存`  `受限内容`  `社交媒体`  `实用工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Telegram_Media_Downloader.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.212**　　发现时间：**2026-06-08**　　来源：[GreasyFork](https://greasyfork.org/scripts/446342-telegram-media-downloader) <Badge type="tip" text="GreasyFork" />　　安装量：**213,931**　　评分：👍197 / 👎43

## 功能介绍

该脚本允许用户在Telegram网页版中下载被频道禁止下载的图片、视频、GIF和语音消息。即使频道设置了内容保存限制，也能一键保存媒体文件。

## 适用网站

- Telegram网页版

## 使用方法

1. 安装脚本后，打开Telegram网页版。
2. 进入含有受限媒体的频道或聊天。
3. 在媒体消息旁会出现下载按钮，点击即可保存图片、视频或语音。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-06-08

> 该脚本仅在 Telegram Web 页面上运行，核心功能为为受限媒体内容添加下载按钮，通过分片 fetch 下载媒体文件并本地保存。未发现任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 滥用或供应链风险。整体实现透明，安全性高。

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

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/446342-telegram-media-downloader)*
