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

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-27

> 该脚本安全性极高，无数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感API调用、供应链风险及iframe风险。仅使用官方CDN固定版本的hls.js，申请必要的GM_setClipboard权限。建议保持现有安全实践。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> 脚本未检测到任何网络请求（GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource等），不存在数据外传行为。  
> 位置：全局  
> 建议：保持现有状态，避免添加任何外传代码。

**⛔ CRITICAL** — Privacy Collection  
> 脚本未检测到任何隐私采集行为（未访问cookie/localStorage/sessionStorage/IndexedDB、未监听键盘输入、未读取表单字段、未访问指纹API、未读取剪贴板内容）。  
> 位置：全局  
> 建议：保持现有状态，避免添加隐私采集代码。

**🔴 HIGH** — Remote Code Execution  
> 脚本未检测到远程代码执行风险（未使用eval/new Function/setTimeout(string)/setInterval(string)、未动态插入外部脚本、未通过innerHTML/outerHTML插入脚本、未使用document.write插入脚本）。  
> 位置：全局  
> 建议：保持现有状态，避免动态执行代码。

**🔴 HIGH** — Code Obfuscation  
> 脚本未检测到代码混淆（无base64解码、无字符串数组索引映射、无unicode混淆、无高度压缩单行代码）。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS  
> 脚本未检测到DOM XSS风险（未将用户输入或URL参数直接插入innerHTML/outerHTML、未使用document.write插入不可信内容、未操作iframe src为javascript协议）。  
> 位置：全局  
> 建议：保持现有状态，避免插入不可信内容。

**🟠 MEDIUM** — Permission Abuse  
> 脚本仅申请了GM_setClipboard权限，未滥用高权限（如GM_download、GM_openInTab等），且实际代码与权限申请一致。  
> 位置：元数据 @grant  
> 建议：仅申请必要权限，避免权限滥用。

**🟠 MEDIUM** — Sensitive API  
> 脚本未调用敏感API（如navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：全局  
> 建议：避免调用敏感API。

**🟠 MEDIUM** — Supply Chain Risk  
> @require加载的hls.js来自官方CDN（jsdelivr），且版本固定（1.5.15），供应链风险较低。  
> 位置：元数据 @require  
> 建议：继续使用官方CDN并固定版本。

**🟡 LOW** — ClickJacking/Iframe Risk  
> 脚本未检测到ClickJacking或iframe风险（未修改frame保护策略、未创建隐藏iframe用于数据提取）。  
> 位置：全局  
> 建议：避免创建隐藏iframe或修改frame保护。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/573660-universal-media-pro-toolkit-video-download-url-extract-play)*
