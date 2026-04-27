---
title: "Gartic Phone自动绘画机器人"
---

# Gartic Phone自动绘画机器人

`自动绘画`  `游戏辅助`  `Gartic Phone`  `自动化`  `娱乐`  `脚本工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Gartic_Phone_Draw_Bot.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.1**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/495177-gartic-phone-draw-bot) <Badge type="tip" text="GreasyFork" />　　安装量：**10,735**　　评分：👍0 / 👎1

## 功能介绍

本脚本可自动在 Gartic Phone 游戏中进行绘画，模拟玩家操作，帮助快速完成画图任务。适用于需要自动绘制的场景，无需手动操作。

## 适用网站

- Gartic Phone

## 使用方法

1. 安装 Tampermonkey 扩展并添加本脚本。
2. 进入 Gartic Phone 网站，开始游戏。
3. 在绘画环节，脚本会自动进行绘画操作，无需手动画图。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和操作网页的全局对象，便于与游戏内部功能交互。 |
| `GM_xmlhttpRequest` | 允许脚本发送网络请求，获取外部资源或数据。 |
| `GM_log` | 允许脚本输出日志信息，方便调试和查看运行状态。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：100/100　　**分析时间**：2026-04-27

> The script primarily automates drawing actions in Gartic Phone and communicates only with the game's official server via WebSocket. No evidence of privacy data collection, code obfuscation, DOM XSS, or supply chain risk. Unused GM_xmlhttpRequest grant should be removed. Overall, the script is safe with minimal risk.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：garticphone.com (via WebSocket)） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ⚠️ 使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script sends drawing data and game actions to garticphone.com via WebSocket. No evidence of transmission to third-party servers.  
> 位置：sendPackets(), customWebSocket class  
> 建议：Ensure only game-relevant data is sent. No user credentials or sensitive information should be transmitted.

**⛔ CRITICAL** — Privacy Collection  
> Script reads canvas pixel data and manipulates game canvas, but does not collect or transmit user privacy data (cookies, storage, clipboard, form fields, etc.).  
> 位置：draw(), drawEnabled, CanvasRenderingContext2D proxies  
> 建议：Continue to avoid collecting sensitive user data.

**🔴 HIGH** — Remote Code Execution  
> Script uses Proxy to override appendChild and CanvasRenderingContext2D methods, but does not use eval, new Function, or dynamic script injection. No remote code execution detected.  
> 位置：Node.prototype.appendChild Proxy, CanvasRenderingContext2D proxies  
> 建议：Avoid introducing eval or dynamic script loading in future updates.

**🔴 HIGH** — Code Obfuscation  
> No evidence of code obfuscation or minification. Code is readable and not obfuscated.  
> 位置：Entire script  
> 建议：Maintain code transparency for easier auditing.

**🔴 HIGH** — DOM XSS/Injection  
> No DOM XSS or injection detected. User input is not inserted into innerHTML/outerHTML or document.write.  
> 位置：fakeButton.innerHTML (static content)  
> 建议：Continue to sanitize any future user input before DOM insertion.

**🟠 MEDIUM** — Permission Abuse  
> Script requests GM_xmlhttpRequest and unsafeWindow grants, but only uses unsafeWindow. GM_xmlhttpRequest is not used in code.  
> 位置：Metadata block (@grant)  
> 建议：Remove unused GM_xmlhttpRequest grant to minimize permission surface.

**🟠 MEDIUM** — Sensitive API Usage  
> No sensitive browser APIs (geolocation, camera, clipboard, notifications) are used.  
> 位置：Entire script  
> 建议：Avoid using sensitive APIs unless strictly necessary.

**🟠 MEDIUM** — Supply Chain Risk  
> No @require third-party libraries or supply chain risk detected.  
> 位置：Metadata block  
> 建议：If adding dependencies, use official CDNs and fixed versions.

**🟡 LOW** — ClickJacking/Iframe Risk  
> No evidence of clickjacking or iframe manipulation.  
> 位置：Entire script  
> 建议：Avoid creating hidden iframes or modifying frame protection.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/495177-gartic-phone-draw-bot)*
