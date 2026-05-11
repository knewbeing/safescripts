---
title: "FMHY Base64自动解码器"
---

# FMHY Base64自动解码器

`链接解码`  `自动化`  `Pastebin工具`  `便捷访问`  `信息提取`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/FMHY_Base64_Auto_Decoder.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.5**　　发现时间：**2026-05-11**　　来源：[GreasyFork](https://greasyfork.org/scripts/485772-fmhy-base64-auto-decoder) <Badge type="tip" text="GreasyFork" />　　安装量：**31,020**　　评分：👍7 / 👎2

## 功能介绍

本脚本会自动识别并解码网页中以Base64编码的链接，并将其转换为可直接点击的链接，方便用户访问隐藏的真实网址。适用于多个常见的文本分享和Pastebin类网站。无需手动复制粘贴或解码。

## 适用网站

- Rentry（rentry.co、rentry.org）
- FMHY Pastebin（pastes.fmhy.net）
- Disroot Pastebin（bin.disroot.org）
- PrivateBin（privatebin.net、privatebin.rinuploads.org）
- Textbin（textbin.xyz）
- Idrix Pastebin（bin.idrix.fr）
- Pastebin（pastebin.com）

## 使用方法

1. 1. 安装脚本后，访问支持的网站（如Pastebin、Rentry等）。
2. 2. 页面中被Base64编码的链接会自动被解码并变为可点击。
3. 3. 直接点击链接即可访问原始网址，无需手动操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，直接在网页上运行。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-05-11

> 该脚本仅在特定 pastebin 页面上自动检测并解码 base64 编码的链接，将其转为可点击的 URL。未发现任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用或供应链风险。代码结构清晰，未使用任何高危或敏感 API。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 未发现安全问题 ✅

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/485772-fmhy-base64-auto-decoder)*
