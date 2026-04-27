---
title: "C.AI Custom Chat Bubbles + Bypass Chat Limit (Unlock edit message button)"
---

# C.AI Custom Chat Bubbles + Bypass Chat Limit (Unlock edit message button)



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/CAI_Custom_Chat_Bubbles_Bypass_Chat_Limit_Unlock_edit_message_button.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.3.2-stable**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/569906-c-ai-custom-chat-bubbles-bypass-chat-limit-unlock-edit-message-button) <Badge type="tip" text="GreasyFork" />　　安装量：**3,857**　　评分：👍4 / 👎0

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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-04-27

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用等高风险行为。唯一中等风险为申请了未实际使用的 GM_xmlhttpRequest 权限，以及依赖第三方库（已固定版本）。整体安全性较高，建议移除未用权限并定期检查依赖库安全。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> 申请了 GM_xmlhttpRequest 权限，但实际代码未使用该 API进行外部数据传输。代码中 fetch 和 XMLHttpRequest 仅用于拦截和本地修改，未向第三方服务器发送用户数据。  
> 位置：元数据与主代码  
> 建议：如无实际用途，建议移除 GM_xmlhttpRequest 权限。

**🟠 MEDIUM** — 供应链风险  
> @require 加载 turndown 库，来源为 unpkg.com 官方 CDN，版本号已固定（7.1.3），供应链风险较低。  
> 位置：元数据  
> 建议：建议定期检查依赖库安全性。

**🟡 LOW** — 隐私采集  
> 脚本通过 localStorage 读取自定义配置项（如 cai_adv_fake_verify、cai_bypass_limit），但未采集敏感隐私数据。未监听键盘输入、未读取表单字段、未访问剪贴板。  
> 位置：主代码  
> 建议：保持对隐私数据的严格限制。

**🟡 LOW** — 远程代码执行  
> 未检测到 eval、new Function、字符串 setTimeout/setInterval、innerHTML 执行脚本等远程代码执行风险。  
> 位置：主代码  
> 建议：继续避免动态代码执行。

**🟡 LOW** — 代码混淆  
> 未检测到代码混淆、base64 解码、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：主代码  
> 建议：保持代码可读性。

**🟡 LOW** — DOM XSS / 注入  
> 未检测到 DOM XSS 风险。未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未操作 iframe src 为 javascript: 协议。  
> 位置：主代码  
> 建议：继续避免 DOM 注入风险。

**🟡 LOW** — 数据外传  
> 未检测到 WebSocket、EventSource、navigator.sendBeacon 等网络通信方式。  
> 位置：主代码  
> 建议：如需使用，需严格审查数据内容与目的地。

**🟡 LOW** — 敏感 API 调用  
> 未检测到敏感 API 调用（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：主代码  
> 建议：继续避免敏感 API 滥用。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未检测到 ClickJacking 或 iframe 风险。未修改 frame 保护策略，未创建隐藏 iframe。  
> 位置：主代码  
> 建议：继续避免 iframe 滥用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/569906-c-ai-custom-chat-bubbles-bypass-chat-limit-unlock-edit-message-button)*
