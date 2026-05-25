---
title: "公平战斗分数助手"
---

# 公平战斗分数助手

`游戏辅助`  `数据展示`  `帮派管理`  `Torn`  `战斗分析`  `网页增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/FF_Scouter_V2.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.77**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/535292-ff-scouter-v2) <Badge type="tip" text="GreasyFork" />　　安装量：**15,768**　　评分：👍3 / 👎2

## 功能介绍

此脚本在 Torn 游戏网站上显示目标玩家的公平战斗分数和帮派战争状态，帮助玩家更好地评估对手和战局。

## 适用网站

- Torn 城市游戏

## 使用方法

1. 安装脚本后，访问 Torn 游戏网站。
2. 在目标玩家或帮派页面，会自动显示公平战斗分数和战争状态。
3. 如需调整脚本设置，可通过浏览器插件菜单操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于发送网络请求获取外部数据。 |
| `GM_setValue` | 用于保存脚本设置和缓存信息。 |
| `GM_getValue` | 用于读取脚本保存的数据。 |
| `GM_listValues` | 用于列出所有已保存的数据键。 |
| `GM_deleteValue` | 用于删除脚本保存的数据。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义操作入口。 |
| `GM_addStyle` | 用于为页面添加自定义样式，优化显示效果。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-05-25

> FF Scouter V2 communicates with a third-party server (ffscouter.com) using GM_xmlhttpRequest, which is necessary for its functionality. No evidence of privacy-invasive data collection, code obfuscation, or DOM XSS risks in the visible code. Supply chain risk exists due to reliance on an external API. Permissions requested are appropriate for the script's purpose. Overall, the script is reasonably safe but should be monitored for supply chain and data transmission risks.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ffscouter.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script uses GM_xmlhttpRequest to communicate with ffscouter.com, a third-party server. Potential for user data transmission exists, but only ffscouter.com is targeted and no evidence of cookie/page content transmission found in the visible code.  
> 位置：GM_xmlhttpRequest calls (API usage)  
> 建议：Review all transmitted payloads to ensure no sensitive user data or cookies are sent. Limit data sent to only what is necessary for functionality.

**🟠 MEDIUM** — Permission Usage  
> Script requests GM_xmlhttpRequest permission, which is necessary for API calls but is a high privilege. No evidence of unused high privilege grants.  
> 位置：UserScript metadata (@grant)  
> 建议：Ensure only necessary permissions are requested. Remove unused grants if possible.

**🟠 MEDIUM** — Supply Chain Risk  
> Script uses @connect ffscouter.com, which is a third-party domain. Supply chain risk is present if the server is compromised.  
> 位置：UserScript metadata (@connect)  
> 建议：Ensure ffscouter.com is trustworthy and monitor for supply chain risks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/535292-ff-scouter-v2)*
