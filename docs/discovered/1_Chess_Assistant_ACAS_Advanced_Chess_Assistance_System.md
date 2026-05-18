---
title: "🏆 [#1 Chess Assistant] A.C.A.S（高级国际象棋辅助系统）"
---

# 🏆 [#1 Chess Assistant] A.C.A.S（高级国际象棋辅助系统）

`国际象棋`  `辅助工具`  `实时分析`  `策略建议`  `棋类游戏`  `自动化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/1_Chess_Assistant_ACAS_Advanced_Chess_Assistance_System.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.4.3**　　发现时间：**2026-05-18**　　来源：[GreasyFork](https://greasyfork.org/scripts/459137-1-chess-assistant-a-c-a-s-advanced-chess-assistance-system) <Badge type="tip" text="GreasyFork" />　　安装量：**57,358**　　评分：👍36 / 👎6

## 功能介绍

本脚本为国际象棋玩家提供实时走法分析和策略辅助，帮助提升棋艺水平。支持多家主流国际象棋网站，自动集成分析工具。安装后即可在对局时获得智能建议和辅助提示。适合希望提升棋力的用户使用。

## 适用网站

- Chess.com
- Lichess
- PlayStrategy
- PyChess
- Chess.org
- PaperGames 国际象棋
- Coolmath Games 国际象棋
- Immortal Game
- World Chess
- Chess.net
- FreeChess Club
- ChessClub.com
- GameKnot
- ChessAnytime
- EdChess
- A.C.A.S 官方主页
- 本地测试环境

## 使用方法

1. 1. 安装 Tampermonkey 插件并添加本脚本。
2. 2. 打开支持的国际象棋网站，开始或加入棋局。
3. 3. 页面会自动显示辅助分析和建议，无需额外操作。
4. 4. 可通过脚本菜单或界面按钮调整设置或查看帮助。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue / GM.getValue` | 用于读取和保存脚本设置或数据。 |
| `GM_setValue / GM.setValue` | 用于保存用户设置或脚本数据。 |
| `GM_deleteValue / GM.deleteValue` | 用于删除已保存的数据。 |
| `GM_listValues / GM.listValues` | 用于列出所有已保存的数据键名。 |
| `GM_openInTab / GM.openInTab` | 用于在新标签页打开相关链接或页面。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_setClipboard` | 用于复制内容到剪贴板。 |
| `GM_notification` | 用于在桌面弹出通知提醒用户。 |
| `unsafeWindow` | 允许脚本访问网页的原始窗口对象，实现更深层次的功能。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：76/100　　**分析时间**：2026-05-18

> The script does not directly transmit data to third-party servers or collect sensitive user data in the visible code. However, it requests several high-privilege grants (unsafeWindow, GM_openInTab, GM_setClipboard, GM_notification) that are not clearly used in the visible code, which increases the attack surface if the script or its dependencies are compromised. Additionally, @require is used to load external scripts without version pinning, introducing supply chain risk. No code obfuscation or DOM XSS risks were detected in the visible code. The overall risk is MEDIUM, mainly due to permission over-request and supply chain concerns.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — Permission Abuse  
> The script requests and uses the 'unsafeWindow' grant, which can be abused to access or modify the page's JavaScript context and may increase the risk of privilege escalation or data leakage.  
> 位置：UserScript metadata (@grant unsafeWindow)  
> 建议：Remove 'unsafeWindow' unless strictly necessary. If required, ensure all interactions are strictly controlled and sanitized.

**🟠 MEDIUM** — Permission Abuse  
> The script requests 'GM_openInTab', which can be abused to open arbitrary URLs in new tabs, potentially for phishing or unwanted navigation.  
> 位置：UserScript metadata (@grant GM_openInTab, GM.openInTab)  
> 建议：Only request 'GM_openInTab' if absolutely necessary. Remove if not used.

**🟠 MEDIUM** — Permission Abuse  
> The script requests 'GM_setClipboard', which can be abused to overwrite the user's clipboard.  
> 位置：UserScript metadata (@grant GM_setClipboard)  
> 建议：Only request 'GM_setClipboard' if necessary. Remove if not used.

**🟠 MEDIUM** — Permission Abuse  
> The script requests 'GM_notification', which can be abused to send unwanted notifications.  
> 位置：UserScript metadata (@grant GM_notification)  
> 建议：Only request 'GM_notification' if necessary. Remove if not used.

**🟠 MEDIUM** — Supply Chain Risk  
> The script uses @require to load external scripts from update.greasyfork.org, but the URLs are not version-pinned with a hash, which may introduce supply chain risk if the remote files are tampered with.  
> 位置：UserScript metadata (@require ...)  
> 建议：Pin @require URLs to a specific version or hash, and only use trusted sources.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/459137-1-chess-assistant-a-c-a-s-advanced-chess-assistance-system)*
