---
title: HTML5 视频音频默认音量
---

# HTML5 视频音频默认音量

`视频音频`  `音量控制`  `网页增强`  `用户体验`  `多站点记忆`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/HTML5Volume.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.5**　　发现时间：**2026-04-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本自动将网页中 HTML5 视频和音频的默认音量设置为较低值，避免突然的高音量吓到用户。它还能为不同网站分别记忆用户设置的音量，提升观看体验。安装后无需额外操作，自动生效。

## 适用网站

- 所有支持 HTML5 视频音频的网站

## 使用方法

1. 安装脚本后，访问任意含有 HTML5 视频或音频的网页。
2. 脚本会自动调整默认音量并记忆当前网站的音量设置。
3. 无需手动操作，音量调整将在每次访问时自动生效。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在脚本菜单中注册自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于注销之前注册的菜单命令。 |
| `GM_openInTab` | 允许脚本在新标签页打开链接。 |
| `GM_getValue` | 用于获取存储的音量设置，实现不同网站记忆音量。 |
| `GM_setValue` | 用于保存用户设置的音量值。 |
| `GM_notification` | 用于显示通知，提示用户音量已调整等信息。 |

## 安全分析

**风险等级**：🟡 LOW　　**分析时间**：2026-04-15

> 该脚本主要功能为调整 HTML5 视频音频默认音量，支持为不同网站分别记忆音量设置。代码中未发现任何数据外传、隐私敏感信息采集、远程代码执行风险，且权限申请合理。仅使用 localStorage 存储音量值，属于正常功能需求。整体安全风险较低，适合使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（使用 localStorage 存储当前音量值，仅用于功能实现，不涉及敏感隐私数据） |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何网络请求行为，无数据外传风险。  
> 位置：全脚本  
> 建议：无

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage（除非用于存储音量设置）、sessionStorage，也未监听键盘输入事件，未访问浏览器指纹相关API。  
> 位置：全脚本  
> 建议：无

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、innerHTML 执行远程内容，也未通过 @require 或动态 script 标签加载远程 JS。  
> 位置：全脚本  
> 建议：无

**🔴 HIGH** — 权限滥用  
> 脚本申请的 @grant 权限均被合理使用，无权限滥用现象。  
> 位置：元数据与代码  
> 建议：无

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等敏感 API。  
> 位置：全脚本  
> 建议：无

**🟠 MEDIUM** — 代码混淆  
> 脚本代码未发现明显混淆、base64 解码执行或字符串拼接执行特征。  
> 位置：全脚本  
> 建议：无

**🟡 LOW** — 外部依赖  
> 脚本未通过 @require 加载任何外部依赖库。  
> 位置：元数据  
> 建议：无

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/86f2efed3ac31316f59099bc66116033679aa824/HTML5Volume.user.js)*
