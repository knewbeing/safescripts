---
title: "元素屏蔽/追踪器"
---

# 元素屏蔽/追踪器

`广告屏蔽`  `安全防护`  `隐私保护`  `元素管理`  `反重定向`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/elementBlocker.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**26.39.12**　　发现时间：**2026-06-08**　　来源：[limbopro/Adblock4limbo](https://github.com/limbopro/Adblock4limbo) <Badge type="tip" text="GitHub" />

## 功能介绍

该脚本可以屏蔽页面上的特定元素，并拦截程序化点击和跨框架消息，防止自动重定向和广告追踪。它是针对高级绕过机制的最后防线，提升网页浏览安全和体验。

## 适用网站

- 所有网站

## 使用方法

1. 安装脚本后，自动在所有网站生效。
2. 无需手动操作，脚本会自动拦截程序化点击和跨框架消息。
3. 如需调试或自定义屏蔽，可根据脚本说明调整相关设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本无需额外权限，仅使用网页自身功能。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-13

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 滥用或供应链风险。所有本地存储操作仅限于 localStorage，且未与外部服务器通信。脚本主要功能为拦截程序化点击、postMessage 及 iframe 沙箱管理，未发现安全隐患。

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

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/limbopro/Adblock4limbo/44674b73b0134dfaa8322984bca4a8b966428bf6/Adguard/elementBlocker.user.js)*
