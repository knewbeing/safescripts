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

**风险等级**：🟡 LOW　　**安全评分**：92/100　　**分析时间**：2026-05-11

> 该脚本主要通过 GM.xmlHttpRequest 访问 Google Sheets 公开数据，并在本地 localStorage 缓存数据和设置。未发现数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链或 iframe 风险。整体安全性高，风险极低。

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
> 脚本通过 GM.xmlHttpRequest 访问 Google Sheets 公开 CSV 数据，未发现向第三方服务器上传用户数据、cookie、页面内容或用户行为。  
> 位置：GM.xmlHttpRequest 调用  
> 建议：确认不会将敏感信息拼接到请求 URL，当前实现安全。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取和写入 localStorage 以缓存数据和设置，但未发现读取 cookie、sessionStorage、IndexedDB、表单字段或监听键盘输入。  
> 位置：localStorage 相关代码  
> 建议：仅存储非敏感数据，避免存储用户隐私信息。

**🔴 HIGH** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险。  
> 位置：全局  
> 建议：保持当前实现，避免动态执行字符串代码。

**🔴 HIGH** — 代码混淆  
> 未发现代码混淆、base64 解码、字符串数组映射或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

**🔴 HIGH** — DOM XSS  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 document.write() 注入。  
> 位置：全局  
> 建议：如需插入动态内容，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> @grant 仅申请 GM.xmlHttpRequest，未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 未发现敏感 API（如 geolocation、WebRTC、剪贴板、通知等）调用。  
> 位置：全局  
> 建议：如需使用敏感 API，需征得用户同意。

**🟠 MEDIUM** — 供应链风险  
> @require 未使用，未发现供应链风险。  
> 位置：元数据 @require  
> 建议：如需引入第三方库，建议使用可信 CDN 并锁定版本。

**🟡 LOW** — iframe 风险  
> 未发现修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局  
> 建议：如需使用 iframe，需明确用途并防范 ClickJacking。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/538188-crime-profitability)*
