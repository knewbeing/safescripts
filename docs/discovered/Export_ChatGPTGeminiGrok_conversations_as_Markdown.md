---
title: "导出ChatGPT/Gemini/Grok聊天为Markdown"
---

# 导出ChatGPT/Gemini/Grok聊天为Markdown

`聊天记录导出`  `Markdown格式`  `ChatGPT`  `Gemini`  `Grok`  `知识整理`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Export_ChatGPTGeminiGrok_conversations_as_Markdown.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.1**　　发现时间：**2026-06-08**　　来源：[GreasyFork](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown) <Badge type="tip" text="GreasyFork" />　　安装量：**39,725**　　评分：👍3 / 👎2

## 功能介绍

本脚本可以将 ChatGPT、Gemini 和 Grok 网站上的聊天记录导出为标准 Markdown 格式，方便在 Typora 等 Markdown 编辑器中打开和整理。导出的内容保持原有排版，便于保存和分享对话。

## 适用网站

- ChatGPT官网
- Grok官网
- Gemini官网

## 使用方法

1. 安装脚本后，进入 ChatGPT、Gemini 或 Grok 网站。
2. 在页面或脚本菜单中找到“导出为 Markdown”按钮。
3. 点击按钮，选择保存或在新标签页打开导出的 Markdown 文件。
4. 用 Typora 或其他 Markdown 编辑器打开文件，查看和整理聊天内容。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 允许在脚本菜单中添加导出功能按钮，方便用户操作。 |
| `GM_openInTab` | 支持在新标签页中打开导出的 Markdown 文件或相关页面。 |
| `GM.openInTab` | 支持在新标签页中打开内容（新版 API）。 |
| `GM_addStyle` | 允许脚本动态添加自定义样式，优化界面显示。 |
| `GM_setValue` | 保存用户设置或导出历史，方便下次使用。 |
| `GM_getValue` | 读取用户设置或导出历史，提升使用体验。 |
| `GM_xmlhttpRequest` | 支持跨域请求，获取或发送数据时更灵活。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-06-08

> 该脚本主要功能为将 ChatGPT/Gemini/Grok 聊天记录导出为 Markdown，本地处理页面内容，无发现数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等高危行为。仅存在未使用的高权限申请（GM_xmlhttpRequest, GM_openInTab），建议根据实际用途精简权限。整体安全风险较低。

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
> 申请了 GM_xmlhttpRequest 权限，但在当前代码片段未见实际使用。若后续代码有使用需重点关注其目标地址和数据内容。  
> 位置：元数据 @grant  
> 建议：如无实际用途建议移除高权限申请，或确保仅用于本地导出/下载。

**🟠 MEDIUM** — 权限滥用  
> 申请了 GM_openInTab/GM.openInTab 权限，但在当前代码片段未见实际使用。  
> 位置：元数据 @grant  
> 建议：如无实际用途建议移除高权限申请，减少潜在滥用风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown)*
