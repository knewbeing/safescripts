---
title: "EasyTube V4.0 — 广告跳过、SponsorBlock 和 HD 下载器（无卡顿）"
---

# EasyTube V4.0 — 广告跳过、SponsorBlock 和 HD 下载器（无卡顿）

`广告屏蔽`  `YouTube增强`  `视频下载`  `SponsorBlock`  `画质提升`  `自动化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/EasyTube_V40_Ad_Skip_SponsorBlock_HD_Download_No_Lag.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**4.0.0**　　发现时间：**2026-05-11**　　来源：[GreasyFork](https://greasyfork.org/scripts/561432-easytube-v4-0-ad-skip-sponsorblock-hd-download-no-lag) <Badge type="tip" text="GreasyFork" />　　安装量：**6,375**　　评分：👍8 / 👎3

## 功能介绍

本脚本可自动跳过YouTube上的所有广告，集成SponsorBlock自动跳过视频中的赞助内容，强制启用4K画质，并支持通过evdfrance.fr一键下载高清视频。还能记住你的设置，并绕过广告拦截检测，使用流畅不卡顿。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后，打开YouTube任意视频页面。
2. 广告会自动被跳过，赞助内容自动跳过。
3. 如需下载视频，页面会出现下载按钮，点击即可。
4. 脚本会自动记住你的偏好设置，无需重复操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于向页面添加自定义样式，美化脚本界面。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取SponsorBlock数据和下载功能支持。 |
| `GM_setValue` | 用于保存用户的脚本设置，实现个性化体验。 |
| `GM_getValue` | 用于读取用户已保存的脚本设置。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：34/100　　**分析时间**：2026-07-27

> This script transmits YouTube video IDs and possibly user interaction data to two third-party servers (sponsor.ajay.app for SponsorBlock and evdfrance.fr for HD downloads). While these features are core to the script, they pose significant privacy and supply chain risks. No evidence of code obfuscation, DOM XSS, or excessive privilege usage. No sensitive privacy collection beyond settings storage. Users should be aware of the external data transmission and supply chain risks.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：sponsor.ajay.app, evdfrance.fr） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script uses GM_xmlhttpRequest to communicate with sponsor.ajay.app for SponsorBlock functionality. This may transmit YouTube video IDs and possibly user interaction data to a third-party server.  
> 位置：CFG.sbApi and related SponsorBlock logic  
> 建议：Review transmitted data, ensure only minimal necessary information is sent, and inform users of this behavior.

**⛔ CRITICAL** — Data Transmission  
> Script uses GM_xmlhttpRequest to communicate with evdfrance.fr for HD video download functionality. This may transmit video IDs and possibly other metadata to a third-party server.  
> 位置：evdfrance.fr download logic  
> 建议：Review transmitted data, ensure only minimal necessary information is sent, and inform users of this behavior.

**🟠 MEDIUM** — Privacy Collection  
> Script reads and writes settings using GM_getValue and GM_setValue, which stores data locally. No evidence of sensitive privacy collection (cookies, form fields, clipboard, etc.) beyond settings.  
> 位置：GM_getValue / GM_setValue usage  
> 建议：Ensure only non-sensitive settings are stored.

**🟠 MEDIUM** — Permission Usage  
> Script requests GM_xmlhttpRequest permission, which is necessary for SponsorBlock and download features, but does not appear to request unnecessary high privileges.  
> 位置：@grant GM_xmlhttpRequest  
> 建议：Limit permissions to only those required.

**🟠 MEDIUM** — Supply Chain Risk  
> Script connects to two third-party domains (sponsor.ajay.app, evdfrance.fr). These are not official YouTube APIs and pose supply chain risk if compromised.  
> 位置：@connect sponsor.ajay.app, @connect evdfrance.fr  
> 建议：Monitor third-party endpoints for security and privacy policy changes.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v4-0-ad-skip-sponsorblock-hd-download-no-lag)*
