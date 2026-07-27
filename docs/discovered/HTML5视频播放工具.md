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

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-07-27

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。主要风险为供应链风险（未锁定第三方库版本哈希）和权限滥用（申请了未使用的高权限）。整体安全性较高，建议进一步最小化权限并锁定依赖库版本。

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
> @require 加载第三方库（Vue、jQuery）来自 jsdelivr 官方 CDN，但未锁定具体文件哈希，存在供应链污染风险。  
> 位置：元数据 @require  
> 建议：建议使用 CDN 的固定版本哈希 URL 或官方 CDN，避免使用可变/latest 路径。

**🟠 MEDIUM** — Permission Abuse  
> 申请了 unsafeWindow 权限，允许脚本访问页面全局对象，可能被滥用。  
> 位置：元数据 @grant unsafeWindow  
> 建议：仅在确实需要与页面交互时使用 unsafeWindow，避免滥用。

**🟠 MEDIUM** — Permission Abuse  
> 申请了 window.onurlchange 权限，但代码未见实际使用，属于高权限未使用。  
> 位置：元数据 @grant window.onurlchange  
> 建议：移除未使用的高权限申请，最小化权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/30545-html5%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%B7%A5%E5%85%B7)*
