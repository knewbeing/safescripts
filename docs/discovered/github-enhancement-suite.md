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

**风险等级**：🟢 SAFE　　**安全评分**：97/100　　**分析时间**：2026-07-27

> 该脚本未涉及任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险或权限滥用。仅使用 localStorage 存储简单字符串状态，未涉及敏感信息。整体安全风险极低，推荐使用。

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
> 脚本使用 localStorage 存储和读取过滤器状态，但未涉及敏感数据或隐私信息，仅存储字符串（'all', 'draft', 'non-draft'）。  
> 位置：saveFilterState(), getSavedFilterState()  
> 建议：确认存储内容无敏感信息，当前实现安全。

**🟡 LOW** — permission usage  
> 未申请任何 Tampermonkey/Greasemonkey权限（@grant none），权限申请与实际代码一致。  
> 位置：元数据 @grant  
> 建议：保持最小权限原则，当前实现安全。

**🟡 LOW** — network request  
> 未使用任何网络请求、WebSocket、数据外传相关 API。  
> 位置：全局  
> 建议：保持无外部通信，当前实现安全。

**🟡 LOW** — remote code execution  
> 未使用 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行相关 API。  
> 位置：全局  
> 建议：避免动态执行字符串代码，当前实现安全。

**🟡 LOW** — DOM XSS  
> 未使用 innerHTML/outerHTML 插入用户输入或 URL 参数，未发现 DOM XSS 风险。  
> 位置：injectDraftFilter()  
> 建议：保持安全的 DOM 操作，当前实现安全。

**🟡 LOW** — supply chain  
> 未加载任何第三方库，无供应链风险。  
> 位置：元数据、全局  
> 建议：如需加载第三方库，建议固定版本哈希并使用可信 CDN。

**🟡 LOW** — obfuscation  
> 未使用代码混淆、压缩、base64/unicode编码等混淆技术。  
> 位置：全局  
> 建议：保持代码可读性，当前实现安全。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/collinstevens/github-enhancement-suite/9c50b2baba4628235df0b94d605db2f0989ea2f1/github-enhancement-suite.user.js)*
