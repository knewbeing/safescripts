---
title: "Bilibili CDN切换"
---

# Bilibili CDN切换

`视频加速`  `B站`  `CDN切换`  `自定义设置`  `番剧优化`  `观看体验提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bilibili_Video_CDN_Switcher.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.1.2**　　发现时间：**2026-06-01**　　来源：[GreasyFork](https://greasyfork.org/scripts/500213-bilibili-video-cdn-switcher) <Badge type="tip" text="GreasyFork" />　　安装量：**7,405**　　评分：👍28 / 👎0

## 功能介绍

本脚本可以切换哔哩哔哩（B站）视频播放时使用的CDN服务器，提升视频加载速度，尤其适用于番剧和普通视频。用户可自定义CDN地址，优化观看体验。

## 适用网站

- B站主站
- B站番剧
- B站直播
- B站课程
- B站音乐
- B站搜索
- B站纪录片
- B站综艺
- B站电视
- B站国创
- B站电影
- B站动漫
- B站赛事
- B站奶酪
- B站移动端

## 使用方法

1. 安装脚本后，访问B站任意视频、番剧或相关页面。
2. 如需自定义CDN，可在脚本设置中修改CustomCDN变量。
3. 视频播放时会自动使用优化后的CDN，无需额外操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取脚本设置，比如是否启用或自定义CDN。 |
| `GM_setValue` | 用于保存脚本设置，如切换CDN后的状态。 |
| `unsafeWindow` | 允许脚本访问和修改页面的原始窗口对象，实现高级功能。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-06-01

> 该脚本主要用于拦截和修改 Bilibili 视频播放相关的 API 响应，实现 CDN 切换以提升加载速度。未发现数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 等高危行为。存在部分权限申请未完全必要（如 unsafeWindow），以及对全局 XMLHttpRequest/fetch 的拦截属于敏感操作，但整体风险较低。建议仅保留实际使用的权限，并持续关注后续版本变更。

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
> 使用了 GM_getValue, GM_setValue, unsafeWindow 权限，但未发现敏感数据外传或滥用。  
> 位置：@grant 元数据及相关代码  
> 建议：仅保留实际使用的权限，避免权限滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 拦截并修改 XMLHttpRequest 和 fetch，属于高权限操作，但未发现数据外传。  
> 位置：interceptNetResponse 函数  
> 建议：确保仅拦截目标 API，避免影响其他请求。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/500213-bilibili-video-cdn-switcher)*
