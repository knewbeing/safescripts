---
title: "FF评分侦查器V3"
---

# FF评分侦查器V3

`游戏辅助`  `战斗分析`  `帮派管理`  `信息展示`  `Torn`  `评分查询`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/FF_Scouter_V3.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.0-alpha34**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/579109-ff-scouter-v3) <Badge type="tip" text="GreasyFork" />　　安装量：**708**　　评分：👍0 / 👎0

## 功能介绍

本脚本可在 Torn 游戏网站中显示目标玩家的 Fair Fight 评分和帮派战争状态，帮助玩家更好地评估战斗对手。信息会自动展示，无需手动查询。

## 适用网站

- Torn 城市

## 使用方法

1. 安装脚本后，访问 Torn 游戏网站。
2. 在玩家页面或帮派相关页面会自动显示 Fair Fight 评分和帮派战争状态。
3. 无需额外操作，信息自动加载。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本向 ffscouter.com 网站发送网络请求，以获取评分和状态数据。 |
| `unsafeWindow` | 允许脚本访问和操作网页的原始窗口对象，以便更好地集成功能。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：35/100　　**分析时间**：2026-06-22

> The script communicates with a third-party server (ffscouter.com) and stores user configuration (including a 'key') in localStorage. It requests high-privilege APIs (GM_xmlhttpRequest, unsafeWindow). There is no evidence of code obfuscation or supply chain risk in the provided code, but only a partial script was reviewed. The main risks are potential data exfiltration, privacy collection, and privilege escalation via unsafeWindow. A full code review is recommended, especially for network request payloads and any dynamic code execution.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ffscouter.com） |
| 隐私采集 | ❌ 检测到（Reads/writes localStorage for configuration and user key） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script uses GM_xmlhttpRequest to communicate with ffscouter.com, which is a third-party server. Potential for user data or page context to be transmitted, depending on request payloads.  
> 位置：@connect ffscouter.com, usage of GM_xmlhttpRequest (likely in code not fully shown)  
> 建议：Review all data sent to ffscouter.com; ensure no sensitive user data, authentication tokens, or cookies are transmitted. Document all transmitted fields.

**⛔ CRITICAL** — Privacy Collection  
> Script reads and writes to localStorage for configuration and possibly user keys.  
> 位置：class Storage, FFConfig.key getter/setter  
> 建议：Ensure no sensitive data (such as authentication tokens or personal information) is stored in localStorage. Document all stored keys and values.

**🔴 HIGH** — Remote Code Execution  
> @grant unsafeWindow is requested, which exposes page JS context to the userscript and can be abused for privilege escalation or data exfiltration.  
> 位置：@grant unsafeWindow in metadata  
> 建议：Remove unsafeWindow if not strictly necessary. If required, limit its usage and audit all interactions with page context.

**🔴 HIGH** — Code Obfuscation  
> No evidence of code obfuscation or minification in the provided code segment. However, only partial code is shown.  
> 位置：General code structure  
> 建议：Review the full script for any obfuscated or minified code, especially in sections not shown.

**🟠 MEDIUM** — Supply Chain Risk  
> @require is not used, so no supply chain risk from external libraries. However, only partial code is shown.  
> 位置：Metadata block  
> 建议：If @require is added, ensure only official, hash-pinned sources are used.

**🟠 MEDIUM** — Permission Abuse  
> GM_xmlhttpRequest is granted, which is a high-privilege API. Ensure it is only used for intended API calls.  
> 位置：@grant GM_xmlhttpRequest in metadata  
> 建议：Limit usage to necessary endpoints and validate all outgoing requests.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/579109-ff-scouter-v3)*
