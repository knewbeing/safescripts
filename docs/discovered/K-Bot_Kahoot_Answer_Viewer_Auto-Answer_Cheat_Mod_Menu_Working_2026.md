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

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-06-08

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链或 iframe 风险。代码结构清晰，所有功能均在本地实现，未与外部服务器通信。安全评分为 100，风险等级 SAFE。

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
> 脚本未检测到任何外部数据传输（如 GM_xmlhttpRequest、fetch、WebSocket 等），也未发现数据外传行为。  
> 位置：全局  
> 建议：保持本地执行，避免未来引入外部数据传输。

**⛔ CRITICAL** — 隐私采集  
> 未检测到对 cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段、键盘事件等隐私相关数据的读取或监听。  
> 位置：全局  
> 建议：继续避免采集用户隐私数据。

**🔴 HIGH** — 远程代码执行  
> 未检测到 eval、new Function、setTimeout(string)、setInterval(string)、动态 script 标签、@require 或 document.write 等远程代码执行风险。  
> 位置：全局  
> 建议：保持代码执行安全，避免引入动态执行。

**🔴 HIGH** — 代码混淆  
> 未检测到明显的代码混淆、base64 解码、字符串数组映射或高度压缩代码。  
> 位置：全局  
> 建议：保持代码可读性，防止混淆带来的安全隐患。

**🔴 HIGH** — DOM XSS  
> 未检测到将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 DOM XSS 风险。  
> 位置：全局  
> 建议：如需插入用户内容，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> 未申请任何 @grant 权限，实际代码也未使用 GM_* API，无权限滥用风险。  
> 位置：元数据/@grant  
> 建议：仅申请必要权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 未检测到敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）调用。  
> 位置：全局  
> 建议：避免调用敏感 API。

**🟠 MEDIUM** — 供应链风险  
> 未检测到 @require 加载第三方库，无供应链风险。  
> 位置：元数据/@require  
> 建议：如需加载第三方库，建议使用可信 CDN 并锁定版本。

**🟡 LOW** — ClickJacking/iframe 风险  
> 未检测到对 frame 保护策略的修改或隐藏 iframe 的创建。  
> 位置：全局  
> 建议：避免通过 iframe 进行数据提取。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/571865-k-bot-kahoot-answer-viewer-auto-answer-cheat-mod-menu-working-2026)*
