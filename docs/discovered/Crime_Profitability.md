---
title: "犯罪收益显示器"
---

# 犯罪收益显示器

`游戏辅助`  `Torn`  `数据展示`  `效率提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Crime_Profitability.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.3.7**　　发现时间：**2026-05-18**　　来源：[GreasyFork](https://greasyfork.org/scripts/538188-crime-profitability) <Badge type="tip" text="GreasyFork" />　　安装量：**6,057**　　评分：👍1 / 👎2

## 功能介绍

本脚本会在 Torn 游戏的犯罪页面显示每点神经值（nerve）对应的收益，帮助玩家更高效地选择犯罪任务。数据来源于 Google 表格，自动更新并缓存。

## 适用网站

- Torn 城市游戏

## 使用方法

1. 安装脚本后，进入 Torn 的犯罪页面。
2. 在犯罪选项列表中即可看到每点神经值的收益提示。
3. 无需额外设置，数据会自动加载和更新。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM.xmlHttpRequest` | 用于从外部 Google 表格获取犯罪收益数据。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-07-27

> 该脚本主要通过 GM.xmlHttpRequest 请求 Google Sheets 数据，并在本地缓存。未发现用户数据外传、远程代码执行、混淆、DOM XSS、敏感 API 调用、供应链风险等高危行为。唯一较高风险为第三方数据请求，但未携带敏感信息。整体安全风险较低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://docs.google.com/spreadsheets/d/13wUFhhssuPdAONI_OmRJi6l_Bs7KRZXDgVFCn7uJJNQ/gviz/tq?tqx=out:csv&gid=560321570, https://docs.google.com/spreadsheets/d/13wUFhhssuPdAONI_OmRJi6l_Bs7KRZXDgVFCn7uJJNQ/gviz/tq?tqx=out:csv&gid=1626436424） |
| 隐私采集 | ❌ 检测到（localStorage 读写） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM.xmlHttpRequest 请求 Google Sheets CSV 数据，属于第三方数据源，但未携带用户数据、cookie 或页面内容。  
> 位置：emforusData, crackingData URLs; GM.xmlHttpRequest usage  
> 建议：确认请求内容仅为公开数据，不包含敏感信息。

**🟠 MEDIUM** — 隐私采集  
> 脚本读取和写入 localStorage 以缓存数据和设置，但未采集敏感信息。  
> 位置：localStorage.getItem/setItem 多处  
> 建议：确保 localStorage 仅用于缓存非敏感数据。

**🟡 LOW** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等动态代码执行。  
> 位置：全局代码检查  
> 建议：保持无远程代码执行风险。

**🟡 LOW** — 代码混淆  
> 脚本未混淆，代码结构清晰，无 base64/unicode/字符串数组混淆特征。  
> 位置：全局代码检查  
> 建议：保持代码可读性。

**🟡 LOW** — DOM XSS  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 DOM XSS 风险。  
> 位置：DOM 操作部分  
> 建议：继续避免直接插入不可信内容。

**🟡 LOW** — 权限滥用  
> 脚本申请 GM.xmlHttpRequest 权限并实际使用，无权限滥用。  
> 位置：@grant 元数据与实际代码  
> 建议：仅申请必要权限。

**🟡 LOW** — 敏感 API 调用  
> 未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局代码检查  
> 建议：继续避免敏感 API 滥用。

**🟡 LOW** — 供应链风险  
> @require 未使用，第三方库未引入，无供应链风险。  
> 位置：元数据与代码  
> 建议：如需引入第三方库，建议固定版本哈希。

**🟡 LOW** — ClickJacking/iframe  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe。  
> 位置：全局代码检查  
> 建议：继续避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/538188-crime-profitability)*
