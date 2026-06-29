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

**风险等级**：🟡 LOW　　**安全评分**：97/100　　**分析时间**：2026-06-29

> 该脚本整体安全，未发现用户数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等高危问题。仅存在对 Google Sheets 公共数据的只读访问和本地缓存，权限申请合理。安全评分 97，风险等级 LOW。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://docs.google.com/spreadsheets/d/13wUFhhssuPdAONI_OmRJi6l_Bs7KRZXDgVFCn7uJJNQ/gviz/tq） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟡 LOW** — 数据外传-只读  
> 脚本通过 fetch/GM.xmlHttpRequest 方式从 Google Sheets 公开 CSV 读取数据，但未向第三方服务器上传用户数据、页面内容或 Cookie。  
> 位置：let emforusData = `https://docs.google.com/spreadsheets/d/...`  
> 建议：确认仅为公开数据读取，未携带用户隐私信息。

**🟡 LOW** — 隐私采集-本地存储  
> 脚本大量读取和写入 localStorage，用于缓存数据和设置。未发现敏感信息（如 cookie、表单、密码）被读取。  
> 位置：localStorage.getItem / setItem 多处  
> 建议：仅存储非敏感设置和缓存数据，避免存储敏感信息。

**🟡 LOW** — 权限申请  
> 脚本申请了 GM.xmlHttpRequest 权限，但仅用于读取 Google Sheets 公共数据。  
> 位置：@grant GM.xmlHttpRequest  
> 建议：如无后续功能扩展，可考虑降权。

**🟡 LOW** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string) 等动态代码执行。  
> 位置：全局  
> 建议：保持此安全实践。

**🟡 LOW** — 代码混淆  
> 未发现代码混淆、base64 解码、字符串数组映射、unicode 混淆等。  
> 位置：全局  
> 建议：保持代码可读性。

**🟡 LOW** — DOM XSS  
> 未发现 DOM XSS 风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：全局  
> 建议：如后续涉及用户输入，需严格转义。

**🟡 LOW** — 供应链风险  
> @require 未使用，未发现供应链风险。  
> 位置：元数据  
> 建议：如后续引入第三方库，需锁定可信来源和版本。

**🟡 LOW** — 敏感 API  
> 未发现 WebSocket、EventSource、sendBeacon、Clipboard、Geolocation、RTCPeerConnection、MediaDevices、Notification 等敏感 API 调用。  
> 位置：全局  
> 建议：如后续涉及敏感 API，需最小化权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/538188-crime-profitability)*
