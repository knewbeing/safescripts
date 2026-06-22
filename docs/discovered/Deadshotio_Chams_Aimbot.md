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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-22

> 该脚本主要实现游戏辅助功能（Aimbot、Chams），未发现数据外传、隐私采集、远程代码执行、混淆、DOM XSS、供应链等高危风险。唯一中等风险为申请了 @grant unsafeWindow 权限但未实际使用，建议移除。整体安全性较高，风险等级为 LOW。

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
> 申请了 @grant unsafeWindow 权限，但实际代码未见对 unsafeWindow 的直接使用。该权限为高权限，可能被滥用。  
> 位置：// @grant unsafeWindow  
> 建议：如无必要，建议移除 @grant unsafeWindow 权限。

**🟡 LOW** — 隐私采集  
> 脚本通过 Object.defineProperty 劫持 MouseEvent.prototype.movementX/Y，实现自动瞄准（Aimbot），但未见监听键盘输入、表单、剪贴板、Cookie、localStorage、IndexedDB 等隐私采集行为。  
> 位置：Object.defineProperty(MouseEvent.prototype, ...)  
> 建议：继续关注后续版本，防止引入隐私采集代码。

**🟡 LOW** — 数据外传  
> 未发现任何网络请求（fetch、GM_xmlhttpRequest、WebSocket、sendBeacon 等），无数据外传行为。  
> 位置：全局  
> 建议：保持此状态，勿引入外传代码。

**🟡 LOW** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string)、动态 script 标签、@require 远程 JS、document.write 等远程代码执行风险。  
> 位置：全局  
> 建议：保持此状态，勿引入动态代码执行。

**🟡 LOW** — 代码混淆  
> 未发现代码混淆、base64 解码、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，防止混淆。

**🟡 LOW** — DOM XSS  
> 未发现 DOM XSS 风险，未将用户输入或 URL 参数插入 innerHTML/outerHTML。UI 仅插入静态内容。  
> 位置：createUI()  
> 建议：如后续插入动态内容，需严格转义。

**🟡 LOW** — 敏感 API  
> 未发现敏感 API（地理位置、摄像头、麦克风、剪贴板读取、通知等）调用。  
> 位置：全局  
> 建议：如无必要，勿引入敏感 API 调用。

**🟡 LOW** — 供应链风险  
> 未发现 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需依赖第三方库，建议固定版本并使用可信 CDN。

**🟡 LOW** — iframe 风险  
> 未发现修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局  
> 建议：如无必要，勿操作 iframe。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572110-deadshot-io-chams-aimbot)*
