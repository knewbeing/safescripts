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

**风险等级**：🔴 HIGH　　**安全评分**：77/100　　**分析时间**：2026-07-13

> 该脚本本身未直接收集用户隐私数据，也未检测到数据外传或 DOM XSS 行为。但存在较高的远程代码执行风险：脚本会动态加载并执行外部 camp-loader.js 和 camp-utils.js 文件，且未做内容校验，存在供应链污染和远程代码注入风险。建议仅在信任 camp-plus/camp-xt 仓库的前提下使用，并定期审计外部依赖内容。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://cdn.jsdelivr.net/gh/camp-plus/camp-xt@157c87e9f39d2721dd50084e1841eb7b7ac61107/shared/camp-loader.js, https://raw.githubusercontent.com/camp-plus/camp-xt/157c87e9f39d2721dd50084e1841eb7b7ac61107/shared/camp-loader.js, https://cdn.jsdelivr.net/gh/camp-plus/camp-xt@157c87e9f39d2721dd50084e1841eb7b7ac61107/shared/camp-utils.js） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🔴 HIGH** — 远程代码执行  
> 脚本通过 fetch 和动态 script 标签从外部（CDN 和 raw.githubusercontent.com）加载并执行 camp-loader.js 和 camp-utils.js，属于远程代码执行风险。  
> 位置：loadScriptWithFallback, fetchAndInject, 元数据 @updateURL/@downloadURL  
> 建议：建议仅加载受信任、固定版本哈希的第三方脚本，并定期审计外部依赖内容。

**🟠 MEDIUM** — 供应链风险  
> 动态加载的外部脚本（camp-loader.js, camp-utils.js）未做内容校验，存在供应链污染风险。  
> 位置：fetchAndInject, loadScriptWithFallback  
> 建议：建议对外部依赖进行内容校验（如 SRI 哈希），并限制来源。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/camp-plus/camp-xt/d73930202a0c451c7c733658d6697f55635c05e9/scripts/jira.atlassian.com/jira-tools.user.js)*
