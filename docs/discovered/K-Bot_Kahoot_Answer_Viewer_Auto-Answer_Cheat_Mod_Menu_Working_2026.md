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

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-06-01

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链或 iframe 风险。代码结构清晰，权限最小，安全性高。

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
> 脚本通过 @grant none，未使用 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource 等网络请求 API，未发现数据外传行为。  
> 位置：全局  
> 建议：保持现状，勿添加外传代码。

**⛔ CRITICAL** — 隐私采集  
> 未发现对 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段、键盘事件的读取或监听。  
> 位置：全局  
> 建议：保持现状，勿添加隐私采集代码。

**🔴 HIGH** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML/outerHTML 插入脚本、document.write、@require 或动态 script 标签加载远程 JS。  
> 位置：全局  
> 建议：保持现状，勿添加远程代码执行相关代码。

**🔴 HIGH** — 代码混淆  
> 代码未混淆，无 base64 解码、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：全局  
> 建议：保持源码可读性，勿混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 document.write 注入或 iframe src 操作。  
> 位置：全局  
> 建议：保持现状，勿引入 XSS 风险。

**🟠 MEDIUM** — 权限滥用  
> @grant none，未申请任何权限，未发现权限滥用。  
> 位置：元数据  
> 建议：保持最小权限原则。

**🟠 MEDIUM** — 敏感 API 调用  
> 未调用 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API 等敏感接口。  
> 位置：全局  
> 建议：如无必要，勿调用敏感 API。

**🟠 MEDIUM** — 供应链风险  
> 未使用 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需依赖第三方库，建议使用官方 CDN 并锁定版本。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未发现对 frame 保护策略的修改，未创建隐藏 iframe。  
> 位置：全局  
> 建议：保持现状，勿引入 ClickJacking 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/571865-k-bot-kahoot-answer-viewer-auto-answer-cheat-mod-menu-working-2026)*
