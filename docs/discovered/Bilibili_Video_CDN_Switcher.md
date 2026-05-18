---
title: "Bilibili Video CDN Switcher"
---

# Bilibili Video CDN Switcher



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bilibili_Video_CDN_Switcher.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.1.2**　　发现时间：**2026-05-04**　　来源：[GreasyFork](https://greasyfork.org/scripts/500213-bilibili-video-cdn-switcher) <Badge type="tip" text="GreasyFork" />　　安装量：**6,465**　　评分：👍20 / 👎0

## 功能介绍



## 适用网站

- 通用

## 使用方法

- 请参阅脚本说明

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：92/100　　**分析时间**：2026-05-18

> 该脚本主要通过拦截 Bilibili 播放接口的响应并本地修改 CDN 域名以加速视频加载。未发现任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险或敏感 API 滥用行为。权限申请合理，未发现滥用。整体安全风险极低，安全评分为 92，建议继续保持良好安全实践。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 权限申请  
> 使用了 GM_getValue, GM_setValue, unsafeWindow 权限，但未发现未使用的高权限或权限滥用。  
> 位置：@grant 元数据  
> 建议：仅保留实际使用的权限，避免未来代码变更时滥用。

**🟡 LOW** — 网络请求拦截  
> 拦截 XMLHttpRequest 和 fetch，但仅用于本地修改响应内容，无数据外传行为。  
> 位置：interceptNetResponse 函数  
> 建议：确保未来不添加外传逻辑。

**🟡 LOW** — 远程代码执行  
> 未发现任何远程代码执行相关函数（如 eval、new Function、动态 script 标签等）。  
> 位置：全局  
> 建议：保持此安全实践。

**🟡 LOW** — 隐私采集  
> 未发现任何隐私采集行为（如读取 cookie、localStorage、表单、剪贴板等）。  
> 位置：全局  
> 建议：保持此安全实践。

**🟡 LOW** — 代码混淆  
> 未发现代码混淆、base64 解码、字符串数组映射或高度压缩代码。  
> 位置：全局  
> 建议：保持代码可读性。

**🟡 LOW** — DOM XSS  
> 未发现 DOM XSS 风险，未将用户输入直接插入 innerHTML/outerHTML。  
> 位置：fromHTML 函数及全局  
> 建议：如后续插入用户输入，需严格转义。

**🟡 LOW** — 敏感 API  
> 未发现敏感 API 调用（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局  
> 建议：如需使用敏感 API，需明确告知用户。

**🟡 LOW** — 供应链风险  
> 未发现 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用官方 CDN 并锁定版本。

**🟡 LOW** — iframe 风险  
> 未发现对 iframe 或 frame 保护策略的修改，也未创建隐藏 iframe。  
> 位置：全局  
> 建议：如需操作 iframe，需评估 clickjacking 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/500213-bilibili-video-cdn-switcher)*
