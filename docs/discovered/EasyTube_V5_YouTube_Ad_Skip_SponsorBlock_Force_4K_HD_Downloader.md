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

**风险等级**：🟡 LOW　　**安全评分**：39/100　　**分析时间**：2026-07-27

> 脚本主要通过 SponsorBlock API 和视频下载服务器通信，未发现用户隐私采集、远程代码执行、混淆、DOM 注入、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。数据外传仅限于公开视频ID等，整体风险较低。建议持续关注外部 API 的数据处理安全性。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：sponsor.ajay.app, evdfrance.fr） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 与 sponsor.ajay.app 和 evdfrance.fr 通信，用于 SponsorBlock 功能和视频下载。未发现携带用户敏感数据，仅发送视频ID等公开信息。  
> 位置：CFG.sbApi, GM_xmlhttpRequest  
> 建议：确保仅发送必要的非敏感数据，避免扩展为用户行为或隐私数据上报。

**⛔ CRITICAL** — 隐私采集  
> 脚本未监听键盘输入、未读取表单字段、未访问剪贴板、未读取 cookie/localStorage/IndexedDB，仅使用 GM_setValue/GM_getValue 存储自身配置。  
> 位置：STATE, GM_setValue, GM_getValue  
> 建议：继续保持不采集用户隐私，避免未来扩展相关功能。

**🔴 HIGH** — 远程代码执行  
> 未发现 eval/new Function/setTimeout(string)/setInterval(string) 等远程代码执行风险。未动态加载外部脚本。  
> 位置：全局代码  
> 建议：保持代码执行安全，避免引入动态脚本执行。

**🔴 HIGH** — 代码混淆  
> 代码未混淆，无 base64/unicode/字符串数组映射等混淆特征，结构清晰。  
> 位置：全局代码  
> 建议：保持代码可读性，便于社区审查。

**🔴 HIGH** — DOM XSS / 注入  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 document.write 注入风险。  
> 位置：全局代码  
> 建议：继续避免 DOM 注入风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请 GM_xmlhttpRequest、GM_addStyle、GM_setValue、GM_getValue 权限，均有实际使用，无权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请必要权限，避免未来滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局代码  
> 建议：避免未来引入敏感 API 调用。

**🟠 MEDIUM** — 供应链风险  
> 未使用 @require 加载第三方库，所有代码本地实现，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未修改 frame 保护策略，未创建隐藏 iframe 用于数据提取。  
> 位置：全局代码  
> 建议：继续避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v5-youtube-ad-skip-sponsorblock-force-4k-hd-downloader)*
