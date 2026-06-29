---
title: "Bilibili CDN切换"
---

# Bilibili CDN切换

`视频加速`  `哔哩哔哩`  `CDN切换`  `自定义设置`  `番剧加速`  `网络优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bilibili_Video_CDN_Switcher.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.1.2**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/500213-bilibili-video-cdn-switcher) <Badge type="tip" text="GreasyFork" />　　安装量：**8,930**　　评分：👍31 / 👎0

## 功能介绍

本脚本可切换哔哩哔哩视频播放时使用的CDN服务器，提升视频加载速度，特别适用于番剧和普通视频。用户可自定义CDN地址，实现更快的视频播放体验。

## 适用网站

- B站主站
- B站番剧
- B站直播
- B站课程
- B站纪录片
- B站综艺
- B站影视
- B站动画
- B站国创
- B站电影
- B站音乐
- B站搜索
- B站移动端

## 使用方法

1. 安装脚本后，访问B站任意视频页面。
2. 如需自定义CDN，可在脚本设置中填写CDN地址。
3. 视频播放时会自动切换到更快的CDN，无需手动操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取脚本设置，比如是否启用CDN切换功能。 |
| `GM_setValue` | 用于保存脚本设置，如自定义CDN地址或开关状态。 |
| `unsafeWindow` | 允许脚本访问和操作网页的原生窗口对象，方便与页面交互。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-06-29

> 该脚本主要通过拦截和修改 Bilibili 视频播放相关的 API 响应，将视频 CDN 域名替换为用户自定义或预设的 CDN，以加速视频加载。未发现任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 滥用或供应链风险。代码结构清晰，无安全隐患。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 未发现安全问题 ✅

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/500213-bilibili-video-cdn-switcher)*
