---
title: "自动跳过 YouTube 广告"
---

# 自动跳过 YouTube 广告

`广告屏蔽`  `视频优化`  `YouTube`  `自动化`  `无痕跳过`  `用户体验`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Youtube_Ads_BYPASSER.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**7.2.3**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/536712-youtube-ads-bypasser) <Badge type="tip" text="GreasyFork" />　　安装量：**3,739**　　评分：👍3 / 👎1

## 功能介绍

本脚本可自动跳过YouTube视频中的广告，无需手动点击跳过按钮。它不会被YouTube的广告拦截警告检测到，使用过程流畅自然。

## 适用网站

- YouTube官网
- YouTube移动版
- YouTube音乐

## 使用方法

1. 安装Tampermonkey插件。
2. 在Tampermonkey中添加此脚本。
3. 打开YouTube网站，观看视频时广告会自动跳过，无需任何操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，直接运行在网页上。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-27

> 该脚本仅操作页面 DOM，未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。安全评分为 100，属于安全脚本。

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
> 未检测到任何网络请求（GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、sendBeacon），也未检测到数据外传行为。  
> 位置：全局  
> 建议：保持无外部数据传输，确保用户隐私安全。

**⛔ CRITICAL** — 隐私采集  
> 脚本未访问 document.cookie、localStorage、sessionStorage、IndexedDB，也未监听键盘输入、读取表单字段、访问指纹 API 或剪贴板内容。  
> 位置：全局  
> 建议：继续避免隐私采集，保障用户隐私。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)，也未通过 innerHTML/outerHTML 插入外部脚本或动态加载远程 JS。  
> 位置：全局  
> 建议：保持无远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到代码混淆（无 atob/btoa、字符串数组映射、unicode 混淆、高度压缩单行代码）。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审查。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，popup 内容为固定字符串，未检测到 DOM XSS 风险。  
> 位置：showDarkShadowPopup()  
> 建议：如需插入动态内容，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> 脚本未申请任何 @grant 权限，实际代码也未使用 GM_* API，无权限滥用风险。  
> 位置：元数据 @grant  
> 建议：继续保持最小权限原则。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局  
> 建议：如需调用敏感 API，需征得用户同意。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据 @require  
> 建议：如需加载第三方库，建议使用官方 CDN 并固定版本哈希。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：如需操作 iframe，需谨慎处理。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/536712-youtube-ads-bypasser)*
