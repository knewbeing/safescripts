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

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-04-27

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。代码结构清晰，未申请任何高权限，安全性极高。适合公开使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、sendBeacon），不存在数据外传行为。  
> 位置：全局  
> 建议：保持现有状态，避免添加任何外部数据传输逻辑。

**⛔ CRITICAL** — 隐私采集  
> 脚本未访问 document.cookie、localStorage、sessionStorage、IndexedDB，也未监听键盘输入或读取表单字段，未涉及隐私采集。  
> 位置：全局  
> 建议：保持现有状态，避免添加任何隐私采集逻辑。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)，也未通过 innerHTML/outerHTML/动态 script 标签插入或执行外部 JS。  
> 位置：全局  
> 建议：保持现有状态，避免动态执行代码。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到任何代码混淆（无 base64 解码、字符串数组映射、unicode 混淆、高度压缩单行代码）。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未检测到 DOM XSS 风险。  
> 位置：全局  
> 建议：如需插入用户输入，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> 脚本未申请任何 GM_* 权限（@grant none），不存在权限滥用风险。  
> 位置：元数据  
> 建议：仅申请必要权限，避免高权限滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局  
> 建议：如需调用敏感 API，需征得用户同意。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载任何第三方库，供应链风险为零。  
> 位置：元数据  
> 建议：如需加载第三方库，建议使用官方 CDN 并固定版本。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：如需操作 iframe，需明确用途并防范 clickjacking。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/566293-accurate-korone-2017-userscript)*
