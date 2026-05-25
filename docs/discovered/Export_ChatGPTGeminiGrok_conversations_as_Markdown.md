---
title: "导出ChatGPT/Gemini/Grok聊天为Markdown"
---

# 导出ChatGPT/Gemini/Grok聊天为Markdown

`聊天记录导出`  `Markdown格式`  `ChatGPT`  `Gemini`  `Grok`  `知识整理`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Export_ChatGPTGeminiGrok_conversations_as_Markdown.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.1**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown) <Badge type="tip" text="GreasyFork" />　　安装量：**37,743**　　评分：👍3 / 👎2

## 功能介绍

本脚本可以将 ChatGPT、Gemini 和 Grok 网站上的聊天记录导出为标准 Markdown 格式，方便在 Typora 等 Markdown 编辑器中打开和保存。导出的内容排版规范，适合长期保存和整理。

## 适用网站

- ChatGPT官网
- Grok官网
- Gemini官网

## 使用方法

1. 安装脚本后，进入 ChatGPT、Gemini 或 Grok 网站。
2. 在页面右上角或菜单中找到“导出为 Markdown”按钮。
3. 点击按钮，选择导出当前聊天记录。
4. 保存或在 Typora 等 Markdown 编辑器中打开导出的文件。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在用户菜单中添加导出功能按钮。 |
| `GM_openInTab` | 允许脚本在新标签页中打开导出的文件或页面。 |
| `GM.openInTab` | 允许脚本在新标签页中打开导出的文件或页面（新版API）。 |
| `GM_addStyle` | 用于动态添加自定义样式，优化导出界面。 |
| `GM_setValue` | 用于保存用户设置或导出历史。 |
| `GM_getValue` | 用于读取用户设置或导出历史。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，可能用于获取聊天数据或上传文件。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-05-25

> 该脚本仅在本地导出聊天记录为 Markdown，没有任何数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。唯一风险为申请了未使用的高权限（GM_xmlhttpRequest、GM_openInTab），建议移除以提升安全性。整体安全性较高，适合公开使用。

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
> 脚本申请了 GM_xmlhttpRequest 权限，但代码未使用该 API进行任何网络请求，也未向第三方服务器发送数据。  
> 位置：元数据 @grant GM_xmlhttpRequest  
> 建议：如无实际用途，建议移除 GM_xmlhttpRequest 权限以减少攻击面。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab 和 GM.openInTab 权限，但代码未使用该 API进行任何操作。  
> 位置：元数据 @grant GM_openInTab, GM.openInTab  
> 建议：如无实际用途，建议移除 GM_openInTab 和 GM.openInTab 权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown)*
