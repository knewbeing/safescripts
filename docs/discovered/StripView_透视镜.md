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

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-05-25

> 该脚本仅注入CSS并实现视频透视镜功能，无任何数据外传、隐私采集、远程代码执行、混淆、DOM XSS、权限滥用、敏感API调用、供应链风险或iframe风险。安全评分100，风险极低。

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
> 脚本声明 @connect sv.acreatorhub.com，但完整代码未发现任何网络请求（GM_xmlhttpRequest、fetch、WebSocket等）实际调用。  
> 位置：元数据与代码  
> 建议：如后续代码补全或更新，需检查是否有数据外传行为。当前版本未检测到。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 cookie、localStorage、sessionStorage、IndexedDB，也未监听键盘输入、表单字段、剪贴板等敏感信息。  
> 位置：完整代码  
> 建议：保持现有设计，避免后续添加隐私采集逻辑。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)，也未动态加载远程脚本。  
> 位置：完整代码  
> 建议：保持现有安全实践，避免远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 脚本未发现混淆特征（base64解码、字符串数组映射、unicode混淆、高度压缩单行代码）。  
> 位置：完整代码  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS  
> 脚本未将用户输入或URL参数直接插入innerHTML/outerHTML，未发现DOM XSS风险。  
> 位置：完整代码  
> 建议：如后续涉及用户输入，需严格转义。

**🟠 MEDIUM** — 权限滥用  
> 仅申请GM_addStyle权限，未滥用高权限（如GM_download、GM_openInTab等）。  
> 位置：元数据  
> 建议：保持最小权限原则。

**🟠 MEDIUM** — 敏感API调用  
> 未调用敏感API（地理位置、RTCPeerConnection、MediaDevices、Clipboard、Notification等）。  
> 位置：完整代码  
> 建议：避免后续添加敏感API调用。

**🟠 MEDIUM** — 供应链风险  
> 未通过@require加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议固定版本哈希并使用官方CDN。

**🟡 LOW** — ClickJacking/iframe风险  
> 未修改frame保护策略，未创建隐藏iframe用于数据提取。  
> 位置：完整代码  
> 建议：保持现有安全设计。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/575364-stripview-%E9%80%8F%E8%A7%86%E9%95%9C)*
