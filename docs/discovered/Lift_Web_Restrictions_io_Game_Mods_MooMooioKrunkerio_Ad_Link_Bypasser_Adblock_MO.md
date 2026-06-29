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

**风险等级**：⛔ CRITICAL　　**安全评分**：0/100　　**分析时间**：2026-06-29

> This script presents multiple critical security risks, including remote code execution via eval, code obfuscation, data exfiltration, privacy-invasive tracking, and broad permissions. It should NOT be approved for use in its current form.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ksw2-moomoo.glitch.me, Any URL via Utils.loadModule()） |
| 隐私采集 | ❌ 检测到（Persistent unique user identifier (UUID) stored in GM storage） |
| 代码混淆 | ❌ 检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ❌ 存在风险 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Remote Code Execution  
> The script uses XMLHttpRequest to fetch and execute remote code via a[a][a](x.responseText), which is equivalent to eval(). The URL is arbitrary (passed to loadModule), allowing remote code execution.  
> 位置：Utils.loadModule function  
> 建议：Remove dynamic code execution and only use static, trusted code. Never eval or execute fetched code from arbitrary URLs.

**⛔ CRITICAL** — Data Exfiltration  
> The script requests and executes code from arbitrary URLs via loadModule, which can be used to exfiltrate data or execute malicious code.  
> 位置：Utils.loadModule function  
> 建议：Restrict network requests to trusted domains and avoid executing fetched code.

**⛔ CRITICAL** — Privacy Collection  
> The script stores a unique user identifier (UUID) in persistent storage (GM.setValue('id', uuidv4())), which can be used for tracking.  
> 位置：Anonymous async IIFE near top of script  
> 建议：Do not generate or store persistent unique identifiers unless absolutely necessary and with user consent.

**🔴 HIGH** — Code Obfuscation  
> The script uses a[a][a](x.responseText), which is a highly obfuscated way to call eval().  
> 位置：Utils.loadModule function  
> 建议：Avoid obfuscation and use clear, maintainable code. Remove any use of eval or similar constructs.

**🔴 HIGH** — DOM XSS Risk  
> The script uses innerHTML/outerHTML in some utility functions (not fully visible in the snippet), and the use of eval-like constructs increases XSS risk.  
> 位置：Utils.loadModule and possible other dynamic code paths  
> 建议：Sanitize all user input and avoid inserting untrusted content into the DOM.

**🟠 MEDIUM** — Permission Abuse  
> The script applies to a wide range of high-value targets (Discord, Facebook, Google, Baidu, etc.), increasing the risk of privilege abuse and data exposure.  
> 位置：@match metadata  
> 建议：Limit script scope to only necessary domains.

**🟠 MEDIUM** — Permission Abuse  
> The script requests high-privilege grants (unsafeWindow, GM_getTabs, GM_saveTab, etc.), but not all are used in the visible code.  
> 位置：@grant metadata  
> 建议：Only request the minimum necessary permissions.

**🟠 MEDIUM** — Supply Chain Risk  
> The script uses @require to load third-party libraries from GreasyFork and jQuery from code.jquery.com, but does not pin versions with hashes.  
> 位置：@require metadata  
> 建议：Pin all third-party dependencies to specific versions and use trusted CDNs.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/374794-lift-web-restrictions-io-game-mods-moomoo-io-krunker-io-ad-link-bypasser-adblock-more)*
