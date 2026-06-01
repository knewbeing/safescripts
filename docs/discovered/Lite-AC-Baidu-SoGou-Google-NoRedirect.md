---
title: "优化搜索结果重定向"
---

# 优化搜索结果重定向

`搜索优化`  `去重定向`  `隐私保护`  `广告屏蔽`  `效率提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Lite-AC-Baidu-SoGou-Google-NoRedirect.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**11.0**　　发现时间：**2026-06-01**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本可以自动去除百度、搜狗、谷歌等搜索结果中的跳转链接，让你直接访问原始网页，提升访问速度和隐私安全。部分情况下还能去除广告和优化搜索体验。

## 适用网站

- 百度
- 搜狗
- 谷歌
- 必应
- 百度知道

## 使用方法

1. 1. 安装脚本后，打开百度、搜狗、谷歌、必应等搜索网站。
2. 2. 搜索任意内容，点击搜索结果时会直接跳转到原始网页，无需经过中间跳转。
3. 3. 无需额外设置，脚本自动生效。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本在后台发送网络请求，用于获取真实网页地址。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-01

> 该脚本主要通过 GM_xmlhttpRequest 请求百度和搜狗自身服务器以获取真实跳转链接，未发现数据外传到第三方、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等高危行为。仅存在对目标站点的网络请求，风险较低。整体安全性较高，适合一般用户使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：www.baidu.com, sogou.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 数据外传  
> 脚本使用 GM_xmlhttpRequest 发送 GET 请求到 baidu.com 和 sogou.com，以获取真实跳转链接。请求目标为搜索引擎自身，无明显用户数据外传到第三方。  
> 位置：resetURL -> GM_xmlhttpRequest  
> 建议：确认不会携带敏感用户数据，且请求目标可信。

**🟡 LOW** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，并实际使用，未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：无多余高权限申请，符合最小权限原则。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/75950f3060eab08874180f6ab428465e2b63afb4/Lite-AC-Baidu-SoGou-Google-NoRedirect.user.js)*
