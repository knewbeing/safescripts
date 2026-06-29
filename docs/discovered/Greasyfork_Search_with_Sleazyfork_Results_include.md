---
title: "大人的Greasyfork"
---

# 大人的Greasyfork

`脚本搜索`  `成人内容`  `脚本增强`  `评分显示`  `自动跳转`  `Greasyfork`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Greasyfork_Search_with_Sleazyfork_Results_include.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.6.6**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/23840-greasyfork-search-with-sleazyfork-results-include) <Badge type="tip" text="GreasyFork" />　　安装量：**906,688**　　评分：👍2749 / 👎2

## 功能介绍

本脚本在Greasyfork的搜索结果中自动显示Sleazyfork上的成人脚本，并为所有脚本增加评分和版本号信息。如果访问某些Greasyfork脚本时遇到匿名不可用的情况，会自动跳转到Sleazyfork对应页面。

## 适用网站

- Greasyfork
- Sleazyfork

## 使用方法

1. 安装脚本后，访问Greasyfork或Sleazyfork网站。
2. 在Greasyfork搜索时，结果中会自动显示Sleazyfork的成人脚本。
3. 脚本列表会显示评分和版本号信息。
4. 访问匿名不可用脚本时会自动跳转到Sleazyfork页面。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于跨域请求，获取Sleazyfork和Greasyfork的脚本数据。 |
| `GM_setValue` | 保存用户设置或脚本数据。 |
| `GM_getValue` | 读取用户设置或脚本数据。 |
| `GM_registerMenuCommand` | 在脚本菜单中添加自定义功能按钮。 |
| `GM_notification` | 在桌面弹出通知提醒用户。 |
| `GM.xmlHttpRequest` | 用于跨域请求，获取Sleazyfork和Greasyfork的脚本数据。 |
| `GM.setValue` | 保存用户设置或脚本数据。 |
| `GM.getValue` | 读取用户设置或脚本数据。 |
| `GM.registerMenuCommand` | 在脚本菜单中添加自定义功能按钮。 |
| `GM.notification` | 在桌面弹出通知提醒用户。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-29

> The script merges search results from greasyfork.org and sleazyfork.org, and does not transmit user data to third-party servers. It does not collect sensitive information, execute remote code, or use obfuscation. The main issue is overprovisioned permissions in the metadata block. Overall, the script is considered low risk.

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
> The script requests several GM_* permissions, including GM_notification, GM_registerMenuCommand, GM_setValue, GM_getValue, but not all are used in the code.  
> 位置：UserScript metadata block  
> 建议：Remove unused @grant permissions to reduce attack surface.

**🟡 LOW** — Network Request  
> The script uses GM_xmlhttpRequest to fetch search result pages from greasyfork.org and sleazyfork.org. No evidence of third-party or external data transmission beyond these domains.  
> 位置：GM_xmlhttpRequest usage in search result merging logic  
> 建议：Ensure only necessary data is fetched and not user-sensitive information. No user data is sent to third-party servers.

**🟡 LOW** — Storage Usage  
> The script reads and writes to localStorage as a fallback for storing user preferences if GM storage is unavailable.  
> 位置：storage.setItem/getItem implementation  
> 建议：No sensitive data is stored. Acceptable for this use case.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/23840-greasyfork-search-with-sleazyfork-results-include)*
