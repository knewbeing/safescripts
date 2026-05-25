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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-05-25

> 该脚本主要用于拦截和修改 Bilibili 视频播放的 CDN 地址，没有发现数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等高危行为。唯一中等风险为申请 unsafeWindow 权限，建议谨慎使用。整体安全性较高。

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
> 申请了 unsafeWindow 权限，允许脚本访问页面全局对象，可能被滥用或引发安全风险。  
> 位置：元数据 @grant unsafeWindow  
> 建议：仅在必要时使用 unsafeWindow，避免与页面脚本交互时引入安全漏洞。

**🟡 LOW** — 敏感 API 调用  
> 未使用 GM_getValue/GM_setValue 存储敏感信息，仅用于配置项，风险较低。  
> 位置：代码 GM_getValue/GM_setValue  
> 建议：确保 GM 存储不用于敏感数据，仅用于配置。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/500213-bilibili-video-cdn-switcher)*
