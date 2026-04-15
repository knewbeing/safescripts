---
title: HTML5视频音频默认音量
---

# HTML5视频音频默认音量

`视频音频`  `音量控制`  `用户体验`  `网页辅助`  `自动调节`  `个性化设置`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/HTML5Volume.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.5**　　发现时间：**2026-04-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript)

## 功能介绍

本脚本自动将网页中的HTML5视频和音频的默认音量调低，避免突然的100%音量吓到用户。它还能为每个网站单独记忆用户设置的音量，提升观看体验。安装后即可自动生效，无需额外操作。

## 适用网站

- 所有支持HTML5视频音频播放的网站

## 使用方法

1. 安装脚本后，访问任何支持HTML5视频音频的网站。
2. 播放视频或音频时，脚本会自动调整默认音量。
3. 调整音量后，脚本会记住该网站的音量设置。
4. 下次访问同一网站时，自动应用上次设置的音量。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除之前注册的自定义菜单命令。 |
| `GM_openInTab` | 允许脚本在新标签页打开链接或页面。 |
| `GM_getValue` | 用于读取脚本存储的用户数据，如音量设置。 |
| `GM_setValue` | 用于保存用户数据，实现音量记忆功能。 |
| `GM_notification` | 用于显示桌面通知，提醒用户相关信息。 |

## 安全分析

**风险等级**：🟡 LOW　　**分析时间**：2026-04-15

> 该脚本主要功能为调整 HTML5 视频音频默认音量，并支持各网站分别记忆音量。未发现数据外传、隐私敏感信息采集、远程代码执行及权限滥用等安全风险。使用 localStorage 存储音量设置属于正常功能需求，风险较低。整体代码清晰，无混淆或恶意行为。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（使用 localStorage 存储当前音量设置, 未监听键盘输入事件, 未读取 document.cookie 和 sessionStorage） |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何网络请求行为，无数据外传风险。  
> 位置：全脚本  
> 建议：无需操作。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage（除非用于存储音量设置）、sessionStorage，也未监听键盘输入事件，未访问浏览器指纹相关API。  
> 位置：全脚本  
> 建议：确认 localStorage 用于存储音量设置，且无敏感信息采集。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、innerHTML 执行远程代码，也未通过 @require 或动态 script 标签加载远程 JS。  
> 位置：全脚本  
> 建议：无需操作。

**🔴 HIGH** — 权限滥用  
> 脚本申请了 GM_registerMenuCommand、GM_unregisterMenuCommand、GM_openInTab、GM_getValue、GM_setValue、GM_notification 权限，且代码中均有使用，未发现权限滥用。  
> 位置：元数据与代码  
> 建议：无需操作。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等敏感 API。  
> 位置：全脚本  
> 建议：无需操作。

**🟠 MEDIUM** — 代码混淆  
> 脚本代码清晰，无明显混淆、base64 解码执行或字符串拼接执行特征。  
> 位置：全脚本  
> 建议：无需操作。

**🟡 LOW** — 外部依赖  
> 脚本未通过 @require 加载任何外部依赖库。  
> 位置：元数据  
> 建议：无需操作。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/86f2efed3ac31316f59099bc66116033679aa824/HTML5Volume.user.js)*
