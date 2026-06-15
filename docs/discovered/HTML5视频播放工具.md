---
title: "HTML5视频播放工具"
---

# HTML5视频播放工具

`视频增强`  `快捷键`  `画中画`  `网页全屏`  `直播`  `截图`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/HTML5视频播放工具.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.0.2**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/30545-html5%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%B7%A5%E5%85%B7) <Badge type="tip" text="GreasyFork" />　　安装量：**1,279,757**　　评分：👍2613 / 👎21

## 功能介绍

本脚本为主流视频网站和直播平台提供HTML5视频增强功能，包括视频截图、画中画、缓存视频、网页全屏、以及丰富的快捷键操作（如快进、快退、暂停、音量、切换全屏、上下帧、播放速度等）。支持自定义站点，提升观看体验。

## 适用网站

- 腾讯视频
- 优酷
- 土豆
- 爱奇艺
- B站
- 西瓜视频
- 头条视频
- AcFun
- PPTV
- 咪咕视频
- 搜狐视频
- 芒果TV
- 豆瓣电影
- 百度网盘
- 网易云课堂
- 新浪视频
- 微博
- 凤凰视频
- 时光网
- YouTube
- TED
- Twitch
- YY直播
- 虎牙直播
- 斗鱼直播
- 龙珠直播
- 战旗直播
- 抖音

## 使用方法

1. 安装脚本后，打开支持的视频网站。
2. 播放视频时，按快捷键即可实现快进、截图、画中画等功能。
3. 可在油猴菜单中自定义部分功能或站点。
4. 如需网页全屏、缓存视频等高级操作，按对应快捷键或菜单命令。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让界面更美观或突出。 |
| `window.onurlchange` | 监听网页地址变化，适应单页应用或动态加载。 |
| `unsafeWindow` | 允许脚本访问网页的底层对象，增强功能兼容性。 |
| `GM_registerMenuCommand` | 在油猴菜单中添加自定义命令，方便用户操作。 |
| `GM_setValue` | 保存用户设置或偏好，记忆自定义配置。 |
| `GM_getValue` | 读取用户保存的设置，恢复个性化体验。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：97/100　　**分析时间**：2026-06-15

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用或供应链风险。唯一轻微问题为申请了未使用的 window.onurlchange 权限，建议移除。整体安全性极高，适合公开使用。

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
> 脚本未检测到任何网络请求（GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、sendBeacon），不存在数据外传行为。  
> 位置：全局代码  
> 建议：保持无外传设计，避免未来引入任何数据上报代码。

**⛔ CRITICAL** — Privacy Collection  
> 脚本未检测到任何隐私采集行为（未读取 document.cookie、localStorage、sessionStorage、IndexedDB、未监听键盘输入并外传、未读取表单字段、未访问指纹 API、未读取剪贴板）。  
> 位置：全局代码  
> 建议：继续保持不采集用户隐私数据。

**🔴 HIGH** — Remote Code Execution  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML/outerHTML 插入外部脚本、@require 加载远程 JS（已固定版本）、document.write 插入脚本内容。  
> 位置：全局代码  
> 建议：避免动态执行字符串代码，保持安全。

**🔴 HIGH** — Code Obfuscation  
> 脚本未检测到任何代码混淆（无 base64 解码执行、无字符串数组映射、无大量 unicode 编码、无高度压缩单行代码）。  
> 位置：全局代码  
> 建议：保持代码可读性，便于社区审查。

**🔴 HIGH** — DOM XSS  
> 脚本未检测到 DOM XSS 风险（未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未通过 document.write 插入不可信内容，未操作 iframe src 为 javascript: 协议）。  
> 位置：全局代码  
> 建议：如需插入用户输入，务必进行转义。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请的 @grant 权限与实际代码使用基本匹配，未检测到高权限滥用（如 GM_download、GM_openInTab），但 window.onurlchange 权限未实际使用。  
> 位置：元数据 @grant  
> 建议：建议移除未使用的 window.onurlchange 权限。

**🟠 MEDIUM** — Sensitive API  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：全局代码  
> 建议：如需调用敏感 API，需征得用户明确同意。

**🟠 MEDIUM** — Supply Chain Risk  
> @require 加载的第三方库（Vue、jQuery）均来自官方 CDN，并已固定版本号，供应链风险较低。  
> 位置：元数据 @require  
> 建议：继续使用官方 CDN并固定版本，避免加载可变 URL。

**🟡 LOW** — ClickJacking/Iframe  
> 脚本未检测到修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：全局代码  
> 建议：如需操作 iframe，需谨慎处理，避免 clickjacking。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/30545-html5%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%B7%A5%E5%85%B7)*
