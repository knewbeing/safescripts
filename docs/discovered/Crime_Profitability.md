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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-22

> 该脚本主要通过 GM.xmlHttpRequest 拉取 Google Sheets 公共数据，并在本地 localStorage 缓存数据。未检测到用户数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用等高风险行为。整体安全性较高，风险等级为 LOW。

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
> 脚本通过 GM.xmlHttpRequest/fetch 方式访问 Google Sheets 公共 CSV 数据，未向第三方服务器上传用户数据，仅拉取公开数据。  
> 位置：emforusData / crackingData 变量与 GM.xmlHttpRequest 调用  
> 建议：确认不会将用户数据、cookie、页面内容等敏感信息通过网络请求外传。

**🔴 HIGH** — 远程代码执行  
> 脚本未检测到 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险。  
> 位置：全局  
> 建议：保持此安全实践。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到代码混淆、base64 解码、字符串数组映射或高度压缩代码。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

**🟠 MEDIUM** — 隐私采集  
> 脚本大量使用 localStorage 存储和读取自身数据（如缓存、设置），但未读取 cookie、sessionStorage、IndexedDB 或表单/剪贴板/指纹信息。  
> 位置：localStorage.getItem / setItem  
> 建议：仅存储必要的非敏感数据，避免存储敏感信息。

**🟠 MEDIUM** — 权限滥用  
> @grant 仅申请了 GM.xmlHttpRequest，未滥用高权限。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 供应链风险  
> @require 未使用，未检测到供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用可信 CDN 并锁定版本。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/538188-crime-profitability)*
