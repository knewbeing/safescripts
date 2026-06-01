---
title: "StripView 透视镜"
---

# StripView 透视镜

`视频增强`  `工具`  `视觉特效`  `多平台`  `用户体验`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/StripView_透视镜.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**8.8.6**　　发现时间：**2026-05-11**　　来源：[GreasyFork](https://greasyfork.org/scripts/575364-stripview-%E9%80%8F%E8%A7%86%E9%95%9C) <Badge type="tip" text="GreasyFork" />　　安装量：**1,606**　　评分：👍2 / 👎0

## 功能介绍

本脚本为任意网页视频提供一个可拖拽的“透视镜”工具。用户可以在视频上自由移动该工具，查看视频的不同区域。优化了内存使用，适合长时间使用。支持多种主流视频网站。

## 适用网站

- YouTube
- B站
- Bilibili TV
- Twitch
- Vimeo
- Dailymotion
- Niconico
- AcFun
- 抖音国际版（TikTok）
- 抖音
- 快手
- 西瓜视频
- 腾讯视频
- 爱奇艺
- 优酷
- X（原Twitter）
- Twitter
- Reddit
- Iwara
- SpankBang
- Hanime
- TKTUBE

## 使用方法

1. 安装脚本后，访问支持的视频网站。
2. 在视频上会出现一个可拖拽的透视镜工具。
3. 按住并拖动透视镜，可以查看视频不同区域的细节。
4. 无需额外设置，直接使用即可。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于向网页添加自定义样式，让透视镜界面美观且不影响原有内容。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-01

> 该脚本主要功能为在视频页面上提供可拖拽的透视镜效果。代码结构清晰，无混淆，无远程代码执行风险，无隐私采集行为。虽然声明了 @connect sv.acreatorhub.com，但在已提供的代码中未发现任何实际的数据外传或网络请求实现。未发现 DOM XSS、敏感 API 滥用、WebSocket 使用、剪贴板访问、键盘监听等高危行为。整体安全性较高，建议关注后续版本是否引入实际的网络请求。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传声明  
> 脚本元数据声明了 @connect sv.acreatorhub.com，但在已提供的代码片段中未发现任何实际的网络请求代码（如 fetch、GM_xmlhttpRequest、XMLHttpRequest、WebSocket 等）。  
> 位置：元数据与主代码  
> 建议：如未来代码补全后出现网络请求，需检查其内容和目的。当前未发现数据外传实现。

**🟠 MEDIUM** — 权限滥用  
> 脚本未申请除 GM_addStyle 外的高权限，也未使用 GM_download、GM_openInTab 等敏感权限。  
> 位置：@grant 元数据  
> 建议：保持最小权限原则，避免申请未使用的高权限。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载任何第三方库，降低了供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用可信 CDN 并锁定版本。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/575364-stripview-%E9%80%8F%E8%A7%86%E9%95%9C)*
