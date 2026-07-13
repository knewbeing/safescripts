---
title: "Pawchive Kemono收藏导入"
---

# Pawchive Kemono收藏导入

`收藏管理`  `内容迁移`  `批量操作`  `Pawchive`  `Kemono`  `数据导入`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Pawchive_Kemono_Favorites_Importer.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.1**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/582585-pawchive-kemono-favorites-importer) <Badge type="tip" text="GreasyFork" />　　安装量：**657**　　评分：👍2 / 👎0

## 功能介绍

本脚本可以将 Kemono 网站收藏的创作者和帖子导入到 Pawchive 网站的收藏列表中。它在 Pawchive 收藏页面添加导入按钮，方便用户批量迁移收藏内容。

## 适用网站

- Pawchive

## 使用方法

1. 安装脚本后，访问 Pawchive 网站。
2. 进入 Pawchive 的收藏页面。
3. 页面顶部会出现“Import Kemono Favorites”按钮。
4. 点击按钮，选择从 Kemono 导出的收藏 JSON 文件。
5. 等待导入完成，收藏内容会自动添加到 Pawchive。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，仅在 Pawchive 网站运行。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-07-13

> 该脚本仅在 pawchive.st 域名下运行，主要功能为导入本地 JSON 文件（Kemono 收藏导出），并通过 pawchive.st 官方 API 添加收藏。网络请求仅发送到 pawchive.st，无第三方数据外传。未发现远程代码执行、代码混淆、DOM XSS、权限滥用或供应链风险。仅使用 localStorage 持久化导入进度，不涉及敏感隐私采集。整体安全风险极低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://pawchive.st） |
| 隐私采集 | ❌ 检测到（Reads/writes localStorage for import state persistence） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 未发现安全问题 ✅

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/582585-pawchive-kemono-favorites-importer)*
