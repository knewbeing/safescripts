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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-05-11

> 该脚本主要通过拦截和修改 Bilibili 官方 API 的响应，实现 CDN 切换功能。未发现数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链等高危风险。仅申请了必要的 GM_* 权限，@grant unsafeWindow 有一定权限风险但未滥用。整体安全性较高，风险等级为 LOW。

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
> 使用了 @grant unsafeWindow，存在一定的权限风险，但未发现滥用。  
> 位置：@grant 元数据  
> 建议：仅在必要时申请高权限，避免滥用。

**🟡 LOW** — 数据外传  
> 脚本会拦截并修改 XMLHttpRequest 和 fetch，但仅针对 Bilibili 官方 API，未发现向第三方服务器发送数据。  
> 位置：interceptNetResponse 相关代码  
> 建议：确保未来不添加外传逻辑，保持仅本地修改。

**🟡 LOW** — 隐私采集  
> 未发现对用户输入、表单、剪贴板、指纹等隐私数据的读取。  
> 位置：全局  
> 建议：继续保持，不要采集用户隐私数据。

**🟡 LOW** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险。  
> 位置：全局  
> 建议：避免动态执行字符串代码。

**🟡 LOW** — 代码混淆  
> 未发现代码混淆、base64 解码、字符串数组映射等混淆特征。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

**🟡 LOW** — DOM XSS  
> 未发现 DOM XSS 风险，未将用户输入直接插入 innerHTML/outerHTML。  
> 位置：fromHTML 函数及全局  
> 建议：如需插入动态内容，务必转义。

**🟡 LOW** — 敏感 API  
> 未发现敏感 API（如 geolocation、WebRTC、MediaDevices、Clipboard、Notification）调用。  
> 位置：全局  
> 建议：如需使用敏感 API，需明确告知用户。

**🟡 LOW** — 供应链风险  
> 未使用 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用官方 CDN 并锁定版本。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/500213-bilibili-video-cdn-switcher)*
