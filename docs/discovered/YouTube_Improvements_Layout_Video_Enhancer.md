---
title: YouTube改进 – 布局与视频增强
---

# YouTube改进 – 布局与视频增强

`视频增强`  `布局优化`  `主题切换`  `视频下载`  `截图功能`  `快进控制`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_Improvements_Layout_Video_Enhancer.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.4**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/560618-youtube-improvements-layout-video-enhancer) <Badge type="tip" text="GreasyFork" />　　安装量：**28,061**　　评分：👍16 / 👎8

## 功能介绍

本脚本为YouTube提供多项实用增强功能，包括优化视频详情页布局，支持视频下载和截图，提供深色与浅色主题切换，以及视频快进控制等。使用后可提升观看体验和操作便捷性。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后打开YouTube网站。
2. 在视频详情页享受优化布局和新增功能。
3. 使用菜单或页面按钮进行视频下载、截图等操作。
4. 通过脚本提供的开关切换深色或浅色主题。
5. 使用快进控制按钮快速调整视频播放进度。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加自定义菜单命令，方便用户操作脚本功能。 |
| `GM_openInTab` | 在新标签页打开链接或页面。 |
| `GM.openInTab` | 在新标签页打开链接或页面（新版API）。 |
| `GM_addStyle` | 添加自定义样式，调整页面外观。 |
| `GM_setValue` | 保存脚本设置或数据。 |
| `GM_getValue` | 读取脚本保存的设置或数据。 |
| `GM_deleteValue` | 删除保存的设置或数据。 |
| `GM_xmlhttpRequest` | 发送跨域网络请求，获取视频或相关数据。 |
| `unsafeWindow` | 访问页面的全局变量和函数，增强脚本与页面交互。 |
| `GM_download` | 下载视频或文件到本地。 |
| `GM_setClipboard` | 复制文本到剪贴板，方便分享或保存。 |
| `GM_addElement` | 动态添加页面元素，增强页面功能。 |

## 安全分析

**风险等级**：🟡 LOW　　**分析时间**：2026-04-15

> The script requests multiple permissions consistent with its functionality, including network requests and clipboard access. Network requests are made only to known trusted domains (greasyfork.org) for updates and downloads. No evidence of user data exfiltration, privacy-invasive data collection, or remote code execution was found. No excessive permissions or code obfuscation detected. Overall, the script appears low risk but users should remain cautious about permissions granted.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：greasyfork.org） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> The script uses GM_xmlhttpRequest and GM_download which can send network requests potentially to third-party servers. The updateURL and downloadURL point to greasyfork.org, a known script hosting site. No evidence found of user data being sent to unknown third-party servers.  
> 位置：@grant and metadata URLs  
> 建议：Ensure that network requests are only made to trusted domains and no sensitive user data is transmitted without explicit user consent.

**⛔ CRITICAL** — Privacy Collection  
> The script accesses GM_setValue, GM_getValue, GM_deleteValue which may store user preferences locally but no indication of reading sensitive cookies or storage data.  
> 位置：@grant and code usage  
> 建议：Avoid accessing or transmitting sensitive user data such as cookies or form inputs unless necessary and with user consent.

**🔴 HIGH** — Remote Code Execution  
> The script does not use eval(), new Function(), or dynamic script injection from remote sources. No @require directives found that load remote scripts.  
> 位置：Code analysis  
> 建议：Maintain no use of remote code execution functions to prevent injection attacks.

**🔴 HIGH** — Permission Abuse  
> The script requests multiple GM_* permissions including GM_xmlhttpRequest, GM_download, GM_setClipboard, GM_addElement, unsafeWindow. These are consistent with the script's functionality (downloading videos, clipboard access, UI enhancements). No unused high permissions detected.  
> 位置：@grant directives vs code usage  
> 建议：Review permissions periodically to ensure no excessive privileges are requested.

**🟠 MEDIUM** — Sensitive API Call  
> No usage of sensitive APIs like navigator.geolocation, RTCPeerConnection, MediaDevices, or Clipboard API detected beyond GM_setClipboard which is granted explicitly.  
> 位置：Code analysis  
> 建议：Monitor usage of sensitive APIs to avoid privacy leaks.

**🟠 MEDIUM** — Code Obfuscation  
> No signs of code obfuscation or base64 decoding for execution found in the provided code snippet.  
> 位置：Code analysis  
> 建议：Keep code readable and avoid obfuscation to facilitate security audits.

**🟡 LOW** — External Dependencies  
> The external dependencies (updateURL and downloadURL) point to greasyfork.org, a reputable open-source script repository. No @require directives found, so no external JS libraries loaded.  
> 位置：Metadata URLs and @require directives  
> 建议：Use fixed versions and trusted sources for any external dependencies to prevent supply chain attacks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/560618-youtube-improvements-layout-video-enhancer)*
