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

**风险等级**：🟡 LOW　　**安全评分**：100/100　　**分析时间**：2026-07-06

> 该脚本主要用于界面美化和功能解锁，未检测到数据外传、隐私采集、远程代码执行、混淆、DOM XSS、敏感 API 调用等高风险行为。唯一的供应链风险为固定版本的 turndown 库，风险较低。整体安全性高，建议持续关注后续版本权限与数据流变更。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本申请了 GM_xmlhttpRequest 权限，并声明 @connect translate.googleapis.com，但代码中未实际调用 GM_xmlhttpRequest 或 fetch/XHR/WebSocket 向第三方服务器发送用户数据。当前版本未检测到数据外传行为。  
> 位置：元数据与主代码  
> 建议：持续关注后续版本，确保 GM_xmlhttpRequest 仅用于安全用途，避免用户数据外传。

**⛔ CRITICAL** — 隐私采集  
> 脚本未监听键盘输入、未读取 cookie/localStorage/表单/剪贴板等敏感数据，仅使用 localStorage 存储自身配置，未检测到隐私采集行为。  
> 位置：主代码  
> 建议：保持现有设计，避免后续添加敏感数据采集逻辑。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval/new Function/setTimeout(string)/setInterval(string)，也未通过 innerHTML/outerHTML/document.write 插入外部脚本，未检测到远程代码执行风险。  
> 位置：主代码  
> 建议：保持现有安全实践，避免动态执行外部代码。

**🔴 HIGH** — 代码混淆  
> 脚本未使用混淆技术，无 base64/unicode/字符串数组混淆，代码结构清晰。  
> 位置：主代码  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，也未操作 iframe src，未检测到 DOM XSS 风险。  
> 位置：主代码  
> 建议：继续避免不可信内容注入。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但主代码未实际使用。申请的权限与实际用途基本匹配，无明显权限滥用。  
> 位置：元数据  
> 建议：如无实际用途，可移除未用权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：主代码  
> 建议：避免后续添加敏感 API 调用。

**🟠 MEDIUM** — 供应链风险  
> @require 加载 turndown 库，来源为 unpkg.com 官方 CDN，版本号固定（7.1.3），供应链风险较低。  
> 位置：元数据  
> 建议：如需第三方库，始终固定版本并使用可信 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：主代码  
> 建议：继续避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/569906-c-ai-custom-chat-bubbles-bypass-chat-limit-unlock-edit-message-button)*
