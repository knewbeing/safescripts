---
title: "Bilibili CDN切换"
---

# Bilibili CDN切换

`B站`  `视频加速`  `CDN切换`  `番剧加速`  `自定义设置`  `提升体验`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bilibili_Video_CDN_Switcher.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.1.2**　　发现时间：**2026-06-08**　　来源：[GreasyFork](https://greasyfork.org/scripts/500213-bilibili-video-cdn-switcher) <Badge type="tip" text="GreasyFork" />　　安装量：**7,911**　　评分：👍30 / 👎0

## 功能介绍

本脚本可以切换哔哩哔哩（B站）视频播放时使用的CDN服务器，从而加快视频和番剧的加载速度。用户可自定义CDN地址，提升观看体验。

## 适用网站

- B站主站
- B站番剧
- B站黑板页
- B站直播
- B站课程
- B站视频区
- B站纪录片
- B站综艺
- B站电视
- B站国创
- B站电影
- B站动漫
- B站赛事
- B站奶酪
- B站音乐
- B站搜索
- B站移动端

## 使用方法

1. 安装脚本后，访问B站任意视频或番剧页面。
2. 如需自定义CDN，可在脚本开头修改CustomCDN变量。
3. 保存设置后刷新页面，视频加载速度将提升。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取脚本设置，如是否启用自定义CDN。 |
| `GM_setValue` | 用于保存脚本设置，比如自定义CDN地址。 |
| `unsafeWindow` | 允许脚本访问和修改网页的全局变量，增强功能实现。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-08

> 该脚本主要用于拦截和修改 Bilibili 视频播放相关 API 的响应内容，实现 CDN 切换加速。未发现有数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 或供应链风险。仅存在 @grant unsafeWindow 权限申请和全局网络请求拦截的低风险行为，整体安全性较高。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> 使用了 @grant unsafeWindow，允许脚本访问页面上下文，存在一定安全风险，但未发现滥用。  
> 位置：元数据 @grant unsafeWindow  
> 建议：仅在必要时申请 unsafeWindow，避免对页面全局对象的任意操作。

**🟡 LOW** — 网络请求拦截  
> 脚本会拦截 XMLHttpRequest 和 fetch，但仅用于本地修改 Bilibili 播放器 API 的响应内容，不会外传数据。  
> 位置：interceptNetResponse/网络拦截逻辑  
> 建议：确保拦截逻辑仅限于目标 API，避免误拦截其他请求。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/500213-bilibili-video-cdn-switcher)*
