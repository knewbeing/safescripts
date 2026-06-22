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

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-06-22

> 该脚本主要用于界面美化和功能解锁，未检测到数据外传、隐私采集、远程代码执行或混淆行为。权限申请略高于实际需求，存在轻微供应链风险。整体风险较低，建议定期复查依赖和权限。

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
> @grant 了 GM_xmlhttpRequest 权限，但脚本本身未直接使用，仅用于后续可能的功能扩展。  
> 位置：元数据区  
> 建议：如无实际用途，建议移除高权限申请。

**🟠 MEDIUM** — 权限滥用  
> @connect 了 translate.googleapis.com，但脚本本身未直接调用 GM_xmlhttpRequest 访问该域名。  
> 位置：元数据区  
> 建议：如无实际用途，建议移除 @connect 权限。

**🟡 LOW** — 数据外传  
> 脚本重写 fetch 和 XMLHttpRequest 以拦截特定 API，但未向第三方服务器发送数据。  
> 位置：全局作用域  
> 建议：确保未来不添加外传逻辑。

**🟡 LOW** — 供应链风险  
> @require 加载了 turndown@7.1.3，来源为 unpkg.com，版本已锁定。  
> 位置：元数据区  
> 建议：建议使用官方 CDN 并定期检查依赖安全性。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/569906-c-ai-custom-chat-bubbles-bypass-chat-limit-unlock-edit-message-button)*
