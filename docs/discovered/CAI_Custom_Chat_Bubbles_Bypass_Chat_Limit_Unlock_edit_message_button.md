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

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-06-29

> 该脚本主要用于美化 character.ai 聊天界面和绕过聊天限制。未发现数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。存在权限过度申请（GM_xmlhttpRequest 未实际使用）、供应链风险（@require 未锁定哈希），建议收紧权限和固定依赖版本。整体风险较低，安全性良好。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — Potential data transmission risk  
> The script requests @connect permission for translate.googleapis.com and grants GM_xmlhttpRequest, but no actual data transmission to third-party servers is present in the provided code. If future code uses GM_xmlhttpRequest to send user data to this or other domains, it could pose a risk.  
> 位置：Metadata block and permissions  
> 建议：Ensure that any network requests do not transmit sensitive user data. Limit @connect and GM_xmlhttpRequest usage to only necessary and trusted endpoints.

**🟠 MEDIUM** — Permission overgrant  
> The script requests GM_xmlhttpRequest permission, but the provided code does not use it. This is a higher privilege than required for the current code.  
> 位置：Metadata block  
> 建议：Remove unused GM_xmlhttpRequest permission to reduce attack surface.

**🟠 MEDIUM** — Supply chain risk  
> The script uses @require to load turndown from unpkg.com, a widely used CDN, but does not pin to a specific file hash. This exposes the script to supply chain risks if the CDN is compromised or the file is updated.  
> 位置：@require https://unpkg.com/turndown@7.1.3/lib/turndown.browser.umd.js  
> 建议：Pin to a specific file hash or use a trusted, immutable CDN to prevent supply chain attacks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/569906-c-ai-custom-chat-bubbles-bypass-chat-limit-unlock-edit-message-button)*
