---
title: "Deadshot.io 自动瞄准与高亮"
---

# Deadshot.io 自动瞄准与高亮

`游戏辅助`  `自动瞄准`  `视觉增强`  `网页游戏`  `Deadshot.io`  `作弊`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Deadshotio_Chams_Aimbot.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.1**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/572110-deadshot-io-chams-aimbot) <Badge type="tip" text="GreasyFork" />　　安装量：**1,091**　　评分：👍5 / 👎2

## 功能介绍

本脚本为 Deadshot.io 游戏提供自动瞄准（Aimbot）和敌人高亮（Chams）功能，帮助玩家更容易发现敌人并提升射击准确度。脚本还提供可视化菜单，允许用户调整瞄准范围、灵敏度和预测参数。

## 适用网站

- Deadshot.io

## 使用方法

1. 安装 Tampermonkey 插件。
2. 添加本脚本并刷新 Deadshot.io 游戏页面。
3. 页面右上角会出现菜单，可调整参数。
4. 按 Insert 键可显示或隐藏菜单。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改页面的全局变量，实现游戏功能增强。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-13

> 该脚本仅在本地实现游戏辅助功能（如 aimbot、chams），未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链或 iframe 风险。整体安全性高，适合在受信环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何外部数据传输、统计或追踪行为。  
> 位置：全局  
> 建议：保持本地处理，避免外传用户数据。

**⛔ CRITICAL** — 隐私采集  
> 未检测到隐私数据采集（如 cookie、localStorage、剪贴板、表单、指纹等）。  
> 位置：全局  
> 建议：继续避免采集用户隐私信息。

**🔴 HIGH** — 远程代码执行  
> 未检测到 eval、new Function、setTimeout(string)、setInterval(string) 或远程代码加载。  
> 位置：全局  
> 建议：避免动态执行字符串代码和远程脚本注入。

**🔴 HIGH** — 代码混淆  
> 未检测到代码混淆、base64 解码、字符串数组映射或高度压缩代码。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审查。

**🔴 HIGH** — DOM XSS  
> 未检测到 DOM XSS 风险，未将用户输入或 URL 参数插入 innerHTML/outerHTML。  
> 位置：全局  
> 建议：如需插入动态内容，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> 仅申请了 @grant unsafeWindow，未检测到权限滥用。  
> 位置：元数据  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 未检测到敏感 API（如 geolocation、RTC、MediaDevices、Clipboard、Notification）调用。  
> 位置：全局  
> 建议：避免调用可泄露用户隐私的 API。

**🟠 MEDIUM** — 供应链风险  
> 未检测到 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需依赖第三方库，建议固定版本并使用可信 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未检测到 ClickJacking 或 iframe 风险。  
> 位置：全局  
> 建议：如需操作 iframe，确保安全性。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572110-deadshot-io-chams-aimbot)*
