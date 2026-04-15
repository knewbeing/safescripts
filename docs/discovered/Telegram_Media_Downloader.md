---
title: Telegram受限图片视频下载器
---

# Telegram受限图片视频下载器

`下载工具`  `Telegram`  `私密频道`  `媒体保存`  `网页增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Telegram_Media_Downloader.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.212**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/446342-telegram-media-downloader) <Badge type="tip" text="GreasyFork" />　　安装量：**200,868**　　评分：👍188 / 👎43

## 功能介绍

该脚本允许用户在Telegram网页版中下载私密频道中被禁止下载的图片、GIF、视频和语音消息。它绕过了频道的下载限制，方便用户保存内容。安装后，用户可以直接在网页上获取受限媒体文件。

## 适用网站

- Telegram网页版

## 使用方法

1. 安装Tampermonkey或类似用户脚本管理器。
2. 在管理器中添加并启用该脚本。
3. 打开Telegram网页版并登录账号。
4. 进入私密频道，点击媒体文件旁的下载按钮保存内容。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `无明确@grant，默认无特殊权限` | 允许脚本在网页中执行，访问页面内容。 |

## 安全分析

**风险等级**：🟡 LOW　　**分析时间**：2026-04-15

> The script is designed to download media from Telegram webapp private channels by fetching media content directly from Telegram's own domains. It does not collect or transmit user data to third parties, nor does it use privacy-invasive APIs or remote code execution techniques. No permission over-privilege or suspicious external dependencies are present. Overall, the script poses a low security risk.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：web.telegram.org, webk.telegram.org, webz.telegram.org） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — Data External Transmission  
> Script performs fetch requests to Telegram's own domains to download media content. No evidence of data being sent to third-party servers or user data leakage.  
> 位置：Function tel_download_video, fetch calls  
> 建议：Ensure fetch requests are only made to trusted Telegram domains and do not include sensitive user data in requests.

**⛔ CRITICAL** — Privacy Collection  
> Script reads no cookies, localStorage, or sessionStorage. No event listeners for keyboard input or form data reading detected. No suspicious fingerprinting API usage found.  
> 位置：Global script scope and event listeners  
> 建议：No action needed as no privacy invasive data collection detected.

**🔴 HIGH** — Remote Code Execution  
> No usage of eval(), new Function(), setTimeout(string), or innerHTML with untrusted content detected. No dynamic script injection or @require of remote scripts found.  
> 位置：Entire script  
> 建议：Maintain current practice of avoiding remote code execution vectors.

**🔴 HIGH** — Permission Abuse  
> No @grant directives found in metadata, so no permission over-privilege detected.  
> 位置：Metadata block  
> 建议：No action needed.

**🟠 MEDIUM** — Sensitive API Usage  
> No usage of sensitive APIs such as navigator.geolocation, RTCPeerConnection, MediaDevices, or Clipboard API detected.  
> 位置：Entire script  
> 建议：No action needed.

**🟠 MEDIUM** — Code Obfuscation  
> No evidence of code obfuscation, base64 decoding, or suspicious string concatenation for code execution found.  
> 位置：Entire script  
> 建议：No action needed.

**🟡 LOW** — External Dependencies  
> No external @require dependencies found in metadata, all code is self-contained. URLs used for update and download are from greasyfork.org, a known script repository.  
> 位置：Metadata block  
> 建议：Ensure update URLs are from trusted sources and monitor for supply chain risks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/446342-telegram-media-downloader)*
