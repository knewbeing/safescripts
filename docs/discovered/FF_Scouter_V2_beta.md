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

**风险等级**：⛔ CRITICAL　　**安全评分**：22/100　　**分析时间**：2026-06-29

> This script communicates with a third-party server (ffscouter.com) and stores user configuration in localStorage. It requests high-privilege grants (GM_xmlhttpRequest, unsafeWindow), and the code is partially obfuscated/minified, making full review difficult. There is a critical risk of data exfiltration and privacy collection, and the use of unsafeWindow increases the risk of privilege escalation. The script should not be considered safe for use without further transparency and a full audit of the network payloads and all privileged operations.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ffscouter.com） |
| 隐私采集 | ❌ 检测到（Reads/writes localStorage for configuration and possibly user keys） |
| 代码混淆 | ❌ 检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script uses GM_xmlhttpRequest to communicate with ffscouter.com, a third-party server. While the exact payload is not visible in the provided code fragment, the @connect directive and typical usage pattern indicate user data may be transmitted for score calculation.  
> 位置：Metadata (@connect), likely in network logic (not fully visible in code fragment)  
> 建议：Review all data sent to ffscouter.com. Ensure only minimal, non-sensitive data is transmitted. Document data flows and provide privacy notice to users.

**⛔ CRITICAL** — Privacy Collection  
> The script reads and writes to localStorage for configuration and possibly user keys. While this is not inherently malicious, it is a privacy-relevant operation.  
> 位置：Class Storage, FFConfig  
> 建议：Ensure no sensitive data (e.g., authentication tokens, personal information) is stored in localStorage. Document all stored keys and values.

**🔴 HIGH** — Remote Code Execution / Privilege Escalation  
> The script requests the unsafeWindow grant, which allows access to the page's JS context and can be abused for privilege escalation or data exfiltration.  
> 位置：Metadata (@grant unsafeWindow)  
> 建议：Remove unsafeWindow if not strictly necessary. If required, audit all uses to ensure no sensitive data is accessed or leaked.

**🔴 HIGH** — Code Obfuscation  
> The script is partially minified/obfuscated (short variable names, compressed code, e.g., 'const n=new Set;const importCSS = async e=>{n.has(e)||(n.add(e),(d=>{...}))}'). This hinders manual review.  
> 位置：Top-level code  
> 建议：Publish and review the original, unminified source code for transparency.

**🟠 MEDIUM** — Permission Abuse  
> The script requests GM_xmlhttpRequest, a high-privilege API, but the code fragment does not show its usage. Unused high-privilege grants increase attack surface.  
> 位置：Metadata (@grant GM_xmlhttpRequest)  
> 建议：Remove unused grants. Only request permissions that are actually used.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/582442-ff-scouter-v2-beta)*
