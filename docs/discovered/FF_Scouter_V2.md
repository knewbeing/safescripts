---
title: "公平战斗侦查器 V2"
---

# 公平战斗侦查器 V2

`游戏辅助`  `信息展示`  `策略优化`  `帮派管理`  `网页增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/FF_Scouter_V2.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.77**　　发现时间：**2026-06-08**　　来源：[GreasyFork](https://greasyfork.org/scripts/535292-ff-scouter-v2) <Badge type="tip" text="GreasyFork" />　　安装量：**16,711**　　评分：👍3 / 👎3

## 功能介绍

此脚本在 Torn 游戏网站上显示目标玩家的公平战斗分数和帮派战争状态，帮助玩家更好地评估攻击目标。它会自动获取并展示相关信息，提升游戏策略性。

## 适用网站

- Torn 城市

## 使用方法

1. 安装脚本后，访问 Torn 网站。
2. 在玩家或帮派页面会自动显示公平战斗分数和战争状态。
3. 如需调整设置，可通过用户脚本菜单进行操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于发送网络请求，获取外部数据。 |
| `GM_setValue` | 用于保存脚本设置和数据。 |
| `GM_getValue` | 用于读取脚本保存的数据。 |
| `GM_listValues` | 用于列出所有已保存的数据项。 |
| `GM_deleteValue` | 用于删除脚本保存的数据。 |
| `GM_registerMenuCommand` | 用于在用户脚本菜单中添加自定义命令。 |
| `GM_addStyle` | 用于添加自定义样式，让信息显示更美观。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：60/100　　**分析时间**：2026-06-08

> The script transmits data to a third-party server (ffscouter.com) using GM_xmlhttpRequest, which is a critical risk if sensitive user data is sent. There is no evidence of privacy-invasive data collection, code obfuscation, or DOM XSS in the provided code. The script requests several GM_* permissions, some of which may not be necessary. No supply chain risk is present unless @require is added in the future. Overall, the main risk is data exfiltration to an external server, and the script should be reviewed for the exact data sent in these requests.

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
> 位置：GM_xmlhttpRequest calls (likely in main logic, not shown in snippet)  
> 建议：Review all data sent to ffscouter.com; ensure no sensitive or unnecessary user data is transmitted. Document what is sent and why.

**🔴 HIGH** — Remote Code/Data Risk  
> The script requests and is granted GM_xmlhttpRequest permission, which allows cross-origin requests to arbitrary endpoints specified in @connect. Here, only ffscouter.com is allowed, but this still poses a risk if the remote endpoint is compromised.  
> 位置：@grant GM_xmlhttpRequest, @connect ffscouter.com  
> 建议：Limit data sent, validate all remote responses, and consider using a more trusted/official API if possible.

**🟠 MEDIUM** — Permission Overuse  
> The script requests several GM_* permissions, but not all are necessarily used in the provided code. Over-privileging increases attack surface.  
> 位置：@grant GM_setValue, GM_getValue, GM_listValues, GM_deleteValue, GM_registerMenuCommand, GM_addStyle  
> 建议：Remove unused permissions to reduce risk.

**🟠 MEDIUM** — Supply Chain Risk  
> @require is not used, but if added in the future, ensure only trusted, version-pinned sources are used.  
> 位置：N/A (precaution)  
> 建议：Always pin @require URLs to specific versions and use official CDNs.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/535292-ff-scouter-v2)*
