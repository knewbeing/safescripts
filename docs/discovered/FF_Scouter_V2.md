---
title: "FF评分侦查器V2"
---

# FF评分侦查器V2

`游戏辅助`  `信息展示`  `Torn`  `帮派战争`  `玩家评分`  `网页增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/FF_Scouter_V2.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.0.1**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/535292-ff-scouter-v2) <Badge type="tip" text="GreasyFork" />　　安装量：**18,764**　　评分：👍3 / 👎5

## 功能介绍

此脚本在 Torn 游戏网站上显示目标玩家的预期 Fair Fight 分数和帮派战争状态，帮助玩家更好地评估攻击目标。信息会直接集成在页面相关位置，方便查看。

## 适用网站

- Torn 城市游戏

## 使用方法

1. 安装脚本后，访问 Torn 游戏网站。
2. 在玩家或帮派相关页面，会自动显示 Fair Fight 分数和战争状态。
3. 无需额外操作，信息会集成在页面内。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本通过网络请求获取外部数据（如 Fair Fight 分数）。 |
| `unsafeWindow` | 允许脚本访问和修改网页的全局变量，增强页面交互能力。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：60/100　　**分析时间**：2026-07-13

> The script transmits data to a third-party server (ffscouter.com) using GM_xmlhttpRequest, which is a critical risk if sensitive user data is sent. It also requests unsafeWindow, increasing the risk of privilege escalation. No evidence of privacy-invasive data collection, code obfuscation, or DOM XSS was found in the provided code. Permissions are mostly appropriate, but should be reviewed. Supply chain risk is low as no @require is used. Overall, the script poses a HIGH risk due to data transmission and privilege escalation potential.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ffscouter.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script uses GM_xmlhttpRequest to communicate with ffscouter.com, which is a third-party server. This may transmit user data or page context, depending on request payloads.  
> 位置：Network requests to ffscouter.com via GM_xmlhttpRequest  
> 建议：Review all transmitted data to ensure no sensitive or personal information is sent. Document what is sent and why. Consider user consent.

**🔴 HIGH** — Privilege Escalation  
> The script requests the unsafeWindow permission, which exposes the page context to the userscript and increases the risk of privilege escalation or data leakage.  
> 位置：@grant unsafeWindow in metadata  
> 建议：Remove unsafeWindow unless strictly necessary. If required, minimize its usage and audit all interactions with page context.

**🟠 MEDIUM** — Permission Usage  
> The script requests GM_xmlhttpRequest permission, which is necessary for cross-origin requests, but should be limited to only required domains.  
> 位置：@grant GM_xmlhttpRequest in metadata  
> 建议：Ensure only required domains are listed in @connect and that requests are strictly controlled.

**🟡 LOW** — DOM Injection Risk  
> The script loads a large block of CSS as a string and injects it into the page. While not inherently dangerous, if the CSS string is ever replaced with dynamic content, it could become a vector for DOM-based XSS.  
> 位置：importCSS function  
> 建议：Ensure only static, trusted CSS is injected. Do not allow user input or external data to be injected as CSS.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/535292-ff-scouter-v2)*
