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

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-06-08

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 等高危行为。主要风险为申请了高权限（unsafeWindows）和依赖第三方库（已指定版本，风险较低）。整体安全性较高，适合一般用户使用，但建议持续关注依赖库安全和权限最小化原则。

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
> 申请了 @grant unsafeWindows 权限，但实际代码中仅用于访问 unsafeWindow 下的对象和函数，没有发现高危滥用行为。但该权限本身风险较高，建议仅在必要时使用。  
> 位置：元数据 @grant unsafeWindows  
> 建议：如非必要，建议移除 unsafeWindows 权限，或限制其使用范围。

**🟠 MEDIUM** — 供应链风险  
> 通过 @require 加载了第三方库 babylonjs 和 crypto-js，均来自官方 CDN，且指定了明确版本号，供应链风险较低。但仍建议定期检查依赖安全性。  
> 位置：元数据 @require  
> 建议：确保依赖来源可信，定期检查依赖安全性。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/484168-shell-shockers-basic-aimbot-esp-libertymutualv1)*
