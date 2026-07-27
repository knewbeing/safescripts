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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-07-27

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等高危行为。仅申请了 GM_xmlhttpRequest 和 unsafeWindow 权限但未实际使用，存在权限滥用的中等风险。整体安全性较高，建议移除未使用的高权限申请以进一步提升安全性。

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
> 申请了 GM_xmlhttpRequest 权限，但实际代码未使用该 API进行任何网络请求。@connect 仅允许 googleusercontent.com，未发现数据外传行为。  
> 位置：元数据 @grant/@connect  
> 建议：如后续代码有网络请求，需确保仅用于图片资源获取，不携带用户敏感数据。

**🟠 MEDIUM** — 权限滥用  
> 申请了 unsafeWindow 权限，但实际代码未使用 unsafeWindow 进行页面交互或注入。  
> 位置：元数据 @grant  
> 建议：建议移除未使用的高权限申请，减少潜在攻击面。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/559574-gemini-nanobanana-watermark-remover)*
