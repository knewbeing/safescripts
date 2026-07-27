---
title: "Torn City荣誉追踪器"
---

# Torn City荣誉追踪器

`游戏辅助`  `荣誉追踪`  `成就管理`  `Torn City`  `攻略提示`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Torn_City_-_Merit_Tracker.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.6**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/579300-torn-city-merit-tracker) <Badge type="tip" text="GreasyFork" />　　安装量：**1,350**　　评分：👍1 / 👎0

## 功能介绍

本脚本帮助玩家追踪和获取游戏中的荣誉徽章，优先显示最容易获得的未完成徽章，并提供获取方法和分类浏览功能。适合想快速提升荣誉的玩家使用。

## 适用网站

- Torn City

## 使用方法

1. 安装脚本后，进入 Torn City 网站。
2. 在页面上会显示未获得的荣誉徽章及获取方法。
3. 根据提示操作，优先完成容易的荣誉。
4. 可按类别浏览不同荣誉和攻略。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本在后台请求外部数据，获取最新荣誉信息和攻略。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：97/100　　**分析时间**：2026-07-27

> 脚本仅使用 GM_xmlhttpRequest 与 greasyfork.org 通信用于更新检查，无用户数据外传、隐私采集、远程代码执行、混淆、DOM XSS、敏感 API 调用或供应链风险。整体安全性高，风险极低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：greasyfork.org） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 使用 GM_xmlhttpRequest 访问 greasyfork.org，可能获取脚本更新信息。未发现携带用户数据或敏感信息。  
> 位置：GM_xmlhttpRequest 调用（元数据 @grant, @connect）  
> 建议：确保仅用于脚本更新检查，不携带用户数据。

**⛔ CRITICAL** — 隐私采集  
> 未发现隐私采集行为，如读取 cookie、localStorage、sessionStorage、IndexedDB、剪贴板或监听键盘输入。  
> 位置：全局代码  
> 建议：保持现有状态，勿添加隐私采集。

**🔴 HIGH** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string) 或动态 script 标签加载远程 JS。  
> 位置：全局代码  
> 建议：保持现有状态，勿添加远程代码执行相关用法。

**🔴 HIGH** — 代码混淆  
> 未发现代码混淆、base64 解码、字符串数组映射或高度压缩代码。  
> 位置：全局代码  
> 建议：保持代码可读性，勿混淆。

**🔴 HIGH** — DOM XSS  
> 未发现 DOM XSS 风险，未直接插入用户输入或 URL 参数到 innerHTML/outerHTML。  
> 位置：全局代码  
> 建议：如需插入动态内容，务必转义。

**🟠 MEDIUM** — 权限滥用  
> 申请了 GM_xmlhttpRequest 权限，实际代码中有使用，未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 供应链风险  
> @require 未使用，未发现供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议固定版本哈希并使用官方 CDN。

**🟠 MEDIUM** — 敏感 API 调用  
> 未发现敏感 API 调用，如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API。  
> 位置：全局代码  
> 建议：保持现有状态。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未发现修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局代码  
> 建议：如需使用 iframe，避免用于数据提取。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/579300-torn-city-merit-tracker)*
