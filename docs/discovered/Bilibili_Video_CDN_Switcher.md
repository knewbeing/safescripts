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

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-27

> 该脚本仅拦截 Bilibili 视频播放接口并修改 CDN 域名，无数据外传、隐私采集、远程代码执行、混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。安全性高，适合个人使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传检查  
> 脚本通过拦截 XMLHttpRequest 和 fetch，修改 Bilibili 视频播放接口的 CDN 域名，但未向第三方服务器发送数据。  
> 位置：interceptNetResponse, XMLHttpRequest/fetch override  
> 建议：确保仅修改 CDN 域名，不添加任何外部数据传输逻辑。

**⛔ CRITICAL** — 隐私采集检查  
> 脚本未采集用户隐私数据（如 cookie、localStorage、表单、剪贴板等），也未监听键盘输入。  
> 位置：全局代码  
> 建议：保持现有逻辑，不要添加隐私采集行为。

**🔴 HIGH** — 远程代码执行检查  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等动态代码执行方式，也未通过 innerHTML/outerHTML 插入外部脚本。  
> 位置：全局代码  
> 建议：避免引入动态代码执行相关 API。

**🔴 HIGH** — 代码混淆检查  
> 脚本未混淆，代码结构清晰，无 base64、unicode、字符串数组映射等混淆特征。  
> 位置：全局代码  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS/注入检查  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未存在 DOM XSS 风险。  
> 位置：fromHTML 函数  
> 建议：如需插入用户输入，务必进行转义。

**🟠 MEDIUM** — 权限滥用检查  
> 脚本申请了 GM_getValue、GM_setValue、unsafeWindow 权限，均有实际使用，无权限滥用。  
> 位置：@grant 元数据与实际代码  
> 建议：仅申请必要权限。

**🟠 MEDIUM** — 敏感 API 调用检查  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局代码  
> 建议：避免调用敏感 API。

**🟠 MEDIUM** — 供应链风险检查  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，建议使用官方 CDN 并固定版本。

**🟡 LOW** — ClickJacking/iframe 风险检查  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe。  
> 位置：全局代码  
> 建议：避免 iframe 滥用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/500213-bilibili-video-cdn-switcher)*
