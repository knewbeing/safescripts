---
title: "大人的Greasyfork"
---

# 大人的Greasyfork

`脚本搜索`  `成人内容`  `Greasyfork`  `Sleazyfork`  `增强功能`  `评分展示`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Greasyfork_Search_with_Sleazyfork_Results_include.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.6.6**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/23840-greasyfork-search-with-sleazyfork-results-include) <Badge type="tip" text="GreasyFork" />　　安装量：**906,115**　　评分：👍2747 / 👎1

## 功能介绍

在Greasyfork搜索时，自动显示Sleazyfork上的成人脚本结果，并为所有脚本添加评分和版本号。如果访问匿名不可用的脚本，会自动跳转到Sleazyfork对应页面。

## 适用网站

- Greasyfork
- Sleazyfork

## 使用方法

1. 安装脚本后，访问Greasyfork或Sleazyfork网站。
2. 在Greasyfork搜索脚本时，自动显示Sleazyfork的成人脚本结果。
3. 查看脚本列表时会显示评分和版本号。
4. 访问匿名不可用脚本时会自动跳转到Sleazyfork页面。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本跨域请求数据，用于获取Sleazyfork和Greasyfork的搜索结果。 |
| `GM_setValue` | 保存脚本设置或数据到本地。 |
| `GM_getValue` | 读取本地保存的脚本设置或数据。 |
| `GM_registerMenuCommand` | 在浏览器菜单中添加自定义操作按钮。 |
| `GM_notification` | 在浏览器中弹出通知提醒用户。 |
| `GM.xmlHttpRequest` | 允许脚本跨域请求数据（新版API）。 |
| `GM.setValue` | 保存脚本设置或数据到本地（新版API）。 |
| `GM.getValue` | 读取本地保存的脚本设置或数据（新版API）。 |
| `GM.registerMenuCommand` | 在浏览器菜单中添加自定义操作按钮（新版API）。 |
| `GM.notification` | 在浏览器中弹出通知提醒用户（新版API）。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-22

> The script merges search results from greasyfork.org and sleazyfork.org by fetching and parsing HTML from these official domains. It does not transmit user data to third-party servers, does not collect sensitive information, and does not use dangerous code execution patterns. The only notable issue is the overprovision of GM_* permissions, which should be minimized. Overall, the script is considered low risk.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：greasyfork.org, sleazyfork.org） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — Permission Overprovision  
> The script requests several GM_* permissions, including GM_notification and GM_registerMenuCommand, but not all are used in the code.  
> 位置：UserScript metadata block  
> 建议：Remove unused permissions to reduce the attack surface.

**🟡 LOW** — Network Request  
> The script uses GM_xmlhttpRequest to fetch search result pages from greasyfork.org and sleazyfork.org, but only for merging search results and does not transmit user data or cookies to third-party domains.  
> 位置：GM_xmlhttpRequest usage in search result merging logic  
> 建议：No action needed. The requests are limited to the two official domains and do not leak sensitive user data.

**🟡 LOW** — Storage Access  
> The script accesses localStorage as a fallback for storing user preferences if GM storage is unavailable.  
> 位置：storage.setItem/getItem implementation  
> 建议：This is a standard practice and does not pose a privacy risk as no sensitive data is stored or transmitted.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/23840-greasyfork-search-with-sleazyfork-results-include)*
