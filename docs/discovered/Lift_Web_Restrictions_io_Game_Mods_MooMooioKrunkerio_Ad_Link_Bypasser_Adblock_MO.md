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

**风险等级**：⛔ CRITICAL　　**安全评分**：0/100　　**分析时间**：2026-06-22

> This userscript contains multiple critical security and privacy risks. It executes remote code in an obfuscated manner, collects persistent unique identifiers, and requests high-privilege permissions. There is evidence of tracking and possible DOM XSS vulnerabilities. The use of unpinned third-party dependencies introduces supply chain risk. This script is NOT SAFE for use.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ksw2-moomoo.glitch.me, external URLs via loadModule） |
| 隐私采集 | ❌ 检测到（Persistent unique user ID generation and storage, Usage counter tracking, @antifeature Tracking indicates user data collection） |
| 代码混淆 | ❌ 检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ❌ 存在风险 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Remote Code Execution  
> The script uses XMLHttpRequest to fetch and execute remote code via a[a][a](x.responseText), which is equivalent to eval(). This is a critical remote code execution vulnerability.  
> 位置：Utils.loadModule function  
> 建议：Avoid executing remote code. Only use static, trusted code. Remove or strictly validate any dynamic code execution.

**⛔ CRITICAL** — Privacy Collection  
> The script stores a unique user identifier (UUID) in persistent storage (GM.setValue('id', uuidv4())) and increments a usage counter. This is a privacy risk, especially if these values are ever transmitted externally.  
> 位置：Anonymous async IIFE near top of script  
> 建议：Do not generate or store persistent unique identifiers unless absolutely necessary and with user consent.

**⛔ CRITICAL** — Privacy Collection  
> The script contains an @antifeature Tracking declaration, indicating some tracking for performance debugging. This may involve user data collection.  
> 位置：@antifeature metadata  
> 建议：Disclose all tracking behaviors and provide opt-out mechanisms.

**🔴 HIGH** — Code Obfuscation  
> The script uses a[a][a](x.responseText), which is an obfuscated way to call eval(). This is a strong indicator of code obfuscation and possible malicious intent.  
> 位置：Utils.loadModule function  
> 建议：Remove obfuscated code and use clear, readable code. Avoid using eval or similar constructs.

**🔴 HIGH** — DOM XSS  
> Potential DOM XSS: The script uses innerHTML/outerHTML in some modules (not fully visible in provided code), and the use of dynamic code execution increases XSS risk.  
> 位置：General code structure and dynamic code execution  
> 建议：Sanitize all user input and avoid inserting untrusted data into the DOM using innerHTML/outerHTML.

**🟠 MEDIUM** — Permission Abuse  
> The script requests and uses high-privilege grants such as unsafeWindow and GM_getTabs/GM_saveTab, which can be abused for privilege escalation or cross-tab tracking.  
> 位置：@grant metadata  
> 建议：Request only the minimum necessary permissions. Remove unused or high-risk grants.

**🟠 MEDIUM** — Supply Chain Risk  
> @require loads third-party scripts from greasyfork.org and code.jquery.com, but does not pin versions with hashes. This introduces supply chain risk if these scripts are compromised.  
> 位置：@require metadata  
> 建议：Pin dependencies to specific versions and use trusted, official sources. Prefer SRI hashes if possible.

**🟠 MEDIUM** — Privacy Collection  
> The script creates a unique tab ID and saves it via GM_saveTab, which could be used for cross-tab tracking.  
> 位置：ksw2-moomoo.glitch.me handler  
> 建议：Avoid tracking users across tabs unless necessary and with user consent.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/374794-lift-web-restrictions-io-game-mods-moomoo-io-krunker-io-ad-link-bypasser-adblock-more)*
