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

**风险等级**：⛔ CRITICAL　　**安全评分**：0/100　　**分析时间**：2026-07-13

> This userscript presents critical security risks, including remote code execution via dynamic script loading and eval-like constructs, code obfuscation, supply chain risks, excessive permissions, privacy tracking, and DOM XSS risk. It should NOT be considered safe for use.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ksw2-moomoo.glitch.me, External URLs via Utils.loadModule） |
| 隐私采集 | ❌ 检测到（Persistent UUID stored in GM storage, Usage counter stored in GM storage, Explicit tracking via @antifeature） |
| 代码混淆 | ❌ 检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ❌ 存在风险 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Remote Code Execution  
> The script uses XMLHttpRequest to fetch external scripts and executes them via a[a][a](x.responseText), which is equivalent to eval(). This allows remote code execution from arbitrary URLs.  
> 位置：Utils.loadModule function  
> 建议：Remove dynamic code execution and only use static, trusted code. Avoid eval or similar constructs.

**🔴 HIGH** — Code Obfuscation  
> The script executes code using a[a][a](x.responseText), which is an obfuscated way to call the Function constructor (i.e., window['constructor']['constructor'] = Function). This is a strong sign of code obfuscation.  
> 位置：Utils.loadModule function  
> 建议：Avoid obfuscation and use clear, readable code. Remove dynamic code execution.

**🔴 HIGH** — DOM XSS Risk  
> The script manipulates innerHTML/outerHTML and document structure in various places (e.g., deleteElement, watchAndDelete), and the code is designed to run on hundreds of sites, increasing the risk of DOM-based XSS if user input is ever inserted.  
> 位置：Utils.deleteElement, watchAndDelete, and general script structure  
> 建议：Sanitize all user input and avoid inserting untrusted data into the DOM.

**🟠 MEDIUM** — Supply Chain Risk  
> The script loads third-party libraries via @require from GreasyFork and CDN (jQuery). The GreasyFork scripts are not version-pinned with hashes, and the CDN could be updated or compromised.  
> 位置：@require metadata  
> 建议：Pin dependencies to specific versions and use trusted, official sources. Prefer SRI hashes if possible.

**🟠 MEDIUM** — Permission Abuse  
> The script requests a large set of @grant permissions, including unsafeWindow and GM_getTabs/GM_saveTab, which are not all used in the visible code. This increases the attack surface.  
> 位置：@grant metadata  
> 建议：Request only the minimum permissions required for functionality.

**🟠 MEDIUM** — Privacy Collection  
> The script stores a unique user identifier (UUID) in GM storage and increments a counter. While not directly exfiltrated, this is a form of persistent user tracking.  
> 位置：uuidv4, GM.setValue('id'), GM.setValue('count')  
> 建议：Disclose tracking clearly and avoid persistent identifiers unless necessary.

**🟠 MEDIUM** — Privacy Collection  
> The script's @antifeature explicitly states 'Tracking, for performance debugging', indicating intentional user tracking.  
> 位置：@antifeature metadata  
> 建议：Make tracking opt-in and provide clear privacy disclosures.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/374794-lift-web-restrictions-io-game-mods-moomoo-io-krunker-io-ad-link-bypasser-adblock-more)*
