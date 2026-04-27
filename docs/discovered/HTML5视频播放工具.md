---
title: "HTML5视频播放工具"
---

# HTML5视频播放工具

`视频增强`  `快捷键`  `网页全屏`  `画中画`  `截图`  `直播支持`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/HTML5视频播放工具.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.0.2**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/30545-html5%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%B7%A5%E5%85%B7) <Badge type="tip" text="GreasyFork" />　　安装量：**1,276,444**　　评分：👍2611 / 👎21

## 功能介绍

本脚本为主流视频网站和直播平台提供HTML5视频增强功能，包括视频截图、画中画、缓存视频、网页全屏、以及丰富的快捷键操作（如快进、快退、暂停、音量、切换全屏、上下帧、播放速度等）。支持自定义站点，提升观看体验。

## 适用网站

- 腾讯视频
- 优酷
- 爱奇艺
- B站
- 西瓜视频
- 微博
- 网易云课堂
- 搜狐视频
- PPTV
- 芒果TV
- 咪咕视频
- 新浪视频
- 百度云盘
- 豆瓣电影
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
- AcFun

## 使用方法

1. 安装脚本后，访问任意支持的视频或直播网站。
2. 播放视频时，使用键盘快捷键进行快进、快退、暂停、音量调整等操作。
3. 可通过菜单命令或界面按钮进行截图、画中画、网页全屏等功能。
4. 如需自定义支持站点，可在脚本设置中添加。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 允许脚本添加自定义样式，优化界面显示。 |
| `window.onurlchange` | 监听网页地址变化，适应单页应用。 |
| `unsafeWindow` | 访问网页的原生窗口对象，增强功能兼容性。 |
| `GM_registerMenuCommand` | 在油猴菜单中添加自定义命令，方便用户操作。 |
| `GM_setValue` | 保存用户设置或数据到本地。 |
| `GM_getValue` | 读取本地保存的用户设置或数据。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-04-27

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。主要风险为供应链依赖未固定版本哈希和高权限申请。整体安全性较高，建议加强依赖管理和权限控制。

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
> @require 加载的第三方库（Vue、jQuery）来自 jsdelivr 官方 CDN，但未固定版本哈希，存在供应链污染风险。  
> 位置：元数据 @require  
> 建议：建议使用带有版本哈希的 CDN URL（如 https://cdn.jsdelivr.net/npm/vue@2.7.16/dist/vue.min.js?sha384=...），确保依赖不可变。

**🟠 MEDIUM** — Permission Abuse  
> 申请了 window.onurlchange 和 unsafeWindow 权限，后者为高权限，可能被滥用。  
> 位置：元数据 @grant  
> 建议：仅在实际需要时申请 unsafeWindow，避免滥用高权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/30545-html5%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%B7%A5%E5%85%B7)*
