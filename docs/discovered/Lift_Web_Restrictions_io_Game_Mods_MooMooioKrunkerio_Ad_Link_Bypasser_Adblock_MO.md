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

**风险等级**：⛔ CRITICAL　　**安全评分**：0/100　　**分析时间**：2026-06-01

> This userscript poses a critical security risk. It contains dynamic remote code execution, obfuscated code, potential data exfiltration to third-party servers, permission overreach, supply chain risks, and privacy tracking. It should NOT be approved or installed.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ksw2-moomoo.glitch.me, arbitrary URLs via Utils.loadModule） |
| 隐私采集 | ❌ 检测到（The script generates a UUID and stores it in GM storage, which may be used for tracking., The script increments a counter in GM storage, which may be used for analytics.） |
| 代码混淆 | ❌ 检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ❌ 存在风险 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Remote Code Execution  
> The script uses a function (Utils.loadModule) that fetches remote code via XMLHttpRequest and executes it using a[a][a](x.responseText), which is equivalent to eval(). This allows for arbitrary remote code execution.  
> 位置：Utils.loadModule function  
> 建议：Remove dynamic code execution and only use static, trusted code. Avoid eval or similar constructs.

**⛔ CRITICAL** — Data Exfiltration  
> The script makes network requests to ksw2-moomoo.glitch.me and potentially other arbitrary URLs via Utils.loadModule, which can be used for data exfiltration.  
> 位置：Utils.loadModule, CONTROLLER_PAGE logic  
> 建议：Restrict network requests to trusted domains and avoid sending user data.

**🔴 HIGH** — Code Obfuscation  
> The script uses a[a][a](x.responseText), which is a highly obfuscated way to call the Function constructor (equivalent to eval). This is a strong sign of code obfuscation.  
> 位置：Utils.loadModule function  
> 建议：Avoid obfuscation and use clear, readable code. Remove dynamic code execution.

**🔴 HIGH** — DOM XSS Risk  
> The script uses innerHTML/outerHTML in some modules (not fully visible in the snippet), and the code structure suggests possible direct DOM manipulation with user input, which may lead to DOM XSS.  
> 位置：General code structure, incomplete code  
> 建议：Sanitize all user input before inserting into the DOM.

**🟠 MEDIUM** — Permission Overreach  
> The script requests high-privilege grants such as unsafeWindow, GM_getTabs, GM_getTab, GM_saveTab, but does not use all of them in the visible code. This is a sign of permission overreach.  
> 位置：Metadata block (@grant)  
> 建议：Only request the minimum necessary permissions.

**🟠 MEDIUM** — Supply Chain Risk  
> The script loads third-party libraries via @require from GreasyFork and CDN (jQuery), but does not pin versions with hashes, exposing to supply chain risks.  
> 位置：Metadata block (@require)  
> 建议：Pin dependencies to specific versions and use trusted CDNs with integrity hashes.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/374794-lift-web-restrictions-io-game-mods-moomoo-io-krunker-io-ad-link-bypasser-adblock-more)*
