---
title: "Torn City 荣誉追踪器"
---

# Torn City 荣誉追踪器

`游戏辅助`  `荣誉追踪`  `成就管理`  `Torn City`  `效率提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Torn_City_-_Merit_Tracker.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.5**　　发现时间：**2026-06-08**　　来源：[GreasyFork](https://greasyfork.org/scripts/579300-torn-city-merit-tracker) <Badge type="tip" text="GreasyFork" />　　安装量：**935**　　评分：👍1 / 👎0

## 功能介绍

此脚本帮助玩家追踪在 Torn City 游戏中尚未获得的荣誉，优先展示最容易达成的荣誉，并提供获取方法和按类别浏览功能。让玩家更高效地规划荣誉收集。

## 适用网站

- Torn City

## 使用方法

1. 安装脚本后，进入 Torn City 网站。
2. 在页面上会显示未获得荣誉及其获取方法。
3. 可按类别浏览和筛选荣誉，优先显示最容易达成的。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送网络请求获取外部数据，如荣誉信息或脚本更新。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：89/100　　**分析时间**：2026-06-08

> 该脚本主要为 Torn City 游戏提供荣誉成就提示，无数据外传、隐私采集、远程代码执行、混淆、XSS、供应链等高风险行为。唯一中等风险为申请了未使用的 GM_xmlhttpRequest 权限，建议移除以进一步提升安全性。整体安全，适合使用。

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
> @grant 申请了 GM_xmlhttpRequest 权限，但脚本本身未检测到实际调用 GM_xmlhttpRequest。  
> 位置：元数据与主代码  
> 建议：如无实际用途，建议移除 @grant GM_xmlhttpRequest 权限，最小化权限申请。

**🟡 LOW** — 数据外传  
> @connect 仅允许 greasyfork.org，未发现第三方数据外传代码。  
> 位置：元数据  
> 建议：保持 @connect 范围最小化，避免添加不必要的外部域名。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/579300-torn-city-merit-tracker)*
