---
title: "🏆 [#1 Chess Assistant] A.C.A.S（高级国际象棋辅助系统）"
---

# 🏆 [#1 Chess Assistant] A.C.A.S（高级国际象棋辅助系统）

`国际象棋`  `辅助工具`  `策略分析`  `学习提升`  `游戏助手`  `实时分析`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/1_Chess_Assistant_ACAS_Advanced_Chess_Assistance_System.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.4.4**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/459137-1-chess-assistant-a-c-a-s-advanced-chess-assistance-system) <Badge type="tip" text="GreasyFork" />　　安装量：**60,328**　　评分：👍38 / 👎6

## 功能介绍

本脚本为国际象棋玩家提供实时走法分析和策略建议，帮助提升棋艺。支持多种主流在线国际象棋平台，自动识别棋局并给出辅助提示。适合希望提高水平或学习棋局策略的用户。

## 适用网站

- Chess.com
- Lichess
- PlayStrategy
- PyChess
- Chess.org
- Papergames.io
- Coolmathgames（国际象棋）
- Immortal.game
- WorldChess
- Chess.net
- FreeChess Club
- ChessClub
- Gameknot
- ChessAnytime
- EdChess

## 使用方法

1. 安装脚本后，打开任意支持的国际象棋网站。
2. 开始棋局时，系统会自动显示走法分析和策略建议。
3. 如需调整设置或功能，可通过浏览器脚本菜单进行操作。
4. 遇到问题可访问主页或支持页面获取帮助。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于获取本地存储的脚本数据，如设置或历史记录。 |
| `GM_setValue` | 用于保存脚本设置或用户数据到本地。 |
| `GM_deleteValue` | 用于删除本地存储的脚本数据。 |
| `GM_listValues` | 用于列出所有本地存储的脚本数据项。 |
| `GM_openInTab` | 用于在新标签页打开链接，方便访问相关资源。 |
| `GM.getValue` | 用于获取本地存储的脚本数据（新版API）。 |
| `GM.setValue` | 用于保存脚本设置或用户数据到本地（新版API）。 |
| `GM.deleteValue` | 用于删除本地存储的脚本数据（新版API）。 |
| `GM.listValues` | 用于列出所有本地存储的脚本数据项（新版API）。 |
| `GM.openInTab` | 用于在新标签页打开链接（新版API）。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_setClipboard` | 用于复制内容到剪贴板，便于分享棋局或数据。 |
| `GM_notification` | 用于弹出通知提醒用户重要信息。 |
| `unsafeWindow` | 允许脚本访问网页的原生窗口对象，增强功能。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：77/100　　**分析时间**：2026-06-29

> The script does not directly transmit user data to third-party servers, nor does it collect sensitive information or use obfuscation. However, it requests high-privilege grants (unsafeWindow, GM_openInTab) and loads external dependencies without version pinning, introducing supply chain and privilege escalation risks. No DOM XSS, privacy collection, or WebSocket usage detected in the provided code. Review of the required external scripts is necessary for a complete assessment.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🔴 HIGH** — Privilege Escalation  
> The script uses @grant unsafeWindow, which exposes privileged script context to the page and can be abused if not handled carefully.  
> 位置：Metadata block (@grant unsafeWindow)  
> 建议：Remove unsafeWindow unless strictly necessary. If used, ensure all interactions are strictly controlled and sanitized.

**🟠 MEDIUM** — Permission Overprovision  
> The script requests GM_openInTab and GM.openInTab permissions, which can be abused to open arbitrary tabs.  
> 位置：Metadata block (@grant GM_openInTab, GM.openInTab)  
> 建议：Remove these permissions if not strictly required, or ensure their use is limited to user-initiated actions.

**🟠 MEDIUM** — Supply Chain Risk  
> The script uses @require to load three external scripts from update.greasyfork.org. These URLs are not version-pinned with a hash and could be replaced upstream, introducing supply chain risk.  
> 位置：Metadata block (@require ...)  
> 建议：Pin @require URLs to a specific version or hash, and only use trusted sources.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/459137-1-chess-assistant-a-c-a-s-advanced-chess-assistance-system)*
