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

**风险等级**：⛔ CRITICAL　　**安全评分**：42/100　　**分析时间**：2026-07-06

> FF Scouter V3 requests high privileges (GM_xmlhttpRequest, unsafeWindow), connects to a third-party server (ffscouter.com), and uses localStorage for configuration. There is potential for user/page data transmission and privacy collection. No code obfuscation or DOM XSS detected. Supply chain risk is mitigated by using GreasyFork, but version pinning should be enforced. Overall, the script presents CRITICAL risk due to data transmission and privacy collection concerns.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ffscouter.com） |
| 隐私采集 | ❌ 检测到（localStorage usage for configuration and possibly user data） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script uses GM_xmlhttpRequest to connect to ffscouter.com, which is a third-party server. Potential for user/page data transmission.  
> 位置：Metadata (@connect ffscouter.com), code (GM_xmlhttpRequest usage, though full implementation not visible)  
> 建议：Review all transmitted data. Ensure only minimal, non-sensitive information is sent. Document transmitted fields.

**⛔ CRITICAL** — Privacy Collection  
> Script reads and writes to localStorage for configuration and possibly user data.  
> 位置：class Storage, FFConfig  
> 建议：Ensure no sensitive information (e.g., authentication tokens, personal data) is stored or transmitted from localStorage.

**🔴 HIGH** — Permission Abuse  
> Script requests unsafeWindow grant, which allows access to the page context and can be abused for privilege escalation.  
> 位置：Metadata (@grant unsafeWindow)  
> 建议：Remove unsafeWindow grant if not strictly necessary. Limit usage and audit for privilege escalation.

**🔴 HIGH** — Permission Abuse  
> Script requests GM_xmlhttpRequest grant, which is a high privilege and can be abused for cross-origin requests.  
> 位置：Metadata (@grant GM_xmlhttpRequest)  
> 建议：Limit usage to only required domains. Audit all outgoing requests.

**🟠 MEDIUM** — Supply Chain Risk  
> Script loads code from update.greasyfork.org via @downloadURL and @updateURL, which is a trusted source but should be version-pinned.  
> 位置：Metadata (@downloadURL, @updateURL)  
> 建议：Ensure version pinning and integrity checks for updates.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/579109-ff-scouter-v3)*
