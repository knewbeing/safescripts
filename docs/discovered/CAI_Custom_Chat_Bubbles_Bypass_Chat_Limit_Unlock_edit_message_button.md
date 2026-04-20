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

**风险等级**：🟡 LOW　　**安全评分**：97/100　　**分析时间**：2026-04-20

> 该脚本主要用于美化 character.ai 聊天界面及绕过聊天限制。未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用等高风险行为。@require 加载的第三方库为官方 CDN 且版本固定，供应链风险较低。部分权限申请未被实际使用，建议最小化权限。整体安全风险较低，安全评分为 97。

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
> 脚本申请了 GM_xmlhttpRequest 和 @connect translate.googleapis.com，但代码中未发现实际数据外传到第三方，仅用于后续可能的翻译功能。当前版本未检测到用户数据、页面内容或 Cookie 外传。  
> 位置：元数据与主代码  
> 建议：持续监控后续版本，确保 GM_xmlhttpRequest 仅用于可信目的。

**⛔ CRITICAL** — 隐私采集  
> 脚本未监听键盘输入、未读取表单字段、未访问指纹 API、未读取剪贴板内容。仅使用 localStorage 读取自定义配置项，不涉及敏感隐私采集。  
> 位置：主代码  
> 建议：确保后续版本不添加隐私采集与外传逻辑。

**🔴 HIGH** — 远程代码执行  
> 未检测到 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险。@require 加载的 turndown 库为官方 CDN，版本固定。  
> 位置：主代码与元数据  
> 建议：如需加载第三方库，务必固定版本并使用可信源。

**🔴 HIGH** — 代码混淆  
> 代码未混淆，无 base64 解码、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：主代码  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 未检测到 DOM XSS 风险。用户输入未直接插入 innerHTML/outerHTML，未操作 iframe src 为 javascript: 协议。  
> 位置：主代码  
> 建议：如需插入用户内容，务必转义。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest，但当前代码未使用。申请了 GM_setValue/GM_getValue/GM_addStyle，均为合理用途。未申请高权限如 GM_openInTab/GM_download。  
> 位置：元数据  
> 建议：移除未使用的高权限申请，最小化权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 未调用敏感 API（地理位置、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：主代码  
> 建议：如需调用敏感 API，需征得用户同意。

**🟠 MEDIUM** — 供应链风险  
> @require 加载 turndown 库，来源为 unpkg 官方 CDN，版本号固定（7.1.3），供应链风险较低。  
> 位置：元数据  
> 建议：如需加载第三方库，务必固定版本并使用官方源。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未检测到修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：主代码  
> 建议：如需操作 iframe，需明确用途并防范 clickjacking。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/569906-c-ai-custom-chat-bubbles-bypass-chat-limit-unlock-edit-message-button)*
