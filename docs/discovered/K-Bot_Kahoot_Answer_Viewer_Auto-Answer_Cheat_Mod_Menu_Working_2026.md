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

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-13

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链或 iframe 风险。实现逻辑主要为 UI 构建和本地状态管理，未涉及与外部服务器通信或敏感数据操作。整体安全性极高，适合普通用户使用。

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
> 脚本未检测到任何网络请求（如 fetch、XMLHttpRequest、WebSocket、GM_xmlhttpRequest 等），不存在数据外传风险。  
> 位置：全局  
> 建议：保持当前实现，避免未来引入外传逻辑。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到任何隐私采集行为（如读取 cookie、localStorage、sessionStorage、IndexedDB、监听键盘输入、读取表单字段、访问指纹 API、读取剪贴板等）。  
> 位置：全局  
> 建议：保持当前实现，避免未来引入隐私采集逻辑。

**🔴 HIGH** — 远程代码执行  
> 脚本未检测到 eval、new Function、setTimeout(string)、setInterval(string)、动态 script 标签、@require 远程 JS、document.write 等远程代码执行风险。  
> 位置：全局  
> 建议：保持当前实现，避免引入动态代码执行。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到代码混淆（无 base64 解码、字符串数组映射、unicode 混淆、高度压缩单行代码等）。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 风险（未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未使用 document.write 注入内容，未操作 iframe src 为 javascript: 协议）。  
> 位置：全局  
> 建议：如需插入动态内容，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> 脚本未申请任何 @grant 权限，未检测到权限滥用。  
> 位置：元数据  
> 建议：仅申请必要权限，避免未来滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification 等）。  
> 位置：全局  
> 建议：如需调用敏感 API，需征得用户同意。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用可信 CDN 并锁定版本。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局  
> 建议：如需操作 iframe，需确保安全合规。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/571865-k-bot-kahoot-answer-viewer-auto-answer-cheat-mod-menu-working-2026)*
