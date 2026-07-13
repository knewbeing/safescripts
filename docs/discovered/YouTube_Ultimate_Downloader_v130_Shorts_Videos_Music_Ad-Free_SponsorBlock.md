---
title: "YouTube终极下载器"
---

# YouTube终极下载器

`视频下载`  `音乐下载`  `广告屏蔽`  `赞助片段跳过`  `YouTube增强`  `快捷工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_Ultimate_Downloader_v130_Shorts_Videos_Music_Ad-Free_SponsorBlock.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**13.0 GA**　　发现时间：**2026-06-01**　　来源：[GreasyFork](https://greasyfork.org/scripts/34613-youtube-ultimate-downloader-v13-0-shorts-videos-music-ad-free-sponsorblock) <Badge type="tip" text="GreasyFork" />　　安装量：**445,384**　　评分：👍426 / 👎47

## 功能介绍

本脚本为YouTube和YouTube音乐页面添加一个悬浮下载按钮，支持下载视频、Shorts和音乐，且可自动跳过广告和赞助片段。它还能绕过YouTube检测弹窗，提升下载体验。

## 适用网站

- YouTube
- YouTube音乐

## 使用方法

1. 安装脚本后，打开YouTube或YouTube音乐页面。
2. 在视频或Shorts页面会出现悬浮下载按钮。
3. 点击按钮即可选择下载视频、Shorts或音乐。
4. 无需额外设置，广告和赞助片段会自动跳过。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于动态添加或修改页面样式，让悬浮按钮更美观。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：25/100　　**分析时间**：2026-07-13

> 由于脚本代码不完整，无法全面评估其安全性。当前未发现明显的数据外传、隐私采集、远程代码执行、代码混淆等高危行为，但由于缺失主要功能实现部分，存在较高的潜在风险。建议补充完整代码以进行详细安全审查。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🔴 HIGH** — 审查范围受限  
> 脚本代码不完整，无法全面审查所有安全风险。  
> 位置：main script body  
> 建议：请提供完整代码以进行全面安全分析。

**🔴 HIGH** — 数据外传  
> 未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket 等），但代码不完整，无法确认后续行为。  
> 位置：main script body  
> 建议：补充完整代码，重点关注网络请求相关实现。

**🔴 HIGH** — 隐私采集  
> 未检测到隐私采集行为（如读取 cookie、localStorage、监听输入等），但代码不完整，无法确认后续行为。  
> 位置：main script body  
> 建议：补充完整代码，重点关注隐私相关 API 的使用。

**🔴 HIGH** — 远程代码执行  
> 未检测到 eval、new Function、setTimeout(string) 等远程代码执行风险，但代码不完整，无法确认后续行为。  
> 位置：main script body  
> 建议：补充完整代码，重点关注动态代码执行相关实现。

**🔴 HIGH** — 代码混淆  
> 未检测到代码混淆特征，但代码不完整，无法确认后续行为。  
> 位置：main script body  
> 建议：补充完整代码，检查是否存在混淆或压缩代码。

**🟠 MEDIUM** — 权限滥用  
> 仅申请了 GM_addStyle 权限，未发现权限滥用，但代码不完整，无法确认后续行为。  
> 位置：@grant 元数据  
> 建议：补充完整代码，核查实际权限使用情况。

**🟠 MEDIUM** — 供应链风险  
> 未检测到供应链风险（如 @require 加载第三方库），但代码不完整，无法确认后续行为。  
> 位置：@require 元数据  
> 建议：补充完整代码，检查是否有外部依赖。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/34613-youtube-ultimate-downloader-v13-0-shorts-videos-music-ad-free-sponsorblock)*
