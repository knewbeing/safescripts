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

**风险等级**：🔴 HIGH　　**安全评分**：47/100　　**分析时间**：2026-07-27

> The script connects to a third-party server (weav3r.dev) using GM.xmlHttpRequest, which is a critical risk if user/page data is transmitted. No evidence of sensitive privacy collection or code obfuscation. Permissions are somewhat redundant, and supply chain risk exists due to reliance on a non-official domain. No DOM XSS or remote code execution detected. Overall, the script is functional but presents significant risks due to external data transmission and supply chain concerns.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：weav3r.dev） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script uses GM.xmlHttpRequest to connect to weav3r.dev, a third-party server. Potential for user data or page context to be transmitted.  
> 位置：GM.xmlHttpRequest calls (network requests)  
> 建议：Review transmitted data, ensure only minimal and non-sensitive information is sent. Document privacy policy.

**🟠 MEDIUM** — Privacy Collection  
> Script reads and writes values to localStorage and GM storage for settings and cache. No evidence of sensitive data collection, but localStorage usage should be reviewed for privacy.  
> 位置：GM_getValue, GM_setValue, localStorage  
> 建议：Ensure only non-sensitive settings are stored. Avoid storing authentication tokens or personal data.

**🟠 MEDIUM** — Permission Abuse  
> Script requests multiple GM_* permissions, including GM.xmlHttpRequest, GM_setValue, GM_getValue, GM_deleteValue, GM_listValues, GM.setValue, GM.getValue, GM.deleteValue, GM.listValues. Some are redundant.  
> 位置：UserScript metadata @grant section  
> 建议：Remove unused or redundant permissions to minimize attack surface.

**🟠 MEDIUM** — Supply Chain Risk  
> Script uses @connect weav3r.dev, which is not a well-known CDN or official domain. Supply chain risk if the server is compromised.  
> 位置：UserScript metadata @connect section  
> 建议：Ensure the third-party server is trustworthy and monitored for security.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/527616-bazaars-in-item-market-powered-by-tornw3b)*
