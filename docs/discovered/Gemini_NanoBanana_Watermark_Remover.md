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

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-06-01

> 该脚本主要功能为移除 Gemini AI 生成图片中的水印。代码结构清晰，无混淆，无远程代码执行风险，无隐私采集行为。仅通过 GM_xmlhttpRequest 访问 googleusercontent.com 域名获取图片资源，未发现敏感数据外传。存在未使用的高权限 @grant unsafeWindow，建议移除。整体安全风险较低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：googleusercontent.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 访问 googleusercontent.com 域名以获取图片资源，但未发现向第三方或未知服务器发送用户数据、cookie、页面内容等敏感信息。  
> 位置：GM_xmlhttpRequest 调用（仅限 googleusercontent.com）  
> 建议：确保仅访问受信任的 googleusercontent.com 资源，避免未来代码变更导致数据外传。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 @grant unsafeWindow 权限，但实际代码未发现对 unsafeWindow 的使用。  
> 位置：元数据 @grant unsafeWindow  
> 建议：移除未使用的高权限 @grant unsafeWindow，减少潜在攻击面。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/559574-gemini-nanobanana-watermark-remover)*
