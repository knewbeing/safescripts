---
title: "解除网络限制：.io游戏模型 、广告链接绕过器、广告拦截器，以及更多!"
---

# 解除网络限制：.io游戏模型 、广告链接绕过器、广告拦截器，以及更多!

`广告拦截`  `游戏辅助`  `自动跳转`  `暗黑模式`  `批量操作`  `网站增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Lift_Web_Restrictions_io_Game_Mods_MooMooioKrunkerio_Ad_Link_Bypasser_Adblock_MO.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**13**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/374794-lift-web-restrictions-io-game-mods-moomoo-io-krunker-io-ad-link-bypasser-adblock-more) <Badge type="tip" text="GreasyFork" />　　安装量：**782,147**　　评分：👍233 / 👎123

## 功能介绍

本脚本可为多个网站添加新功能，如游戏修改、广告拦截、自动跳转、暗黑模式等。支持批量删除Discord消息、屏蔽百度和Facebook广告、禁用谷歌分析。适用于多种.io游戏和常用网站，提升使用体验。

## 适用网站

- Discord
- Facebook
- Starve.io
- Google Classroom
- MooMoo.io
- Diep.io
- 百度

## 使用方法

1. 安装脚本后，访问支持的网站如Discord、Facebook、百度等。
2. 在.io游戏页面自动启用辅助功能，无需额外操作。
3. 在Google Classroom可切换暗黑模式。
4. 在Discord可批量删除消息。
5. 广告拦截和自动跳转功能会自动生效，无需手动设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改页面的全局对象，增强功能实现。 |
| `GM.setValue` | 保存自定义设置或数据到浏览器。 |
| `GM.getValue` | 读取之前保存的设置或数据。 |
| `GM_addStyle` | 为网页添加自定义样式，优化界面。 |
| `GM_addValueChangeListener` | 监听数据变化，实现多页面同步。 |
| `GM_removeValueChangeListener` | 移除数据变化监听器，管理同步功能。 |
| `GM_getTabs` | 获取所有脚本标签页，实现跨页面通信。 |
| `GM_getTab` | 获取当前脚本标签页的信息。 |
| `GM_saveTab` | 保存当前脚本标签页的数据。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：0/100　　**分析时间**：2026-04-27

> This userscript presents critical security risks, including remote code execution via dynamic external code loading and eval-like constructs, code obfuscation, DOM XSS potential, excessive privilege requests, privacy collection (persistent identifiers), and supply chain risks. It is not safe for use in its current form.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ksw2-moomoo.glitch.me, external URLs via Utils.loadModule (dynamic)） |
| 隐私采集 | ❌ 检测到（Persistent unique identifier (uuidv4) stored via GM.setValue, Usage counter stored via GM.setValue） |
| 代码混淆 | ❌ 检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ❌ 存在风险 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Remote Code Execution  
> The script uses XMLHttpRequest to fetch external code and executes it via a[a][a](x.responseText), which is equivalent to eval(). This is a remote code execution vulnerability.  
> 位置：Utils.loadModule function  
> 建议：Remove dynamic code loading and execution. Only load trusted, versioned scripts via @require.

**🔴 HIGH** — Unsafe Code Execution  
> The script executes code using eval-like construct (a[a][a]), which is equivalent to eval().  
> 位置：Utils.loadModule function  
> 建议：Avoid using eval or similar constructs. Use safe, static code.

**🔴 HIGH** — DOM XSS Risk  
> The script uses innerHTML and removes elements, but also allows dynamic code execution from external sources, which can lead to DOM XSS.  
> 位置：Utils.loadModule and deleteElement/watchAndDelete functions  
> 建议：Sanitize all inputs and avoid executing code from untrusted sources.

**🔴 HIGH** — Code Obfuscation  
> The script uses a code obfuscation technique (a[a][a]) to execute code, which makes auditing difficult.  
> 位置：Utils.loadModule function  
> 建议：Remove obfuscation and use clear, readable code.

**🟠 MEDIUM** — Supply Chain Risk  
> The script loads modules from arbitrary URLs via XMLHttpRequest, which can be abused for supply chain attacks.  
> 位置：Utils.loadModule function  
> 建议：Restrict module loading to trusted, versioned sources.

**🟠 MEDIUM** — Privacy Collection  
> The script uses GM.getValue and GM.setValue to store and retrieve user data (count, id), which could be used for tracking.  
> 位置：Initialization block (uuidv4, GM.getValue/setValue)  
> 建议：Clarify what data is stored and why. Avoid persistent identifiers unless necessary.

**🟠 MEDIUM** — Permission Abuse  
> The script requests high privileges (@grant unsafeWindow, GM_getTabs, GM_saveTab, etc.), some of which may not be used or are excessive.  
> 位置：Metadata block  
> 建议：Reduce privilege scope to only what is needed.

**🟠 MEDIUM** — Supply Chain Risk  
> The script loads third-party libraries from GreasyFork and jQuery from CDN, but does not pin versions with hashes.  
> 位置：@require statements  
> 建议：Pin dependencies to specific versions and use hashes if possible.

**🟡 LOW** — ClickJacking/Iframe Risk  
> The script creates hidden iframes and manipulates frame contexts, which may be used for clickjacking or data extraction.  
> 位置：isIFrame and CONTROLLER_PAGE logic  
> 建议：Avoid unnecessary iframe manipulation unless required for functionality.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/374794-lift-web-restrictions-io-game-mods-moomoo-io-krunker-io-ad-link-bypasser-adblock-more)*
