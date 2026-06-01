---
title: "HTML5视频播放工具"
---

# HTML5视频播放工具

`视频增强`  `快捷键`  `画中画`  `网页全屏`  `截图`  `直播支持`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/HTML5视频播放工具.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.0.2**　　发现时间：**2026-06-01**　　来源：[GreasyFork](https://greasyfork.org/scripts/30545-html5%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%B7%A5%E5%85%B7) <Badge type="tip" text="GreasyFork" />　　安装量：**1,278,784**　　评分：👍2614 / 👎21

## 功能介绍

本脚本为主流视频网站和直播平台提供HTML5视频增强功能，包括截图、画中画、缓存视频、网页全屏、以及丰富的快捷键操作（如快进、快退、暂停、音量调节、切换全屏、上下帧、播放速度等）。支持自定义站点，提升观看体验。

## 适用网站

- 腾讯视频
- 优酷
- 爱奇艺
- B站
- 西瓜视频
- AcFun
- PPTV
- 芒果TV
- 咪咕视频
- 新浪视频
- 微博
- 网易云课堂
- 搜狐视频
- 豆瓣电影
- 百度云盘
- 凤凰网视频
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

1. 安装脚本后，访问支持的视频或直播网站。
2. 播放视频时，使用键盘快捷键进行快进、快退、暂停、音量调节等操作。
3. 可通过油猴菜单自定义快捷键和功能。
4. 点击工具按钮可实现截图、画中画、网页全屏等功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 允许脚本添加自定义样式，优化界面显示。 |
| `window.onurlchange` | 监听网页地址变化，便于自动适应新视频页面。 |
| `unsafeWindow` | 访问网页的全局对象，增强与页面的交互能力。 |
| `GM_registerMenuCommand` | 在油猴菜单中添加自定义命令，方便用户操作。 |
| `GM_setValue` | 保存用户设置，如快捷键配置等。 |
| `GM_getValue` | 读取用户保存的设置，实现个性化功能。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-06-01

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链或 iframe 风险。所有 @grant 权限均有实际用途，@require 的第三方库来源可信且锁定版本。整体安全性高，适合普通用户使用。建议持续关注第三方库安全更新，避免未来潜在风险。

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
> 脚本未检测到任何外部数据传输（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、sendBeacon 等），也未发现任何数据上报、统计或追踪行为。  
> 位置：全局  
> 建议：保持现状，勿添加任何外传逻辑。

**⛔ CRITICAL** — 隐私采集  
> 未检测到对 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段、键盘输入监听并外传等隐私采集行为。  
> 位置：全局  
> 建议：保持现状，勿采集用户隐私数据。

**🔴 HIGH** — 远程代码执行  
> 未检测到 eval、new Function、setTimeout(string)、setInterval(string)、动态 script 标签加载远程 JS、document.write 插入脚本等远程代码执行风险。  
> 位置：全局  
> 建议：保持现状，避免动态执行外部代码。

**🔴 HIGH** — 代码混淆  
> 未检测到代码混淆（无 base64 解码、字符串数组映射、unicode 混淆、高度压缩单行代码等）。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

**🔴 HIGH** — DOM XSS / 注入  
> 未检测到 DOM XSS 风险（未发现用户输入或 URL 参数直接插入 innerHTML/outerHTML、document.write、iframe src=javascript: 等）。  
> 位置：全局  
> 建议：插入 HTML 时始终进行转义。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了部分高权限（如 unsafeWindow、GM_setValue、GM_getValue、GM_registerMenuCommand），但均有实际用途，未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，定期复查。

**🟠 MEDIUM** — 敏感 API 调用  
> 未检测到敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）调用。  
> 位置：全局  
> 建议：如需调用敏感 API，需征得用户同意。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的第三方库（Vue 2.7.16、jQuery 3.6.4）均来自官方 CDN（jsdelivr），且为固定版本，供应链风险较低。  
> 位置：元数据 @require  
> 建议：如需加载第三方库，务必使用可信 CDN 并锁定版本。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未检测到脚本修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：如需操作 iframe，需明确告知用户。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/30545-html5%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%B7%A5%E5%85%B7)*
