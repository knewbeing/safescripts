---
title: "EasyTube V5 — YouTube 广告跳过、SponsorBlock、强制 4K 和 HD 下载"
---

# EasyTube V5 — YouTube 广告跳过、SponsorBlock、强制 4K 和 HD 下载

`广告拦截`  `视频下载`  `清晰度增强`  `SponsorBlock`  `YouTube优化`  `自动跳过`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/EasyTube_V5_YouTube_Ad_Skip_SponsorBlock_Force_4K_HD_Downloader.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**5.1.0**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/561432-easytube-v5-youtube-ad-skip-sponsorblock-force-4k-hd-downloader) <Badge type="tip" text="GreasyFork" />　　安装量：**7,781**　　评分：👍11 / 👎3

## 功能介绍

本脚本可自动跳过和屏蔽 YouTube 广告，集成 SponsorBlock 自动跳过视频中的赞助片段，强制播放 4K 清晰度，并支持下载高清视频。还能保存用户设置并绕过广告拦截检测，使用流畅不卡顿。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后，打开 YouTube 网站。
2. 观看视频时广告会自动跳过或屏蔽。
3. 赞助片段会自动跳过，无需手动操作。
4. 可在视频页面找到下载按钮，下载高清视频。
5. 脚本会自动保存你的偏好设置，无需重复配置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于动态添加自定义样式，让界面更美观或突出功能按钮。 |
| `GM_xmlhttpRequest` | 用于跨域请求 SponsorBlock 和下载服务，获取跳过片段和下载链接。 |
| `GM_setValue` | 用于保存用户的脚本设置，如偏好和功能开关。 |
| `GM_getValue` | 用于读取用户保存的脚本设置，保证个性化体验。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：67/100　　**分析时间**：2026-07-06

> 脚本主要通过 SponsorBlock API 和视频下载服务进行数据请求，未发现用户敏感数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险或 iframe 风险。整体安全性较高，建议持续关注外部 API 的数据用途和未来权限变更。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://sponsor.ajay.app/api/skipSegments, https://evdfrance.fr） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 sponsor.ajay.app 和 evdfrance.fr 发起网络请求，获取 SponsorBlock 数据和视频下载服务。请求内容主要为视频 ID，未发现用户敏感数据或 Cookie 外传。  
> 位置：SponsorBlock API 调用、evdfrance.fr 下载接口  
> 建议：确保请求内容仅包含必要的视频信息，不包含用户敏感数据。建议明确说明数据用途。

**⛔ CRITICAL** — 隐私采集  
> 脚本未监听键盘输入、未读取表单字段、未访问 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板等隐私相关 API。  
> 位置：主代码逻辑  
> 建议：保持隐私安全，避免未来引入隐私采集行为。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等动态代码执行方式，也未通过 innerHTML/outerHTML 插入外部脚本。  
> 位置：主代码逻辑  
> 建议：保持代码执行安全，避免未来引入远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 脚本未使用混淆技术，无 base64 解码、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：主代码逻辑  
> 建议：保持代码可读性，便于社区审查。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未通过 innerHTML/outerHTML 插入用户输入或 URL 参数，未发现 DOM XSS 风险。  
> 位置：主代码逻辑  
> 建议：保持安全插入方式，避免未来引入注入风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请 GM_xmlhttpRequest 权限用于 SponsorBlock 和下载服务，未申请高权限如 GM_download、GM_openInTab，权限申请与实际用途基本匹配。  
> 位置：元数据 @grant  
> 建议：定期复查权限申请，避免未来版本滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Notification、Clipboard）。  
> 位置：主代码逻辑  
> 建议：避免未来引入敏感 API 调用。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，所有依赖均为本地实现，无供应链风险。  
> 位置：元数据 @require  
> 建议：如未来引入第三方库，需固定版本哈希并使用可信 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，未创建隐藏 iframe 用于数据提取。  
> 位置：主代码逻辑  
> 建议：保持 iframe 安全，避免未来引入 clickjacking 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v5-youtube-ad-skip-sponsorblock-force-4k-hd-downloader)*
