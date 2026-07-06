---
title: "GitHub增强功能"
---

# GitHub增强功能

`GitHub`  `界面增强`  `快捷操作`  `开发者工具`  `效率提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/GitHub-Enhancements.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.0**　　发现时间：**2026-06-22**　　来源：[xadamxk/Userscripts](https://github.com/xadamxk/Userscripts) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为 GitHub 网站添加实用增强功能，包括将关注者、分叉和点赞数变为可点击链接，方便跳转查看详情，并优化删除仓库时的操作流程。

## 适用网站

- GitHub

## 使用方法

1. 1. 安装脚本后，访问 GitHub 网站。
2. 2. 在仓库页面，关注者、分叉和点赞数变为可点击，点击可跳转到对应列表。
3. 3. 删除仓库时，确认提示变为可点击，自动填写仓库名并启用删除按钮。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：92/100　　**分析时间**：2026-07-06

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用或敏感 API 调用。唯一风险为 @require 加载的 jQuery 版本未固定哈希，存在一定供应链风险。整体安全性较高，建议关注第三方库的供应链安全。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — Supply Chain Risk  
> @require 加载的 jQuery 版本未固定哈希，存在供应链风险。  
> 位置：@require https://code.jquery.com/jquery-3.1.1.js  
> 建议：建议使用官方 CDN 并固定版本哈希，或将库本地化。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/xadamxk/Userscripts/a670d2cb8cbfcf5e2c775ee4a980835024c68670/github/GitHub-Enhancements.user.js)*
