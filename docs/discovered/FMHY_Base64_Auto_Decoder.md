---
title: "FMHY Base64自动解码器"
---

# FMHY Base64自动解码器

`链接解码`  `粘贴网站`  `自动化`  `便捷访问`  `信息提取`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/FMHY_Base64_Auto_Decoder.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.5**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/485772-fmhy-base64-auto-decoder) <Badge type="tip" text="GreasyFork" />　　安装量：**35,441**　　评分：👍10 / 👎2

## 功能介绍

本脚本自动识别并解码网页中的 Base64 编码链接，将其转换为可点击的真实网址。适用于多种粘贴网站，方便用户直接访问隐藏的链接，无需手动解码。

## 适用网站

- Rentry（rentry.co、rentry.org）
- FMHY Pastebin（pastes.fmhy.net）
- Disroot Pastebin（bin.disroot.org）
- PrivateBin（privatebin.net、privatebin.rinuploads.org）
- Textbin（textbin.xyz）
- Idrix Pastebin（bin.idrix.fr）
- Pastebin（pastebin.com）

## 使用方法

1. 1. 安装脚本后，访问上述支持的网站。
2. 2. 页面中的 Base64 编码链接会自动被解码并变为可点击网址。
3. 3. 点击生成的链接即可直接访问目标页面。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本无需额外权限，仅操作网页内容。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-06-22

> 该脚本仅在页面本地解码 Base64 字符串并将其转为可点击链接，不涉及任何数据外传、隐私采集、远程代码执行或权限滥用。未发现混淆、XSS、供应链或 iframe 风险。

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
