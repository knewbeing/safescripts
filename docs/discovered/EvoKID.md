---
title: "EvoKID"
---

# EvoKID

`游戏辅助`  `网页游戏`  `Evowars.io`  `武器增强`  `VIP功能`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/EvoKID.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.6.0**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/581536-evokid) <Badge type="tip" text="GreasyFork" />　　安装量：**582**　　评分：👍1 / 👎0

## 功能介绍

本脚本为 Evowars.io 游戏提供 VIP 模式，增强武器属性，让玩家在游戏中拥有更强的攻击距离和角度。安装后，玩家可体验更高级的游戏功能，提升竞争力。

## 适用网站

- Evowars.io

## 使用方法

1. 安装脚本后，打开 Evowars.io 网站。
2. 进入游戏即可自动启用 VIP 模式，无需额外操作。
3. 享受增强后的武器属性和更强的游戏体验。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本无需额外权限，仅在页面内运行。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-06

> 该脚本未检测到任何安全风险：无数据外传、无隐私采集、无远程代码执行、无混淆、无DOM XSS、无权限滥用、无敏感API调用、无供应链风险、无iframe风险。代码结构清晰，权限申请合理，安全性极高。

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
> 未检测到任何网络请求（GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket等），不存在数据外传风险。  
> 位置：全局  
> 建议：保持无数据外传，勿添加任何外部请求。

**⛔ CRITICAL** — Privacy Collection  
> 未检测到隐私采集行为（如读取cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单字段、键盘监听等）。  
> 位置：全局  
> 建议：保持无隐私采集，勿添加相关代码。

**🔴 HIGH** — Remote Code Execution  
> 未检测到远程代码执行风险（如eval、new Function、setTimeout(string)、setInterval(string)、动态加载脚本等）。  
> 位置：全局  
> 建议：避免使用动态代码执行相关API。

**🔴 HIGH** — Obfuscation  
> 未检测到代码混淆（无base64解码、字符串数组映射、unicode混淆、高度压缩单行代码等）。  
> 位置：全局  
> 建议：保持代码可读性，勿使用混淆。

**🔴 HIGH** — DOM XSS  
> 未检测到DOM XSS/注入风险（无用户输入或URL参数直接插入innerHTML/outerHTML、document.write等）。  
> 位置：全局  
> 建议：插入内容前应进行转义。

**🟠 MEDIUM** — Permission Abuse  
> 未检测到权限滥用（@grant为none，未申请任何高权限）。  
> 位置：元数据  
> 建议：仅申请必要权限。

**🟠 MEDIUM** — Sensitive API  
> 未检测到敏感API调用（如地理位置、RTCPeerConnection、MediaDevices、Clipboard、Notification等）。  
> 位置：全局  
> 建议：避免调用敏感API。

**🟠 MEDIUM** — Supply Chain Risk  
> 未检测到供应链风险（无@require加载第三方库）。  
> 位置：元数据  
> 建议：如需加载第三方库，请固定版本并使用官方CDN。

**🟡 LOW** — ClickJacking/Iframe  
> 未检测到ClickJacking/iframe风险（无frame保护策略修改、隐藏iframe创建）。  
> 位置：全局  
> 建议：避免创建隐藏iframe或修改frame保护策略。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/581536-evokid)*
