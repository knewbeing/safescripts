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

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-05-25

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。主要风险为权限冗余和依赖库供应链风险，整体安全性较高。建议移除未使用的高权限申请，并持续关注依赖库安全。

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
> 脚本申请了 GM_xmlhttpRequest 权限并声明 @connect translate.googleapis.com，但代码中未发现实际 GM_xmlhttpRequest 调用，也未发现 fetch/XMLHttpRequest/WebSocket 向第三方服务器发送用户数据或页面内容。  
> 位置：元数据与主代码  
> 建议：确保 GM_xmlhttpRequest 仅用于可信目的，避免未来代码变更导致数据外传。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @require 加载 turndown 库，来源为 unpkg.com 官方 CDN，版本号已固定（7.1.3），供应链风险较低。  
> 位置：元数据  
> 建议：建议定期检查依赖库安全性，确保 CDN 未被污染。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_setValue 和 GM_getValue 权限，但主代码未发现实际使用，存在权限冗余。  
> 位置：元数据  
> 建议：建议移除未使用的高权限申请，减少攻击面。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/569906-c-ai-custom-chat-bubbles-bypass-chat-limit-unlock-edit-message-button)*
