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

**风险等级**：🟡 LOW　　**安全评分**：67/100　　**分析时间**：2026-06-22

> 该脚本主要用于去除百度、搜狗等搜索结果的重定向，直接访问真实链接。代码未发现隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等高危问题。唯一需要注意的是 GM_xmlhttpRequest 仅限于访问搜索引擎自身，未发现向第三方服务器外传数据。整体安全风险较低，建议关注未来代码变更。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：www.baidu.com, sogou.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用 GM_xmlhttpRequest 访问 www.baidu.com 和 sogou.com，用于获取真实跳转链接。未发现向第三方服务器或作者服务器发送用户数据。  
> 位置：resetURL/DealResult 函数  
> 建议：确认请求仅限于目标搜索引擎，避免未来代码变更导致外传。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，并仅用于访问 www.baidu.com/sogou.com，未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：建议仅保留实际需要的 @connect 域名，避免未来扩展。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/75950f3060eab08874180f6ab428465e2b63afb4/Lite-AC-Baidu-SoGou-Google-NoRedirect.user.js)*
