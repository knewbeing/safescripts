---
title: "Twitter/X(网页版)视频/原始图片/gif一键下载"
---

# Twitter/X(网页版)视频/原始图片/gif一键下载

`Twitter`  `一键下载`  `视频下载`  `图片下载`  `GIF下载`  `推文工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/TwitterX_网页版_视频原始图片gif一键下载_limbopro.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.1.5.17**　　发现时间：**2026-05-11**　　来源：[GreasyFork](https://greasyfork.org/scripts/478651-twitter-x-%E7%BD%91%E9%A1%B5%E7%89%88-%E8%A7%86%E9%A2%91-%E5%8E%9F%E5%A7%8B%E5%9B%BE%E7%89%87-gif%E4%B8%80%E9%94%AE%E4%B8%8B%E8%BD%BD-limbopro) <Badge type="tip" text="GreasyFork" />　　安装量：**17,813**　　评分：👍29 / 👎2

## 功能介绍

本脚本为 Twitter/X 网页版添加一键下载按钮，支持直接下载推文中的视频、原始图片（4K）、GIF 动图。下载的图片会按用户名分类保存，还能将推文内容生成图片。适用于多种 Twitter 视频下载相关网站。

## 适用网站

- Twitter/X
- Twitter视频下载器（twittervideodownloader.com）
- TwitterVid（twittervid.com）
- Tweeload（tweeload.com）
- Twitter MP4下载（twittervideomp4.com）

## 使用方法

1. 1. 安装脚本后，打开 Twitter/X 或支持的视频下载网站。
2. 2. 在推文下方会出现下载按钮，点击即可一键下载视频、图片或 GIF。
3. 3. 下载的图片会自动按用户名分类保存。
4. 4. 可选择将推文内容生成图片进行保存。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，所有操作均在网页内完成。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-13

> 该脚本仅在页面上插入下载按钮和样式，无任何数据外传、隐私采集、远程代码执行、混淆、DOM XSS、权限滥用、敏感 API 调用、供应链或 iframe 风险。安全性极高，适合放心使用。

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
> 脚本未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource 等），也未发现数据外传行为。  
> 位置：全局  
> 建议：保持当前实现，避免添加任何外传逻辑。

**⛔ CRITICAL** — 隐私采集  
> 脚本未访问 document.cookie、localStorage、sessionStorage、IndexedDB，也未监听键盘输入、表单字段或剪贴板内容。  
> 位置：全局  
> 建议：保持当前实现，避免添加隐私采集逻辑。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)，也未动态插入外部脚本或通过 @require 加载远程 JS。  
> 位置：全局  
> 建议：保持当前实现，避免远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 脚本代码未混淆，无 base64 解码、字符串数组映射或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未检测到将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 DOM XSS 风险。  
> 位置：全局  
> 建议：如需插入动态内容，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> 脚本未申请任何 @grant 权限，实际代码也未使用 GM_* API，无权限滥用风险。  
> 位置：元数据  
> 建议：仅申请必要权限，避免权限滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification 等）。  
> 位置：全局  
> 建议：如需使用敏感 API，需征得用户同意。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，也未动态加载外部 JS，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，建议使用可信 CDN 并固定版本。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到修改 frame 保护策略或创建隐藏 iframe，无 ClickJacking/iframe 风险。  
> 位置：全局  
> 建议：如需操作 iframe，需确保安全。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/478651-twitter-x-%E7%BD%91%E9%A1%B5%E7%89%88-%E8%A7%86%E9%A2%91-%E5%8E%9F%E5%A7%8B%E5%9B%BE%E7%89%87-gif%E4%B8%80%E9%94%AE%E4%B8%8B%E8%BD%BD-limbopro)*
