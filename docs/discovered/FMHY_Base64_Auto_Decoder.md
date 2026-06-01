---
title: "FMHY Base64自动解码器"
---

# FMHY Base64自动解码器

`链接解码`  `自动化`  `文本分享`  `便捷访问`  `Pastebin工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/FMHY_Base64_Auto_Decoder.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.5**　　发现时间：**2026-06-01**　　来源：[GreasyFork](https://greasyfork.org/scripts/485772-fmhy-base64-auto-decoder) <Badge type="tip" text="GreasyFork" />　　安装量：**33,100**　　评分：👍9 / 👎2

## 功能介绍

本脚本会自动识别并解码网页中的Base64编码链接，并将其转换为可点击的URL，方便用户直接访问。适用于多个常见的文本分享网站，无需手动解码。

## 适用网站

- Rentry
- FMHY Pastebin
- Disroot Bin
- PrivateBin
- TextBin
- Idrix Bin
- Pastebin

## 使用方法

1. 安装脚本后，访问支持的网站（如Pastebin、Rentry等）。
2. 页面中的Base64编码链接会自动被解码并变成可点击的URL。
3. 点击链接即可直接访问目标网站，无需手动复制或解码。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，仅在网页上运行。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：85/100　　**分析时间**：2026-06-01

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、权限滥用、敏感 API 调用或供应链风险。唯一的安全关注点是使用 innerHTML 插入解码内容，理论上存在 DOM XSS 风险，若 base64 源被恶意利用。整体风险较低，建议对插入内容进行 HTML 转义或严格校验。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🔴 HIGH** — Potential DOM XSS  
> The script uses innerHTML to insert decoded and linkified content, but only for content that is already present in the page and after decoding base64. The decoded content is not user input, but there is a theoretical risk if the decoded base64 contains malicious HTML/JS.  
> 位置：Multiple locations: element.innerHTML assignment in Pastebin, Rentry, Privatebin handlers  
> 建议：Sanitize decoded content before inserting with innerHTML to prevent possible XSS if the base64 source is compromised.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/485772-fmhy-base64-auto-decoder)*
