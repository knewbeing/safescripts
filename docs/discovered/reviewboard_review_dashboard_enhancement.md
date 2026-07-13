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

**风险等级**：🟡 LOW　　**安全评分**：85/100　　**分析时间**：2026-07-13

> 该脚本主要用于增强 Reviewboard 仪表盘导航栏功能。未检测到数据外传、隐私采集、代码混淆、DOM XSS 或供应链风险。唯一的高风险项为通过 <script> 注入执行自身代码，理论上存在远程代码执行的滥用空间，但当前实现未加载外部代码。整体风险较低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🔴 HIGH** — 远程代码执行  
> 通过 runInDocument() 动态插入 <script> 并执行 main()，属于远程代码执行风险点（虽然代码为本地定义，但此模式可被滥用）。  
> 位置：runInDocument()  
> 建议：建议直接在 userscript 沙箱中运行，无需注入 script 标签。

**🟡 LOW** — 本地数据请求  
> 使用 $.ajax 请求本域 /dashboard 页面以获取导航栏内容，但未向第三方服务器发送数据，也未携带敏感信息。  
> 位置：updateDashboard()  
> 建议：确认不会将用户数据发送到第三方服务器，且请求内容为公开页面。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/vlovich/reviewboard-greasemonkey/e8632dbba381b1152416ea073f99ac1fc56bf307/reviewboard_review_dashboard_enhancement.user.js)*
