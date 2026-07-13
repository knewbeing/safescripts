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

**风险等级**：🟡 LOW　　**安全评分**：69/100　　**分析时间**：2026-07-13

> 该脚本主要通过 GM.xmlHttpRequest 访问 Google Sheets 公共数据，并在本地 localStorage 缓存数据。未发现向作者服务器或未知第三方域名发送用户数据、cookie、页面内容等敏感信息。未监听键盘、未读取表单/密码/剪贴板、未使用 eval/new Function/动态脚本注入、无代码混淆、无 DOM XSS 风险。权限申请合理，供应链风险低。整体安全风险较低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://docs.google.com/spreadsheets/d/13wUFhhssuPdAONI_OmRJi6l_Bs7KRZXDgVFCn7uJJNQ/gviz/tq） |
| 隐私采集 | ❌ 检测到（localStorage 读取/写入） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM.xmlHttpRequest 访问 Google Sheets 公共 CSV 数据，未向作者服务器或未知第三方域名发送数据。请求未携带用户数据、cookie 或页面内容。  
> 位置：emforusData / crackingData 变量、GM.xmlHttpRequest 调用  
> 建议：确认请求目标为可信的公开数据源，避免未来更改为恶意目标。

**⛔ CRITICAL** — 隐私采集  
> 脚本多次读取 localStorage 以缓存数据和设置。未发现读取 cookie、sessionStorage、IndexedDB、表单字段、剪贴板或监听键盘输入。  
> 位置：localStorage.getItem 调用  
> 建议：仅存储必要的非敏感数据，避免存储敏感信息。

**🟠 MEDIUM** — 权限滥用  
> @grant 申请了 GM.xmlHttpRequest，但未发现其他高权限 API 申请。未发现权限滥用。  
> 位置：@grant 元数据  
> 建议：如无 GM.xmlHttpRequest 需求可移除该权限。

**🟠 MEDIUM** — 供应链风险  
> @require 未使用，未发现动态加载远程 JS。  
> 位置：元数据  
> 建议：无风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/538188-crime-profitability)*
