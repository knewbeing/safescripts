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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-07-13

> 该脚本主要用于美化 character.ai 聊天界面和绕过聊天限制。未发现数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。仅存在权限申请过多（如 GM_xmlhttpRequest 未实际使用），以及网络拦截逻辑。整体风险较低，建议移除未使用的高权限。@require 的第三方库（turndown）来源可信且版本固定，无供应链风险。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — Permission Overprovision  
> The script requests @connect permission for translate.googleapis.com and grants GM_xmlhttpRequest, but no code in the provided snippet actually sends data to third-party servers or uses GM_xmlhttpRequest for exfiltration.  
> 位置：Metadata and code  
> 建议：Ensure any future use of GM_xmlhttpRequest does not send sensitive user data to third-party servers.

**🟠 MEDIUM** — Permission Overprovision  
> The script requests GM_xmlhttpRequest permission but does not use it in the provided code.  
> 位置：Metadata  
> 建议：Remove unused permissions to reduce attack surface.

**🟡 LOW** — Network Interception  
> The script overrides fetch and XMLHttpRequest to block requests to 'neo.character.ai/feature_limits', but does not transmit user data externally.  
> 位置：fetch/XHR override  
> 建议：Monitor for any future code changes that might add data exfiltration.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/569906-c-ai-custom-chat-bubbles-bypass-chat-limit-unlock-edit-message-button)*
