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

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-06-01

> The script requests network access to a third-party server (weav3r.dev) and stores settings in localStorage and GM storage. No evidence of sensitive data exfiltration, privacy-invasive collection, or code obfuscation is present. The main risk is the potential for data transmission to a third-party server, though the current code does not show sensitive data being sent. Permissions could be reduced for better security.

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
> The script uses GM.xmlHttpRequest and @connect to weav3r.dev, which is a third-party server. However, the code provided does not show any sensitive user data, cookies, or page content being sent. The actual payload of the requests is not visible in the snippet, but the risk is present due to the network permission.  
> 位置：GM.xmlHttpRequest usage and @connect weav3r.dev in metadata  
> 建议：Review all network requests to ensure no sensitive data is transmitted. Limit data sent to only what is necessary for the script's function.

**🟠 MEDIUM** — Privacy Collection  
> The script reads and writes to localStorage and GM storage for settings and caching. No evidence of privacy-invasive data collection (such as cookies, form fields, or clipboard) is present.  
> 位置：GM_getValue, GM_setValue, localStorage usage  
> 建议：Ensure only non-sensitive script settings are stored. Do not store or transmit user credentials or personal data.

**🟠 MEDIUM** — Permission Abuse  
> The script requests multiple GM_* permissions, including both legacy and modern APIs. Some permissions (e.g., GM_deleteValue, GM_listValues) may not be strictly necessary.  
> 位置：Metadata block (@grant)  
> 建议：Remove unused permissions to reduce attack surface.

**🟡 LOW** — General Best Practice  
> The script loads styles and manipulates the DOM, but does not use innerHTML/outerHTML with untrusted input, nor does it use eval or similar dynamic code execution.  
> 位置：DOM manipulation code  
> 建议：Continue to avoid dynamic code execution and direct insertion of untrusted data into the DOM.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/527616-bazaars-in-item-market-powered-by-tornw3b)*
