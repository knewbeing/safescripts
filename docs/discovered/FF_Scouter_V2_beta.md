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

**风险等级**：🔴 HIGH　　**安全评分**：50/100　　**分析时间**：2026-07-13

> The script communicates with an external server (ffscouter.com) using GM_xmlhttpRequest, which is a critical risk if sensitive data is transmitted. It also uses localStorage for configuration, which is acceptable if no sensitive data is stored. The use of unsafeWindow increases the risk of privilege escalation or data exfiltration. No evidence of code obfuscation, remote code execution, or supply chain risk in the provided code. The overall risk is HIGH due to data transmission and permission usage. Further review of the full code, especially network payloads and unsafeWindow usage, is recommended.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ffscouter.com） |
| 隐私采集 | ❌ 检测到（Reads/writes localStorage for configuration and caching） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script uses GM_xmlhttpRequest to communicate with ffscouter.com. While the destination is declared in @connect, the actual payload and data sent are not fully visible in the provided code. Potential risk if user/page data is sent.  
> 位置：GM_xmlhttpRequest usage (implied by @grant and @connect)  
> 建议：Review all requests to ffscouter.com to ensure no sensitive user data (such as cookies, credentials, or personal information) is transmitted. Limit data to only what is necessary for functionality.

**⛔ CRITICAL** — Privacy Collection  
> The script reads and writes to localStorage for configuration and caching purposes. No evidence of sensitive data (like passwords or cookies) being stored, but localStorage usage is present.  
> 位置：Storage class and FFConfig usage  
> 建议：Ensure only non-sensitive configuration data is stored. Do not store authentication tokens or personal information in localStorage.

**🔴 HIGH** — Permission Abuse  
> The script requests GM_xmlhttpRequest and unsafeWindow permissions. The latter is high-risk as it allows access to the page context and can be abused for privilege escalation or data exfiltration.  
> 位置：@grant unsafeWindow  
> 建议：Avoid using unsafeWindow unless absolutely necessary. If used, strictly limit its scope and audit all interactions with the page context.

**🟡 LOW** — Best Practice  
> No evidence of eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection. No @require of remote scripts. No code obfuscation detected in the provided code.  
> 位置：N/A  
> 建议：Continue to avoid dynamic code execution and obfuscation for transparency and security.

**🟡 LOW** — Supply Chain  
> The script loads no third-party libraries via @require, so supply chain risk is low. However, if future versions add @require, ensure sources are trusted and versions are pinned.  
> 位置：@require (not present)  
> 建议：If adding @require, use official CDNs and pin versions/hashes.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/582442-ff-scouter-v2-beta)*
