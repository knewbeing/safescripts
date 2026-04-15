---
title: HTML5 视频音频默认音量
---

# HTML5 视频音频默认音量

`视频音频`  `音量控制`  `网页增强`  `用户脚本`  `个性化设置`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/HTML5Volume.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.5**　　发现时间：**2026-04-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本自动将网页中的 HTML5 视频和音频的默认音量调低，避免突然的最大音量吓到用户。它还能为每个网站单独记忆音量设置，方便用户个性化调整。安装后即可自动生效，无需额外操作。

## 适用网站

- 所有支持 HTML5 视频音频播放的网站

## 使用方法

1. 安装脚本后，访问任意支持 HTML5 视频音频的网站。
2. 播放视频或音频时，脚本自动调整默认音量。
3. 音量设置会自动保存，下次访问同一网站时恢复。
4. 可通过脚本菜单进行相关设置和操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在脚本菜单中注册自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于注销之前注册的菜单命令，保持菜单整洁。 |
| `GM_openInTab` | 允许脚本在新标签页打开链接，方便跳转相关页面。 |
| `GM_getValue` | 用于读取脚本存储的音量设置，实现记忆功能。 |
| `GM_setValue` | 用于保存用户设置的音量值，支持不同网站独立记忆。 |
| `GM_notification` | 用于显示通知，提醒用户音量已调整等信息。 |

## 安全分析

**风险等级**：🟡 LOW　　**分析时间**：2026-04-15

> 该脚本主要功能为调整 HTML5 视频音频默认音量并记忆各网站音量设置。未发现任何数据外传、远程代码执行或权限滥用风险。脚本会使用 localStorage 和 GM_getValue/GM_setValue 存储音量相关设置，属于正常功能需求。整体代码清晰，无混淆，且无外部依赖。综合评估风险等级为低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（使用 localStorage 存储当前音量值（html5_xiu_currentVolume）, 使用 GM_getValue 和 GM_setValue 存储和读取音量设置和强制列表） |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何网络请求行为，无数据外传风险。  
> 位置：全脚本  
> 建议：无

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage（除存储音量设置外）、sessionStorage，也未监听键盘输入事件，未访问浏览器指纹相关API。  
> 位置：全脚本  
> 建议：无

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、innerHTML 执行远程代码，也未通过 @require 或动态 script 标签加载远程 JS。  
> 位置：全脚本  
> 建议：无

**🔴 HIGH** — 权限滥用  
> 脚本申请了 GM_registerMenuCommand、GM_unregisterMenuCommand、GM_openInTab、GM_getValue、GM_setValue、GM_notification 权限，且均有实际使用，未发现权限滥用。  
> 位置：元数据与代码  
> 建议：无

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等敏感 API。  
> 位置：全脚本  
> 建议：无

**🟠 MEDIUM** — 代码混淆  
> 脚本代码清晰无混淆，未发现 base64 解码执行、字符串拼接执行或混淆器特征。  
> 位置：全脚本  
> 建议：无

**🟡 LOW** — 外部依赖  
> 脚本无 @require 加载外部依赖，所有代码均为本地实现，无供应链风险。  
> 位置：元数据  
> 建议：无

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/86f2efed3ac31316f59099bc66116033679aa824/HTML5Volume.user.js)*
