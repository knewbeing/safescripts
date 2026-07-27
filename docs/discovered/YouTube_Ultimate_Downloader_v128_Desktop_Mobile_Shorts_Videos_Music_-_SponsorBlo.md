---
title: "YouTube™ Ultimate Downloader v12.8 👑🌍 — Desktop & Mobile | Shorts, Videos & Music - SponsorBlock 🛡️🚫"
---

# YouTube™ Ultimate Downloader v12.8 👑🌍 — Desktop & Mobile | Shorts, Videos & Music - SponsorBlock 🛡️🚫



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_Ultimate_Downloader_v128_Desktop_Mobile_Shorts_Videos_Music_-_SponsorBlo.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**12.8 RTM**　　发现时间：**2026-05-04**　　来源：[GreasyFork](https://greasyfork.org/scripts/34613-youtube-ultimate-downloader-v12-8-desktop-mobile-shorts-videos-music-sponsorblock) <Badge type="tip" text="GreasyFork" />　　安装量：**442,764**　　评分：👍423 / 👎47

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

**风险等级**：🔴 HIGH　　**安全评分**：75/100　　**分析时间**：2026-07-27

> 脚本主要风险为数据外传：用户点击下载按钮时，当前视频ID会被发送到第三方下载服务，存在用户行为被第三方收集的风险。未检测到隐私采集、远程代码执行、混淆、DOM XSS、敏感 API 调用、供应链风险等问题。建议警示用户数据可能被第三方收集。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：y2mate.stream, giggity.co.za, saveanyyoutube.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过构造下载按钮，向第三方网站（y2mate.stream、giggity.co.za、saveanyyoutube.com、scoozy.ca）发送当前视频ID，可能涉及用户数据外传。  
> 位置：MultiURL 数组及按钮事件处理  
> 建议：仅允许用户主动操作时跳转，避免自动请求；警示用户数据可能被第三方收集。

**🟠 MEDIUM** — 权限滥用  
> 脚本未申请高权限，仅使用 GM_addStyle，但未使用 GM_xmlhttpRequest、fetch 等主动网络请求。  
> 位置：@grant 元数据与代码权限对比  
> 建议：保持最小权限原则，避免申请未用权限。

**🟡 LOW** — 代码混淆  
> 脚本未混淆，代码结构清晰，无 base64、字符串数组映射、unicode 混淆等特征。  
> 位置：整体代码结构  
> 建议：无安全风险。

**🟡 LOW** — 远程代码执行  
> 脚本未检测到 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险。  
> 位置：整体代码结构  
> 建议：无安全风险。

**🟡 LOW** — DOM XSS  
> 脚本未检测到 DOM XSS 风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：整体代码结构  
> 建议：无安全风险。

**🟡 LOW** — 隐私采集  
> 脚本未检测到隐私采集行为，如读取 cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段等。  
> 位置：整体代码结构  
> 建议：无安全风险。

**🟡 LOW** — 敏感 API 调用  
> 脚本未检测到敏感 API 调用，如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification。  
> 位置：整体代码结构  
> 建议：无安全风险。

**🟡 LOW** — 供应链风险  
> 脚本未检测到供应链风险，未通过 @require 加载第三方库。  
> 位置：元数据  
> 建议：无安全风险。

**🟡 LOW** — ClickJacking/iframe  
> 脚本未检测到 ClickJacking 或 iframe 风险，未修改 frame 保护策略或创建隐藏 iframe。  
> 位置：整体代码结构  
> 建议：无安全风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/34613-youtube-ultimate-downloader-v12-8-desktop-mobile-shorts-videos-music-sponsorblock)*
