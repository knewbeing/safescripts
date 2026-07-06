---
title: "导出ChatGPT/Gemini/Grok聊天为Markdown"
---

# 导出ChatGPT/Gemini/Grok聊天为Markdown

`聊天记录导出`  `Markdown格式`  `ChatGPT`  `Grok`  `Gemini`  `知识整理`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Export_ChatGPTGeminiGrok_conversations_as_Markdown.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.1**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown) <Badge type="tip" text="GreasyFork" />　　安装量：**43,487**　　评分：👍3 / 👎3

## 功能介绍

本脚本可将 ChatGPT、Grok 和 Gemini 网站上的聊天记录导出为标准 Markdown 格式，方便在 Typora 等 Markdown 编辑器中查看和整理。导出的内容排版规范，适合保存和分享。

## 适用网站

- ChatGPT官网
- Grok官网
- Gemini官网

## 使用方法

1. 安装脚本后，进入 ChatGPT、Grok 或 Gemini 网站。
2. 在页面或脚本菜单中找到“导出为 Markdown”按钮。
3. 点击按钮，选择导出当前聊天记录。
4. 导出的 Markdown 文件可在 Typora等编辑器中打开。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加自定义菜单命令，方便用户操作导出功能。 |
| `GM_openInTab` | 在新标签页打开链接或文件，便于查看或下载导出的内容。 |
| `GM.openInTab` | 在新标签页打开链接或文件（新版API），便于查看或下载导出的内容。 |
| `GM_addStyle` | 为页面添加自定义样式，让导出按钮或界面更美观。 |
| `GM_setValue` | 保存用户设置或导出历史，方便下次使用。 |
| `GM_getValue` | 读取用户设置或导出历史，方便恢复上次状态。 |
| `GM_xmlhttpRequest` | 发送网络请求，可能用于获取聊天数据或上传导出内容。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-07-06

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险或 iframe 风险。唯一风险为申请了未实际使用的高权限（GM_xmlhttpRequest、GM_openInTab），建议移除冗余权限。整体安全性较高，适合公开使用。

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
> 脚本申请了 GM_xmlhttpRequest 权限，但完整代码未包含任何网络请求相关代码（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket 等），未检测到数据外传行为。  
> 位置：元数据与代码  
> 建议：如后续添加网络请求功能，需严格限制目标域名并避免传输用户敏感数据。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab 和 GM.openInTab 权限，但代码未实际使用，存在权限冗余。  
> 位置：元数据  
> 建议：移除未使用的高权限申请，减少潜在滥用风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown)*
