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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-08

> 该脚本主要用于美化 character.ai 聊天界面和绕过聊天限制。未发现数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。权限申请略有冗余（GM_xmlhttpRequest/@connect），但未被实际利用。@require 的第三方库来源可信且已锁定版本。整体风险较低，安全性良好。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — Permission Overgrant  
> The script requests GM_xmlhttpRequest and @connect permission for translate.googleapis.com, but no actual GM_xmlhttpRequest usage is present in the provided code. This may be over-privileged.  
> 位置：Metadata block  
> 建议：Remove unused GM_xmlhttpRequest grant and @connect if not used.

**🟡 LOW** — Network Interception  
> The script overrides window.fetch and XMLHttpRequest.prototype.open to block requests to 'neo.character.ai/feature_limits'. This is a form of request interception but does not transmit data to third parties.  
> 位置：Main script body  
> 建议：Ensure no sensitive data is leaked in custom fetch/XHR handlers.

**🟡 LOW** — LocalStorage Usage  
> The script uses localStorage to store feature toggles (e.g., 'cai_adv_fake_verify', 'cai_bypass_limit').  
> 位置：Main script body  
> 建议：No sensitive user data is stored; usage is acceptable.

**🟡 LOW** — DOM Manipulation  
> The script uses GM_addStyle to inject CSS and manipulates the DOM to add UI elements. No evidence of DOM XSS or injection of untrusted content.  
> 位置：initCustomizeButton function  
> 建议：Continue to avoid inserting untrusted user input into innerHTML.

**🟡 LOW** — Supply Chain  
> The script uses @require to load turndown from unpkg.com, a reputable CDN, and pins the version to 7.1.3.  
> 位置：Metadata block  
> 建议：Continue to pin versions for supply chain safety.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/569906-c-ai-custom-chat-bubbles-bypass-chat-limit-unlock-edit-message-button)*
