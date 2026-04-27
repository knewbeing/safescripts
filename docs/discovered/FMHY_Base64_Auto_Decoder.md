---
title: "FMHY Base64自动解码器"
---

# FMHY Base64自动解码器

`链接解码`  `自动化`  `Pastebin工具`  `便捷访问`  `文本处理`  `信息提取`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/FMHY_Base64_Auto_Decoder.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.5**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/485772-fmhy-base64-auto-decoder) <Badge type="tip" text="GreasyFork" />　　安装量：**29,570**　　评分：👍7 / 👎2

## 功能介绍

本脚本会自动识别并解码页面上的Base64编码链接，将其转换为可点击的URL，方便用户直接访问。主要用于各种Pastebin和文本分享网站，提升查找和使用隐藏链接的效率。无需手动解码或复制粘贴。

## 适用网站

- Rentry（rentry.co、rentry.org）
- FMHY Pastebin（pastes.fmhy.net）
- Disroot Pastebin（bin.disroot.org）
- PrivateBin（privatebin.net、privatebin.rinuploads.org）
- TextBin（textbin.xyz）
- Idrix Pastebin（bin.idrix.fr）
- Pastebin.com

## 使用方法

1. 1. 安装脚本后，访问上述支持的网站。
2. 2. 页面上的Base64编码链接会自动被解码并变成可点击的URL。
3. 3. 点击链接即可直接访问，无需手动解码。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本无需特殊权限，仅在页面上操作内容。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-04-27

> 该脚本仅在页面本地解码 base64 字符串并将 URL 转为可点击链接，没有任何数据外传、隐私采集、远程代码执行、混淆、XSS、权限滥用、敏感 API 调用或供应链风险。代码结构清晰，未申请任何高权限，安全性极高。

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
