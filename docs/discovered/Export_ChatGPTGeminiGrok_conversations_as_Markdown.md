---
title: "导出ChatGPT/Gemini/Grok聊天为Markdown"
---

# 导出ChatGPT/Gemini/Grok聊天为Markdown

`聊天记录导出`  `Markdown格式`  `AI助手`  `信息整理`  `Typora兼容`  `效率工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Export_ChatGPTGeminiGrok_conversations_as_Markdown.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.1**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown) <Badge type="tip" text="GreasyFork" />　　安装量：**40,677**　　评分：👍3 / 👎2

## 功能介绍

本脚本可将 ChatGPT、Grok 和 Gemini 网站上的聊天记录导出为标准 Markdown 格式，方便在 Typora 等 Markdown 编辑器中查看和整理。导出的内容排版规范，适合保存和分享。

## 适用网站

- ChatGPT官网
- Grok官网
- Gemini官网

## 使用方法

1. 安装脚本后，进入 ChatGPT、Grok 或 Gemini 网站。
2. 在页面右上角或菜单中找到“导出为Markdown”按钮。
3. 点击按钮，选择导出当前聊天记录。
4. 保存导出的 Markdown 文件，可用 Typora 或其他编辑器打开。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 在用户脚本菜单中添加导出功能按钮。 |
| `GM_openInTab` | 在新标签页打开导出的内容或相关页面。 |
| `GM.openInTab` | 在新标签页打开导出的内容或相关页面（新版API）。 |
| `GM_addStyle` | 为页面添加自定义样式，优化导出按钮显示。 |
| `GM_setValue` | 保存用户设置或导出历史。 |
| `GM_getValue` | 读取用户设置或导出历史。 |
| `GM_xmlhttpRequest` | 进行网络请求，可能用于下载或上传导出内容。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-15

> 该脚本仅在本地导出聊天记录为 Markdown，没有任何数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。唯一的安全问题是申请了未使用的高权限（GM_xmlhttpRequest、GM_openInTab），建议移除以进一步提升安全性。整体风险极低，适合公开使用。

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
> 建议：如果未来不需要网络请求，可移除该权限以降低攻击面。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab 和 GM.openInTab 权限，但代码未使用该 API进行任何操作。  
> 位置：元数据 @grant GM_openInTab, GM.openInTab  
> 建议：如无实际用途，建议移除以避免权限滥用风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown)*
