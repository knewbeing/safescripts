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

**风险等级**：🟠 MEDIUM　　**安全评分**：81/100　　**分析时间**：2026-07-06

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。主要安全问题为权限滥用（unsafeWindow）、供应链风险（未固定版本哈希的第三方库加载）以及道德/法律风险。整体安全风险为中等，建议加强权限和依赖管理。

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
> 申请了 unsafeWindow 权限，允许脚本访问和修改页面全局对象，可能被滥用或引发安全风险。  
> 位置：UserScript metadata (@grant unsafeWindow)  
> 建议：仅在确实需要时申请 unsafeWindow，避免滥用。若无必要，移除该权限。

**🟠 MEDIUM** — 供应链风险  
> 通过 @require 加载了第三方库 three.js，虽然使用官方 CDN，但未固定版本哈希，存在供应链污染风险。  
> 位置：UserScript metadata (@require https://unpkg.com/three@0.150.0/build/three.min.js)  
> 建议：建议使用官方 CDN 并固定版本哈希，避免加载可变内容。

**🟡 LOW** — 道德/法律风险  
> 脚本功能涉及游戏作弊（Aimbot、ESP、Wallhack），可能违反目标网站的使用条款，存在法律和道德风险。  
> 位置：脚本整体功能  
> 建议：仅在合法、允许的环境下使用此类脚本，避免违反网站政策。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/551530-krunker-cheat-v2)*
