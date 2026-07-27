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

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-27

> 该脚本仅注入 CSS 并实现视频透视镜功能，无任何数据外传、隐私采集、远程代码执行、混淆、XSS、敏感 API 调用或供应链风险。仅申请 GM_addStyle 权限，安全性极高。

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
> 脚本声明 @connect sv.acreatorhub.com，但代码中未发现任何网络请求（GM_xmlhttpRequest、fetch、WebSocket等），未实际向该域发送数据。  
> 位置：元数据与代码  
> 建议：如未来添加网络请求，需严格限制数据类型与目的地。

**⛔ CRITICAL** — 隐私采集  
> 未发现任何隐私采集行为，如读取 cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段、键盘监听等。  
> 位置：完整代码  
> 建议：保持现有状态，勿添加隐私采集。

**🔴 HIGH** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML/outerHTML 执行 JS、动态 script 标签、document.write 等远程代码执行风险。  
> 位置：完整代码  
> 建议：避免动态执行代码。

**🔴 HIGH** — 代码混淆  
> 代码未混淆，无 base64 解码、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：完整代码  
> 建议：保持代码可读性。

**🔴 HIGH** — DOM XSS  
> 未发现 DOM XSS 或注入风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：完整代码  
> 建议：如需插入用户数据，务必转义。

**🟠 MEDIUM** — 权限滥用  
> 仅申请 GM_addStyle 权限，未滥用高权限。  
> 位置：元数据  
> 建议：仅申请必要权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 未调用敏感 API（地理位置、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：完整代码  
> 建议：如需调用敏感 API，需征得用户同意。

**🟠 MEDIUM** — 供应链风险  
> 未使用 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking/iframe风险  
> 未修改 frame 保护策略，未创建隐藏 iframe 用于数据提取。  
> 位置：完整代码  
> 建议：避免 iframe 滥用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/575364-stripview-%E9%80%8F%E8%A7%86%E9%95%9C)*
