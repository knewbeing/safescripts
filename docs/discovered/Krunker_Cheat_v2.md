---
title: "Krunker Cheat v2"
---

# Krunker Cheat v2



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Krunker_Cheat_v2.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.0**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/551530-krunker-cheat-v2) <Badge type="tip" text="GreasyFork" />　　安装量：**1,319**　　评分：👍1 / 👎0

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

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 或 WebSocket 使用等高危行为。主要风险为未使用的高权限 @grant 申请和 @require 依赖未锁定哈希，属于中等风险。整体安全性较高，但建议移除未使用权限并固定依赖版本。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> @grant 申请了 unsafeWindow 权限，但脚本未发现对 unsafeWindow 的实际使用。  
> 位置：metadata  
> 建议：移除未使用的高权限 @grant 申请，减少潜在攻击面。

**🟠 MEDIUM** — 供应链风险  
> @require 加载了 three.js，来源为 unpkg.com 官方 CDN，未锁定具体文件哈希。  
> 位置：metadata  
> 建议：建议使用带有版本哈希的 CDN 链接，或官方 CDN，防止供应链污染。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/551530-krunker-cheat-v2)*
