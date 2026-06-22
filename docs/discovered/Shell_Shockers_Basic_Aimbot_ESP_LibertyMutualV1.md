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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-22

> 该脚本未检测到数据外传、隐私采集、WebSocket 使用或代码混淆。主要风险为通过原型链劫持实现的远程代码注入（HIGH），以及申请了不常用的 unsafeWindows 权限（MEDIUM）。依赖库来源可信，未发现明显供应链风险。整体安全风险较低，但建议仅在信任环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🔴 HIGH** — 远程代码执行  
> 脚本通过 HTMLElement.prototype.appendChild 和 HTMLScriptElement.prototype.textContent 劫持，修改页面脚本内容，属于远程代码注入风险。  
> 位置：核心逻辑（appendChild/textContent 劫持）  
> 建议：仅在完全信任的页面使用此类脚本。避免在敏感站点运行。

**🟠 MEDIUM** — 权限滥用  
> @grant 申请了 unsafeWindows 权限，但实际代码仅用于访问 unsafeWindow，没有进一步高危操作。  
> 位置：元数据 @grant  
> 建议：如无必要，建议移除 unsafeWindows 权限，或限制其使用范围。

**🟡 LOW** — 供应链风险  
> @require 加载了 babylonjs 和 crypto-js，均为官方 CDN，babylonjs 版本已锁定，crypto-js 版本已锁定，供应链风险较低。  
> 位置：元数据 @require  
> 建议：持续关注依赖库安全公告，确保 CDN 未被污染。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/484168-shell-shockers-basic-aimbot-esp-libertymutualv1)*
