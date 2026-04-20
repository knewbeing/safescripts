---
title: "Deadshot.io Chams & Aimbot"
---

# Deadshot.io Chams & Aimbot



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Deadshotio_Chams_Aimbot.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.1**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/572110-deadshot-io-chams-aimbot) <Badge type="tip" text="GreasyFork" />　　安装量：**548**　　评分：👍1 / 👎0

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

**风险等级**：🟠 MEDIUM　　**安全评分**：84/100　　**分析时间**：2026-04-20

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆、供应链风险等高危行为。主要风险为权限滥用（申请了未使用的 unsafeWindow）、敏感 API 操作（重写 MouseEvent 用于 aimbot）、以及低风险的 DOM 注入。整体安全性中等，建议移除未使用的高权限，并持续关注敏感 API 的滥用风险。

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
> 脚本申请了 @grant unsafeWindow 权限，但实际代码未使用 unsafeWindow，存在权限滥用风险。  
> 位置：元数据 @grant unsafeWindow  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本通过 Object.defineProperty 重写 MouseEvent.prototype.movementX/Y，实现自动瞄准（aimbot），属于对用户输入的敏感操作，但未涉及数据外传。  
> 位置：Object.defineProperty(MouseEvent.prototype, ...)  
> 建议：确保此类操作不会被滥用采集用户隐私或外传数据。

**🟡 LOW** — DOM XSS / 注入  
> 脚本在 document.body 直接插入 innerHTML 构建菜单 UI，但插入内容为静态字符串，未包含用户输入或 URL 参数，XSS 风险较低。  
> 位置：menu.innerHTML = ...  
> 建议：如需插入动态内容，务必进行转义。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572110-deadshot-io-chams-aimbot)*
