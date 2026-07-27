---
title: "EvoWars经典增强版"
---

# EvoWars经典增强版

`游戏辅助`  `EvoWars.io`  `沙盒工具`  `机器人控制`  `动画切换`  `界面增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/EvoWars_Classic_Mod.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2026-06-19_v25.3**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/583519-evowars-classic-mod) <Badge type="tip" text="GreasyFork" />　　安装量：**128**　　评分：👍0 / 👎0

## 功能介绍

本脚本为 EvoWars.io 游戏提供高级沙盒工具，允许玩家调整机器人靠近距离、独立设置机器人大小，并可切换不同动画状态。通过界面面板，用户可自定义游戏体验，增强操作和视觉效果。

## 适用网站

- EvoWars.io

## 使用方法

1. 安装脚本后，进入 EvoWars.io 网站。
2. 页面左上角会出现一个可移动的控制面板。
3. 在面板中调整机器人距离、大小和动画状态。
4. 设置完成后，游戏体验将根据你的选择进行优化。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，仅在页面内运行。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-27

> 该 UserScript 未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。代码结构清晰，权限申请为 none，未加载第三方库，未执行动态代码。整体安全性极高，适合公开使用。

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
> 未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、sendBeacon），不存在数据外传行为。  
> 位置：全局代码  
> 建议：保持无外部数据传输，确保用户隐私安全。

**⛔ CRITICAL** — 隐私采集  
> 未检测到任何隐私采集行为（如读取 cookie、localStorage、sessionStorage、IndexedDB、监听键盘输入、读取表单字段、访问指纹 API、读取剪贴板）。  
> 位置：全局代码  
> 建议：保持无隐私采集，确保用户数据安全。

**🔴 HIGH** — 远程代码执行  
> 未检测到 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML/outerHTML 插入脚本、@require 或动态 script 标签加载远程 JS、document.write 插入脚本等远程代码执行风险。  
> 位置：全局代码  
> 建议：避免动态执行或加载外部代码，防止 RCE。

**🔴 HIGH** — 代码混淆  
> 未检测到代码混淆（如 base64 解码执行、字符串数组映射、unicode 混淆、高度压缩单行代码）。  
> 位置：全局代码  
> 建议：保持代码可读性，便于安全审查。

**🔴 HIGH** — DOM XSS / 注入  
> 未检测到 DOM XSS 或注入风险（如用户输入或 URL 参数直接插入 innerHTML/outerHTML、document.write 插入不可信内容、操作 iframe src 为 javascript: 协议）。  
> 位置：initUI() 函数  
> 建议：继续避免插入不可信内容到 DOM。

**🟠 MEDIUM** — 权限滥用  
> 未申请任何 Tampermonkey/Greasemonkey权限（@grant none），不存在权限滥用风险。  
> 位置：元数据  
> 建议：仅申请必要权限，避免权限滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：全局代码  
> 建议：继续避免调用敏感 API。

**🟠 MEDIUM** — 供应链风险  
> 未使用 @require 加载第三方库，供应链风险为零。  
> 位置：元数据  
> 建议：如需加载第三方库，建议使用官方 CDN 并固定版本哈希。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未检测到修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：initUI() 函数  
> 建议：继续避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/583519-evowars-classic-mod)*
