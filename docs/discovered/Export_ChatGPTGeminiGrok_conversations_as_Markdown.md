---
title: ChatGPT/Grok聊天导出为Markdown
---

# ChatGPT/Grok聊天导出为Markdown

`聊天记录导出`  `Markdown格式`  `ChatGPT`  `Grok`  `Typora`  `文本保存`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Export_ChatGPTGeminiGrok_conversations_as_Markdown.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.1**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown) <Badge type="tip" text="GreasyFork" />　　安装量：**31,705**　　评分：👍3 / 👎2

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
| `GM_registerMenuCommand` | 添加自定义菜单命令，方便用户操作导出功能。 |
| `GM_openInTab` | 在新标签页打开链接，便于查看导出结果或相关页面。 |
| `GM.openInTab` | 在新标签页打开链接，便于查看导出结果或相关页面。 |
| `GM_addStyle` | 添加自定义样式，优化页面显示效果。 |
| `GM_setValue` | 存储用户设置或数据，保持导出配置。 |
| `GM_getValue` | 读取用户设置或数据，恢复导出配置。 |
| `GM_xmlhttpRequest` | 发送跨域请求，获取必要数据或资源。 |

## 安全分析

**风险等级**：🟡 LOW　　**分析时间**：2026-04-15

> The script is designed to export chat histories as Markdown without transmitting data externally or collecting sensitive user information. It requests some permissions that are not fully utilized, which is a minor concern. No remote code execution or privacy-invasive behaviors are detected. Overall, the script is low risk but could improve by removing unused permissions.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — Privacy Collection  
> Script does not access document.cookie, localStorage, sessionStorage, or listen to keyboard or form input events, indicating no privacy-sensitive data collection.  
> 位置：Code analysis  
> 建议：No action needed.

**🔴 HIGH** — Permissions Misuse  
> Script requests multiple GM_* permissions including GM_xmlhttpRequest but does not use network requests in the code, indicating no data exfiltration or external communication.  
> 位置：@grant and code usage  
> 建议：Remove unused GM_xmlhttpRequest grant to reduce attack surface.

**🔴 HIGH** — Remote Code Execution  
> No use of eval(), new Function(), setTimeout(string), innerHTML with dynamic content, or dynamic script loading detected, indicating no remote code execution risk.  
> 位置：Code analysis  
> 建议：No action needed.

**🟠 MEDIUM** — Sensitive API Usage  
> No use of sensitive APIs such as geolocation, WebRTC, MediaDevices, or Clipboard API detected.  
> 位置：Code analysis  
> 建议：No action needed.

**🟠 MEDIUM** — Code Obfuscation  
> No code obfuscation or suspicious base64 decoding or string concatenation for code execution detected.  
> 位置：Code analysis  
> 建议：No action needed.

**🟡 LOW** — External Dependencies  
> @require directives are not present, so no external dependencies loaded. The @downloadURL and @updateURL point to greasyfork.org, a known script repository, which is acceptable.  
> 位置：Metadata  
> 建议：No action needed.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown)*
