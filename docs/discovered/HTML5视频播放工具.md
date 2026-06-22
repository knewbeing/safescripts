---
title: "HTML5视频播放工具"
---

# HTML5视频播放工具

`视频增强`  `快捷键`  `画中画`  `网页全屏`  `截图`  `直播支持`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/HTML5视频播放工具.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.0.2**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/30545-html5%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%B7%A5%E5%85%B7) <Badge type="tip" text="GreasyFork" />　　安装量：**1,280,219**　　评分：👍2614 / 👎21

## 功能介绍

本脚本为主流视频网站和直播平台提供HTML5视频增强功能，包括截图、画中画、缓存视频、网页全屏、以及丰富的快捷键操作。支持快进、快退、暂停/播放、音量调节、切换全屏、上下帧、播放速度等。用户可自定义支持站点，提升观看体验。

## 适用网站

- 腾讯视频
- 优酷
- 爱奇艺
- B站
- 西瓜视频
- 新浪视频
- 微博
- 网易云课堂
- 搜狐视频
- PPTV
- 芒果TV
- 咪咕视频
- 豆瓣电影
- 百度云盘
- 凤凰视频
- YouTube
- TED
- Twitch
- 斗鱼
- YY
- 虎牙
- 龙珠直播
- 战旗直播
- 抖音
- AcFun

## 使用方法

1. 安装脚本后，打开任意支持的视频或直播网站。
2. 播放视频时，界面会自动显示增强工具栏。
3. 通过工具栏按钮或快捷键实现截图、画中画、全屏等功能。
4. 可在油猴菜单中自定义快捷键和功能设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 允许脚本添加自定义样式，优化界面显示。 |
| `window.onurlchange` | 监听网页地址变化，适应单页面应用。 |
| `unsafeWindow` | 访问网页的全局对象，增强功能兼容性。 |
| `GM_registerMenuCommand` | 在油猴菜单中添加自定义命令，方便操作。 |
| `GM_setValue` | 保存用户设置或偏好，提升个性化体验。 |
| `GM_getValue` | 读取用户保存的设置，实现持久化配置。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-06-22

> 该脚本主要为 HTML5 视频播放页面提供快捷键和增强功能。未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等高危行为。@require 的第三方库均为官方 CDN 且固定版本。存在申请未使用的高权限（unsafeWindow, window.onurlchange），建议精简权限。整体安全风险较低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> @grant 申请了 unsafeWindow 权限，存在一定安全隐患，但脚本本身未见滥用。  
> 位置：元数据 @grant  
> 建议：如无必要，建议移除 unsafeWindow 权限。

**🟠 MEDIUM** — 权限滥用  
> @grant 申请了 window.onurlchange 权限，但脚本未见实际使用。  
> 位置：元数据 @grant  
> 建议：建议移除未使用的高权限申请，减少攻击面。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/30545-html5%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%B7%A5%E5%85%B7)*
