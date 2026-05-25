---
title: "解除网络限制：.io游戏模型 、广告链接绕过器、广告拦截器，以及更多!"
---

# 解除网络限制：.io游戏模型 、广告链接绕过器、广告拦截器，以及更多!

`广告拦截`  `游戏辅助`  `暗黑模式`  `批量操作`  `自动跳转`  `网页增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Lift_Web_Restrictions_io_Game_Mods_MooMooioKrunkerio_Ad_Link_Bypasser_Adblock_MO.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**13**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/374794-lift-web-restrictions-io-game-mods-moomoo-io-krunker-io-ad-link-bypasser-adblock-more) <Badge type="tip" text="GreasyFork" />　　安装量：**783,177**　　评分：👍233 / 👎123

## 功能介绍

本脚本可为多个网站添加新功能，包括.io游戏的修改和作弊、广告拦截、自动跳转、暗黑模式、批量删除Discord消息、禁用谷歌分析等。安装后可提升网页使用体验，去除广告和限制。适用于测试阶段，部分功能可能不稳定。

## 适用网站

- Discord
- Facebook
- Starve.io
- Google Classroom
- MooMoo.io
- Diep.io
- 百度

## 使用方法

1. 安装Tampermonkey插件并添加此脚本。
2. 访问支持的网站，如Discord、Facebook、百度等。
3. 在.io游戏页面体验增强功能和作弊选项。
4. 在百度、Facebook等页面自动去除广告。
5. 在Google Classroom体验暗黑模式。
6. 在Discord页面可批量删除消息。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改页面的全局变量，增强功能实现。 |
| `GM.setValue` | 用于存储自定义数据，方便脚本记忆设置。 |
| `GM.getValue` | 用于读取脚本存储的数据，恢复用户设置。 |
| `GM_addStyle` | 允许脚本动态添加自定义样式，改变网页外观。 |
| `GM_addValueChangeListener` | 监听数据变化，实时响应用户操作。 |
| `GM_removeValueChangeListener` | 移除数据变化监听，优化性能。 |
| `GM_getTabs` | 获取所有脚本标签页，支持多页面协作。 |
| `GM_getTab` | 获取当前脚本标签页，便于管理状态。 |
| `GM_saveTab` | 保存当前脚本标签页，方便跨页面同步。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：0/100　　**分析时间**：2026-05-25

> This userscript presents critical security risks, including remote code execution via dynamic loading and eval, persistent user tracking, third-party data transmission, code obfuscation, DOM XSS risk, excessive permissions, and supply chain vulnerabilities. It is not safe for use in its current form.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ksw2-moomoo.glitch.me, external URLs via Utils.loadModule (potentially arbitrary)） |
| 隐私采集 | ❌ 检测到（Persistent UUID generation and storage, Usage count tracking） |
| 代码混淆 | ❌ 检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ❌ 存在风险 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Remote Code Execution  
> The script uses XMLHttpRequest to fetch external code and executes it via a[a][a](x.responseText), which is equivalent to eval(). This allows remote code execution from arbitrary URLs.  
> 位置：Utils.loadModule function  
> 建议：Remove dynamic code loading and execution. Only load trusted, versioned libraries via @require.

**⛔ CRITICAL** — Privacy Collection  
> The script stores and retrieves a UUID and a usage count in GM storage, which could be used for tracking users across sessions.  
> 位置：uuidv4 and GM.getValue/GM.setValue usage  
> 建议：Do not store persistent identifiers unless strictly necessary. Document the purpose and limit scope.

**⛔ CRITICAL** — Data Transmission  
> The script connects to ksw2-moomoo.glitch.me and uses GM_getTab/GM_saveTab to store tab objects, potentially transmitting user session data to a third-party server.  
> 位置：CONTROLLER_PAGE logic  
> 建议：Avoid sending user data to third-party servers. Use local storage only.

**🔴 HIGH** — Code Obfuscation  
> The script uses a[a][a](...) pattern, which is a form of obfuscation and indirect eval.  
> 位置：Utils.loadModule function  
> 建议：Avoid obfuscation and indirect code execution. Use clear, auditable code.

**🔴 HIGH** — DOM XSS Risk  
> The script uses innerHTML and document.getElementById, and may insert untrusted content without sanitization.  
> 位置：Utils.deleteElement and watchAndDelete functions  
> 建议：Sanitize all user input before inserting into the DOM.

**🟠 MEDIUM** — Permission Abuse  
> The script requests high privileges (unsafeWindow, GM_getTabs, GM_saveTab) but does not use all of them in the visible code.  
> 位置：@grant section  
> 建议：Reduce privilege scope to only what is necessary.

**🟠 MEDIUM** — Supply Chain Risk  
> The script loads third-party libraries from greasyfork.org and code.jquery.com, but does not fix versions for msgpack.js and scijs.js (greasyfork URLs are mutable).  
> 位置：@require section  
> 建议：Pin all dependencies to versioned URLs or hashes.

**🟡 LOW** — ClickJacking / iframe Risk  
> The script may create or manipulate iframes for recaptcha bypass and other purposes, which could be used for clickjacking or data extraction.  
> 位置：recaptcha/api2/bframe logic  
> 建议：Avoid manipulating iframes unless necessary. Document all iframe usage.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/374794-lift-web-restrictions-io-game-mods-moomoo-io-krunker-io-ad-link-bypasser-adblock-more)*
