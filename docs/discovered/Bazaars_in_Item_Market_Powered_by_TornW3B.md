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

**风险等级**：🔴 HIGH　　**安全评分**：42/100　　**分析时间**：2026-05-25

> The script connects to a third-party server (weav3r.dev) via GM.xmlHttpRequest, which is a critical risk if sensitive data is transmitted. No evidence of privacy-invasive data collection or code obfuscation. Permissions are appropriate but should be reviewed for necessity. Supply chain risk is limited to the external server connection. Overall, the script is functional but presents a high risk due to external data transmission.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：weav3r.dev） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script uses GM.xmlHttpRequest to connect to weav3r.dev, a third-party server. Potential for user data or page content to be transmitted externally.  
> 位置：GM.xmlHttpRequest calls (network requests), @connect weav3r.dev  
> 建议：Review all transmitted data to ensure no sensitive information (user credentials, cookies, personal data) is sent. Limit data sent to only what is necessary for functionality.

**🟠 MEDIUM** — Privacy Collection  
> Script reads and writes to localStorage and GM storage for settings and cache. No evidence of sensitive data (cookies, passwords, clipboard, form fields) being collected.  
> 位置：GM_getValue, GM_setValue, localStorage usage  
> 建议：Ensure only non-sensitive settings are stored. Do not store authentication tokens or personal information.

**🟠 MEDIUM** — Permission Abuse  
> Script requests multiple GM_* permissions, including GM.xmlHttpRequest, GM_setValue, GM_getValue, GM_deleteValue, GM_listValues, GM.setValue, GM.getValue, GM.deleteValue, GM.listValues. All are used for settings and network requests.  
> 位置：UserScript metadata @grant section  
> 建议：Remove unused permissions if any. Only request permissions necessary for script operation.

**🟠 MEDIUM** — Supply Chain Risk  
> Script connects to weav3r.dev, a third-party domain. No evidence of supply chain risk (no @require third-party libraries).  
> 位置：@connect weav3r.dev  
> 建议：Ensure weav3r.dev is trustworthy and securely maintained. Monitor for domain changes or compromise.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/527616-bazaars-in-item-market-powered-by-tornw3b)*
