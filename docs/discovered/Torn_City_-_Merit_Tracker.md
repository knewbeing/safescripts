---
title: "Torn City荣誉追踪器"
---

# Torn City荣誉追踪器

`游戏辅助`  `荣誉追踪`  `成就管理`  `Torn City`  `攻略提示`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Torn_City_-_Merit_Tracker.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.6**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/579300-torn-city-merit-tracker) <Badge type="tip" text="GreasyFork" />　　安装量：**1,350**　　评分：👍1 / 👎0

## 功能介绍

本脚本帮助玩家追踪和获取游戏中的荣誉徽章，优先显示最容易获得的未完成徽章，并提供获取方法和分类浏览功能。适合想快速提升荣誉的玩家使用。

## 适用网站

- Torn City

## 使用方法

1. 安装脚本后，进入 Torn City 网站。
2. 在页面上会显示未获得的荣誉徽章及获取方法。
3. 根据提示操作，优先完成容易的荣誉。
4. 可按类别浏览不同荣誉和攻略。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本在后台请求外部数据，获取最新荣誉信息和攻略。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-07-13

> 该脚本主要为 Torn City 游戏提供荣誉成就攻略，无任何数据外传、隐私采集、远程代码执行、代码混淆或 XSS 风险。仅存在未使用的 GM_xmlhttpRequest 权限和 @connect 声明，属于中等权限滥用风险。整体安全性高，建议移除未使用的权限以进一步提升安全性。

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
> @grant 申请了 GM_xmlhttpRequest 权限，但在代码中未检测到实际使用。  
> 位置：元数据与主代码  
> 建议：如无实际需要，建议移除 GM_xmlhttpRequest 权限以减少权限滥用风险。

**🟠 MEDIUM** — 权限滥用  
> @connect 声明了 greasyfork.org，但主代码未检测到任何网络请求。  
> 位置：元数据  
> 建议：如无实际需要，建议移除 @connect greasyfork.org。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/579300-torn-city-merit-tracker)*
