---
title: "新角色扩展"
---

# 新角色扩展

`游戏辅助`  `Hero Wars`  `角色扩展`  `任务追踪`  `活动提示`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/HWHNewCharacterExt.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.59**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/553713-hwhnewcharacterext) <Badge type="tip" text="GreasyFork" />　　安装量：**1,769**　　评分：👍5 / 👎0

## 功能介绍

此脚本是HeroWarsHelper脚本的扩展，主要用于在Hero Wars游戏中增加新角色相关功能。它可以帮助玩家追踪新英雄或泰坦的任务进度，并在活动期间提供提示和进度反馈。

## 适用网站

- Hero Wars官网
- Facebook小游戏平台

## 使用方法

1. 1. 安装Tampermonkey插件。
2. 2. 在Hero Wars官网或Facebook小游戏平台打开游戏。
3. 3. 确保已安装HeroWarsHelper主脚本。
4. 4. 脚本自动运行，活动期间会显示新角色任务相关提示。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-27

> 该脚本未检测到任何安全风险，未涉及数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。代码结构清晰，权限申请合理，安全评分为 100，属于安全脚本。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> 脚本未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket 等），不存在数据外传风险。  
> 位置：全局  
> 建议：保持现有状态，避免添加任何外部数据传输逻辑。

**⛔ CRITICAL** — Privacy Collection  
> 脚本未检测到任何隐私采集行为（如读取 cookie、localStorage、sessionStorage、IndexedDB、监听键盘输入、读取表单字段、访问指纹 API、读取剪贴板等）。  
> 位置：全局  
> 建议：保持现有状态，避免添加任何隐私采集逻辑。

**🔴 HIGH** — Remote Code Execution  
> 脚本未检测到远程代码执行风险（未使用 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML/outerHTML 执行 JS、动态 script 标签加载远程 JS、document.write 插入脚本内容）。  
> 位置：全局  
> 建议：保持现有状态，避免添加任何动态代码执行逻辑。

**🔴 HIGH** — Obfuscation  
> 脚本未检测到代码混淆（无 base64 解码执行、字符串数组映射、unicode 混淆、高度压缩单行代码等）。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS/Injection  
> 脚本未检测到 DOM XSS 或注入风险（未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未使用 document.write 插入不可信内容，未操作 iframe src 为 javascript: 协议）。  
> 位置：全局  
> 建议：保持现有状态，确保所有插入 DOM 的内容均为可信数据。

**🟠 MEDIUM** — Permission Abuse  
> 脚本未检测到权限滥用（无 @grant 权限申请，未使用 GM_openInTab、GM_download 等高权限 API）。  
> 位置：元数据  
> 建议：如需申请权限，确保最小权限原则。

**🟠 MEDIUM** — Sensitive API Usage  
> 脚本未检测到敏感 API 调用（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）。  
> 位置：全局  
> 建议：避免调用敏感 API，除非确有必要且用户知情。

**🟠 MEDIUM** — Supply Chain Risk  
> 脚本未检测到供应链风险（无 @require 加载第三方库）。  
> 位置：元数据  
> 建议：如需加载第三方库，建议使用官方 CDN 并固定版本哈希。

**🟡 LOW** — ClickJacking/Iframe Risk  
> 脚本未检测到 ClickJacking 或 iframe 风险（未修改 frame 保护策略，未创建隐藏 iframe 用于数据提取）。  
> 位置：全局  
> 建议：避免操作 iframe 相关策略，除非确有必要。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/553713-hwhnewcharacterext)*
