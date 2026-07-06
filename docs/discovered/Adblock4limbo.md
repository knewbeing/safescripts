---
title: "毒奶网页广告清理"
---

# 毒奶网页广告清理

`广告屏蔽`  `影视网站`  `漫画网站`  `搜索引擎`  `弹窗清理`  `网页优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Adblock4limbo.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.2025.12.27**　　发现时间：**2026-06-08**　　来源：[limbopro/Adblock4limbo](https://github.com/limbopro/Adblock4limbo) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本可自动移除各类网站上的广告，包括弹窗、视频广告、Gif图片广告等，保持网页清爽。支持搜索引擎、影视、漫画、小说等众多网站。页面右下角新增导航，方便快速访问常用功能。

## 适用网站

- 百度搜索
- 谷歌搜索
- 必应搜索
- 知乎
- Instagram
- 欧乐影院
- 低端影视
- 哔滴影视
- iyf爱壹帆
- Jable
- MissAv
- 91porn
- hitomi
- 紳士漫畫
- 禁漫天堂
- Pornhub
- Javbus
- Supjav
- Javdb
- Javlibrary
- Anime1
- Cupfox
- BTBDYS
- Duboku
- Libvio
- TVN
- Novel543
- HLTV
- 等众多视频、漫画、小说及ACG网站

## 使用方法

1. 1. 安装油猴（Tampermonkey）扩展。
2. 2. 添加此脚本并启用。
3. 3. 访问支持的网站，广告会自动被移除。
4. 4. 页面右下角可使用导航功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本无需特殊权限，直接运行在网页上。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-06

> 该脚本仅在特定网站移除广告并添加导航功能，未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 ClickJacking/iframe 风险。代码结构清晰，权限申请为 none，安全性极高。建议继续保持现有安全开发规范。

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
> 脚本未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource 等），不存在数据外传行为。  
> 位置：全局  
> 建议：保持现有状态，避免添加任何外部数据传输代码。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到任何隐私采集行为（如读取 cookie、localStorage、sessionStorage、IndexedDB、监听键盘输入、读取表单字段、访问指纹 API、读取剪贴板内容等）。  
> 位置：全局  
> 建议：保持现有状态，避免添加任何隐私采集代码。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML/outerHTML 插入外部脚本、@require 或动态 script 标签加载远程 JS、document.write 插入脚本内容等远程代码执行风险点。  
> 位置：全局  
> 建议：保持现有状态，避免引入远程代码执行相关功能。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到任何代码混淆行为（如 base64 解码执行、字符串数组+索引映射、unicode 混淆、高度压缩单行代码等）。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未检测到任何 DOM XSS 或注入风险（如用户输入或 URL 参数直接插入 innerHTML/outerHTML、document.write 插入不可信内容、操作 iframe src 为 javascript: 协议等）。  
> 位置：全局  
> 建议：保持现有状态，避免引入不可信内容插入。

**🟠 MEDIUM** — 权限滥用  
> 脚本未申请任何高权限（@grant none），不存在权限滥用风险。  
> 位置：元数据  
> 建议：保持 @grant none，避免申请不必要的高权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API 等）。  
> 位置：全局  
> 建议：避免调用敏感 API，保护用户隐私。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载任何第三方库，供应链风险为零。  
> 位置：元数据  
> 建议：如需引入第三方库，务必使用官方 CDN 并固定版本哈希。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到任何 ClickJacking 或 iframe 风险（如修改 frame 保护策略、创建隐藏 iframe 用于数据提取等）。  
> 位置：全局  
> 建议：避免操作 iframe 相关功能，防止 ClickJacking。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/limbopro/Adblock4limbo/44674b73b0134dfaa8322984bca4a8b966428bf6/Adguard/Adblock4limbo.user.js)*
