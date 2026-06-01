---
title: "导出ChatGPT/Gemini/Grok聊天为Markdown"
---

# 导出ChatGPT/Gemini/Grok聊天为Markdown

`聊天记录导出`  `Markdown格式`  `ChatGPT`  `Gemini`  `Grok`  `知识整理`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Export_ChatGPTGeminiGrok_conversations_as_Markdown.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.1**　　发现时间：**2026-06-01**　　来源：[GreasyFork](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown) <Badge type="tip" text="GreasyFork" />　　安装量：**38,763**　　评分：👍3 / 👎2

## 功能介绍

本脚本可以将 ChatGPT、Gemini 和 Grok 网站上的聊天记录导出为标准 Markdown 文件，方便在 Typora 等 Markdown 编辑器中查看和整理。导出的内容格式规范，适合保存和分享。

## 适用网站

- ChatGPT官网
- Grok官网
- Gemini官网

## 使用方法

1. 安装脚本后，进入 ChatGPT、Gemini 或 Grok 网站。
2. 在页面或用户脚本菜单中找到“导出为 Markdown”按钮。
3. 点击按钮，选择保存位置，即可导出当前聊天记录。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 允许在用户脚本菜单中添加导出功能按钮。 |
| `GM_openInTab` | 允许在新标签页中打开导出的文件或相关页面。 |
| `GM.openInTab` | 允许在新标签页中打开导出的文件或相关页面（新版API）。 |
| `GM_addStyle` | 允许脚本动态添加自定义样式，优化界面显示。 |
| `GM_setValue` | 允许脚本保存用户设置或导出历史。 |
| `GM_getValue` | 允许脚本读取用户设置或导出历史。 |
| `GM_xmlhttpRequest` | 允许脚本进行网络请求，如下载或上传文件。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-06-01

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等高危行为。仅存在申请了未使用的高权限（GM_xmlhttpRequest, GM_openInTab），建议去除以进一步降低风险。整体安全性较高，适合日常使用。

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
> 申请了 GM_xmlhttpRequest 权限，但实际代码未发现任何外部网络请求或数据外传行为。  
> 位置：元数据 @grant  
> 建议：如无实际用途，建议移除 GM_xmlhttpRequest 权限以降低权限滥用风险。

**🟠 MEDIUM** — 权限滥用  
> 申请了 GM_openInTab / GM.openInTab 权限，但实际代码未发现相关 API 使用。  
> 位置：元数据 @grant  
> 建议：如无实际用途，建议移除 GM_openInTab / GM.openInTab 权限以降低权限滥用风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown)*
