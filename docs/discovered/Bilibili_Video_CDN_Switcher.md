---
title: "Bilibili CDN切换"
---

# Bilibili CDN切换

`B站`  `视频加速`  `CDN切换`  `番剧加速`  `自定义设置`  `播放优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bilibili_Video_CDN_Switcher.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.1.2**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/500213-bilibili-video-cdn-switcher) <Badge type="tip" text="GreasyFork" />　　安装量：**8,294**　　评分：👍31 / 👎0

## 功能介绍

本脚本可切换哔哩哔哩视频播放时使用的CDN，提升视频和番剧的加载速度。支持自定义CDN地址，适用于多种B站页面。

## 适用网站

- B站主站视频
- B站番剧
- B站黑板页
- B站直播
- B站首页
- B站慕课
- B站分区视频
- B站纪录片
- B站综艺
- B站电视
- B站国创
- B站电影
- B站动漫
- B站赛事
- B站奶酪
- B站音乐中心
- B站搜索
- B站移动端视频
- B站移动端番剧
- B站移动端首页

## 使用方法

1. 安装脚本后，访问B站任意视频或番剧页面。
2. 如需自定义CDN，可在脚本开头修改CustomCDN变量。
3. 无需额外操作，脚本自动优化视频加载速度。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取脚本设置，如是否启用自定义CDN。 |
| `GM_setValue` | 用于保存脚本设置，如自定义CDN地址。 |
| `unsafeWindow` | 允许脚本访问和修改网页的全局变量，增强功能实现。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-06-15

> 该脚本仅拦截并修改 Bilibili 官方视频播放 API 的 CDN 域名，无数据外传、无隐私采集、无远程代码执行、无混淆、无 DOM 注入、无权限滥用、无敏感 API 调用、无供应链风险、无 iframe 风险。整体安全性极高，适合个人使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> 脚本拦截并修改 Bilibili 视频播放相关的网络请求，但仅限于 Bilibili 官方域名，无数据外传到第三方。  
> 位置：interceptNetResponse、playInfoTransformer  
> 建议：保持拦截范围仅限于 Bilibili 官方 API，避免添加第三方数据上报逻辑。

**⛔ CRITICAL** — Privacy Collection  
> 脚本未监听键盘输入、未读取表单字段、未访问指纹 API、未读取剪贴板。仅使用 GM_getValue/GM_setValue 存储自定义 CDN 配置，无隐私采集行为。  
> 位置：全局、GM_getValue/GM_setValue  
> 建议：继续避免采集用户敏感信息。

**🔴 HIGH** — Remote Code Execution  
> 未使用 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML 插入脚本、@require 或 document.write。  
> 位置：全局  
> 建议：保持代码执行安全，避免动态执行外部代码。

**🔴 HIGH** — Code Obfuscation  
> 代码未混淆，无 base64 解码、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS/Injection  
> 未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未操作 iframe src 为 javascript:，未 document.write 不可信内容。  
> 位置：fromHTML、waitForElm  
> 建议：继续避免 DOM 注入风险。

**🟠 MEDIUM** — Permission Abuse  
> @grant 申请了 GM_getValue、GM_setValue、unsafeWindow，均被实际使用，无权限滥用。未申请高权限如 GM_download、GM_openInTab。  
> 位置：元数据、全局  
> 建议：仅申请必要权限。

**🟠 MEDIUM** — Sensitive API Usage  
> 未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局  
> 建议：避免调用敏感 API，除非有明确用途。

**🟠 MEDIUM** — Supply Chain Risk  
> 未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用官方 CDN 并固定版本哈希。

**🟡 LOW** — ClickJacking/Iframe Risk  
> 未修改 frame 保护策略，未创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：避免 iframe 滥用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/500213-bilibili-video-cdn-switcher)*
