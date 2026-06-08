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

**风险等级**：⛔ CRITICAL　　**安全评分**：75/100　　**分析时间**：2026-06-08

> 该脚本元数据中声明了对 sv.acreatorhub.com 的网络访问权限（@connect），存在潜在的数据外传风险。当前代码片段未见实际网络请求实现，但如后续代码存在相关行为，可能导致用户数据被上传至第三方服务器。未发现隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 滥用、供应链风险或 iframe 风险。建议进一步审查完整代码，确认是否有实际的数据传输行为，并根据实际用途调整权限。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：sv.acreatorhub.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 @connect 申请了 sv.acreatorhub.com 域名的网络访问权限，但在已提供的代码片段中未见实际网络请求代码。若后续代码存在 GM_xmlhttpRequest/fetch/XHR/WebSocket 等请求，可能导致数据外传风险。  
> 位置：元数据 @connect  
> 建议：仅在确有必要时申请 @connect 权限，并明确代码中网络请求的用途和数据内容。若无实际用途应移除。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/575364-stripview-%E9%80%8F%E8%A7%86%E9%95%9C)*
