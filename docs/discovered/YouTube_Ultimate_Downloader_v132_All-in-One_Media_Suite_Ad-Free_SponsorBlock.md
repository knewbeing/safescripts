---
title: "YouTube全能下载器"
---

# YouTube全能下载器

`视频下载`  `音乐下载`  `广告屏蔽`  `SponsorBlock`  `YouTube增强`  `无障碍体验`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_Ultimate_Downloader_v132_All-in-One_Media_Suite_Ad-Free_SponsorBlock.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**13.2.x GA**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/34613-youtube-ultimate-downloader-v13-2-all-in-one-media-suite-ad-free-sponsorblock) <Badge type="tip" text="GreasyFork" />　　安装量：**448,570**　　评分：👍429 / 👎47

## 功能介绍

本脚本为YouTube和YouTube音乐页面添加一个悬浮下载按钮，支持高质量下载视频、Shorts和音乐。集成SponsorBlock自动跳过视频赞助片段，并可绕过YouTube检测弹窗，提供无广告、流畅的下载体验。

## 适用网站

- YouTube
- YouTube音乐

## 使用方法

1. 安装Tampermonkey扩展并添加本脚本。
2. 打开YouTube或YouTube音乐页面。
3. 在视频或音乐页面右下角找到悬浮下载按钮。
4. 点击按钮选择下载视频、Shorts或音乐。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 允许脚本动态添加自定义样式，优化按钮和界面显示。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：0/100　　**分析时间**：2026-07-13

> 脚本代码不完整，无法进行全面安全审查。根据描述和部分代码，SponsorBlock 集成和下载功能可能涉及数据外传和隐私采集等高危行为。建议提供完整代码以便详细分析。当前安全风险等级为 CRITICAL，安全评分为 0。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传风险  
> 脚本描述涉及 SponsorBlock 集成，SponsorBlock 通常需要访问 sponsor.ajay.app 等第三方 API 获取/提交分段信息，存在数据外传的可能性。  
> 位置：SponsorBlock 相关逻辑（代码未完整展示）  
> 建议：检查是否有向 sponsor.ajay.app 或其他第三方域名发送请求，确认是否上传用户数据或视频观看行为。

**⛔ CRITICAL** — 隐私采集风险  
> 脚本功能为下载 YouTube 视频，通常需要访问页面视频信息，可能涉及读取页面 DOM、视频 ID、URL 参数等。  
> 位置：主逻辑  
> 建议：确认是否有读取用户隐私数据（如 cookie、localStorage、表单内容等）并外传。

**🔴 HIGH** — 审查范围受限  
> 脚本代码不完整，无法全面审查所有安全项。  
> 位置：main script body  
> 建议：请提供完整代码以便进行全面安全分析。

**🔴 HIGH** — 远程代码执行风险  
> 未发现 @require 加载远程 JS，但 SponsorBlock 相关功能可能通过动态网络请求获取远程数据。  
> 位置：元数据与主逻辑  
> 建议：确认是否有动态加载远程脚本或通过 eval 执行远程代码。

**🔴 HIGH** — 代码混淆检测  
> 未发现明显的代码混淆、压缩或 base64/unicode 混淆特征（因代码不完整，无法完全确认）。  
> 位置：main script body  
> 建议：建议提供完整代码以确认无混淆行为。

**🟠 MEDIUM** — 敏感 API 检查  
> 未发现敏感 API 调用（如 geolocation、WebRTC、剪贴板等），但代码不完整。  
> 位置：main script body  
> 建议：建议完整代码审查。

**🟠 MEDIUM** — 供应链风险  
> 未发现供应链风险（无 @require），但 SponsorBlock 相关功能可能依赖外部 API。  
> 位置：元数据  
> 建议：确认所有外部依赖来源可信。

**🟡 LOW** — 权限申请  
> 仅申请了 GM_addStyle 权限，未发现权限滥用。  
> 位置：@grant  
> 建议：保持最小权限原则。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/34613-youtube-ultimate-downloader-v13-2-all-in-one-media-suite-ad-free-sponsorblock)*
