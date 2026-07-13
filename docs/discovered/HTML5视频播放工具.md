---
title: "HTML5视频播放工具"
---

# HTML5视频播放工具

`视频增强`  `快捷键`  `网页全屏`  `画中画`  `直播支持`  `截图`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/HTML5视频播放工具.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.0.2**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/30545-html5%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%B7%A5%E5%85%B7) <Badge type="tip" text="GreasyFork" />　　安装量：**1,281,224**　　评分：👍2614 / 👎21

## 功能介绍

本脚本为主流视频网站和直播平台提供HTML5视频增强功能，包括视频截图、画中画、缓存视频、网页全屏、以及丰富的快捷键操作（如快进、快退、暂停/播放、音量、下一集、上下帧、播放速度等）。支持自定义站点，提升观看体验。

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
- 百度云
- 凤凰视频
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

1. 安装脚本后，访问任意支持的视频或直播网站。
2. 播放视频时，屏幕上会出现工具按钮或提示。
3. 使用快捷键或点击工具按钮实现截图、画中画、快进、全屏等功能。
4. 可在油猴菜单中进行自定义设置或添加新站点。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让界面更美观或突出功能按钮。 |
| `window.onurlchange` | 监控网页地址变化，适用于单页面应用的视频切换。 |
| `unsafeWindow` | 允许脚本访问和操作网页的全局对象，增强功能实现。 |
| `GM_registerMenuCommand` | 在油猴菜单中添加自定义命令，方便用户操作或配置。 |
| `GM_setValue` | 保存用户设置或偏好，保证个性化体验。 |
| `GM_getValue` | 读取用户设置或偏好，实现个性化功能。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-13

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 滥用、供应链或 iframe 风险。@require 的第三方库来源可信且锁定版本。整体安全性高，适合普通用户使用。

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
> 脚本未检测到任何外部数据传输、统计或追踪行为。未发现 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource 等网络请求。  
> 位置：全局代码  
> 建议：保持现状，勿添加外传代码。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到对 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段、键盘输入的监听与外传。  
> 位置：全局代码  
> 建议：保持现状，勿采集用户隐私数据。

**🔴 HIGH** — 远程代码执行  
> 未检测到 eval、new Function、setTimeout(string)、setInterval(string)、document.write、动态 script 标签加载远程 JS 等远程代码执行风险。  
> 位置：全局代码  
> 建议：保持现状，避免引入动态执行代码。

**🔴 HIGH** — 代码混淆  
> 未检测到代码混淆、base64 解码执行、字符串数组混淆、unicode 混淆或高度压缩单行代码。  
> 位置：全局代码  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 未检测到 DOM XSS 风险。未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未见 document.write 注入不可信内容。  
> 位置：全局代码  
> 建议：如需插入动态内容，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_addStyle、window.onurlchange、unsafeWindow、GM_registerMenuCommand、GM_setValue、GM_getValue 权限，均有实际用途，未见权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未检测到敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）调用。  
> 位置：全局代码  
> 建议：如需调用敏感 API，需征得用户同意。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的第三方库（Vue 2.7.16、jQuery 3.6.4）均来自官方 CDN（jsdelivr），且指定了明确版本，无供应链污染风险。  
> 位置：元数据 @require  
> 建议：继续使用可信 CDN 并锁定版本。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未检测到脚本修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：全局代码  
> 建议：如需操作 iframe，需确保安全。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/30545-html5%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%B7%A5%E5%85%B7)*
