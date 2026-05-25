---
title: "FMHY Base64自动解码器"
---

# FMHY Base64自动解码器

`链接解码`  `自动化`  `文本分享`  `便捷访问`  `Pastebin工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/FMHY_Base64_Auto_Decoder.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.5**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/485772-fmhy-base64-auto-decoder) <Badge type="tip" text="GreasyFork" />　　安装量：**32,347**　　评分：👍9 / 👎2

## 功能介绍

本脚本自动识别并解码网页中的Base64编码链接，将其转换为可点击的URL，方便用户直接访问隐藏的链接。适用于多种文本分享网站，无需手动解码。

## 适用网站

- Rentry
- FMHY Pastebin
- Disroot Bin
- PrivateBin
- TextBin
- Idrix Bin
- Rinuploads PrivateBin
- Pastebin

## 使用方法

1. 安装脚本后，访问上述支持的网站。
2. 页面中的Base64编码链接会自动被解码。
3. 解码后的链接会变为可点击，直接跳转。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本无需特殊权限，直接在网页上运行。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-05-25

> 该脚本仅在页面本地解码 base64 字符串并将其转为可点击链接，不涉及任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用或供应链风险。代码结构清晰，未申请任何高权限，未加载第三方库，未使用危险 API。整体安全性极高。

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
