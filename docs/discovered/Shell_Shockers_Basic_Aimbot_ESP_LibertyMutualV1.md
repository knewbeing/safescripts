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

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-07-13

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 等高危行为。仅存在中等风险的权限申请（@grant unsafeWindows）和供应链依赖（@require 第三方库），但依赖来源可信且版本固定。整体安全性较高。

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
> 申请了 @grant unsafeWindows 权限，但代码中仅用于访问 unsafeWindow，无进一步高危操作。  
> 位置：元数据与全局作用域  
> 建议：如无必要，建议移除 @grant unsafeWindows 权限，降低潜在风险。

**🟠 MEDIUM** — 供应链风险  
> 通过 @require 加载了 babylonjs 和 crypto-js，均为知名 CDN 且指定了明确版本号。  
> 位置：元数据  
> 建议：建议定期检查依赖库的安全性，确保未被污染。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/484168-shell-shockers-basic-aimbot-esp-libertymutualv1)*
