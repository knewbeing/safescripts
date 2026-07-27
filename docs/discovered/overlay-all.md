---
title: "CAMP-XT: All-in-One Installer"
---

# CAMP-XT: All-in-One Installer



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/overlay-all.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

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

**风险等级**：🟡 LOW　　**安全评分**：92/100　　**分析时间**：2026-07-27

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、WebSocket 使用等高风险行为。唯一风险为 @require 加载的第三方库未固定版本哈希，存在供应链污染风险。整体安全性较高，建议加强供应链管理。

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
> @require 加载的第三方库未固定版本哈希，使用 GitHub main 分支，存在供应链污染风险。  
> 位置：元数据 @require https://cdn.jsdelivr.net/gh/camp-plus/camp-xt@main/shared/camp-utils.js 和 camp-overlay.js  
> 建议：建议使用固定版本或 commit 哈希的 CDN URL，避免 main 分支随时变更导致供应链风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/camp-plus/camp-xt/d73930202a0c451c7c733658d6697f55635c05e9/scripts/overlay-all.user.js)*
