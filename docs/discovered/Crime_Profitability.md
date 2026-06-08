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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-08

> 该脚本主要通过 GM.xmlHttpRequest 拉取 Google Sheets 公共数据，并在本地缓存，未发现向第三方服务器上传用户数据、cookie 或页面内容，也未监听键盘/表单输入。未发现远程代码执行、代码混淆、DOM XSS、iframe 风险等高危行为。主要风险为数据拉取目标为第三方（Google Sheets），以及 localStorage 的使用。整体安全风险较低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://docs.google.com/spreadsheets/d/13wUFhhssuPdAONI_OmRJi6l_Bs7KRZXDgVFCn7uJJNQ/gviz/tq?tqx=out:csv&gid=560321570, https://docs.google.com/spreadsheets/d/13wUFhhssuPdAONI_OmRJi6l_Bs7KRZXDgVFCn7uJJNQ/gviz/tq?tqx=out:csv&gid=1626436424） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM.xmlHttpRequest 或 fetch 方式从 Google Sheets 公共 CSV 链接拉取数据，但未发现向第三方服务器主动上传用户数据、cookie 或页面内容。  
> 位置：全局  
> 建议：确保仅拉取可信的公开数据，不要向第三方服务器发送敏感信息。

**🟠 MEDIUM** — 隐私采集  
> 脚本大量读取和写入 localStorage，用于缓存数据和设置，但未发现读取 cookie、sessionStorage、IndexedDB 或监听键盘/表单输入。  
> 位置：全局  
> 建议：localStorage 用于缓存无敏感信息时风险较低，注意不要存储敏感数据。

**🟠 MEDIUM** — 权限滥用  
> @grant 申请了 GM.xmlHttpRequest，但未发现其他高权限 API 滥用。  
> 位置：元数据  
> 建议：如无必要可考虑降权。

**🟡 LOW** — 供应链风险  
> 通过 @require 未加载任何第三方库，所有依赖均为 Google Sheets 公共数据。  
> 位置：元数据  
> 建议：如需加载第三方库，建议使用官方 CDN 并锁定版本。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/538188-crime-profitability)*
