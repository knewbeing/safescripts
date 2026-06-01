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

**风险等级**：🟡 LOW　　**安全评分**：64/100　　**分析时间**：2026-06-01

> 该脚本主要功能为从 Google Sheets 公共表格拉取犯罪收益数据并在页面展示。未发现向第三方服务器上传用户数据、cookie、页面内容或行为。未监听键盘、表单、剪贴板等敏感输入。未发现 eval、动态脚本注入、远程代码执行、代码混淆、DOM XSS 等高危行为。主要风险为外部数据拉取和 localStorage 使用，未发现隐私外传。整体风险较低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://docs.google.com/spreadsheets/d/13wUFhhssuPdAONI_OmRJi6l_Bs7KRZXDgVFCn7uJJNQ/gviz/tq?tqx=out:csv&gid=560321570, https://docs.google.com/spreadsheets/d/13wUFhhssuPdAONI_OmRJi6l_Bs7KRZXDgVFCn7uJJNQ/gviz/tq?tqx=out:csv&gid=1626436424） |
| 隐私采集 | ❌ 检测到（读取 localStorage 进行数据缓存和设置存储） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 fetch/GM.xmlHttpRequest 方式从 Google Sheets 公共 CSV 读取数据，但未向第三方服务器上传用户数据、cookie 或页面内容。  
> 位置：全局（emforusData, crackingData 变量及相关请求）  
> 建议：确认不会将用户数据拼接到 URL 或请求体中。

**⛔ CRITICAL** — 隐私采集  
> 脚本大量读取 localStorage 项用于缓存数据和设置。  
> 位置：localStorage 相关代码  
> 建议：确认 localStorage 仅用于本地缓存，不与外部服务器交互。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM.xmlHttpRequest 权限，但仅用于拉取 Google Sheets 公共数据。  
> 位置：@grant 元数据  
> 建议：如未来无跨域需求，可考虑移除高权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/538188-crime-profitability)*
