---
title: "YouTube HD Plus"
---

# YouTube HD Plus

`YouTube增强`  `画质自动切换`  `视频体验优化`  `自动化`  `Premium功能`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_HD_Plus.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.7.7**　　发现时间：**2026-05-18**　　来源：[GreasyFork](https://greasyfork.org/scripts/508784-youtube-hd-plus) <Badge type="tip" text="GreasyFork" />　　安装量：**5,954**　　评分：👍27 / 👎0

## 功能介绍

本脚本可自动为您选择偏好的YouTube视频画质，并在可用时启用Premium播放功能。支持YouTube主站、音乐站和移动端，无需手动切换清晰度。

## 适用网站

- YouTube（含桌面版、移动版）
- YouTube Music
- YouTube 无痕模式

## 使用方法

1. 1. 安装脚本后，打开YouTube、YouTube Music或其移动版网页。
2. 2. 播放任意视频，脚本会自动切换到您偏好的画质。
3. 3. 如有Premium播放选项，脚本会自动启用。
4. 4. 如需更改画质偏好，可在脚本设置中调整。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM.getValue` | 用于读取您设置的偏好视频画质等脚本配置。 |
| `GM.setValue` | 用于保存您设置的偏好视频画质等脚本配置。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-27

> 该脚本仅在本地操作 YouTube 播放器参数，未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。安全性极高，适合公开使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、navigator.sendBeacon），不存在数据外传行为。  
> 位置：全局代码  
> 建议：保持无外部数据传输，确保用户隐私安全。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage、IndexedDB，也未监听键盘输入或表单字段，未访问指纹相关 API，未读取剪贴板内容。  
> 位置：全局代码  
> 建议：继续避免隐私采集，保障用户数据安全。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)，未通过 innerHTML/outerHTML 插入外部脚本或执行 JS，未动态加载远程 JS。  
> 位置：全局代码  
> 建议：继续避免远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到代码混淆特征（如 base64 解码、字符串数组映射、unicode 混淆、高度压缩单行代码）。  
> 位置：全局代码  
> 建议：保持代码可读性，便于安全审查。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未通过 document.write 插入不可信内容，未操作 iframe src 为 javascript: 协议。  
> 位置：全局代码  
> 建议：继续避免 DOM XSS/注入风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本仅申请 GM.getValue 和 GM.setValue 权限，未申请高权限（如 GM_download、GM_openInTab），权限申请与实际使用一致。  
> 位置：元数据 @grant  
> 建议：仅申请必要权限，避免权限滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局代码  
> 建议：继续避免敏感 API 调用。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据 @require  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，未创建隐藏 iframe 用于数据提取。  
> 位置：全局代码  
> 建议：继续避免 ClickJacking/iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/508784-youtube-hd-plus)*
