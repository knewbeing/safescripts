---
title: "Songsterr高级功能解锁"
---

# Songsterr高级功能解锁

`音乐`  `乐谱`  `网站增强`  `高级功能解锁`  `导出工具`  `Songsterr`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Songsterr_Ultimate_Premium_Unlocked.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**5.0.0**　　发现时间：**2026-06-01**　　来源：[GreasyFork](https://greasyfork.org/scripts/564818-songsterr-ultimate-premium-unlocked) <Badge type="tip" text="GreasyFork" />　　安装量：**3,184**　　评分：👍3 / 👎1

## 功能介绍

此脚本可在 Songsterr 网站上解锁所有 Plus（高级）功能，包括速度调节、循环播放、独奏、静音和无暂停，并支持原生导出乐谱为 .gp 和 .midi 文件。用户无需付费即可体验高级功能。

## 适用网站

- Songsterr

## 使用方法

1. 安装 Tampermonkey 插件。
2. 在 Tampermonkey 中添加此脚本。
3. 打开 Songsterr 网站，自动解锁高级功能。
4. 在乐谱页面使用速度、循环、独奏、静音等功能，并可导出 .gp/.midi 文件。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改网页的全局对象，便于解锁功能。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，下载乐谱等资源。 |
| `GM_addStyle` | 用于添加自定义样式，优化界面显示。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-08

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。仅存在未使用的高权限声明（GM_xmlhttpRequest、unsafeWindow），建议移除以降低潜在风险。@require 的第三方库来源可信且已锁定版本。整体安全风险较低。

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
> @grant 申请了 GM_xmlhttpRequest 权限，但脚本本体未发现实际使用（仅元数据声明）。  
> 位置：@grant 元数据  
> 建议：移除未使用的高权限声明，减少权限滥用风险。

**🟠 MEDIUM** — 权限滥用  
> @grant 申请了 unsafeWindow 权限，但脚本本体未发现实际使用（仅元数据声明）。  
> 位置：@grant 元数据  
> 建议：移除未使用的高权限声明，减少权限滥用风险。

**🟡 LOW** — 供应链风险  
> @require 加载了第三方库 alphaTab，来源为 jsdelivr 官方 CDN，版本已锁定。  
> 位置：@require 元数据  
> 建议：已锁定版本，供应链风险较低，但建议定期检查依赖安全性。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/564818-songsterr-ultimate-premium-unlocked)*
