---
title: "Torn集市商品展示与排序"
---

# Torn集市商品展示与排序

`游戏辅助`  `集市管理`  `价格比较`  `数据展示`  `Torn`  `用户体验提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bazaars_in_Item_Market_Powered_by_TornW3B.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.26**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/527616-bazaars-in-item-market-powered-by-tornw3b) <Badge type="tip" text="GreasyFork" />　　安装量：**9,907**　　评分：👍2 / 👎0

## 功能介绍

此脚本在 Torn 游戏的物品市场和个人商店页面显示集市商品列表，并提供排序功能，方便用户查找和比较商品价格。

## 适用网站

- Torn 城市游戏

## 使用方法

1. 安装脚本后，进入 Torn 的物品市场或个人商店页面。
2. 页面会自动显示集市商品列表和排序按钮。
3. 点击排序按钮可按价格、数量等条件筛选商品。
4. 无需额外操作，功能自动生效。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM.xmlHttpRequest` | 用于发送网络请求，获取集市商品数据。 |
| `GM_setValue` | 用于保存用户的设置或数据。 |
| `GM_getValue` | 用于读取用户保存的设置或数据。 |
| `GM_deleteValue` | 用于删除用户保存的设置或数据。 |
| `GM_listValues` | 用于列出所有已保存的设置或数据。 |
| `GM.setValue` | 用于保存用户的设置或数据（新版API）。 |
| `GM.getValue` | 用于读取用户保存的设置或数据（新版API）。 |
| `GM.deleteValue` | 用于删除用户保存的设置或数据（新版API）。 |
| `GM.listValues` | 用于列出所有已保存的设置或数据（新版API）。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：64/100　　**分析时间**：2026-06-29

> The script requests data from a third-party server (weav3r.dev) and uses localStorage/GM storage for settings. No evidence of sensitive data exfiltration, DOM XSS, or code obfuscation. Permissions are appropriate for the script's features. Overall, the script is low risk, but users should be aware of the third-party API connection and ensure no sensitive data is sent. Regularly review updates for changes in network behavior.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：weav3r.dev） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission to Third Party  
> Script uses GM.xmlHttpRequest to connect to weav3r.dev, which is a third-party server. However, the code provided does not show user data, cookies, or sensitive information being sent. The request destination is a custom API, which could be a privacy concern if user data is sent in other parts of the code (not visible in the snippet).  
> 位置：@connect weav3r.dev and any GM.xmlHttpRequest usage  
> 建议：Review all requests to ensure no sensitive user data, cookies, or identifiers are sent. If possible, document the API endpoints and data schema.

**⛔ CRITICAL** — Privacy Collection  
> Script reads and writes to localStorage and GM_*Value APIs for settings persistence. No evidence of sensitive data (like cookies, passwords, or form fields) being accessed or exfiltrated. No keylogger or clipboard access detected.  
> 位置：GM_getValue, GM_setValue, localStorage usage  
> 建议：Ensure only non-sensitive settings are stored. Do not store authentication tokens or personal data in localStorage or GM storage.

**🟠 MEDIUM** — Permission Usage  
> Multiple @grant permissions are requested (GM.xmlHttpRequest, GM_setValue, etc.), but all are used appropriately for script functionality. No evidence of permission overreach.  
> 位置：@grant metadata block  
> 建议：Keep only the necessary permissions. Remove unused grants if possible.

**🟠 MEDIUM** — Supply Chain Risk  
> @require is not used, and no dynamic script loading or eval is present in the provided code. No supply chain risk detected in this snippet.  
> 位置：N/A  
> 建议：If adding @require in the future, use official CDNs and fixed versions.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/527616-bazaars-in-item-market-powered-by-tornw3b)*
