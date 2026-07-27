---
title: "Reviewboard仪表盘增强"
---

# Reviewboard仪表盘增强

`导航增强`  `代码评审`  `企业工具`  `页面优化`  `效率提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/reviewboard_review_dashboard_enhancement.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**unknown**　　发现时间：**2026-06-22**　　来源：[vlovich/reviewboard-greasemonkey](https://github.com/vlovich/reviewboard-greasemonkey) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为Reviewboard平台的评审页面添加快捷导航栏，让用户在查看评审时也能快速访问仪表盘等主要页面。增强了页面的导航体验，提升工作效率。

## 适用网站

- Reviewboard企业代码评审平台

## 使用方法

1. 安装脚本后，访问Reviewboard评审页面。
2. 页面顶部会出现新的导航栏，包含仪表盘等快捷链接。
3. 点击链接即可快速跳转到相关页面。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：77/100　　**分析时间**：2026-07-27

> 该脚本未检测到数据外传、隐私采集、代码混淆、DOM XSS、供应链风险等严重安全问题。主要风险为动态脚本注入（HIGH）和依赖页面 jQuery 进行 AJAX（MEDIUM），总体安全风险较低。建议优化脚本执行方式，避免动态注入和依赖页面环境。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🔴 HIGH** — 远程代码执行风险  
> 动态注入脚本到页面（runInDocument），可能导致与页面脚本权限混合，增加潜在安全风险。  
> 位置：runInDocument(main)  
> 建议：避免使用动态脚本注入，直接在 UserScript 沙箱中执行主逻辑。

**🟠 MEDIUM** — 敏感 API 调用/权限滥用  
> 未使用任何 @grant 权限，但采用 jQuery 的 $.ajax，依赖页面 jQuery，可能受页面污染影响。  
> 位置：$.ajax({ url: document.location.origin + "/dashboard", ... })  
> 建议：建议使用 GM_xmlhttpRequest 或 fetch 并明确 @grant 权限，避免依赖页面环境。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/vlovich/reviewboard-greasemonkey/e8632dbba381b1152416ea073f99ac1fc56bf307/reviewboard_review_dashboard_enhancement.user.js)*
