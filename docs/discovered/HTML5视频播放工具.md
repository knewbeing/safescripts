---
title: "HTML5视频播放工具"
---

# HTML5视频播放工具

`视频增强`  `快捷键`  `画中画`  `网页全屏`  `截图`  `直播支持`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/HTML5视频播放工具.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.0.2**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/30545-html5%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%B7%A5%E5%85%B7) <Badge type="tip" text="GreasyFork" />　　安装量：**1,278,300**　　评分：👍2614 / 👎21

## 功能介绍

本脚本为主流视频网站和直播平台的HTML5视频播放提供增强功能，包括视频截图、画中画、缓存视频、网页全屏、以及丰富的快捷键操作（如快进、快退、暂停、音量调节、切换全屏、上下帧、播放速度等）。支持自定义站点，方便用户在多种平台上提升观看体验。

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
- 网易视频
- 搜狐视频
- 豆瓣电影
- 百度云
- 风行视频
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

## 使用方法

1. 安装脚本后，访问支持的视频或直播网站。
2. 在视频播放页面，使用快捷键进行快进、快退、暂停、音量调节等操作。
3. 可通过菜单命令或界面按钮进行截图、切换画中画、网页全屏等功能。
4. 如需自定义站点或快捷键，可在脚本设置中调整。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让界面更美观或突出功能按钮。 |
| `window.onurlchange` | 监听网页地址变化，确保功能在页面切换时持续有效。 |
| `unsafeWindow` | 允许脚本访问网页的底层对象，实现高级功能。 |
| `GM_registerMenuCommand` | 在油猴菜单中添加自定义命令，方便用户操作和设置。 |
| `GM_setValue` | 保存用户设置或状态，保证个性化体验。 |
| `GM_getValue` | 读取用户保存的设置或状态，恢复个性化体验。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-05-25

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、WebSocket 使用等高危行为。主要风险为供应链风险（未固定版本哈希的第三方库）和权限滥用（申请了未使用的高权限）。整体安全性较高，建议修正供应链和权限申请问题以进一步提升安全性。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — Supply Chain Risk  
> @require 加载的第三方库（Vue 和 jQuery）来自 jsdelivr 官方 CDN，但未固定版本哈希，存在供应链污染风险。  
> 位置：元数据 @require  
> 建议：建议使用带有完整版本号和哈希的 CDN URL，或官方 CDN，避免使用可变/latest 路径。

**🟠 MEDIUM** — Permission Abuse  
> 申请了 unsafeWindow 权限，允许脚本访问页面全局对象，可能被滥用或引发安全问题。  
> 位置：元数据 @grant unsafeWindow  
> 建议：仅在确实需要与页面脚本交互时使用 unsafeWindow，避免滥用。

**🟠 MEDIUM** — Permission Abuse  
> 申请了 window.onurlchange 权限，但代码中未使用该 API，属于高权限未使用。  
> 位置：元数据 @grant window.onurlchange  
> 建议：移除未使用的高权限申请，减少攻击面。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/30545-html5%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%B7%A5%E5%85%B7)*
