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

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-05-18

> 该脚本主要功能为从 Google Sheets 公共表格拉取犯罪收益数据并在页面展示，未发现数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 等高危行为。仅存在通过 GM.xmlHttpRequest 拉取外部公开数据和 localStorage 读写，整体风险较低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://docs.google.com/spreadsheets/d/13wUFhhssuPdAONI_OmRJi6l_Bs7KRZXDgVFCn7uJJNQ/gviz/tq） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 数据外传  
> 脚本通过 GM.xmlHttpRequest/fetch 方式访问 Google Sheets 公共 CSV 数据，未发现向第三方服务器上传用户数据、页面内容或 Cookie。  
> 位置：全局（emforusData, crackingData 变量及相关请求）  
> 建议：确认不会将敏感信息拼接到请求 URL，且目标为可信公开数据源。

**🟠 MEDIUM** — 隐私采集  
> 脚本多次读取 localStorage 以缓存数据和设置。未发现读取 cookie、sessionStorage、IndexedDB、表单、剪贴板、键盘输入等敏感信息。  
> 位置：localStorage 相关代码  
> 建议：仅存储非敏感配置信息，避免存储敏感数据。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM.xmlHttpRequest 权限，仅用于拉取 Google Sheets 公共数据，未发现权限滥用。  
> 位置：@grant 元数据  
> 建议：如无其他用途，可考虑降级为 fetch。

**🟡 LOW** — 供应链风险  
> @require 未使用，第三方依赖仅为 Google Sheets 公共 CSV，供应链风险较低。  
> 位置：元数据  
> 建议：如后续引入第三方库，建议锁定版本和来源。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/538188-crime-profitability)*
