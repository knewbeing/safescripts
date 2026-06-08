---
title: "物品市场集市浏览增强"
---

# 物品市场集市浏览增强

`游戏辅助`  `商品浏览`  `集市管理`  `数据排序`  `Torn`  `用户体验优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bazaars_in_Item_Market_Powered_by_TornW3B.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.26**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/527616-bazaars-in-item-market-powered-by-tornw3b) <Badge type="tip" text="GreasyFork" />　　安装量：**8,648**　　评分：👍2 / 👎0

## 功能介绍

本脚本在 Torn 游戏的物品市场页面显示各个玩家的集市（Bazaar）商品列表，并提供排序功能，方便用户浏览和筛选商品。

## 适用网站

- Torn 城市游戏

## 使用方法

1. 安装脚本后，打开 Torn 游戏的物品市场或集市页面。
2. 页面会自动显示集市商品列表及排序按钮。
3. 点击排序按钮，可按价格等条件筛选商品。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM.xmlHttpRequest` | 用于发送网络请求，获取集市商品数据。 |
| `GM_setValue` | 用于保存用户的设置或脚本数据。 |
| `GM_getValue` | 用于读取用户的设置或脚本数据。 |
| `GM_deleteValue` | 用于删除用户的设置或脚本数据。 |
| `GM_listValues` | 用于列出所有已保存的脚本数据键。 |
| `GM.setValue` | 用于保存用户的设置或脚本数据（新版API）。 |
| `GM.getValue` | 用于读取用户的设置或脚本数据（新版API）。 |
| `GM.deleteValue` | 用于删除用户的设置或脚本数据（新版API）。 |
| `GM.listValues` | 用于列出所有已保存的脚本数据键（新版API）。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：64/100　　**分析时间**：2026-06-08

> The script transmits data to a third-party server (weav3r.dev) using GM.xmlHttpRequest, which is a critical risk if sensitive data is sent. No evidence of credential or keylogging behavior. No code obfuscation or XSS risk detected. Some permission overuse and localStorage usage, but no major privacy collection. Overall, the script is relatively safe for typical use, but users should be aware of the external data transmission.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：weav3r.dev） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script uses GM.xmlHttpRequest to connect to weav3r.dev, which is a third-party server. This may transmit user interaction data or page context, depending on request payloads.  
> 位置：GM.xmlHttpRequest usage (enabled by @grant and @connect)  
> 建议：Review all transmitted data to ensure no sensitive information (user credentials, cookies, personal data) is sent. Limit data to only what is necessary for functionality.

**🟠 MEDIUM** — Privacy Collection  
> Script reads and writes to localStorage for settings and caching, but does not appear to transmit this data externally. No evidence of document.cookie, sessionStorage, or IndexedDB access for sensitive data.  
> 位置：localStorage usage in GM_getValue/GM_setValue compatibility layer  
> 建议：Ensure no sensitive user data is stored in localStorage. Avoid storing authentication tokens or personal information.

**🟠 MEDIUM** — Permission Overuse  
> Script requests more @grant permissions than it uses (both legacy and modern GM APIs).  
> 位置：@grant block in metadata  
> 建议：Remove unused permissions to reduce attack surface and follow the principle of least privilege.

**🟡 LOW** — Supply Chain  
> @require is not used, but @downloadURL and @updateURL point to greasyfork CDN, which is generally trusted. No supply chain risk detected.  
> 位置：Metadata block  
> 建议：If adding @require in the future, pin to official, versioned CDN URLs.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/527616-bazaars-in-item-market-powered-by-tornw3b)*
