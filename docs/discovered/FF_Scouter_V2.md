---
title: "公平战斗分数助手"
---

# 公平战斗分数助手

`游戏辅助`  `数据展示`  `策略优化`  `Torn`  `帮派管理`  `玩家分析`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/FF_Scouter_V2.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.77**　　发现时间：**2026-06-01**　　来源：[GreasyFork](https://greasyfork.org/scripts/535292-ff-scouter-v2) <Badge type="tip" text="GreasyFork" />　　安装量：**16,204**　　评分：👍3 / 👎3

## 功能介绍

此脚本在 Torn 游戏网站上显示目标玩家的公平战斗分数和帮派战争状态，帮助你更好地选择攻击对象。它会自动获取相关数据并在页面上展示，提升游戏策略性。

## 适用网站

- Torn 城市游戏

## 使用方法

1. 安装脚本后，打开 Torn 游戏网站。
2. 在玩家或帮派页面会自动显示公平战斗分数和战争状态。
3. 根据显示信息选择合适的攻击目标。
4. 如需调整脚本设置，可在浏览器扩展菜单中找到相关命令。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于从外部网站获取公平战斗分数和帮派信息。 |
| `GM_setValue` | 保存脚本设置和缓存数据，避免重复请求。 |
| `GM_getValue` | 读取已保存的脚本设置和缓存数据。 |
| `GM_listValues` | 列出所有已保存的脚本数据键，方便管理。 |
| `GM_deleteValue` | 删除不再需要的脚本数据，保持存储整洁。 |
| `GM_registerMenuCommand` | 在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_addStyle` | 为页面添加自定义样式，让脚本内容更美观。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-01

> FF Scouter V2 communicates with its own backend (ffscouter.com) using GM_xmlhttpRequest, as expected for its functionality. No evidence of privacy-invasive behavior, code obfuscation, remote code execution, or DOM XSS is found in the provided code. Permissions requested match usage, and no supply chain risk is present. The main risk is the transmission of data to a third-party server, which is necessary for the script's features. Overall, the script is low risk, but users should be aware that some data is sent to ffscouter.com.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ffscouter.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> The script uses GM_xmlhttpRequest to communicate with ffscouter.com, which is a third-party server. This is declared in @connect and is expected for the script's functionality. However, only ffscouter.com is used, and no evidence of sending cookies or sensitive user data is present in the provided code segment.  
> 位置：GM_xmlhttpRequest usage (potentially elsewhere in the script)  
> 建议：Ensure only necessary and minimal data is sent. Do not transmit cookies, authentication tokens, or sensitive user data unless required and documented.

**🟠 MEDIUM** — Permission Usage  
> The script requests several GM_* permissions, including GM_setValue, GM_getValue, GM_listValues, GM_deleteValue, GM_registerMenuCommand, and GM_addStyle. All are used for local storage, UI, and style injection, which matches the script's functionality. No evidence of permission abuse is found.  
> 位置：@grant metadata block  
> 建议：Only request permissions that are actually used. Remove unused permissions to reduce attack surface.

**🟡 LOW** — DOM XSS  
> The script loads CSS via GM_addStyle and manipulates the DOM, but does not appear to insert untrusted user input into innerHTML or use document.write. No DOM XSS risk is detected in the provided code.  
> 位置：GM_addStyle and DOM manipulation  
> 建议：Continue to avoid inserting untrusted data into the DOM via innerHTML or document.write.

**🟡 LOW** — Remote Code Execution  
> The script does not use eval, new Function, setTimeout(string), setInterval(string), or dynamic script injection. No remote code execution risk is detected in the provided code.  
> 位置：Global script scope  
> 建议：Continue to avoid dynamic code execution patterns.

**🟡 LOW** — Obfuscation  
> The script does not use obfuscation techniques such as atob/btoa, string arrays, or unicode escapes. Code is readable and not minified/obfuscated.  
> 位置：Global script scope  
> 建议：Maintain code transparency for user trust and security.

**🟡 LOW** — Privacy Collection  
> The script does not access document.cookie, localStorage, sessionStorage, IndexedDB, or listen to keyboard events. No privacy collection is detected in the provided code.  
> 位置：Global script scope  
> 建议：Continue to avoid unnecessary access to user data or browser storage.

**🟡 LOW** — Supply Chain Risk  
> The script uses @require only for its own update/download URLs, not for loading third-party libraries. No supply chain risk is detected in the provided code.  
> 位置：@require metadata block  
> 建议：If third-party libraries are added, use official CDNs and fixed versions/hashes.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/535292-ff-scouter-v2)*
