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

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-06-22

> 该 UserScript 代码结构清晰，无任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 滥用、供应链风险或 iframe 风险。未检测到任何安全隐患，安全评分为 100 分。可安全使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传检查通过  
> 脚本未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、sendBeacon），未发现数据外传行为。  
> 位置：全局  
> 建议：保持此状态，勿添加任何外传代码。

**⛔ CRITICAL** — 隐私采集检查通过  
> 脚本未检测到任何隐私采集行为（如读取 cookie、localStorage、sessionStorage、IndexedDB、监听键盘输入、读取表单字段、访问指纹 API、读取剪贴板等）。  
> 位置：全局  
> 建议：保持此状态，勿添加任何隐私采集代码。

**🔴 HIGH** — 远程代码执行检查通过  
> 脚本未检测到 eval、new Function、setTimeout(string)、setInterval(string)、动态 script 标签、@require 远程 JS、document.write 等远程代码执行风险。  
> 位置：全局  
> 建议：保持此状态，勿添加动态代码执行相关代码。

**🔴 HIGH** — 代码混淆检查通过  
> 脚本未检测到代码混淆（无 base64 解码、字符串数组映射、unicode 混淆、高度压缩单行代码等）。  
> 位置：全局  
> 建议：保持代码可读性，勿使用混淆。

**🔴 HIGH** — DOM XSS 检查通过  
> 脚本未检测到 DOM XSS 风险（无用户输入或 URL 参数直接插入 innerHTML/outerHTML，未使用 document.write 插入不可信内容，未操作 iframe src 为 javascript:）。  
> 位置：全局  
> 建议：如需插入动态内容，务必进行转义。

**🟠 MEDIUM** — 权限滥用检查通过  
> @grant 设为 none，未申请任何高权限，无权限滥用风险。  
> 位置：元数据  
> 建议：如需申请权限，严格最小化。

**🟠 MEDIUM** — 敏感 API 检查通过  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局  
> 建议：如需调用敏感 API，需征得用户同意。

**🟠 MEDIUM** — 供应链风险检查通过  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，务必使用可信源并锁定版本。

**🟡 LOW** — iframe 风险检查通过  
> 脚本未检测到修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：如需使用 iframe，确保安全用途。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/583519-evowars-classic-mod)*
