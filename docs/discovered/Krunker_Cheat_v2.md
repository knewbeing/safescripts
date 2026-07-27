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

**风险等级**：🟠 MEDIUM　　**安全评分**：81/100　　**分析时间**：2026-07-27

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 高风险行为。主要风险为权限滥用（unsafeWindow）和供应链风险（@require 未固定版本哈希）。建议移除未使用的高权限申请，并固定第三方库版本。整体安全性中等，适合有一定安全意识的用户使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — Permission Abuse  
> 申请了 unsafeWindow 权限，但实际代码未使用 unsafeWindow，存在权限滥用风险。  
> 位置：UserScript metadata (@grant unsafeWindow)  
> 建议：移除未使用的高权限申请，减少攻击面。

**🟠 MEDIUM** — Supply Chain Risk  
> 通过 @require 加载了第三方库 three.js，虽然使用官方 CDN，但未固定版本哈希，存在供应链污染风险。  
> 位置：UserScript metadata (@require https://unpkg.com/three@0.150.0/build/three.min.js)  
> 建议：建议使用固定版本哈希或官方 CDN，避免加载可变内容。

**🟡 LOW** — DOM Injection  
> 脚本通过 innerHTML 插入自定义 GUI 元素，但内容为静态字符串，未直接插入用户输入或 URL 参数，XSS 风险较低。  
> 位置：el.innerHTML = `<style>...</style>`  
> 建议：确保后续未将用户输入插入 innerHTML，保持安全。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/551530-krunker-cheat-v2)*
