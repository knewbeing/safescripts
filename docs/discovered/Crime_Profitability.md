---
title: "犯罪收益显示器"
---

# 犯罪收益显示器

`游戏辅助`  `数据展示`  `收益分析`  `Torn`  `自动更新`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Crime_Profitability.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.3.6**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/538188-crime-profitability) <Badge type="tip" text="GreasyFork" />　　安装量：**5,151**　　评分：👍1 / 👎0

## 功能介绍

本脚本会在犯罪页面显示每消耗一点神经值的收益，帮助玩家判断不同犯罪的性价比。数据来源于在线表格，自动更新。

## 适用网站

- Torn 游戏网站

## 使用方法

1. 安装脚本后，进入 Torn 游戏的犯罪页面。
2. 页面会自动显示每个犯罪的神经值收益。
3. 无需额外操作，数据会自动更新。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM.xmlHttpRequest` | 用于从外部表格获取犯罪收益数据。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-04-27

> The script fetches external data from Google Sheets using GM.xmlHttpRequest, but does not transmit user data or collect sensitive information. No code execution, obfuscation, or DOM XSS risks detected. Supply chain risk is minimal due to trusted source, but the sheet is not version-locked. Overall, the script is safe with minor supply chain and data fetch risks.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://docs.google.com/spreadsheets/d/13wUFhhssuPdAONI_OmRJi6l_Bs7KRZXDgVFCn7uJJNQ/gviz/tq?tqx=out:csv&gid=560321570, https://docs.google.com/spreadsheets/d/13wUFhhssuPdAONI_OmRJi6l_Bs7KRZXDgVFCn7uJJNQ/gviz/tq?tqx=out:csv&gid=1626436424） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — Data Transmission  
> Script fetches data from Google Sheets via GM.xmlHttpRequest. The destination is a trusted third-party (Google), and the request does not appear to transmit user data, only fetches external CSV data.  
> 位置：GM.xmlHttpRequest usage for emforusData and crackingData URLs  
> 建议：Ensure fetched data is not malicious and does not contain executable code. Monitor for any changes in the external sheet that could introduce supply chain risk.

**🟠 MEDIUM** — Supply Chain Risk  
> Script loads external data from Google Sheets (docs.google.com), which is a trusted source, but the sheet content is not version-locked and could change.  
> 位置：emforusData and crackingData URLs  
> 建议：Monitor the Google Sheets for supply chain risk. Consider validating fetched data format.

**🟡 LOW** — Privacy Collection  
> Script reads and writes to localStorage for caching and settings. No sensitive data is collected, only script-related settings and cached values.  
> 位置：localStorage.getItem/setItem for various keys  
> 建议：Ensure only non-sensitive, script-related data is stored. No privacy risk detected.

**🟡 LOW** — Permission Usage  
> Script requests GM.xmlHttpRequest permission but only uses it for fetching public Google Sheets data. No excessive or unused permissions.  
> 位置：@grant GM.xmlHttpRequest in metadata  
> 建议：No action needed. Permission usage is appropriate.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/538188-crime-profitability)*
