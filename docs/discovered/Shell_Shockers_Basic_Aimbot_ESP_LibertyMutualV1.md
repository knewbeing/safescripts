---
title: "Shell Shockers Basic Aimbot + ESP: LibertyMutualV1"
---

# Shell Shockers Basic Aimbot + ESP: LibertyMutualV1



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Shell_Shockers_Basic_Aimbot_ESP_LibertyMutualV1.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.4.2**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/484168-shell-shockers-basic-aimbot-esp-libertymutualv1) <Badge type="tip" text="GreasyFork" />　　安装量：**14,748**　　评分：👍1 / 👎0

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

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。主要风险为申请了高权限（unsafeWindows）和第三方库供应链风险，但均为官方 CDN 且版本固定。整体安全性较高，建议关注权限申请和第三方库安全。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> 申请了 unsafeWindows 权限，但实际代码仅用于访问 unsafeWindow 和原型链操作，没有明显滥用或高风险操作。  
> 位置：元数据 @grant unsafeWindows  
> 建议：仅申请必要权限，避免高权限滥用。建议移除未使用的高权限。

**🟠 MEDIUM** — 供应链风险  
> 通过 @require 加载 babylonjs 和 crypto-js，均为官方 CDN 且固定版本，供应链风险较低，但仍需关注第三方库安全。  
> 位置：元数据 @require  
> 建议：定期检查第三方库安全，确保 CDN 官方可信且版本固定。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/484168-shell-shockers-basic-aimbot-esp-libertymutualv1)*
