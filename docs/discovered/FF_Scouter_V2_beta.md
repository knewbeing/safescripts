---
title: "公平战斗评分助手"
---

# 公平战斗评分助手

`游戏辅助`  `信息增强`  `战斗分析`  `帮派管理`  `Torn`  `评分显示`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/FF_Scouter_V2_beta.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.0-beta9**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/582442-ff-scouter-v2-beta) <Badge type="tip" text="GreasyFork" />　　安装量：**375**　　评分：👍0 / 👎0

## 功能介绍

此脚本在 Torn 游戏网站上显示目标玩家的 Fair Fight 评分和帮派战争状态，帮助玩家更好地评估战斗对手。通过外部数据查询，提升游戏策略决策。

## 适用网站

- Torn 城市游戏

## 使用方法

1. 安装脚本后，访问 Torn 游戏网站。
2. 在玩家页面或帮派相关页面，会自动显示 Fair Fight 评分和帮派战争状态。
3. 无需额外操作，信息会直接展示在页面上。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送网络请求获取外部数据。 |
| `unsafeWindow` | 允许脚本访问和修改网页的全局对象，增强功能集成。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：42/100　　**分析时间**：2026-07-06

> 该脚本存在数据外传和隐私采集风险，主要通过 GM_xmlhttpRequest 向 ffscouter.com 发起请求，并读写 localStorage。申请了 unsafeWindow 高权限，存在被滥用的可能。未发现代码混淆和 DOM XSS 注入风险。建议重点审查网络请求内容、权限申请合理性及供应链安全。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ffscouter.com） |
| 隐私采集 | ❌ 检测到（localStorage 读写） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> 脚本使用 GM_xmlhttpRequest 向 ffscouter.com 发起网络请求，可能会携带用户数据或页面内容，存在数据外传风险。  
> 位置：GM_xmlhttpRequest 调用（@connect ffscouter.com）  
> 建议：仅发送必要数据，避免传递敏感信息。建议明确审查请求内容及响应处理逻辑。

**⛔ CRITICAL** — Privacy Collection  
> 脚本通过 Storage 类读写 localStorage，存储和读取配置及可能的用户数据。  
> 位置：Storage 类（localStorage 操作）  
> 建议：确保不会将敏感信息（如 cookie、密码等）存入 localStorage，且不会将其外传。

**🔴 HIGH** — Privilege Abuse  
> 脚本申请了 unsafeWindow 权限，允许访问页面原生 JS 环境，存在被滥用的风险。  
> 位置：@grant unsafeWindow  
> 建议：仅在确实需要时申请 unsafeWindow，避免滥用。建议移除未使用的高权限。

**🟠 MEDIUM** — Supply Chain Risk  
> 脚本未固定第三方服务器 ffscouter.com 的 API 版本，存在供应链风险。  
> 位置：@connect ffscouter.com  
> 建议：建议对 API 版本进行校验，或采用哈希校验机制，防止远端代码或数据被篡改。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/582442-ff-scouter-v2-beta)*
