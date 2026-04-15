---
title: ChatGPT/Grok聊天记录导出为Markdown
---

# ChatGPT/Grok聊天记录导出为Markdown

`聊天记录导出`  `Markdown格式`  `ChatGPT`  `Grok`  `Gemini`  `Typora`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Export_ChatGPTGeminiGrok_conversations_as_Markdown.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.1**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown) <Badge type="tip" text="GreasyFork" />　　安装量：**31,705**　　评分：👍3 / 👎2

## 功能介绍

本脚本可以将 ChatGPT、Grok 和 Gemini 网站上的聊天记录导出为标准的 Markdown 格式。导出的文件可以直接用 Typora 等 Markdown 编辑器准确打开和查看。方便用户保存和管理聊天内容。

## 适用网站

- ChatGPT官网
- Grok官网
- Gemini官网

## 使用方法

1. 安装脚本后，打开 ChatGPT、Grok 或 Gemini 网站。
2. 在页面菜单或脚本菜单中找到导出聊天记录的选项。
3. 点击导出按钮，生成 Markdown 格式的聊天记录文件。
4. 使用 Typora 等 Markdown 编辑器打开导出的文件，查看完整聊天内容。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加菜单命令，方便用户操作导出功能。 |
| `GM_openInTab` | 在新标签页打开链接，方便查看导出结果。 |
| `GM.openInTab` | 在新标签页打开链接，方便查看导出结果（兼容新版API）。 |
| `GM_addStyle` | 添加自定义样式，优化导出界面显示。 |
| `GM_setValue` | 存储和读取用户设置或导出数据。 |
| `GM_getValue` | 存储和读取用户设置或导出数据。 |
| `GM_xmlhttpRequest` | 发送跨域请求，获取聊天数据或相关资源。 |

## 安全分析

**风险等级**：🟡 LOW　　**分析时间**：2026-04-15

> The script exports chat history from specified websites to Markdown format without transmitting data externally or collecting sensitive user information. It does not perform remote code execution or use sensitive APIs. However, it requests GM_xmlhttpRequest permission which is not used, constituting permission overreach. No privacy-invasive behaviors or data exfiltration detected.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**🔴 HIGH** — Permission Abuse  
> Script requests GM_xmlhttpRequest permission but does not use it in the code, indicating unnecessary high privilege grant.  
> 位置：@grant directives and script code  
> 建议：Remove unused GM_xmlhttpRequest grant to minimize permissions.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/543471-export-chatgpt-gemini-grok-conversations-as-markdown)*
