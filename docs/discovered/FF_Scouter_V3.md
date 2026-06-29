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

**风险等级**：🔴 HIGH　　**安全评分**：35/100　　**分析时间**：2026-06-29

> The script communicates with a third-party server (ffscouter.com) and stores a user 'key' in localStorage, which may be transmitted externally. It requests high-privilege grants (GM_xmlhttpRequest, unsafeWindow), increasing the attack surface. No evidence of code obfuscation, clipboard, or keylogging behavior. No direct DOM XSS found, but localStorage usage and unsafeWindow grant require caution. Supply chain risk is low due to trusted update source. Overall, the script presents a HIGH security risk and is NOT approved for use in sensitive environments.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ffscouter.com） |
| 隐私采集 | ❌ 检测到（localStorage used for storing configuration and a user 'key'） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script uses GM_xmlhttpRequest to communicate with ffscouter.com, a third-party server. The exact data sent is not fully visible in the provided code, but the use of a 'key' stored in localStorage and sent to the server is likely. Potential for user data or page context to be transmitted exists.  
> 位置：GM_xmlhttpRequest usage (likely in code not fully shown, but @connect and @grant indicate usage)  
> 建议：Review all data sent to ffscouter.com. Only transmit non-sensitive, non-personal data. Document all transmitted fields.

**⛔ CRITICAL** — Privacy Collection  
> Script reads and writes to localStorage for persistent configuration and possibly for storing a user 'key'. No evidence of reading cookies, sessionStorage, or IndexedDB. No evidence of keylogging or clipboard access.  
> 位置：Storage class and FFConfig usage  
> 建议：Ensure no sensitive user data (e.g., authentication tokens, personal info) is stored or transmitted. Document all stored fields.

**🔴 HIGH** — Remote Code Execution / Privilege Escalation  
> Script grants unsafeWindow, which exposes the script's context to the page and vice versa. This increases the risk of privilege escalation or data leakage if the page is compromised.  
> 位置：@grant unsafeWindow in metadata  
> 建议：Avoid using unsafeWindow unless absolutely necessary. If used, strictly control what is exposed to the page.

**🔴 HIGH** — DOM Injection Risk  
> Script uses localStorage for persistent data. No evidence of sanitizing user input before storage or use, but no direct DOM injection from user input is visible in the provided code.  
> 位置：Storage class  
> 建议：Sanitize all user input before using it in the DOM or transmitting it to external servers.

**🟠 MEDIUM** — Supply Chain Risk  
> Script loads no external libraries via @require, reducing supply chain risk. However, the script is auto-updated via greasyfork.org, which is a trusted source.  
> 位置：@require and @downloadURL  
> 建议：Continue to use only trusted sources for updates. Avoid dynamic or non-versioned @require URLs.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/579109-ff-scouter-v3)*
