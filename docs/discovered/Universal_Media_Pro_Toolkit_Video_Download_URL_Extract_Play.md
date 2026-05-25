---
title: "Universal Media Pro Toolkit | Video Download, URL Extract, Play"
---

# Universal Media Pro Toolkit | Video Download, URL Extract, Play



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Universal_Media_Pro_Toolkit_Video_Download_URL_Extract_Play.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.1**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/573660-universal-media-pro-toolkit-video-download-url-extract-play) <Badge type="tip" text="GreasyFork" />　　安装量：**132**　　评分：👍0 / 👎0

## 功能介绍



## 适用网站

- 通用

## 使用方法

- 请参阅脚本说明

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-05-25

> 该脚本仅用于视频 URL 提取、下载和播放功能，未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。所有第三方库均来源可信且版本固定。安全评分为 100，风险等级 SAFE。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传检查  
> 脚本未检测到任何网络请求（GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、sendBeacon）用于数据外传或统计行为。  
> 位置：全局代码  
> 建议：保持无数据外传，勿添加任何第三方数据上报。

**⛔ CRITICAL** — 隐私采集检查  
> 脚本未检测到任何隐私采集行为，如读取 cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段、键盘监听等。  
> 位置：全局代码  
> 建议：继续避免隐私采集，勿添加敏感数据读取。

**🔴 HIGH** — 远程代码执行检查  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML/outerHTML 插入外部脚本、document.write、动态 script 标签等远程代码执行风险。  
> 位置：全局代码  
> 建议：保持无远程代码执行风险，勿引入动态执行。

**🔴 HIGH** — 代码混淆检查  
> 脚本未检测到任何代码混淆、base64 解码执行、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：全局代码  
> 建议：保持代码可读性，勿混淆。

**🔴 HIGH** — DOM XSS/注入检查  
> 脚本未检测到 DOM XSS 风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未使用 document.write 插入不可信内容，未操作 iframe src 为 javascript: 协议。  
> 位置：全局代码  
> 建议：继续避免 DOM 注入风险。

**🟠 MEDIUM** — 权限滥用检查  
> 脚本仅申请 GM_setClipboard 权限，未申请高权限（如 GM_download、GM_openInTab），且实际代码与权限申请一致。  
> 位置：元数据 @grant  
> 建议：仅申请必要权限，避免权限滥用。

**🟠 MEDIUM** — 敏感 API 调用检查  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：全局代码  
> 建议：继续避免敏感 API 调用。

**🟠 MEDIUM** — 供应链风险检查  
> @require 加载的 hls.js 来源为 jsdelivr 官方 CDN，版本号固定（1.5.15），无供应链污染风险。  
> 位置：元数据 @require  
> 建议：保持第三方库来源可信且版本固定。

**🟡 LOW** — ClickJacking/iframe 风险检查  
> 脚本未修改 frame 保护策略，未创建隐藏 iframe 用于数据提取。  
> 位置：全局代码  
> 建议：继续避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/573660-universal-media-pro-toolkit-video-download-url-extract-play)*
