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

**风险等级**：🟡 LOW　　**安全评分**：92/100　　**分析时间**：2026-05-25

> 该脚本主要用于展示犯罪页面的每神经价值，核心功能为请求 Google Sheets 数据并在页面展示。未检测到高危数据外传、隐私采集、远程代码执行、混淆、XSS、权限滥用、敏感 API、供应链或 iframe 风险。唯一风险为通过 GM.xmlHttpRequest 请求第三方公开数据和使用 localStorage，未涉及敏感信息。整体安全性较高，评分为92。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://docs.google.com/spreadsheets/d/13wUFhhssuPdAONI_OmRJi6l_Bs7KRZXDgVFCn7uJJNQ/gviz/tq?tqx=out:csv&gid=560321570, https://docs.google.com/spreadsheets/d/13wUFhhssuPdAONI_OmRJi6l_Bs7KRZXDgVFCn7uJJNQ/gviz/tq?tqx=out:csv&gid=1626436424） |
| 隐私采集 | ❌ 检测到（localStorage） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 数据外传  
> 脚本通过 GM.xmlHttpRequest 请求 Google Sheets CSV 数据，属于第三方数据源，但未携带用户数据、cookie 或页面内容。  
> 位置：GM.xmlHttpRequest 调用 emforusData/crackingData URL  
> 建议：确保请求仅用于公开数据，不携带敏感信息。

**🟠 MEDIUM** — 隐私采集  
> 脚本读取和写入 localStorage 以缓存数据和设置。未涉及敏感信息（如 cookie、表单、剪贴板、密码等）。  
> 位置：localStorage.getItem/setItem 多处  
> 建议：避免存储敏感信息于 localStorage。

**🟡 LOW** — 远程代码执行  
> 未检测到 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险。  
> 位置：全局  
> 建议：保持代码无动态执行字符串。

**🟡 LOW** — 代码混淆  
> 未检测到代码混淆、base64 解码、字符串数组映射或高度压缩代码。  
> 位置：全局  
> 建议：保持代码可读性。

**🟡 LOW** — DOM XSS  
> 未检测到 DOM XSS 或用户输入直接插入 innerHTML/outerHTML。  
> 位置：全局  
> 建议：如需插入用户输入，需严格转义。

**🟡 LOW** — 权限滥用  
> @grant 仅申请 GM.xmlHttpRequest，权限与实际使用相符，无滥用高权限。  
> 位置：元数据  
> 建议：仅申请实际需要的权限。

**🟡 LOW** — 敏感 API 调用  
> 未检测到敏感 API 调用（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局  
> 建议：如需调用敏感 API，需征得用户同意。

**🟡 LOW** — 供应链风险  
> @require 未使用，未检测到供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking/iframe  
> 未检测到 ClickJacking 或 iframe 风险。  
> 位置：全局  
> 建议：如需操作 iframe，需明确用途并防范数据提取。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/538188-crime-profitability)*
