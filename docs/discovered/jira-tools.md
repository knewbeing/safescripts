---
title: "CAMP-XT: Jira"
---

# CAMP-XT: Jira



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/jira-tools.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.11**　　发现时间：**2026-04-16**　　来源：[camp-plus/camp-xt](https://github.com/camp-plus/camp-xt) <Badge type="tip" text="GitHub" />

## 功能介绍



## 适用网站

- 通用

## 使用方法

- 请参阅脚本说明

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：77/100　　**分析时间**：2026-07-27

> 该脚本主要通过动态加载 camp-loader.js 和 camp-utils.js 实现功能，未检测到数据外传、隐私采集、代码混淆、DOM XSS、权限滥用、敏感 API 调用、WebSocket 使用等高风险行为。最大风险为远程代码执行（动态加载外部 JS），且依赖文件采用固定 commit 哈希，供应链风险较低。建议定期审查依赖文件内容，确保安全。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🔴 HIGH** — 远程代码执行  
> 动态加载远程 JS 文件（camp-loader.js 和 camp-utils.js），通过 fetch 和 script 标签注入。虽然使用固定 commit 哈希，仍存在远程代码执行风险。  
> 位置：loadScriptWithFallback, fetchAndInject, loaderCDN, loaderRaw, utilsCDN, utilsRaw  
> 建议：建议进一步审查 camp-loader.js 和 camp-utils.js 的内容，确保无恶意代码。若可，将其本地化或采用更严格的哈希校验。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @require 以 CDN 固定 commit 哈希加载自身，供应链风险较低，但依赖 camp-loader.js 和 camp-utils.js 的安全性。  
> 位置：@updateURL, @downloadURL, loaderCDN, loaderRaw, utilsCDN, utilsRaw  
> 建议：建议定期审查依赖文件的内容，确保未被污染。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/camp-plus/camp-xt/d73930202a0c451c7c733658d6697f55635c05e9/scripts/jira.atlassian.com/jira-tools.user.js)*
