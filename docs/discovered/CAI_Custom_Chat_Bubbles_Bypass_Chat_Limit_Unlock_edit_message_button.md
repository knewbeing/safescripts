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

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-07-27

> 该脚本未发现数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 等高风险行为。权限申请略多于实际使用，建议精简。@require 的第三方库来源可信且版本固定。整体安全风险较低，建议持续关注后续更新。

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
> 脚本申请了 GM_xmlhttpRequest 权限，并声明 @connect translate.googleapis.com，但代码中未发现实际调用 GM_xmlhttpRequest 或 fetch/XHR/WebSocket 向 translate.googleapis.com或其他第三方服务器发送用户数据、页面内容或 Cookie。  
> 位置：元数据与主代码  
> 建议：确保未来代码更新时 GM_xmlhttpRequest 仅用于可信目的，避免发送敏感数据。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_setValue、GM_getValue、GM_xmlhttpRequest、GM_addStyle 权限，实际代码仅用 GM_addStyle，未发现高权限滥用。  
> 位置：元数据与主代码  
> 建议：建议只申请实际使用的权限，减少攻击面。

**🟡 LOW** — 隐私采集  
> 脚本通过 localStorage 读取 'cai_adv_fake_verify' 和 'cai_bypass_limit' 状态，但未采集用户隐私数据、表单内容、Cookie、剪贴板等敏感信息。  
> 位置：主代码  
> 建议：保持不采集敏感隐私数据，避免后续版本引入隐私风险。

**🟡 LOW** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险 API，也未动态加载未固定版本的第三方库。  
> 位置：主代码  
> 建议：继续避免远程代码执行相关 API，@require 的 turndown 库为官方 CDN且版本固定。

**🟡 LOW** — 代码混淆  
> 脚本未发现代码混淆、base64 解码、字符串数组映射或高度压缩单行代码。  
> 位置：主代码  
> 建议：保持代码可读性，避免混淆。

**🟡 LOW** — DOM XSS / 注入  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 DOM XSS 注入风险。  
> 位置：主代码  
> 建议：继续避免不可信内容插入 DOM。

**🟡 LOW** — 供应链风险  
> @require 加载 turndown 库，来源为 unpkg 官方 CDN，版本号固定，供应链风险较低。  
> 位置：元数据  
> 建议：继续固定版本，避免加载未知来源或可变 URL。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/569906-c-ai-custom-chat-bubbles-bypass-chat-limit-unlock-edit-message-button)*
