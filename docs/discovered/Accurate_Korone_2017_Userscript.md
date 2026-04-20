---
title: "Accurate Korone 2017 Userscript"
---

# Accurate Korone 2017 Userscript



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Accurate_Korone_2017_Userscript.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.6**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/566293-accurate-korone-2017-userscript) <Badge type="tip" text="GreasyFork" />　　安装量：**100**　　评分：👍0 / 👎0

## 功能介绍



## 适用网站

- 通用

## 使用方法

- 请参阅脚本说明

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-04-20

> 该用户脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。代码结构清晰，未申请任何高权限，未加载第三方库，整体安全性极高。建议继续保持现有安全设计。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> 脚本未检测到任何网络请求（GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、sendBeacon），不存在数据外传风险。  
> 位置：全局  
> 建议：保持现有设计，避免添加任何外部数据传输逻辑。

**⛔ CRITICAL** — Privacy Collection  
> 脚本未访问 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板，也未监听键盘输入或读取表单字段，未采集任何隐私数据。  
> 位置：全局  
> 建议：继续避免隐私数据采集，确保用户隐私安全。

**🔴 HIGH** — Remote Code Execution  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML/outerHTML 插入外部脚本，也未通过 @require 或动态 script 标签加载远程 JS。  
> 位置：全局  
> 建议：避免动态执行代码和远程脚本加载，确保代码执行安全。

**🔴 HIGH** — Code Obfuscation  
> 脚本未检测到任何代码混淆（无 base64 解码执行、字符串数组映射、unicode 混淆、高度压缩单行代码）。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS/Injection  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未使用 document.write() 插入不可信内容，也未操作 iframe src 为 javascript: 协议。  
> 位置：全局  
> 建议：继续避免 DOM 注入和 XSS 风险。

**🟠 MEDIUM** — Permission Abuse  
> 脚本未申请任何 GM_* 权限（@grant none），不存在权限滥用风险。  
> 位置：元数据  
> 建议：仅申请必要权限，避免权限滥用。

**🟠 MEDIUM** — Sensitive API Usage  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局  
> 建议：继续避免敏感 API 调用，防止隐私泄露。

**🟠 MEDIUM** — Supply Chain Risk  
> 脚本未通过 @require 加载任何第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，建议使用官方 CDN 并固定版本哈希。

**🟡 LOW** — ClickJacking / iframe Risk  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：继续避免 iframe 风险和 ClickJacking。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/566293-accurate-korone-2017-userscript)*
