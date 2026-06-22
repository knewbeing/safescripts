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

**风险等级**：🟠 MEDIUM　　**安全评分**：59/100　　**分析时间**：2026-06-22

> The script requests data from a third-party server (weav3r.dev) and uses localStorage for settings. No evidence of sensitive data exfiltration or DOM XSS was found in the provided code. There is no code obfuscation or dynamic code execution. Permissions could be reduced. The main risk is data transmission to a third-party server and potential supply chain issues if the server is compromised. Overall, the script is moderately safe but should be reviewed for the exact data sent to weav3r.dev.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：weav3r.dev） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script uses GM.xmlHttpRequest to connect to weav3r.dev, which is a third-party server. The request may transmit user data depending on implementation.  
> 位置：@connect weav3r.dev and any GM.xmlHttpRequest usage (full code not shown, but permission is present)  
> 建议：Review all requests to weav3r.dev to ensure no sensitive user data (such as cookies, authentication tokens, or personal information) is transmitted. Limit data sent to only what is necessary for functionality.

**🟠 MEDIUM** — Privacy Collection  
> Script reads and writes to localStorage for settings persistence and compatibility with GM_*Value APIs. No evidence of sensitive data (like cookies or passwords) being accessed or exfiltrated.  
> 位置：GM_getValue, GM_setValue compatibility wrappers and usage  
> 建议：Ensure only non-sensitive settings are stored. Do not store authentication tokens, passwords, or personal identifiers in localStorage.

**🟠 MEDIUM** — Permission Overuse  
> Script requests a broad set of GM_*Value permissions, including both legacy and modern APIs. Some permissions may not be used.  
> 位置：@grant block in metadata  
> 建议：Remove unused permissions to reduce attack surface and follow the principle of least privilege.

**🟠 MEDIUM** — Supply Chain Risk  
> @require is not used, but the script does connect to a third-party domain (weav3r.dev). If the server is compromised, it could serve malicious data.  
> 位置：@connect weav3r.dev  
> 建议：Ensure the third-party server is trustworthy and uses HTTPS. Monitor for supply chain risks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/527616-bazaars-in-item-market-powered-by-tornw3b)*
