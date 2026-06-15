---
title: "K-Bot | Kahoot Answer Viewer & Auto-Answer Cheat Mod Menu (Working 2026)"
---

# K-Bot | Kahoot Answer Viewer & Auto-Answer Cheat Mod Menu (Working 2026)



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/K-Bot_Kahoot_Answer_Viewer_Auto-Answer_Cheat_Mod_Menu_Working_2026.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.1**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/571865-k-bot-kahoot-answer-viewer-auto-answer-cheat-mod-menu-working-2026) <Badge type="tip" text="GreasyFork" />　　安装量：**557**　　评分：👍0 / 👎0

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

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-06-15

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe/clickjacking 风险。代码结构清晰，权限申请合理，安全性极高。

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
> 脚本未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、navigator.sendBeacon），不存在数据外传行为。  
> 位置：全局代码  
> 建议：保持无外部数据传输，避免添加任何第三方数据上报或追踪逻辑。

**⛔ CRITICAL** — Privacy Collection  
> 脚本未检测到任何隐私采集行为（如读取 cookie、localStorage、sessionStorage、IndexedDB、监听键盘输入并外传、读取表单字段、访问指纹 API、读取剪贴板）。  
> 位置：全局代码  
> 建议：保持无隐私采集，避免后续添加任何敏感数据读取或外传逻辑。

**🔴 HIGH** — Remote Code Execution  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)，也未通过 innerHTML/outerHTML 插入外部脚本或动态加载远程 JS。  
> 位置：全局代码  
> 建议：继续避免远程代码执行相关危险用法。

**🔴 HIGH** — Code Obfuscation  
> 脚本未检测到任何代码混淆（无 base64 解码、字符串数组映射、unicode 混淆、高度压缩单行代码）。  
> 位置：全局代码  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS/Injection  
> 脚本未检测到 DOM XSS 风险（未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未使用 document.write 插入不可信内容，未操作 iframe src 为 javascript: 协议）。  
> 位置：全局代码  
> 建议：继续避免 DOM 注入风险。

**🟠 MEDIUM** — Permission Abuse  
> 脚本未申请任何 @grant 权限，未滥用高权限 API。  
> 位置：元数据  
> 建议：仅申请必要权限，避免权限滥用。

**🟠 MEDIUM** — Sensitive API Usage  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局代码  
> 建议：避免调用敏感 API，除非确有必要且需征得用户同意。

**🟠 MEDIUM** — Supply Chain Risk  
> 脚本未通过 @require 加载任何第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，建议使用官方 CDN 并固定版本哈希。

**🟡 LOW** — ClickJacking / iframe Risk  
> 脚本未检测到修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：全局代码  
> 建议：避免 iframe 滥用和 clickjacking 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/571865-k-bot-kahoot-answer-viewer-auto-answer-cheat-mod-menu-working-2026)*
