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

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-06-01

> The script does not exfiltrate user data, collect sensitive information, or execute remote code. It mainly customizes UI and bypasses certain feature limits by intercepting network requests. Permissions are slightly overprovisioned, and a third-party library is loaded from a reputable CDN without a hash. No obfuscation or XSS risks detected. Overall, the script is low risk but should improve supply chain hygiene and permission minimization.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — Permission Overprovision  
> The script requests @connect permission for translate.googleapis.com and grants GM_xmlhttpRequest, but no actual data transmission to third-party endpoints is present in the provided code. However, the permission could be used for network requests.  
> 位置：Metadata block (@grant, @connect)  
> 建议：Restrict @connect and @grant permissions to only those strictly necessary. Review any future code changes for actual data transmission.

**🟠 MEDIUM** — Supply Chain Risk  
> The script uses @require to load turndown.js from unpkg.com, a reputable CDN, but does not pin a specific file hash.  
> 位置：@require https://unpkg.com/turndown@7.1.3/lib/turndown.browser.umd.js  
> 建议：Pin the dependency to a specific version and hash if possible to prevent supply chain attacks.

**🟡 LOW** — Network Interception  
> The script overrides window.fetch and XMLHttpRequest.prototype.open to block requests to 'neo.character.ai/feature_limits', but does not exfiltrate user data or send it to third-party servers.  
> 位置：window.fetch, XMLHttpRequest.prototype.open  
> 建议：Ensure that no user data is sent to untrusted endpoints in future updates.

**🟡 LOW** — Local Storage Usage  
> The script uses localStorage to store feature toggles (e.g., 'cai_adv_fake_verify', 'cai_bypass_limit'), but does not collect or transmit sensitive user data.  
> 位置：localStorage usage  
> 建议：Do not store sensitive information in localStorage. Current usage is safe.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/569906-c-ai-custom-chat-bubbles-bypass-chat-limit-unlock-edit-message-button)*
