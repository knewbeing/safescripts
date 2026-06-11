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

**风险等级**：⛔ CRITICAL　　**安全评分**：0/100　　**分析时间**：2026-06-08

> This script poses severe security and privacy risks. It contains remote code execution via dynamic code loading and eval-like constructs, code obfuscation, DOM XSS risk, privacy-invasive tracking, excessive permissions, and supply chain risks. It should NOT be approved for use.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ksw2-moomoo.glitch.me, Any URL via Utils.loadModule） |
| 隐私采集 | ❌ 检测到（Unique user ID (UUID) stored and incremented for each use., Tracking disclosed in @antifeature.） |
| 代码混淆 | ❌ 检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ❌ 存在风险 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Remote Code Execution  
> The script uses XMLHttpRequest to fetch arbitrary code and executes it via `a[a][a](x.responseText)`, which is equivalent to eval(). This is a remote code execution vulnerability.  
> 位置：Utils.loadModule function  
> 建议：Remove dynamic code execution or restrict to trusted, versioned sources. Avoid using eval or Function constructors.

**⛔ CRITICAL** — Privacy Collection  
> The script stores a unique user ID (UUID) in local storage via GM.setValue and increments a counter, which can be used for tracking.  
> 位置：uuidv4 and GM.setValue usage  
> 建议：Inform users about tracking and minimize persistent identifiers.

**⛔ CRITICAL** — Privacy Collection  
> The script's @antifeature explicitly states tracking for performance debugging.  
> 位置：@antifeature metadata  
> 建议：Disclose all tracking in documentation and provide opt-out.

**🔴 HIGH** — Code Obfuscation  
> The script executes code from arbitrary URLs using a highly obfuscated pattern (a[a][a]), which is a sign of code obfuscation.  
> 位置：Utils.loadModule function  
> 建议：Avoid obfuscation and use clear, maintainable code. Remove dynamic code execution.

**🔴 HIGH** — DOM XSS  
> The script can insert and execute arbitrary code into the DOM, which can lead to DOM-based XSS if user input or untrusted data is used.  
> 位置：Utils.loadModule function  
> 建议：Sanitize all inputs and avoid using innerHTML or similar methods with untrusted data.

**🟠 MEDIUM** — Supply Chain Risk  
> The script requests and executes third-party libraries via @require from GreasyFork and CDN, but does not pin versions with hashes, exposing to supply chain risks.  
> 位置：@require metadata  
> 建议：Pin all dependencies to specific versions and use trusted CDNs with integrity hashes.

**🟠 MEDIUM** — Permission Overreach  
> The script applies for high-privilege grants (unsafeWindow, GM_getTabs, GM_saveTab, etc.) that are not all used in the visible code, indicating possible permission overreach.  
> 位置：@grant metadata  
> 建议：Request only the minimum permissions required for functionality.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/374794-lift-web-restrictions-io-game-mods-moomoo-io-krunker-io-ad-link-bypasser-adblock-more)*
