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

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-06-22

> 该脚本主要用于移除 Gemini AI 生成图片的水印，未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 等高危行为。存在未使用的高权限申请（GM_xmlhttpRequest、unsafeWindow），建议精简权限。整体风险较低。

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
> 申请了 GM_xmlhttpRequest 权限，但实际代码未检测到对外部服务器的数据发送，仅用于本地资源处理。  
> 位置：@grant 元数据  
> 建议：如无必要可移除 GM_xmlhttpRequest 权限，减少权限面。

**🟠 MEDIUM** — 权限滥用  
> 申请了 unsafeWindow 权限，但代码未检测到对 unsafeWindow 的实际使用。  
> 位置：@grant 元数据  
> 建议：如无必要可移除 unsafeWindow 权限，减少权限面。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/559574-gemini-nanobanana-watermark-remover)*
