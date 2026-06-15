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

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-06-15

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。主要风险为权限申请与供应链依赖，均为中低风险。功能绕过行为仅影响本地页面，无敏感数据泄露。整体安全性较高，建议移除未使用的高权限申请并定期检查依赖库安全。

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
> 申请了 GM_xmlhttpRequest 权限，但实际代码未使用该 API进行外部数据传输。仅 @connect translate.googleapis.com，但未见实际调用。  
> 位置：metadata (@grant, @connect)  
> 建议：移除未使用的高权限申请，或确保 GM_xmlhttpRequest 仅用于可信目的。

**🟠 MEDIUM** — 供应链风险  
> 通过 @require 加载 turndown 库，来源为 unpkg.com（官方 CDN），版本号已固定（7.1.3），供应链风险较低。  
> 位置：metadata (@require)  
> 建议：建议定期检查依赖库安全，确保 CDN 未被污染。

**🟡 LOW** — 功能绕过  
> 脚本会修改页面的 __NEXT_DATA__ JSON内容，模拟 age_data，绕过年龄验证和功能限制。此行为属于功能绕过，但未涉及敏感数据外传。  
> 位置：代码（fakeVerifyEnabled/bypassUI）  
> 建议：仅在用户知情情况下启用此类功能绕过，避免违反目标网站政策。

**🟡 LOW** — 功能绕过  
> 脚本会拦截 fetch 和 XMLHttpRequest，阻止对 neo.character.ai/feature_limits 的请求，实现 chat limit bypass。未见数据外传，仅本地拦截。  
> 位置：代码（window.fetch, XMLHttpRequest.prototype.open）  
> 建议：确保拦截逻辑不会影响其他正常功能或引发兼容性问题。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/569906-c-ai-custom-chat-bubbles-bypass-chat-limit-unlock-edit-message-button)*
