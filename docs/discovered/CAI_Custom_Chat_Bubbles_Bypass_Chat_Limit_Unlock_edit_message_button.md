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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-05-11

> No critical or high-risk issues detected. The script does not transmit user data externally, collect sensitive information, or execute remote code. It requests some permissions (GM_xmlhttpRequest, @connect) that are not fully utilized in the visible code, which is a minor risk. No obfuscation or DOM XSS patterns found. Supply chain risk is low due to version-pinned dependency. Overall, the script is considered low risk.

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
> The script requests @connect permission for translate.googleapis.com, but no code in the provided snippet sends user/page data to this endpoint. GM_xmlhttpRequest is granted but not used in the visible code.  
> 位置：Metadata block and permissions  
> 建议：Ensure GM_xmlhttpRequest is only used for necessary, transparent features. Avoid sending sensitive user data to third-party APIs.

**🟠 MEDIUM** — Permission Overprovision  
> The script requests GM_xmlhttpRequest permission but does not use it in the provided code. Unused high-privilege permissions increase attack surface.  
> 位置：Metadata block  
> 建议：Remove unused GM_xmlhttpRequest permission if not required.

**🟡 LOW** — Network Interception  
> The script overrides window.fetch and XMLHttpRequest.prototype.open to block requests to 'neo.character.ai/feature_limits'. This is a local bypass and does not transmit data externally.  
> 位置：Bypass Chat Limit feature  
> 建议：Ensure such overrides do not inadvertently leak data or break site functionality.

**🟡 LOW** — Supply Chain  
> The script uses @require to load turndown from unpkg.com, a reputable CDN, and pins the version to 7.1.3.  
> 位置：Metadata block  
> 建议：Continue to pin versions for all external dependencies to reduce supply chain risk.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/569906-c-ai-custom-chat-bubbles-bypass-chat-limit-unlock-edit-message-button)*
