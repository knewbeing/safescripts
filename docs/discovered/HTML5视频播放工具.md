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

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-06

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感API调用、供应链风险或iframe风险。@require第三方库来源可信且版本固定。唯一建议是移除未使用的window.onurlchange权限。整体安全性极高，适合公开使用。

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
> 脚本未检测到任何网络请求（GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、sendBeacon），不存在数据外传行为。  
> 位置：全局代码  
> 建议：保持无外部数据传输，确保用户隐私安全。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到任何隐私采集行为（如读取cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段、键盘监听并外传、指纹API调用）。  
> 位置：全局代码  
> 建议：继续避免隐私采集，保障用户数据安全。

**🔴 HIGH** — 远程代码执行  
> 脚本未检测到远程代码执行风险（未使用eval、new Function、setTimeout(string)、setInterval(string)、innerHTML插入脚本、动态加载未固定版本的JS等）。  
> 位置：全局代码  
> 建议：继续避免动态执行不可信代码。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到代码混淆（无base64解码执行、字符串数组映射、unicode混淆、高度压缩单行代码等）。  
> 位置：全局代码  
> 建议：保持代码可读性，便于安全审查。

**🔴 HIGH** — DOM XSS/注入  
> 脚本未检测到DOM XSS/注入风险（未将用户输入或URL参数直接插入innerHTML/outerHTML、document.write插入不可信内容、iframe src为javascript:协议等）。  
> 位置：全局代码  
> 建议：继续避免DOM注入风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请的@grant权限与实际代码使用基本匹配，无滥用高权限行为。GM_addStyle、GM_registerMenuCommand、GM_setValue、GM_getValue、unsafeWindow均为合理用途。window.onurlchange未被实际使用，属于冗余权限。  
> 位置：元数据 @grant  
> 建议：建议移除未使用的window.onurlchange权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感API（如geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API等）。  
> 位置：全局代码  
> 建议：继续避免敏感API调用。

**🟠 MEDIUM** — 供应链风险  
> @require加载的第三方库（Vue和jQuery）均来自官方CDN（jsdelivr），且版本号固定，供应链风险较低。  
> 位置：元数据 @require  
> 建议：保持固定版本，避免供应链污染。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到ClickJacking或iframe风险（未修改frame保护策略，未创建隐藏iframe用于数据提取）。  
> 位置：全局代码  
> 建议：继续避免iframe相关风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/30545-html5%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%B7%A5%E5%85%B7)*
