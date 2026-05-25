---
title: "百度/搜狗/谷歌搜索去重定向"
---

# 百度/搜狗/谷歌搜索去重定向

`去重定向`  `搜索优化`  `隐私保护`  `广告屏蔽`  `效率提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Lite-AC-Baidu-SoGou-Google-NoRedirect.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**11.0**　　发现时间：**2026-05-18**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本可自动去除百度、搜狗、谷歌等搜索结果中的跳转链接，让你点击搜索结果时直接访问原始网页，提升访问速度和隐私体验。部分情况下还能去除广告和优化搜索页面显示。适合经常使用这些搜索引擎的用户。

## 适用网站

- 百度
- 搜狗
- 必应
- 谷歌
- 百度知道

## 使用方法

1. 1. 安装 Tampermonkey 插件后，添加本脚本。
2. 2. 打开百度、搜狗、谷歌、必应等搜索网站。
3. 3. 搜索并点击结果，链接会自动跳转到真实网页，无需额外操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本在后台发起网络请求，用于获取真实目标网址。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-05-25

> 脚本主要用于去除搜索结果重定向，未发现隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险、ClickJacking/iframe 风险。唯一的 CRITICAL 风险为 GM_xmlhttpRequest 向 baidu.com/sogou.com发起请求，但未携带敏感用户数据，属于功能性请求。整体风险为 MEDIUM，安全性较高。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：www.baidu.com, baidu.com, sogou.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用 GM_xmlhttpRequest 向 baidu.com 和 sogou.com 发起 GET 请求，目的是解析重定向链接，未携带用户敏感数据，仅请求搜索结果页面。  
> 位置：resetURL() 和 GM_xmlhttpRequest 调用  
> 建议：确认请求仅用于解析重定向，无用户数据或 cookie 外传，且目标为搜索引擎自身。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，并实际使用，未申请其他高权限。  
> 位置：@grant 元数据  
> 建议：权限申请与实际使用相符，无滥用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/75950f3060eab08874180f6ab428465e2b63afb4/Lite-AC-Baidu-SoGou-Google-NoRedirect.user.js)*
