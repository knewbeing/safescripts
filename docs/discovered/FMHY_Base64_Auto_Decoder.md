---
title: "FMHY Base64自动解码器"
---

# FMHY Base64自动解码器

`链接解码`  `自动识别`  `Pastebin工具`  `便捷访问`  `文本处理`  `资源分享`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/FMHY_Base64_Auto_Decoder.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.5**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/485772-fmhy-base64-auto-decoder) <Badge type="tip" text="GreasyFork" />　　安装量：**37,128**　　评分：👍10 / 👎2

## 功能介绍

本脚本能自动识别并解码网页中的Base64编码链接，将其转换为可点击的URL，方便用户直接访问隐藏的资源。主要适用于各类Pastebin文本分享网站。

## 适用网站

- Rentry（rentry.co、rentry.org）
- FMHY Pastebin（pastes.fmhy.net）
- Disroot Pastebin（bin.disroot.org）
- PrivateBin（privatebin.net、privatebin.rinuploads.org）
- TextBin（textbin.xyz）
- Idrix Pastebin（bin.idrix.fr）
- Pastebin（pastebin.com）

## 使用方法

1. 1. 安装脚本后，访问上述支持的网站。
2. 2. 页面中Base64编码的链接会自动被解码并变为可点击。
3. 3. 点击链接即可直接访问对应资源。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本无需特殊权限，仅在网页上运行。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：97/100　　**分析时间**：2026-07-13

> 该脚本仅在特定 Pastebin 类网站上自动解码 Base64 链接并将其转为可点击链接。未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、供应链风险或权限滥用。唯一的轻微风险为通过 innerHTML 插入内容，但已做基本校验，整体风险极低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟡 LOW** — Potential DOM manipulation risk  
> The script uses innerHTML to insert decoded and linkified content into the DOM. However, the decoded content is strictly from base64-decoded strings that are validated to be URLs, minimizing XSS risk. There is no direct insertion of user-controlled input.  
> 位置：Multiple locations (e.g., element.innerHTML assignment in Pastebin, Rentry, PrivateBin branches)  
> 建议：Continue to ensure only trusted, validated content is inserted via innerHTML. Consider using textContent and DOM methods where possible.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/485772-fmhy-base64-auto-decoder)*
