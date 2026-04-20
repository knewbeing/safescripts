---
title: "导出ChatGPT/Gemini/Grok聊天为Markdown"
---

# 导出ChatGPT/Gemini/Grok聊天为Markdown

`聊天记录`  `Markdown导出`  `ChatGPT`  `Grok`  `Gemini`  `效率工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Export_ChatGPTGeminiGrok_conversations_as_Markdown.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.1**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown) <Badge type="tip" text="GreasyFork" />　　安装量：**32,574**　　评分：👍3 / 👎2

## 功能介绍

本脚本可将 ChatGPT、Grok 和 Gemini 网站上的聊天记录导出为标准 Markdown 文件，方便在 Typora 等编辑器中准确查看和编辑。支持一键导出，格式兼容性好，适合保存和整理对话内容。

## 适用网站

- ChatGPT
- Grok
- Gemini

## 使用方法

1. 安装脚本后，进入 ChatGPT、Grok 或 Gemini 网站。
2. 在页面或用户脚本菜单中找到“导出为Markdown”按钮。
3. 点击按钮，选择保存位置，即可导出当前聊天记录为 Markdown 文件。
4. 用 Typora 或其他 Markdown 编辑器打开导出的文件查看内容。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 在用户脚本菜单中添加导出功能按钮，方便操作。 |
| `GM_openInTab` | 可在新标签页打开导出的内容或相关页面。 |
| `GM.openInTab` | 可在新标签页打开导出的内容或相关页面（新版API）。 |
| `GM_addStyle` | 为页面添加自定义样式，优化导出按钮或界面显示。 |
| `GM_setValue` | 保存用户的设置或导出历史，便于下次使用。 |
| `GM_getValue` | 读取用户的设置或导出历史，提升使用体验。 |
| `GM_xmlhttpRequest` | 实现网络请求功能，如下载或上传导出文件。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-04-20

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险或 iframe 风险。仅存在未使用的高权限申请（GM_xmlhttpRequest、GM_openInTab），建议移除以降低潜在风险。整体安全性较高，适合公开使用。

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
> 脚本申请了 GM_xmlhttpRequest 权限，但代码未使用该 API进行任何网络请求，未发现数据外传行为。  
> 位置：元数据 @grant 和主代码  
> 建议：如无实际需求，建议移除 GM_xmlhttpRequest 权限。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab 和 GM.openInTab 权限，但代码未使用该 API进行任何操作。  
> 位置：元数据 @grant 和主代码  
> 建议：如无实际需求，建议移除 GM_openInTab 和 GM.openInTab 权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown)*
