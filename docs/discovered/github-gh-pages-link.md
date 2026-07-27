---
title: "GitHub gh-pages链接增强"
---

# GitHub gh-pages链接增强

`GitHub`  `页面增强`  `快捷访问`  `开发工具`  `代码管理`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/github-gh-pages-link.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.0**　　发现时间：**2026-06-22**　　来源：[skratchdot/github-gh-pages-link.user.js](https://github.com/skratchdot/github-gh-pages-link.user.js) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本会在仓库页面检测是否存在 gh-pages 分支，如果有，会自动添加指向 GitHub Pages 网站和 gh-pages 源代码的链接，方便访问和管理。

## 适用网站

- GitHub

## 使用方法

1. 安装脚本后，打开任意 GitHub 仓库页面。
2. 若仓库有 gh-pages 分支，页面会自动显示相关链接。
3. 点击链接即可访问对应的 GitHub Pages 网站或源代码。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，仅在页面内运行。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-27

> 该脚本仅包含一个 console.log 调用，不涉及任何网络请求、数据外传、隐私采集、远程代码执行、代码混淆、DOM 注入、权限滥用、敏感 API 调用、供应链风险或 iframe 操作。安全性极高。

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

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/skratchdot/github-gh-pages-link.user.js/df7547b75f7c5ee9531bff11626ea402577469ae/github-gh-pages-link.user.js)*
