---
title: "Krunker Cheat v2"
---

# Krunker Cheat v2



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Krunker_Cheat_v2.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.0**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/551530-krunker-cheat-v2) <Badge type="tip" text="GreasyFork" />　　安装量：**1,319**　　评分：👍1 / 👎0

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

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-06-22

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 等高危行为。主要风险为权限滥用（unsafeWindow）和供应链风险（@require 未锁定哈希）。整体安全风险较低，但不建议在敏感环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> 使用了 @grant unsafeWindow，允许脚本访问页面的 window 对象，存在高权限滥用风险。  
> 位置：元数据 @grant unsafeWindow  
> 建议：仅在确有必要时申请 unsafeWindow，避免滥用高权限。

**🟠 MEDIUM** — 供应链风险  
> @require 加载了第三方库 three.js，虽然为官方 CDN，但未锁定具体文件哈希，存在供应链污染风险。  
> 位置：@require https://unpkg.com/three@0.150.0/build/three.min.js  
> 建议：建议使用官方 CDN 并锁定具体版本和哈希，避免供应链攻击。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/551530-krunker-cheat-v2)*
