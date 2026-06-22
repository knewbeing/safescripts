---
title: "Bilibili CDN切换"
---

# Bilibili CDN切换

`视频加速`  `B站优化`  `CDN切换`  `自定义设置`  `番剧加速`  `网络优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bilibili_Video_CDN_Switcher.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.1.2**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/500213-bilibili-video-cdn-switcher) <Badge type="tip" text="GreasyFork" />　　安装量：**8,606**　　评分：👍31 / 👎0

## 功能介绍

本脚本可切换哔哩哔哩视频播放时使用的CDN服务器，提升视频加载速度。支持番剧、普通视频等多种内容。用户可自定义CDN节点，优化观看体验。

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
- B站动画
- B站赛事
- B站奶酪
- B站音乐
- B站搜索
- B站移动端视频
- B站移动端番剧
- B站移动端首页

## 使用方法

1. 安装脚本后，访问B站任意视频或番剧页面。
2. 如需自定义CDN节点，编辑脚本中的CustomCDN变量。
3. 视频播放时自动切换CDN，无需手动操作。
4. 如遇问题，可在脚本设置中禁用或恢复默认。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取脚本设置，如是否启用自定义CDN。 |
| `GM_setValue` | 用于保存脚本设置，比如自定义CDN地址。 |
| `unsafeWindow` | 允许脚本访问和修改页面的全局变量，增强功能实现。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-22

> 该脚本主要通过拦截 Bilibili 播放接口的响应并本地修改 CDN 域名以加速视频加载。未发现数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 等高危行为。权限申请合理但建议精简。整体安全风险较低。

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
> 申请了 GM_getValue、GM_setValue、unsafeWindow 权限，但仅用于存储自定义 CDN 配置和访问页面全局对象，未发现高危滥用。  
> 位置：@grant 元数据与主逻辑  
> 建议：仅保留实际需要的权限，避免未来扩展滥用。

**🟡 LOW** — 网络请求拦截  
> 脚本会拦截 XMLHttpRequest 和 fetch，但仅在本地修改响应内容（CDN 域名），未向第三方服务器发送数据。  
> 位置：interceptNetResponse 函数  
> 建议：确保后续版本不添加外传逻辑。

**🟡 LOW** — 供应链风险  
> 未发现 @require 加载第三方库，供应链风险较低。  
> 位置：元数据区  
> 建议：如需引入第三方库，建议使用官方 CDN 并锁定版本。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/500213-bilibili-video-cdn-switcher)*
