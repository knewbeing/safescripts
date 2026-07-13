---
title: "YouTube 视频下载助手"
---

# YouTube 视频下载助手

`视频下载`  `YouTube`  `高清`  `字幕下载`  `短视频`  `无广告`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_视频下载助手_多种清晰度HD2K4K_VideoAudio.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.1**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/521434-youtube-%E8%A7%86%E9%A2%91%E4%B8%8B%E8%BD%BD%E5%8A%A9%E6%89%8B-%E5%A4%9A%E7%A7%8D%E6%B8%85%E6%99%B0%E5%BA%A6hd-2k-4k-video-audio) <Badge type="tip" text="GreasyFork" />　　安装量：**41,469**　　评分：👍29 / 👎10

## 功能介绍

本脚本为YouTube视频下载助手，支持多种清晰度（包括1080P、2K、4K）的视频下载。可下载视频、音频、字幕及短视频，完全免费且无广告。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后，打开YouTube任意视频页面。
2. 在视频下方会出现“免费下载”按钮。
3. 点击按钮选择需要的清晰度、格式（视频/音频/字幕）。
4. 按提示下载所选内容到本地。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于为页面添加自定义样式，让下载按钮等界面更美观。 |
| `GM_xmlhttpRequest` | 用于跨域请求第三方服务，获取视频下载链接。 |
| `GM_getValue` | 用于读取脚本本地存储的数据，如用户设置。 |
| `GM_setValue` | 用于保存脚本本地数据，如下载历史或用户偏好。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-07-13

> The script does not collect user privacy data or perform code obfuscation. The main risk is that clicking the download button sends the current YouTube video URL to a third-party service (saveanyyoutube.com), which may have privacy implications. There is no evidence of DOM XSS, remote code execution, or keylogging. Permissions are slightly broader than necessary, and the supply chain risk is moderate due to CDN usage without hash pinning.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：saveanyyoutube.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> The script rewrites the current YouTube video URL to a third-party domain (saveanyyoutube.com) and opens it in a new tab when the user clicks the download button. This transmits the current video URL (which may include user-specific parameters) to an external service.  
> 位置：createDownloadButton() function, download button click handler  
> 建议：Clearly inform users that clicking the download button will send the current video URL to a third-party service. Consider privacy implications if the URL contains sensitive information.

**🟠 MEDIUM** — Permission Abuse  
> The script requests @connect permission for www.ssyoutube.com, but the code only uses saveanyyoutube.com for download redirection. No actual GM_xmlhttpRequest or network request to www.ssyoutube.com is present.  
> 位置：Metadata block (@connect)  
> 建议：Remove unnecessary @connect permissions to minimize attack surface.

**🟠 MEDIUM** — Supply Chain Risk  
> The script uses @require to load SweetAlert2 from jsdelivr CDN without a fixed version hash. While the version is pinned (v11), CDN-based supply chain attacks are possible if the CDN is compromised.  
> 位置：Metadata block (@require)  
> 建议：Consider using a fixed hash or self-hosting trusted libraries to mitigate supply chain risks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/521434-youtube-%E8%A7%86%E9%A2%91%E4%B8%8B%E8%BD%BD%E5%8A%A9%E6%89%8B-%E5%A4%9A%E7%A7%8D%E6%B8%85%E6%99%B0%E5%BA%A6hd-2k-4k-video-audio)*
