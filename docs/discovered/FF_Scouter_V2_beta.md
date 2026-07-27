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

**风险等级**：⛔ CRITICAL　　**安全评分**：42/100　　**分析时间**：2026-07-27

> 该脚本存在数据外传和隐私采集的 CRITICAL 风险，主要体现在通过 GM_xmlhttpRequest 向第三方服务器发送请求，以及对 localStorage 的读写。未发现代码混淆、DOM XSS、远程代码执行等高风险行为，但存在权限滥用（unsafeWindow 未实际使用）。建议开发者明确数据用途、移除未用权限，并确保不收集或外传敏感信息。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ffscouter.com） |
| 隐私采集 | ❌ 检测到（localStorage 读写） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用 GM_xmlhttpRequest 向 ffscouter.com 发起网络请求，可能会传递用户数据或页面内容。  
> 位置：GM_xmlhttpRequest 调用（元数据 @connect ffscouter.com）  
> 建议：确保请求内容不包含敏感用户数据、cookie 或页面内容，并在隐私政策中明确说明数据用途。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取和存储 localStorage 数据，可能涉及用户配置和部分页面数据。  
> 位置：Storage 类（localStorage.setItem/getItem）  
> 建议：避免存储敏感信息，确保数据仅用于本地功能，不外传。

**🟠 MEDIUM** — 权限滥用  
> 申请了 GM_xmlhttpRequest 和 unsafeWindow 权限，但实际代码未见 unsafeWindow 使用，存在权限滥用风险。  
> 位置：元数据 @grant unsafeWindow  
> 建议：移除未使用的高权限申请，减少攻击面。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/582442-ff-scouter-v2-beta)*
