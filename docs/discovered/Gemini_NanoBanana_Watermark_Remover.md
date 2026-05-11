---
title: "Gemini NanoBanana Watermark Remover"
---

# Gemini NanoBanana Watermark Remover



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Gemini_NanoBanana_Watermark_Remover.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.10**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/559574-gemini-nanobanana-watermark-remover) <Badge type="tip" text="GreasyFork" />　　安装量：**3,137**　　评分：👍10 / 👎0

## 功能介绍



## 适用网站

- 通用

## 使用方法

- 请参阅脚本说明

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-05-11

> 该脚本主要用于在 Gemini Google 页面移除图片水印。代码结构清晰，无混淆，无远程代码执行、DOM XSS、隐私数据采集或数据外传行为。仅声明了对 googleusercontent.com 的网络访问权限，但未实际发起任何网络请求。存在未使用的高权限 @grant 声明，建议移除以进一步降低风险。整体安全风险较低。

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
> 脚本声明了 @grant GM_xmlhttpRequest 权限，但实际代码未发现任何 GM_xmlhttpRequest 的调用。  
> 位置：元数据头部  
> 建议：移除未使用的高权限 @grant 以减少权限滥用风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本声明了 @grant unsafeWindow 权限，但实际代码未发现对 unsafeWindow 的访问。  
> 位置：元数据头部  
> 建议：移除未使用的高权限 @grant 以减少权限滥用风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/559574-gemini-nanobanana-watermark-remover)*
