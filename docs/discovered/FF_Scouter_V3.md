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

**风险等级**：🔴 HIGH　　**安全评分**：35/100　　**分析时间**：2026-07-13

> The script requests network access to a third-party server (ffscouter.com) and stores data in localStorage. It also requests the powerful 'unsafeWindow' grant. While no direct evidence of sensitive data exfiltration or code execution vulnerabilities is present in the provided code fragment, the combination of these permissions and storage practices presents a high risk. A full review of the complete script is recommended to ensure no sensitive data is transmitted or exposed.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ffscouter.com） |
| 隐私采集 | ❌ 检测到（Reads and writes to localStorage for configuration and possibly user data） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script uses GM_xmlhttpRequest to connect to ffscouter.com, which is a third-party server. The exact data sent is not visible in the provided code fragment, but the permission is declared.  
> 位置：Metadata block and possible network logic  
> 建议：Review all GM_xmlhttpRequest usages to ensure no sensitive user data (such as cookies, tokens, or personal information) is transmitted. Document all data flows.

**⛔ CRITICAL** — Privacy Collection  
> Script reads and writes to localStorage for configuration and possibly user data.  
> 位置：Storage class and FFConfig class  
> 建议：Ensure only non-sensitive configuration data is stored. Do not store authentication tokens or sensitive information in localStorage.

**🔴 HIGH** — Privilege Escalation  
> Script requests the 'unsafeWindow' grant, which allows the script to interact with the page's JS context and can be abused for privilege escalation or data exfiltration.  
> 位置：Metadata block  
> 建议：Remove 'unsafeWindow' if not strictly necessary. If required, audit all usages for security risks.

**🔴 HIGH** — Remote Code Execution  
> No evidence of eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection in the provided code fragment.  
> 位置：General code  
> 建议：Continue to avoid dynamic code execution. Review any future updates for such patterns.

**🟡 LOW** — Code Obfuscation  
> No code obfuscation detected. Code is readable and not minified or encoded.  
> 位置：General code  
> 建议：Maintain code transparency for auditability.

**🟡 LOW** — DOM XSS  
> No DOM XSS or direct insertion of untrusted input into innerHTML/outerHTML detected in the provided code fragment.  
> 位置：General code  
> 建议：Continue to sanitize any user input before DOM insertion.

**🟡 LOW** — Supply Chain  
> No evidence of supply chain risk (@require) in the metadata block.  
> 位置：Metadata block  
> 建议：If adding @require in the future, use official CDNs and fixed versions.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/579109-ff-scouter-v3)*
