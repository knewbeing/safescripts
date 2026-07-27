---
title: "公平战斗评分助手"
---

# 公平战斗评分助手

`游戏辅助`  `数据展示`  `Torn`  `帮派战争`  `评分分析`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/FF_Scouter_V3.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.0-alpha34**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/579109-ff-scouter-v3) <Badge type="tip" text="GreasyFork" />　　安装量：**1,023**　　评分：👍0 / 👎0

## 功能介绍

本脚本在 Torn 游戏网站上显示目标玩家的 Fair Fight 评分和帮派战争状态，帮助玩家更好地评估对手和战局。安装后会自动在相关页面展示这些信息，无需手动操作。

## 适用网站

- Torn 城市游戏

## 使用方法

1. 安装脚本后，访问 Torn 游戏网站。
2. 在玩家或帮派相关页面会自动显示 Fair Fight 评分和战争状态。
3. 无需额外操作，信息会直接呈现于页面。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送跨域网络请求，从 ffscouter.com 获取评分数据。 |
| `unsafeWindow` | 允许脚本访问和修改网页的全局变量，增强页面交互能力。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：42/100　　**分析时间**：2026-07-27

> 脚本存在数据外传和隐私采集风险，主要通过 GM_xmlhttpRequest 向 ffscouter.com 发起请求，以及 localStorage 存储用户数据。未发现代码混淆、远程代码执行、DOM XSS、敏感 API 调用、供应链风险等问题。权限申请存在滥用风险（unsafeWindow、GM_xmlhttpRequest）。建议详细审查网络请求内容，移除未使用高权限，确保不存储敏感信息。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ffscouter.com） |
| 隐私采集 | ❌ 检测到（localStorage 读写（配置项、用户输入）） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> 脚本通过 GM_xmlhttpRequest 向 ffscouter.com 发起网络请求，可能携带用户数据或页面内容。  
> 位置：GM_xmlhttpRequest usage (potential, based on @connect and @grant)  
> 建议：详细审查请求内容，确保不发送敏感信息。建议明确列出请求参数和数据类型。

**⛔ CRITICAL** — Privacy Collection  
> 脚本使用 localStorage 存储和读取数据，涉及配置项和可能的用户输入。  
> 位置：Storage class (localStorage usage)  
> 建议：确保不存储敏感信息（如密码、cookie）。如需存储敏感数据，建议加密。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 unsafeWindow 权限，但实际代码未见明显使用。该权限可导致主页面 JS 环境暴露，存在安全隐患。  
> 位置：@grant unsafeWindow  
> 建议：如未使用 unsafeWindow，建议移除该权限。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 GM_xmlhttpRequest 权限，并声明 @connect ffscouter.com，存在数据外传风险。  
> 位置：@grant GM_xmlhttpRequest, @connect ffscouter.com  
> 建议：仅在必要时申请该权限，并限制请求内容。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/579109-ff-scouter-v3)*
