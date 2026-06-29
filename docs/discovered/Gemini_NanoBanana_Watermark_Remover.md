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

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-06-29

> 该脚本主要用于页面内图像处理，未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险或 iframe 风险。仅存在声明了未实际使用的高权限（GM_xmlhttpRequest、unsafeWindow），建议去除以最小化权限。整体安全风险极低。

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
> 脚本声明 @grant GM_xmlhttpRequest 但实际代码未发现任何网络请求相关调用（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、sendBeacon 等），也未发现数据外传逻辑。  
> 位置：元数据与主代码  
> 建议：如无实际用途，建议移除 @grant GM_xmlhttpRequest 权限。

**🟠 MEDIUM** — 权限滥用  
> 脚本声明 @grant unsafeWindow，但实际代码未发现对 unsafeWindow 的访问或操作。  
> 位置：元数据与主代码  
> 建议：如无实际用途，建议移除 @grant unsafeWindow 权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/559574-gemini-nanobanana-watermark-remover)*
