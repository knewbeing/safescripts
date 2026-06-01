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

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-06-01

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 或 WebSocket 使用等高危行为。仅存在中等风险项：申请了高权限（unsafeWindows）但未滥用，以及依赖第三方库但来源可信。整体风险较低，建议关注依赖安全和权限最小化。

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
> 脚本通过 @grant 申请了 unsafeWindows 权限，但未发现对敏感 API 的滥用。  
> 位置：@grant 元数据  
> 建议：仅申请实际需要的权限，避免不必要的高权限。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @require 加载了第三方库（crypto-js 和 babylonjs），但均来自官方 CDN，且指定了明确版本。  
> 位置：@require 元数据  
> 建议：确保第三方库来源可信，并定期检查依赖安全性。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/484168-shell-shockers-basic-aimbot-esp-libertymutualv1)*
