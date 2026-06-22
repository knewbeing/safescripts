---
title: "公平战斗侦查器V2"
---

# 公平战斗侦查器V2

`游戏辅助`  `Torn`  `战斗分析`  `帮派管理`  `信息展示`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/FF_Scouter_V2.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.77**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/535292-ff-scouter-v2) <Badge type="tip" text="GreasyFork" />　　安装量：**17,704**　　评分：👍3 / 👎3

## 功能介绍

本脚本可在 Torn 游戏网站上显示目标玩家的公平战斗分数和帮派战争状态，帮助玩家更好地评估战斗对象。它会自动获取并展示相关信息，提升游戏策略体验。

## 适用网站

- Torn 游戏网站

## 使用方法

1. 安装脚本后，访问 Torn 游戏网站。
2. 在玩家资料或相关页面会自动显示公平战斗分数和帮派战争状态。
3. 如需调整脚本设置，可通过浏览器的用户脚本菜单操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于发送跨域网络请求，获取外部数据。 |
| `GM_setValue` | 保存脚本设置和数据到本地。 |
| `GM_getValue` | 读取本地保存的脚本数据。 |
| `GM_listValues` | 列出所有已保存的脚本数据键。 |
| `GM_deleteValue` | 删除本地保存的脚本数据。 |
| `GM_registerMenuCommand` | 在浏览器菜单中添加自定义命令，方便用户操作脚本。 |
| `GM_addStyle` | 为页面添加自定义样式，优化显示效果。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：50/100　　**分析时间**：2026-06-22

> The script makes network requests to a third-party server (ffscouter.com) using GM_xmlhttpRequest, which is a critical risk if user data or sensitive information is transmitted. There is no evidence of code obfuscation, DOM XSS, or dangerous dynamic code execution in the provided snippet. The script requests several GM_* permissions, but their usage appears standard. The main risk is data exfiltration and supply chain trust in ffscouter.com. Review all network payloads and ensure no sensitive data is sent. The script is not approved for use in sensitive environments without further review of the full code and network behavior.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ffscouter.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> The script uses GM_xmlhttpRequest to communicate with ffscouter.com, which is a third-party server. This may transmit user data or page context, depending on the request payloads.  
> 位置：GM_xmlhttpRequest calls (likely in main logic, not shown in snippet)  
> 建议：Review all data sent to ffscouter.com. Ensure no sensitive user data, cookies, or authentication tokens are transmitted. Document what is sent and why.

**⛔ CRITICAL** — Data Exfiltration  
> The script requests and is granted GM_xmlhttpRequest permission, but the code snippet does not show any other network request methods (fetch, XHR, WebSocket, etc.).  
> 位置：@grant GM_xmlhttpRequest  
> 建议：Limit network requests to only what is necessary. Avoid sending sensitive data.

**🟠 MEDIUM** — Privacy Collection  
> The script requests GM_setValue, GM_getValue, GM_listValues, and GM_deleteValue permissions, which allow persistent storage. While not inherently dangerous, these should be reviewed for privacy implications if used to store sensitive data.  
> 位置：@grant GM_setValue, GM_getValue, GM_listValues, GM_deleteValue  
> 建议：Ensure no sensitive user data is stored insecurely. Document what is stored and why.

**🟠 MEDIUM** — Supply Chain Risk  
> The script connects to ffscouter.com, a third-party server, as specified by @connect. This introduces supply chain risk if the remote server is compromised or malicious.  
> 位置：@connect ffscouter.com  
> 建议：Ensure ffscouter.com is trustworthy and uses HTTPS. Monitor for supply chain attacks.

**🟡 LOW** — Permission Usage  
> The script requests GM_registerMenuCommand and GM_addStyle, which are not high risk but should be used as intended.  
> 位置：@grant GM_registerMenuCommand, GM_addStyle  
> 建议：Ensure these are not abused for privilege escalation or UI spoofing.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/535292-ff-scouter-v2)*
