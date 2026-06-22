---
title: "导出ChatGPT/Gemini/Grok聊天为Markdown"
---

# 导出ChatGPT/Gemini/Grok聊天为Markdown

`聊天导出`  `Markdown`  `ChatGPT`  `Grok`  `Gemini`  `知识整理`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Export_ChatGPTGeminiGrok_conversations_as_Markdown.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.1**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown) <Badge type="tip" text="GreasyFork" />　　安装量：**41,616**　　评分：👍3 / 👎3

## 功能介绍

本脚本可以将 ChatGPT、Grok 和 Gemini 网站上的聊天记录导出为标准 Markdown 格式，方便在 Typora 等 Markdown 编辑器中查看和整理。导出的内容排版规范，适合保存和分享。

## 适用网站

- ChatGPT官网
- Grok官网
- Gemini官网

## 使用方法

1. 安装脚本后，进入 ChatGPT、Grok 或 Gemini 网站。
2. 在页面或用户脚本菜单中找到“导出为 Markdown”按钮。
3. 点击按钮，选择导出当前聊天记录。
4. 保存导出的 Markdown 文件，可用 Typora 等编辑器打开。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 允许在用户脚本菜单中添加导出功能按钮。 |
| `GM_openInTab` | 允许在新标签页中打开导出的内容或相关页面。 |
| `GM.openInTab` | 允许在新标签页中打开内容（新版API）。 |
| `GM_addStyle` | 允许脚本添加自定义样式，优化界面显示。 |
| `GM_setValue` | 允许脚本保存用户设置或导出历史。 |
| `GM_getValue` | 允许脚本读取用户设置或导出历史。 |
| `GM_xmlhttpRequest` | 允许脚本发送网络请求，获取或上传数据。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-06-22

> 该脚本主要功能为导出 ChatGPT、Gemini、Grok 网站的聊天记录为 Markdown 格式。代码结构清晰，无混淆，无远程代码执行、XSS、隐私采集或数据外传行为。存在申请未使用的高权限（GM_xmlhttpRequest、GM_openInTab），建议精简权限以进一步提升安全性。

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
> 脚本申请了 GM_xmlhttpRequest 权限，但在提供的完整代码中未发现任何网络请求、数据外传、统计或追踪行为。  
> 位置：@grant 元数据及主代码体  
> 建议：如无实际用途，建议移除 GM_xmlhttpRequest 权限以减少权限滥用风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab/GM.openInTab 权限，但在提供的完整代码中未发现相关 API 的实际调用。  
> 位置：@grant 元数据及主代码体  
> 建议：如无实际用途，建议移除 GM_openInTab/GM.openInTab 权限以减少权限滥用风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown)*
