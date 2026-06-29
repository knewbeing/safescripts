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

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-06-29

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 滥用、供应链或 iframe 风险。代码结构清晰，权限最小，安全性高。建议保持当前安全实践，勿引入外部依赖或敏感操作。

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
> 脚本功能为 Kahoot 答案查看与自动答题，但未发现任何网络请求（如 fetch、GM_xmlhttpRequest、WebSocket 等）向第三方服务器发送数据。  
> 位置：全局  
> 建议：保持无外传，勿添加任何数据传输代码。

**⛔ CRITICAL** — 隐私采集  
> 未发现对 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段、键盘事件等敏感数据的读取或监听。  
> 位置：全局  
> 建议：保持不采集隐私数据。

**🔴 HIGH** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string)、动态 script 标签、@require 或 document.write 执行远程代码。  
> 位置：全局  
> 建议：避免引入远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 代码未混淆，无 base64/unicode/字符串数组混淆特征，结构清晰。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

**🔴 HIGH** — DOM XSS/注入  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未见 document.write 注入，未见 iframe src 操作。  
> 位置：全局  
> 建议：如需插入用户内容，务必转义。

**🟠 MEDIUM** — 权限滥用  
> @grant none，未申请任何权限，符合最小权限原则。  
> 位置：元数据  
> 建议：仅申请必要权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 未调用 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification 等敏感 API。  
> 位置：全局  
> 建议：如需调用敏感 API，需征得用户同意。

**🟠 MEDIUM** — 供应链风险  
> 未使用 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用官方 CDN 并锁定版本。

**🟡 LOW** — ClickJacking/iframe 风险  
> 未见对 frame 保护策略的修改，未创建隐藏 iframe。  
> 位置：全局  
> 建议：避免通过 iframe 进行数据提取或 clickjacking。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/571865-k-bot-kahoot-answer-viewer-auto-answer-cheat-mod-menu-working-2026)*
