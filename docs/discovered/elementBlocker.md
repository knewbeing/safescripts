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

**风险等级**：🟢 SAFE　　**安全评分**：92/100　　**分析时间**：2026-07-27

> 该脚本未检测到任何数据外传、远程代码执行、代码混淆、DOM XSS、敏感 API 调用或供应链风险。唯一涉及隐私采集的是 localStorage 的本地状态记录，未与外部服务器交互。整体安全性高，适合在用户环境中部署。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（localStorage 记录页面状态、黑名单、调试覆盖列表） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何网络请求、数据外传、统计、追踪或 WebSocket 行为。  
> 位置：全局代码  
> 建议：保持无外传行为。

**🔴 HIGH** — 远程代码执行  
> 脚本未检测到 eval/new Function/setTimeout(string)/setInterval(string) 或动态加载远程脚本。  
> 位置：全局代码  
> 建议：保持无远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到代码混淆、base64 解码、字符串映射或高度压缩代码。  
> 位置：全局代码  
> 建议：保持代码可读性。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 或注入风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：全局代码  
> 建议：保持安全的 DOM 操作。

**🟠 MEDIUM** — 隐私采集  
> 脚本使用 localStorage 进行状态记录和黑名单管理，但未外传数据。仅在本地存储和读取。  
> 位置：localStorage 相关函数（permanentClearOnce, getDebugOverrideList, toggleDebugOverride, getPageBlacklist, togglePageBlacklist）  
> 建议：确保 localStorage 仅用于本地状态管理，不要与外部服务器同步。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局代码  
> 建议：保持无敏感 API 调用。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据 @require 缺失  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — 权限滥用  
> 脚本未申请任何 Tampermonkey/Greasemonkey权限（@grant none），权限申请合理。  
> 位置：元数据 @grant none  
> 建议：无需修改，权限申请合理。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：applyIframeSandbox, document.createElement Hook  
> 建议：保持 iframe 操作仅用于安全目的。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/limbopro/Adblock4limbo/44674b73b0134dfaa8322984bca4a8b966428bf6/Adguard/elementBlocker.user.js)*
