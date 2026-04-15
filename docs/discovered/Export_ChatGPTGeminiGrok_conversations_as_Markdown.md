---
title: ChatGPT/Grok聊天记录导出Markdown
---

# ChatGPT/Grok聊天记录导出Markdown

`聊天导出`  `Markdown`  `ChatGPT`  `Grok`  `Gemini`  `Typora`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Export_ChatGPTGeminiGrok_conversations_as_Markdown.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.1**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown) <Badge type="tip" text="GreasyFork" />　　安装量：**31,699**　　评分：👍3 / 👎2

## 功能介绍

本脚本可以将 ChatGPT、Grok 和 Gemini 网站上的聊天记录导出为标准的 Markdown 格式。导出的文件可以在 Typora 等 Markdown 编辑器中准确打开和查看。方便用户保存和管理聊天内容。

## 适用网站

- ChatGPT官网
- Grok官网
- Gemini官网

## 使用方法

1. 安装脚本后，打开 ChatGPT、Grok 或 Gemini 网站。
2. 在页面菜单或脚本菜单中选择导出聊天记录为 Markdown。
3. 保存导出的 Markdown 文件到本地。
4. 使用 Typora 等 Markdown 编辑器打开查看聊天内容。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加菜单命令，方便用户操作导出功能。 |
| `GM_openInTab` | 在新标签页打开链接或文件。 |
| `GM.openInTab` | 在新标签页打开链接或文件（新版API）。 |
| `GM_addStyle` | 添加自定义样式美化界面。 |
| `GM_setValue` | 存储和读取用户设置或数据。 |
| `GM_getValue` | 读取存储的用户设置或数据。 |
| `GM_xmlhttpRequest` | 发送跨域请求，获取或上传数据。 |

## 安全分析

**风险等级**：🟡 LOW　　**分析时间**：2026-04-15

> The script is designed to export chat histories as Markdown without transmitting data externally or collecting private user data. It requests several GM_* permissions, some of which are unused (e.g., GM_xmlhttpRequest), representing a minor permissions misuse risk. No remote code execution or sensitive API usage is detected. Overall, the script is low risk but could improve by removing unused permissions.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — Privacy Collection  
> Script does not read document.cookie, localStorage, sessionStorage, nor listens to keyboard or form input events, indicating no privacy data collection.  
> 位置：Script code  
> 建议：No action needed as no privacy-sensitive data collection detected.

**🔴 HIGH** — Permissions Misuse  
> Script declares @grant GM_xmlhttpRequest but does not use it or any other network request APIs to send data externally.  
> 位置：@grant and script code  
> 建议：Remove unused @grant permissions or ensure no unintended data transmission occurs.

**🔴 HIGH** — Remote Code Execution  
> No use of eval(), new Function(), setTimeout(string), innerHTML with remote content, or dynamic script loading detected, indicating no remote code execution risk.  
> 位置：Script code  
> 建议：Maintain current safe coding practices avoiding dynamic code execution.

**🟠 MEDIUM** — Sensitive API Usage  
> No sensitive APIs such as navigator.geolocation, RTCPeerConnection, MediaDevices, Clipboard API are used.  
> 位置：Script code  
> 建议：No action needed.

**🟠 MEDIUM** — Code Obfuscation  
> No signs of code obfuscation, base64 decoding, or suspicious string concatenation for execution found.  
> 位置：Script code  
> 建议：No action needed.

**🟡 LOW** — External Dependencies  
> @require directives are not present, so no external dependencies to verify for trustworthiness or version pinning.  
> 位置：@require directives  
> 建议：No action needed.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown)*
