---
title: "导出ChatGPT/Gemini/Grok聊天为Markdown"
---

# 导出ChatGPT/Gemini/Grok聊天为Markdown

`聊天记录导出`  `Markdown格式`  `ChatGPT`  `Grok`  `Gemini`  `内容整理`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Export_ChatGPTGeminiGrok_conversations_as_Markdown.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.1**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown) <Badge type="tip" text="GreasyFork" />　　安装量：**42,550**　　评分：👍3 / 👎3

## 功能介绍

本脚本可以将 ChatGPT、Grok 和 Gemini 网站上的聊天记录导出为标准 Markdown 格式，方便在 Typora 等 Markdown 编辑器中查看和整理。

## 适用网站

- ChatGPT官网
- Grok官网
- Gemini官网

## 使用方法

1. 安装脚本后，进入 ChatGPT、Grok 或 Gemini 网站。
2. 在页面或用户脚本菜单中找到“导出为 Markdown”按钮。
3. 点击按钮，选择保存或在新标签页查看导出的 Markdown 文件。
4. 可用 Typora 或其他 Markdown 编辑器打开导出的文件。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 允许在用户脚本菜单中添加导出功能按钮。 |
| `GM_openInTab` | 允许在新标签页中打开导出的内容。 |
| `GM.openInTab` | 允许在新标签页中打开导出的内容（新版API）。 |
| `GM_addStyle` | 允许脚本自定义页面样式。 |
| `GM_setValue` | 允许脚本保存用户设置或数据。 |
| `GM_getValue` | 允许脚本读取用户设置或数据。 |
| `GM_xmlhttpRequest` | 允许脚本发送网络请求，获取或导出内容。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-06-29

> 该脚本主要功能为导出 ChatGPT/Gemini/Grok 聊天记录为 Markdown，本地处理页面内容，无数据外传、隐私采集、远程代码执行、混淆、XSS、供应链等高危风险。仅存在申请了未实际使用的高权限（GM_xmlhttpRequest、GM_openInTab），建议精简权限。整体安全性高。

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
> 脚本申请了 GM_xmlhttpRequest 权限，但代码中未发现任何外部网络请求、数据上报、统计或追踪行为。  
> 位置：@grant 元数据与主代码  
> 建议：如无实际用途，建议移除 GM_xmlhttpRequest 权限。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab 和 GM.openInTab 权限，但主代码未发现相关 API 的实际调用。  
> 位置：@grant 元数据与主代码  
> 建议：如无实际用途，建议移除 GM_openInTab 和 GM.openInTab 权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown)*
