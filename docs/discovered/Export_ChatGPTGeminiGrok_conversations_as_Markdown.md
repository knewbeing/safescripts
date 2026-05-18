---
title: "导出ChatGPT/Gemini/Grok聊天为Markdown"
---

# 导出ChatGPT/Gemini/Grok聊天为Markdown

`聊天记录`  `导出工具`  `Markdown`  `ChatGPT`  `Grok`  `Gemini`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Export_ChatGPTGeminiGrok_conversations_as_Markdown.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.1**　　发现时间：**2026-05-18**　　来源：[GreasyFork](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown) <Badge type="tip" text="GreasyFork" />　　安装量：**36,773**　　评分：👍3 / 👎2

## 功能介绍

本脚本可将 ChatGPT、Grok 和 Google Gemini 网站上的聊天记录导出为标准 Markdown 格式，方便在 Typora 等 Markdown 编辑器中查看和整理。适合需要保存或整理对话内容的用户使用。

## 适用网站

- ChatGPT
- Grok
- Google Gemini

## 使用方法

1. 安装脚本后，进入 ChatGPT、Grok 或 Google Gemini 网站。
2. 在页面右上角或脚本菜单中找到“导出为 Markdown”按钮。
3. 点击按钮，选择要导出的聊天记录。
4. 保存生成的 Markdown 文件，即可在 Typora 等编辑器中打开。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 在脚本菜单中添加导出功能按钮，方便用户操作。 |
| `GM_openInTab` | 可在新标签页中打开导出的内容或相关页面。 |
| `GM.openInTab` | 可在新标签页中打开导出的内容或相关页面（兼容不同脚本管理器）。 |
| `GM_addStyle` | 为导出界面或按钮添加自定义样式。 |
| `GM_setValue` | 保存用户的设置或导出历史，便于下次使用。 |
| `GM_getValue` | 读取用户的设置或导出历史，实现个性化体验。 |
| `GM_xmlhttpRequest` | 实现跨域网络请求，便于导出或上传数据。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-05-18

> 该脚本主要功能为导出 ChatGPT/Gemini/Grok 网站的聊天记录为 Markdown 文件。经审查，未发现任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 或供应链风险。仅存在未使用的高权限申请（GM_xmlhttpRequest、GM_openInTab），建议移除以最小化权限。整体安全性高，风险极低。

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
> 脚本申请了 GM_xmlhttpRequest 权限，但实际代码未发现任何网络请求、数据外传或第三方服务器通信。  
> 位置：@grant 元数据与主代码  
> 建议：如无实际用途，建议移除 GM_xmlhttpRequest 权限。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab/GM.openInTab 权限，但主代码未发现相关调用。  
> 位置：@grant 元数据与主代码  
> 建议：如无实际用途，建议移除 GM_openInTab/GM.openInTab 权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown)*
