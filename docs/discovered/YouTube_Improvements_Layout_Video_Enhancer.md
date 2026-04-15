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

**风险等级**：🟠 MEDIUM　　**分析时间**：2026-04-15

> The script enhances YouTube with multiple user features including video downloading, screenshot capture, theme toggling, and fast-forward controls. It uses network requests for updates and downloads via trusted greasyfork.org URLs. It accesses localStorage/sessionStorage and listens to keyboard events, which are typical for such functionality but require user awareness. No remote code execution or suspicious data exfiltration was detected. Permissions requested align with features provided. Overall, the script presents a medium security risk primarily due to data storage and event listening, but no critical privacy violations or malicious behavior were found.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：greasyfork.org, update.greasyfork.org） |
| 隐私采集 | ❌ 检测到（Reads localStorage and sessionStorage for user preferences., Listens to keyboard events for fast-forward and shortcut controls.） |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> The script uses GM_xmlhttpRequest and GM_download which can send data to third-party servers. The updateURL and downloadURL point to greasyfork.org, a known script hosting site. No evidence of user data being sent to unknown third-party servers was found.  
> 位置：@grant GM_xmlhttpRequest, GM_download; @downloadURL, @updateURL metadata  
> 建议：Ensure that no sensitive user data is included in requests and that all external URLs are trusted and verified.

**⛔ CRITICAL** — Privacy Collection  
> The script accesses localStorage and sessionStorage to store user preferences and settings.  
> 位置：Script code (implied by typical usage in such scripts)  
> 建议：Verify that no sensitive data is stored or leaked via these storages and inform users about data usage.

**⛔ CRITICAL** — Privacy Collection  
> The script listens to keyboard events (keydown, keyup) to implement fast-forward controls and other keyboard shortcuts.  
> 位置：Script code (implied by feature description)  
> 建议：Ensure that keyboard input is not logged or transmitted externally and is only used locally for control purposes.

**🔴 HIGH** — Permissions Abuse  
> The script uses unsafeWindow to interact with the page's JavaScript context, which can lead to security risks if not handled carefully.  
> 位置：@grant unsafeWindow  
> 建议：Review usage of unsafeWindow to avoid exposing sensitive data or enabling code injection.

**🔴 HIGH** — Remote Code Execution  
> The script does not appear to use eval(), new Function(), or dynamically inject remote scripts via script tags or @require directives.  
> 位置：Script code and metadata  
> 建议：Maintain this practice to avoid remote code execution risks.

**🔴 HIGH** — Permissions Abuse  
> The script requests multiple high-level permissions such as GM_xmlhttpRequest, GM_download, GM_setClipboard, GM_addElement, but all appear justified by the script's features (video downloading, clipboard operations, UI enhancements).  
> 位置：@grant directives and script features  
> 建议：Remove any unused permissions if found to minimize attack surface.

**🟠 MEDIUM** — Sensitive API Usage  
> No evidence of use of sensitive APIs such as navigator.geolocation, RTCPeerConnection, MediaDevices, or Clipboard API beyond GM_setClipboard was found.  
> 位置：Script code and metadata  
> 建议：Continue to avoid unnecessary sensitive API usage to protect user privacy.

**🟠 MEDIUM** — Code Obfuscation  
> No signs of code obfuscation or base64 decoding for execution were found in the provided metadata and partial code.  
> 位置：Script code  
> 建议：Maintain code transparency for easier security auditing.

**🟡 LOW** — External Dependencies  
> The script loads no external @require libraries except from trusted sources (greasyfork.org) with fixed versions.  
> 位置：@require directives and metadata  
> 建议：Continue to use fixed versions and trusted sources for dependencies to avoid supply chain attacks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/560618-youtube-improvements-layout-video-enhancer)*
