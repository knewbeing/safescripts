---
title: HTML5视频音频默认音量
---

# HTML5视频音频默认音量

`视频音频`  `音量控制`  `用户体验`  `网页增强`  `多站点支持`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/HTML5Volume.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.5**　　发现时间：**2026-04-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript)

## 功能介绍

本脚本自动将网页中的HTML5视频和音频的默认音量调整到用户设定的较低值，避免突然的高音量吓到用户。它还能为不同网站分别记忆音量设置，提升观看体验。安装后无需额外操作，自动生效。

## 适用网站

- 所有支持HTML5视频音频的网站

## 使用方法

1. 安装脚本后，访问任意含HTML5视频或音频的网页。
2. 脚本自动调整媒体默认音量，无需手动设置。
3. 可通过脚本菜单自定义音量大小和管理设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加自定义菜单命令，方便用户操作脚本功能。 |
| `GM_unregisterMenuCommand` | 移除已注册的菜单命令，保持菜单整洁。 |
| `GM_openInTab` | 在新标签页打开链接，方便跳转相关页面。 |
| `GM_getValue` | 读取存储的音量设置，实现记忆功能。 |
| `GM_setValue` | 保存用户设置的音量值，支持不同网站独立记忆。 |
| `GM_notification` | 显示通知提醒用户操作结果或状态。 |

## 安全分析

**风险等级**：🟡 LOW　　**分析时间**：2026-04-15

> 该脚本主要功能为调整 HTML5 视频音频默认音量，支持各网站分别记忆音量设置。代码中未发现任何网络请求或数据外传行为，未采集敏感隐私信息，也未使用远程代码执行手段。权限申请合理且与代码使用匹配。整体代码清晰，无混淆或恶意特征。风险等级评估为低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（使用 localStorage 存储音量设置数据, 未读取 document.cookie 或 sessionStorage, 未监听键盘输入事件） |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何网络请求相关代码，未进行数据外传。  
> 位置：全脚本  
> 建议：确认脚本不包含任何网络请求，确保无数据外传风险。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage（除非用于存储音量设置）、sessionStorage，也未监听键盘输入事件，未访问浏览器指纹相关API。  
> 位置：全脚本  
> 建议：确认脚本仅使用 localStorage 存储音量设置，且无敏感隐私数据采集。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、innerHTML 执行远程内容，也未通过 @require 或动态 script 标签加载远程 JS。  
> 位置：全脚本  
> 建议：保持代码执行安全，避免远程代码执行风险。

**🔴 HIGH** — 权限滥用  
> 脚本申请了多个 GM_* 权限，且代码中使用了 GM_registerMenuCommand、GM_unregisterMenuCommand、GM_openInTab、GM_getValue、GM_setValue 等，权限申请与使用匹配，无滥用。  
> 位置：元数据与代码  
> 建议：保持权限申请与实际使用一致，避免申请未使用的高权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等敏感 API。  
> 位置：全脚本  
> 建议：无敏感 API 调用风险。

**🟠 MEDIUM** — 代码混淆  
> 脚本代码清晰，无明显混淆、base64 解码执行或字符串拼接执行特征。  
> 位置：全脚本  
> 建议：保持代码清晰，避免混淆带来的安全隐患。

**🟡 LOW** — 外部依赖  
> 脚本未通过 @require 加载任何外部依赖库。  
> 位置：元数据  
> 建议：如未来添加依赖，确保来源可信且固定版本。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/86f2efed3ac31316f59099bc66116033679aa824/HTML5Volume.user.js)*
