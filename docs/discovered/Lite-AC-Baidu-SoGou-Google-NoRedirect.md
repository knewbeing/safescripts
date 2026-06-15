---
title: "优化搜索结果重定向"
---

# 优化搜索结果重定向

`搜索优化`  `去重定向`  `广告屏蔽`  `浏览器增强`  `隐私保护`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Lite-AC-Baidu-SoGou-Google-NoRedirect.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**11.0**　　发现时间：**2026-06-15**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本可以自动去除百度、搜狗、谷歌等搜索结果中的重定向链接，让你直接访问原始网页，提升访问速度和安全性。部分情况下还能去除广告和优化搜索体验。

## 适用网站

- 百度
- 搜狗
- 谷歌
- 必应

## 使用方法

1. 1. 安装脚本后，打开百度、搜狗、谷歌或必应搜索页面。
2. 2. 搜索任意内容，点击搜索结果时会自动跳过重定向，直接访问目标网站。
3. 3. 无需额外操作，脚本会自动生效。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发起网络请求，用于获取真实网页地址。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-15

> 该脚本主要用于去除百度、搜狗等搜索结果的重定向，直接访问真实目标链接。未检测到用户数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险、iframe 风险等高危行为。唯一的网络请求为解析重定向链接，未涉及敏感数据。整体安全风险较低，推荐使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 网络请求  
> 脚本使用 GM_xmlhttpRequest 向 www.baidu.com 和 sogou.com 发起 GET 请求，用于解析真实目标链接。请求内容为重定向链接本身，不包含用户敏感数据或页面内容。  
> 位置：resetURL() -> GM_xmlhttpRequest  
> 建议：确认请求仅用于解析重定向，无用户数据外传。

**🟡 LOW** — 权限申请  
> 脚本申请了 GM_xmlhttpRequest 权限，实际代码中确实使用该权限，无权限滥用。  
> 位置：元数据 @grant  
> 建议：无需调整。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/75950f3060eab08874180f6ab428465e2b63afb4/Lite-AC-Baidu-SoGou-Google-NoRedirect.user.js)*
