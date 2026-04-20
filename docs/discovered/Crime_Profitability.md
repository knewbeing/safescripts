---
title: "犯罪收益显示器"
---

# 犯罪收益显示器

`游戏辅助`  `收益计算`  `Torn`  `数据增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Crime_Profitability.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.3.6**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/538188-crime-profitability) <Badge type="tip" text="GreasyFork" />　　安装量：**4,843**　　评分：👍1 / 👎0

## 功能介绍

本脚本会在 Torn 游戏的犯罪页面显示每点神经值对应的收益，帮助玩家更好地选择犯罪类型。数据会自动从在线表格获取并缓存，确保信息较为准确。适合想要优化收益的玩家使用。

## 适用网站

- Torn 游戏网站

## 使用方法

1. 安装脚本后，进入 Torn 游戏的犯罪页面。
2. 页面会自动显示每点神经值的收益信息。
3. 根据显示的数值选择最优犯罪类型。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM.xmlHttpRequest` | 允许脚本在后台访问外部数据表，获取最新犯罪收益数据。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-04-20

> 该脚本存在数据外传（请求第三方 Google Sheets 数据）和隐私采集（localStorage 读取）两项 CRITICAL 风险。未检测到远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险等高风险行为。整体安全性中等偏低，建议加强数据外传和隐私采集的透明度与限制。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://docs.google.com/spreadsheets/d/13wUFhhssuPdAONI_OmRJi6l_Bs7KRZXDgVFCn7uJJNQ/gviz/tq?tqx=out:csv&gid=560321570, https://docs.google.com/spreadsheets/d/13wUFhhssuPdAONI_OmRJi6l_Bs7KRZXDgVFCn7uJJNQ/gviz/tq?tqx=out:csv&gid=1626436424） |
| 隐私采集 | ❌ 检测到（localStorage 读取 hf-crime-profitability-data、hf-crime-profitability-cracking-data、hf-crime-profitability-last-fetched、hf-crime-profitability-bfs、hf-crime-profitability-settings、hf-crime-profitability-threshold） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM.xmlHttpRequest 请求 Google Sheets CSV 数据，属于第三方数据源。虽然未携带用户数据，但存在数据外传行为。  
> 位置：GM.xmlHttpRequest 调用 emforusData 和 crackingData  
> 建议：仅允许请求可信、公开的第三方数据源，避免携带任何用户敏感信息。建议明确说明用途并限制请求内容。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取 localStorage 多个键值用于缓存数据和设置，未涉及敏感信息，但存在隐私采集行为。  
> 位置：localStorage.getItem('hf-crime-profitability-data') 等  
> 建议：确保仅存储非敏感数据，避免采集用户隐私信息。建议在隐私政策中说明用途。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请 GM.xmlHttpRequest 权限，但仅用于获取公开 Google Sheets 数据，未滥用高权限。  
> 位置：@grant GM.xmlHttpRequest  
> 建议：建议仅申请实际需要的权限，避免权限滥用。

**🟡 LOW** — 远程代码执行  
> 未检测到 eval、new Function、setTimeout(string) 等远程代码执行风险。  
> 位置：全局代码  
> 建议：保持代码安全，避免动态执行字符串。

**🟡 LOW** — 代码混淆  
> 未检测到代码混淆、base64 解码、字符串映射等混淆特征。  
> 位置：全局代码  
> 建议：保持代码可读性，避免混淆。

**🟡 LOW** — DOM XSS / 注入  
> 未检测到 DOM XSS 或注入风险，未直接插入用户输入到 innerHTML。  
> 位置：全局代码  
> 建议：继续保持安全的 DOM 操作。

**🟡 LOW** — 敏感 API 调用  
> 未检测到敏感 API 调用（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局代码  
> 建议：避免调用敏感 API，除非确有必要。

**🟡 LOW** — 供应链风险  
> 未检测到供应链风险，未使用 @require 加载第三方库。  
> 位置：元数据  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未检测到 ClickJacking 或 iframe 风险，未修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局代码  
> 建议：继续避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/538188-crime-profitability)*
