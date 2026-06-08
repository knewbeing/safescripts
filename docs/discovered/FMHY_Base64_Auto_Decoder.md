---
title: "FMHY Base64自动解码器"
---

# FMHY Base64自动解码器

`链接解码`  `自动化`  `Pastebin工具`  `便捷访问`  `文本处理`  `信息提取`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/FMHY_Base64_Auto_Decoder.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.5**　　发现时间：**2026-06-08**　　来源：[GreasyFork](https://greasyfork.org/scripts/485772-fmhy-base64-auto-decoder) <Badge type="tip" text="GreasyFork" />　　安装量：**33,874**　　评分：👍10 / 👎2

## 功能介绍

本脚本会自动识别并解码网页中的Base64编码链接，将其转换为可点击的URL，方便用户直接访问。主要用于各种Pastebin和文本分享网站，提升查找和使用隐藏链接的效率。无需手动解码或复制粘贴。

## 适用网站

- Rentry（rentry.co、rentry.org）
- FMHY Pastebin（pastes.fmhy.net）
- Disroot Pastebin（bin.disroot.org）
- PrivateBin（privatebin.net、privatebin.rinuploads.org）
- TextBin（textbin.xyz）
- Idrix Pastebin（bin.idrix.fr）
- Pastebin.com

## 使用方法

1. 安装脚本后，访问上述支持的网站。
2. 页面中的Base64编码链接会自动被解码并变成可点击的URL。
3. 点击链接即可直接访问目标网站，无需手动操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本无需额外权限，仅操作网页内容。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：85/100　　**分析时间**：2026-06-08

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆、权限滥用、敏感 API 滥用或供应链风险。主要安全隐患为在插入解码内容时使用 innerHTML，存在一定 DOM XSS 风险。建议对解码内容进行严格转义或使用安全的 DOM API 插入，避免 XSS 攻击。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ❌ 存在风险 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🔴 HIGH** — DOM XSS Risk  
> The script uses innerHTML to insert decoded and linkified content based on page text, which may include untrusted input. If the decoded base64 content is attacker-controlled, this could lead to DOM XSS.  
> 位置：Multiple locations, e.g., element.innerHTML = htmlWithLinks; and prettyPrintElement.innerHTML = decryptedText;  
> 建议：Sanitize all decoded content before inserting with innerHTML. Use DOM methods to create elements instead of string concatenation.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/485772-fmhy-base64-auto-decoder)*
