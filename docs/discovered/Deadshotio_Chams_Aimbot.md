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

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-06-01

> 该 UserScript 主要实现游戏辅助功能（Chams & Aimbot），未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 滥用、供应链或 iframe 风险。仅申请了 unsafeWindow 权限，代码结构清晰，安全性高。

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
> 建议：保持现状，勿添加外传逻辑。

**⛔ CRITICAL** — 隐私采集  
> 未检测到 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段、键盘输入监听与外传等隐私采集行为。  
> 位置：全局  
> 建议：保持现状，勿采集用户隐私数据。

**🔴 HIGH** — 远程代码执行  
> 未检测到 eval、new Function、setTimeout(string)、setInterval(string)、动态 script 标签、@require 远程 JS、document.write 等远程代码执行风险。  
> 位置：全局  
> 建议：保持现状，勿引入动态代码执行。

**🔴 HIGH** — 代码混淆  
> 未检测到代码混淆、base64 解码、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

**🔴 HIGH** — DOM XSS  
> 未检测到 DOM XSS 风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：createUI()  
> 建议：如需插入动态内容，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> 仅申请了 unsafeWindow 权限，未检测到高权限滥用。  
> 位置：@grant  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 未检测到敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）调用。  
> 位置：全局  
> 建议：如需使用敏感 API，需明确告知用户。

**🟠 MEDIUM** — 供应链风险  
> 未检测到 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用可信 CDN 并锁定版本。

**🟡 LOW** — ClickJacking/iframe 风险  
> 未检测到对 frame 保护策略的修改或隐藏 iframe 的创建。  
> 位置：全局  
> 建议：如需操作 iframe，需明确用途并告知用户。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572110-deadshot-io-chams-aimbot)*
