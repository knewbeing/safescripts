---
title: "公平战斗侦查器"
---

# 公平战斗侦查器

`游戏辅助`  `数据展示`  `策略优化`  `Torn`  `帮派管理`  `玩家分析`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/FF_Scouter_V2.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.77**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/535292-ff-scouter-v2) <Badge type="tip" text="GreasyFork" />　　安装量：**17,209**　　评分：👍3 / 👎3

## 功能介绍

此脚本在 Torn 游戏网站上显示目标玩家的 Fair Fight 分数和帮派战争状态，帮助玩家更好地评估对手和战局。通过自动获取和展示相关数据，提升游戏策略体验。

## 适用网站

- Torn 城市

## 使用方法

1. 安装脚本后，登录 Torn 网站。
2. 在目标玩家页面或帮派相关页面，会自动显示 Fair Fight 分数和帮派战争状态。
3. 可通过脚本菜单进行设置或刷新数据。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于向外部网站请求数据，获取 Fair Fight 分数和帮派信息。 |
| `GM_setValue` | 保存脚本设置和缓存数据，方便下次使用。 |
| `GM_getValue` | 读取脚本保存的数据，如用户偏好和缓存信息。 |
| `GM_listValues` | 列出所有已保存的数据键，便于管理缓存和设置。 |
| `GM_deleteValue` | 删除不再需要的脚本数据，保持数据整洁。 |
| `GM_registerMenuCommand` | 在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_addStyle` | 为页面添加自定义样式，让显示效果更美观。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-06-15

> FF Scouter V2 communicates with ffscouter.com using GM_xmlhttpRequest, which is a third-party server. No evidence of privacy collection, code obfuscation, or DOM XSS. Permissions are standard, but GM_xmlhttpRequest is a high privilege. Supply chain risk is minimal as no third-party libraries are loaded. Main risk is data transmission to external server; review payloads for sensitive data.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ffscouter.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script uses GM_xmlhttpRequest to communicate with ffscouter.com, a third-party server. Potential for user data transmission exists, but only ffscouter.com is targeted.  
> 位置：GM_xmlhttpRequest calls and @connect ffscouter.com  
> 建议：Review transmitted data payloads to ensure no sensitive user information is sent. Limit data sent to only what is necessary for functionality.

**🟠 MEDIUM** — Permission Usage  
> Script requests GM_xmlhttpRequest permission, which is high privilege and can be abused if not properly controlled.  
> 位置：@grant GM_xmlhttpRequest  
> 建议：Ensure only necessary requests are made and no excessive privileges are requested.

**🟡 LOW** — Permission Usage  
> Script requests GM_setValue, GM_getValue, GM_listValues, GM_deleteValue, GM_registerMenuCommand, GM_addStyle. These are standard, but review for privilege minimization.  
> 位置：@grant declarations  
> 建议：Remove unused permissions if any.

**🟡 LOW** — Supply Chain  
> Script uses @require only for update/download URLs, not for third-party libraries. No supply chain risk detected.  
> 位置：@downloadURL, @updateURL  
> 建议：If third-party libraries are used in the future, ensure version pinning and trusted sources.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/535292-ff-scouter-v2)*
