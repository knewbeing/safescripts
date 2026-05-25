---
title: "X-GUI CLIENT FOR BLOOKET"
---

# X-GUI CLIENT FOR BLOOKET



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/X-GUI_CLIENT_FOR_BLOOKET.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**6.10x**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/553301-x-gui-client-for-blooket) <Badge type="tip" text="GreasyFork" />　　安装量：**7,150**　　评分：👍14 / 👎0

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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-05-25

> The script does not transmit data externally, does not collect sensitive information, and does not execute remote code. It uses localStorage for settings and popup state, and creates a hidden iframe (not used for malicious purposes). No obfuscation, DOM XSS, or supply chain risks detected. Overall, the script is safe with minor privacy and iframe risks.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（localStorage used for settings and popup dismissal state） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — privacy collection  
> The script reads and writes to localStorage for settings and popup dismissal state. No sensitive data is stored, but localStorage is used.  
> 位置：localStorage.getItem, localStorage.setItem  
> 建议：Ensure only non-sensitive, non-personal data is stored in localStorage.

**🟡 LOW** — iframe risk  
> The script creates hidden iframes, which can be used for data extraction or clickjacking, though in this case it appears unused for malicious purposes.  
> 位置：(() => { let iframe = document.querySelector("iframe"); ... })  
> 建议：Remove unnecessary hidden iframe creation unless required for functionality.

**🟡 LOW** — data transmission  
> The script does not use any network requests (fetch, GM_xmlhttpRequest, WebSocket, etc.) to transmit data externally.  
> 位置：N/A  
> 建议：No issue detected.

**🟡 LOW** — remote code execution  
> No use of eval, new Function, or dynamic script injection detected.  
> 位置：N/A  
> 建议：No issue detected.

**🟡 LOW** — code obfuscation  
> No code obfuscation detected. The script is readable and not minified or obfuscated.  
> 位置：N/A  
> 建议：No issue detected.

**🟡 LOW** — DOM XSS  
> No DOM XSS risk detected. User input is not inserted into innerHTML or document.write.  
> 位置：box.innerHTML (static content)  
> 建议：No issue detected.

**🟡 LOW** — permission abuse  
> No excessive or unused permissions. @grant is set to none.  
> 位置：// @grant none  
> 建议：No issue detected.

**🟡 LOW** — sensitive API  
> No sensitive browser APIs (geolocation, camera, microphone, clipboard, notifications) are used.  
> 位置：N/A  
> 建议：No issue detected.

**🟡 LOW** — supply chain  
> No supply chain risk. No @require or external JS libraries loaded except Google Fonts via CSS @import.  
> 位置：@import url('https://fonts.googleapis.com/css?family=Titan+One');  
> 建议：No issue detected.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/553301-x-gui-client-for-blooket)*
