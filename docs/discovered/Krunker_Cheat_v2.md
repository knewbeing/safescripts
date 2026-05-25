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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-05-25

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。主要安全问题为权限滥用（unsafeWindow）和供应链风险（未固定版本哈希的第三方库）。整体风险较低，但建议移除未使用的高权限申请，并固定第三方库版本以提升安全性。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — Permission Abuse  
> 申请了 unsafeWindow 权限，但实际代码未使用 unsafeWindow，属于高权限滥用。  
> 位置：UserScript metadata (@grant unsafeWindow)  
> 建议：移除未使用的高权限申请，避免潜在安全风险。

**🟠 MEDIUM** — Supply Chain Risk  
> 通过 @require 加载了第三方库 three.js，虽然来源为 unpkg 官方 CDN，但未固定版本哈希，存在供应链污染风险。  
> 位置：UserScript metadata (@require https://unpkg.com/three@0.150.0/build/three.min.js)  
> 建议：建议使用固定版本哈希或官方 CDN，避免供应链污染。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/551530-krunker-cheat-v2)*
