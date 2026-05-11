---
title: "导出ChatGPT/Gemini/Grok聊天为Markdown"
---

# 导出ChatGPT/Gemini/Grok聊天为Markdown

`导出`  `Markdown`  `聊天记录`  `AI助手`  `ChatGPT`  `Grok`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Export_ChatGPTGeminiGrok_conversations_as_Markdown.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.1**　　发现时间：**2026-05-11**　　来源：[GreasyFork](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown) <Badge type="tip" text="GreasyFork" />　　安装量：**35,745**　　评分：👍3 / 👎2

## 功能介绍

本脚本可将 ChatGPT、Grok 和 Gemini 网站上的聊天记录导出为标准 Markdown 格式，方便在 Typora 等编辑器中查看和整理。支持一键导出，格式兼容性好。适合需要保存和整理 AI 聊天内容的用户。

## 适用网站

- ChatGPT
- Grok
- Gemini

## 使用方法

1. 1. 安装脚本后，进入 ChatGPT、Grok 或 Gemini 网站。
2. 2. 在页面或脚本菜单中找到“导出为 Markdown”按钮。
3. 3. 点击按钮，选择保存位置，即可将当前聊天记录导出为 Markdown 文件。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在脚本菜单中添加导出功能按钮，方便用户操作。 |
| `GM_openInTab` | 允许脚本在新标签页中打开导出的内容或相关页面。 |
| `GM.openInTab` | 允许脚本在新标签页中打开内容（另一种写法，兼容不同环境）。 |
| `GM_addStyle` | 允许脚本自定义页面样式，优化导出按钮或界面显示。 |
| `GM_setValue` | 用于本地保存用户设置或导出记录。 |
| `GM_getValue` | 用于读取本地保存的设置或记录。 |
| `GM_xmlhttpRequest` | 允许脚本进行网络请求，便于导出或上传聊天内容。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-05-11

> 该脚本主要功能为导出 ChatGPT、Gemini、Grok 网站的聊天记录为 Markdown 文件。经审查，未发现任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等高危行为。仅存在申请了未实际使用的高权限（GM_xmlhttpRequest、GM_openInTab），建议移除以进一步提升安全性。整体风险极低，安全性良好。

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
> 脚本申请了 GM_xmlhttpRequest 权限，但在已提供的完整代码中未发现任何外部网络请求、数据上报、统计或追踪行为。  
> 位置：@grant 元数据与主代码  
> 建议：如无实际用途，建议移除 GM_xmlhttpRequest 权限以减少权限滥用风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab/GM.openInTab 权限，但在已提供的完整代码中未发现实际使用。  
> 位置：@grant 元数据与主代码  
> 建议：如无实际用途，建议移除 GM_openInTab/GM.openInTab 权限以减少权限滥用风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown)*
