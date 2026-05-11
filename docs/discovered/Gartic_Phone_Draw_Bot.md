---
title: "Gartic Phone Draw Bot"
---

# Gartic Phone Draw Bot



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Gartic_Phone_Draw_Bot.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.1**　　发现时间：**2026-05-04**　　来源：[GreasyFork](https://greasyfork.org/scripts/495177-gartic-phone-draw-bot) <Badge type="tip" text="GreasyFork" />　　安装量：**11,021**　　评分：👍0 / 👎1

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

**风险等级**：🟡 LOW　　**安全评分**：67/100　　**分析时间**：2026-05-11

> 该脚本主要通过 WebSocket 与 garticphone.com 服务器通信，实现自动绘图功能。未发现向第三方服务器外传数据、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。存在未使用的 GM_xmlhttpRequest 权限申请，建议移除。整体风险较低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：garticphone.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ⚠️ 使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 WebSocket 发送自动生成的绘图数据包到 garticphone.com 服务器。  
> 位置：sendPackets 函数、customWebSocket 类  
> 建议：仅与目标站点通信，未发现向第三方或恶意服务器发送数据。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但实际代码未使用该 API。  
> 位置：元数据 @grant  
> 建议：移除未使用的高权限申请，减少权限滥用风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/495177-gartic-phone-draw-bot)*
