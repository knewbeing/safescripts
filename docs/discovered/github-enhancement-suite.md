---
title: "GitHub增强套件"
---

# GitHub增强套件

`GitHub`  `拉取请求`  `草稿筛选`  `效率提升`  `页面增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/github-enhancement-suite.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0**　　发现时间：**2026-06-22**　　来源：[collinstevens/github-enhancement-suite](https://github.com/collinstevens/github-enhancement-suite) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为 GitHub 网站提供增强功能，主要针对拉取请求（Pull Requests）列表页面。它允许用户快速筛选草稿和非草稿的拉取请求，并记忆上次筛选状态，提升管理和浏览效率。

## 适用网站

- GitHub

## 使用方法

1. 安装脚本后，访问 GitHub 的拉取请求列表页面。
2. 页面顶部会出现筛选按钮，可选择显示全部、草稿或非草稿拉取请求。
3. 选择后，页面会自动刷新并应用筛选条件。
4. 脚本会记住你的筛选偏好，下次访问自动应用。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本无需额外权限，仅在页面内操作。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：97/100　　**分析时间**：2026-07-13

> The script does not perform any network requests, does not collect or transmit user data, and does not use any dangerous or obfuscated code. It only manipulates the DOM to add UI elements and stores a simple filter state in localStorage. No supply chain or XSS risks detected. Overall, the script is safe for use.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟡 LOW** — localStorage usage  
> The script uses localStorage to save and retrieve the user's draft filter state. No sensitive or personal data is stored, only the filter preference.  
> 位置：saveFilterState(), getSavedFilterState()  
> 建议：No action needed, as only non-sensitive UI state is stored.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/collinstevens/github-enhancement-suite/9c50b2baba4628235df0b94d605db2f0989ea2f1/github-enhancement-suite.user.js)*
