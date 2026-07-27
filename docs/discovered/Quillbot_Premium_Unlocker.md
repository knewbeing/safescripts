---
title: "Quillbot高级功能解锁"
---

# Quillbot高级功能解锁

`高级解锁`  `写作辅助`  `网站增强`  `账号模拟`  `英语工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Quillbot_Premium_Unlocker.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.0**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/465276-quillbot-premium-unlocker) <Badge type="tip" text="GreasyFork" />　　安装量：**206,002**　　评分：👍30 / 👎23

## 功能介绍

本脚本可以让用户在Quillbot网站上免费体验高级（Premium）功能，包括不限字数、更多改写模式、语法检查等。它通过拦截网站请求，模拟高级账户状态，提升使用体验和稳定性。

## 适用网站

- Quillbot

## 使用方法

1. 1. 安装Tampermonkey扩展并添加本脚本。
2. 2. 打开Quillbot网站，页面会自动启用高级功能。
3. 3. 直接使用高级改写、语法检查等功能，无需登录高级账号。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于存储脚本设置或状态信息。 |
| `GM_getValue` | 用于读取脚本保存的设置或状态信息。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：84/100　　**分析时间**：2026-07-27

> 该脚本未检测到数据外传、隐私采集、远程代码执行、DOM XSS 或代码混淆等高危行为。主要风险为供应链风险（@require 非官方 CDN 且未固定哈希）和权限滥用（申请未用 GM_setValue/GM_getValue）。建议移除未用权限，并确保第三方依赖来源可信且版本固定。

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
> @require 加载了 ajaxHooker.js，来源为 greasyfork.org，虽然是知名平台，但不是官方 CDN，且未固定哈希，存在供应链风险。  
> 位置：@require https://greasyfork.org/scripts/455943-ajaxhooker/code/ajaxHooker.js?version=1124435  
> 建议：建议仅使用官方 CDN 或固定哈希版本，避免供应链污染。

**🟠 MEDIUM** — Permission Abuse  
> 申请了 GM_setValue 和 GM_getValue 权限，但脚本实际未使用这两个 API，存在权限滥用风险。  
> 位置：UserScript metadata @grant  
> 建议：仅申请实际需要的权限，移除未使用的 GM_setValue 和 GM_getValue。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/465276-quillbot-premium-unlocker)*
